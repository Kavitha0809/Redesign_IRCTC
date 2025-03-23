import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Server-side storage
const USERS_FILE = path.join(process.cwd(), 'users.json')

// Helper functions for user storage
const getUsers = () => {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf8')
      const users = JSON.parse(data)
      return new Map(Object.entries(users))
    }
  } catch (error) {
    console.error('Error reading users file:', error)
  }
  return new Map()
}

const saveUsers = (users: Map<string, any>) => {
  try {
    const usersObj = Object.fromEntries(users)
    fs.writeFileSync(USERS_FILE, JSON.stringify(usersObj, null, 2))
  } catch (error) {
    console.error('Error saving users file:', error)
  }
}

// Debug function to log current users
const logUsers = () => {
  console.log('Current users in database:', Array.from(getUsers().entries()))
}

export async function POST(request: Request) {
  try {
    const { email, password, action } = await request.json()
    
    console.log(`Auth attempt - Action: ${action}, Email: ${email}`)
    
    // Get current users
    const users = getUsers()
    logUsers()

    if (action === 'signup') {
      if (users.has(email)) {
        console.log('Signup failed: User already exists')
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        )
      }

      users.set(email, { email, password })
      saveUsers(users)
      console.log('User registered successfully:', email)
      logUsers()

      return NextResponse.json(
        { message: 'User created successfully' },
        { status: 201 }
      )
    }

    if (action === 'login') {
      const user = users.get(email)
      console.log('Login attempt for user:', email)
      console.log('User found in database:', user ? 'Yes' : 'No')
      
      if (!user) {
        console.log('Login failed: User not found')
        return NextResponse.json(
          { error: 'User not found. Please sign up first.' },
          { status: 401 }
        )
      }

      if (user.password !== password) {
        console.log('Login failed: Invalid password')
        return NextResponse.json(
          { error: 'Invalid password' },
          { status: 401 }
        )
      }

      console.log('Login successful for user:', email)
      return NextResponse.json(
        { 
          message: 'Login successful',
          user: { email: user.email }
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 