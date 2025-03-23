'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapIcon, ClockIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

interface TrainStatus {
  trainNumber: string
  trainName: string
  currentStation: string
  nextStation: string
  expectedArrival: string
  delay: number
  platform: string
  status: 'On Time' | 'Delayed' | 'Arriving' | 'Departed'
}

export default function TrackPage() {
  const [trainNumber, setTrainNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [trainStatus, setTrainStatus] = useState<TrainStatus | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulated API call
    setTimeout(() => {
      setTrainStatus({
        trainNumber: '12345',
        trainName: 'Rajdhani Express',
        currentStation: 'New Delhi',
        nextStation: 'Agra Cantt',
        expectedArrival: '14:30',
        delay: 15,
        platform: '5',
        status: 'On Time'
      })
      setLoading(false)
    }, 1500)
  }

  const getStatusColor = (status: TrainStatus['status']) => {
    switch (status) {
      case 'On Time':
        return 'text-green-500'
      case 'Delayed':
        return 'text-red-500'
      case 'Arriving':
        return 'text-blue-500'
      case 'Departed':
        return 'text-gray-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <MapIcon className="h-8 w-8 mr-3 text-primary-500" />
            Track Your Train
          </h1>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={trainNumber}
                onChange={(e) => setTrainNumber(e.target.value)}
                placeholder="Enter Train Number"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                disabled={loading}
              >
                {loading ? 'Tracking...' : 'Track'}
              </motion.button>
            </div>
          </form>

          {trainStatus && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {trainStatus.trainName}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Train Number: {trainStatus.trainNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${getStatusColor(trainStatus.status)}`}>
                      {trainStatus.status}
                    </p>
                    {trainStatus.delay > 0 && (
                      <p className="text-red-500">
                        Delayed by {trainStatus.delay} minutes
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2 text-primary-500" />
                  Current Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Current Station: {trainStatus.currentStation}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Next Station: {trainStatus.nextStation}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Expected Arrival: {trainStatus.expectedArrival}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Platform: {trainStatus.platform}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex items-start">
                  <InformationCircleIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Live tracking information is updated every 5 minutes. Times shown are in local station time.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 