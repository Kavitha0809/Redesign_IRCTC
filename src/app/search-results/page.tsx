'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowLongRightIcon, ClockIcon, CurrencyRupeeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

// Mock data for demonstration
const MOCK_TRAINS = [
  {
    id: '12345',
    name: 'Rajdhani Express',
    number: 'RJD-101',
    departure: '06:00',
    arrival: '18:00',
    duration: '12h 00m',
    price: 2100,
    available: 45,
  },
  {
    id: '12346',
    name: 'Shatabdi Express',
    number: 'SHT-202',
    departure: '08:30',
    arrival: '16:30',
    duration: '8h 00m',
    price: 1800,
    available: 32,
  },
  {
    id: '12347',
    name: 'Duronto Express',
    number: 'DRT-303',
    departure: '22:00',
    arrival: '08:00',
    duration: '10h 00m',
    price: 1950,
    available: 28,
  },
]

export default function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [trains, setTrains] = useState(MOCK_TRAINS)
  const [error, setError] = useState('')

  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const date = searchParams.get('date')
  const travelClass = searchParams.get('class')
  const passengers = searchParams.get('passengers')

  // Validate required search parameters
  useEffect(() => {
    if (!from || !to || !date) {
      setError('Missing required search parameters')
      setIsLoading(false)
      return
    }
    setError('')
  }, [from, to, date])

  const fetchTrains = useCallback(async () => {
    if (error) return

    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setTrains(MOCK_TRAINS)
    } catch (error) {
      console.error('Error fetching trains:', error)
      setError('Failed to fetch trains. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [error])

  useEffect(() => {
    fetchTrains()
  }, [fetchTrains])

  const handleBooking = useCallback((train: typeof MOCK_TRAINS[0]) => {
    const bookingParams = new URLSearchParams({
      trainName: train.name,
      trainNumber: train.number,
      from: from || '',
      to: to || '',
      date: date || '',
      class: travelClass || '',
      passengers: passengers || '1',
      price: train.price.toString(),
      departure: train.departure,
      arrival: train.arrival
    })
    
    router.push(`/booking?${bookingParams.toString()}`)
  }, [from, to, date, travelClass, passengers, router])

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
              <p className="text-red-600 mb-6">{error}</p>
              <Link
                href="/"
                className="inline-flex items-center text-primary-600 hover:text-primary-700"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Search
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Search Link */}
        <Link
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Search
        </Link>

        {/* Search Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Results</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="font-semibold mr-2">From:</span>
              {from}
              <ArrowLongRightIcon className="h-5 w-5 mx-2" />
              <span className="font-semibold mr-2">To:</span>
              {to}
            </div>
            <div>
              <span className="font-semibold mr-2">Date:</span>
              {date}
            </div>
            <div>
              <span className="font-semibold mr-2">Class:</span>
              {travelClass}
            </div>
            <div>
              <span className="font-semibold mr-2">Passengers:</span>
              {passengers}
            </div>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {trains.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600">No trains found for your search criteria.</p>
              </div>
            ) : (
              trains.map((train) => (
                <motion.div
                  key={train.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-semibold text-gray-900">{train.name}</h3>
                      <p className="text-sm text-gray-600">Train No: {train.number}</p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4 md:items-center">
                      <div className="text-center">
                        <p className="text-lg font-semibold">{train.departure}</p>
                        <p className="text-sm text-gray-600">{from}</p>
                      </div>
                      
                      <div className="flex items-center text-gray-400">
                        <ClockIcon className="h-5 w-5 mx-2" />
                        <span className="text-sm">{train.duration}</span>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-lg font-semibold">{train.arrival}</p>
                        <p className="text-sm text-gray-600">{to}</p>
                      </div>
                      
                      <div className="flex flex-col items-center border-l border-gray-200 pl-4 ml-4">
                        <div className="flex items-center text-lg font-semibold text-gray-900">
                          <CurrencyRupeeIcon className="h-5 w-5 mr-1" />
                          {train.price}
                        </div>
                        <p className="text-sm text-gray-600">{train.available} seats left</p>
                      </div>
                      
                      <button
                        className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
                        onClick={() => handleBooking(train)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
} 