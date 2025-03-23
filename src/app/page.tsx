'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Icons } from '@/components/Icons'

// Mock data for suggestions (replace with API calls)
const POPULAR_ROUTES = [
  { from: 'Mumbai', to: 'Delhi', frequency: 'Daily' },
  { from: 'Bangalore', to: 'Chennai', frequency: 'Hourly' },
  { from: 'Kolkata', to: 'Hyderabad', frequency: 'Weekly' }
]

const FESTIVALS = [
  { name: 'Diwali Special', route: 'Delhi - Patna', date: '2024-11-01' },
  { name: 'Durga Puja Express', route: 'Kolkata - Mumbai', date: '2024-10-15' },
  { name: 'Onam Special', route: 'Bangalore - Kerala', date: '2024-09-01' }
]

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'bn', name: 'বাংলা' }
]

export default function Home() {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    class: 'all'
  })
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [weather, setWeather] = useState({ temp: '25°C', condition: 'Sunny' })

  // Effect to apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Simulated AI suggestions based on user input
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchData(prev => ({ ...prev, [name]: value }))

    // Simulate AI suggestions (replace with actual API call)
    if (value.length > 2) {
      setSuggestions([
        `${value} Central`,
        `${value} Junction`,
        `${value} Railway Station`
      ])
    } else {
      setSuggestions([])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header Section */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1"
          >
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {isDarkMode ? (
            <Icons.Sun className="h-6 w-6 text-yellow-400" />
          ) : (
            <Icons.Moon className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </header>

      {/* Hero Section with 3D Train Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Book Your Journey with
            <span className="text-blue-600"> IRCTC</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Smart bookings, real-time tracking, and hassle-free travel planning
          </p>
        </div>

        {/* Search Form */}
        <div className="mt-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative">
                  <input
                    type="text"
                    name="from"
                    value={searchData.from}
                    onChange={handleSearchInput}
                    placeholder="From Station"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  {suggestions.length > 0 && searchData.from && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                          onClick={() => {
                            setSearchData(prev => ({ ...prev, from: suggestion }))
                            setSuggestions([])
                          }}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="to"
                    value={searchData.to}
                    onChange={handleSearchInput}
                    placeholder="To Station"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="date"
                  name="date"
                  value={searchData.date}
                  onChange={handleSearchInput}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <select
                  name="class"
                  value={searchData.class}
                  onChange={(e) => setSearchData(prev => ({ ...prev, class: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Classes</option>
                  <option value="1A">First AC</option>
                  <option value="2A">Second AC</option>
                  <option value="3A">Third AC</option>
                  <option value="SL">Sleeper</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Search Trains
              </button>
            </form>
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/booking" className="transform hover:scale-105 transition-transform">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <Icons.Ticket className="h-8 w-8 text-blue-600" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Book Tickets</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Quick access to train booking</p>
            </div>
          </Link>
          <Link href="/track" className="transform hover:scale-105 transition-transform">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <Icons.Map className="h-8 w-8 text-blue-600" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Track Train</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Real-time train location</p>
            </div>
          </Link>
          <Link href="/pnr" className="transform hover:scale-105 transition-transform">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <Icons.Train className="h-8 w-8 text-blue-600" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">PNR Status</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Check your booking status</p>
            </div>
          </Link>
          <Link href="/offers" className="transform hover:scale-105 transition-transform">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <Icons.Gift className="h-8 w-8 text-blue-600" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Offers</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Latest deals and discounts</p>
            </div>
          </Link>
        </div>

        {/* Festival Special Trains */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Festival Special Trains</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FESTIVALS.map((festival, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{festival.name}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{festival.route}</p>
                <p className="mt-1 text-sm text-blue-600">Starts from: {festival.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Routes */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Routes</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_ROUTES.map((route, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{route.from} → {route.to}</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{route.frequency} trains available</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-500">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Widget */}
        <div className="mt-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-sm mx-auto">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Current Weather</h3>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{weather.temp}</p>
              <p className="text-gray-500 dark:text-gray-400">{weather.condition}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 