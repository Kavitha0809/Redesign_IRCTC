'use client'

import { useState, FormEvent } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLongRightIcon, UserIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline'

interface PassengerDetails {
  name: string
  age: string
  gender: 'male' | 'female' | 'other'
}

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [bookingError, setBookingError] = useState('')

  // Get train details from URL params
  const trainName = searchParams.get('trainName')
  const trainNumber = searchParams.get('trainNumber')
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const date = searchParams.get('date')
  const travelClass = searchParams.get('class')
  const numPassengers = parseInt(searchParams.get('passengers') || '1')
  const price = parseInt(searchParams.get('price') || '0')
  const departure = searchParams.get('departure')
  const arrival = searchParams.get('arrival')

  // Initialize passenger details array based on number of passengers
  const [passengers, setPassengers] = useState<PassengerDetails[]>(
    Array(numPassengers).fill({
      name: '',
      age: '',
      gender: 'male'
    })
  )

  const handlePassengerChange = (index: number, field: keyof PassengerDetails, value: string) => {
    const updatedPassengers = [...passengers]
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value
    }
    setPassengers(updatedPassengers)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setBookingError('')

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate successful booking
      router.push('/booking-confirmation')
    } catch (error) {
      setBookingError('Unable to complete booking. Please try again.')
      console.error('Booking error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          {/* Train Details Summary */}
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Booking</h1>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{trainName}</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Train Number</p>
                <p className="font-medium">{trainNumber}</p>
              </div>
              <div>
                <p className="text-gray-600">Travel Class</p>
                <p className="font-medium">{travelClass}</p>
              </div>
              <div className="col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{from}</p>
                    <p className="text-gray-600">{departure}</p>
                  </div>
                  <ArrowLongRightIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">{to}</p>
                    <p className="text-gray-600">{arrival}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Date</p>
                <p className="font-medium">{date}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Fare</p>
                <p className="font-medium flex items-center">
                  <CurrencyRupeeIcon className="h-4 w-4 mr-1" />
                  {price * numPassengers}
                </p>
              </div>
            </div>
          </div>

          {/* Passenger Details Form */}
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Passenger Details</h3>
            {passengers.map((passenger, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-4">
                  Passenger {index + 1}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      value={passenger.name}
                      onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="120"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      value={passenger.age}
                      onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      value={passenger.gender}
                      onChange={(e) => handlePassengerChange(index, 'gender', e.target.value as 'male' | 'female' | 'other')}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                  isLoading ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </button>
              {bookingError && (
                <p className="mt-2 text-center text-red-600 text-sm">{bookingError}</p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
} 