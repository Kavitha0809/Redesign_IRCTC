import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import {
  ClockIcon,
  MapPinIcon,
  ArrowPathIcon,
  BellAlertIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import MainLayout from '../../components/layout/MainLayout'

// Dynamically import the map component to avoid SSR issues
const Map = dynamic(
  () => import('../../components/tracking/Map'),
  { ssr: false }
)

export default function TrackingPage() {
  const [pnrNumber, setPnrNumber] = useState('')
  const [isTracking, setIsTracking] = useState(false)

  const trainInfo = {
    trainName: 'Rajdhani Express',
    trainNumber: '12301',
    status: 'Running',
    delay: '10 minutes',
    currentStation: 'Surat',
    nextStation: 'Mumbai Central',
    expectedArrival: '08:35',
    speed: '120 km/h',
    lastUpdated: '2 mins ago',
    route: [
      { station: 'New Delhi', status: 'completed', time: '16:55', delay: '0 min' },
      { station: 'Mathura Junction', status: 'completed', time: '18:45', delay: '5 min' },
      { station: 'Kota Junction', status: 'completed', time: '23:05', delay: '8 min' },
      { station: 'Ratlam', status: 'completed', time: '03:15', delay: '10 min' },
      { station: 'Vadodara', status: 'completed', time: '06:35', delay: '10 min' },
      { station: 'Surat', status: 'current', time: '07:55', delay: '10 min' },
      { station: 'Mumbai Central', status: 'upcoming', time: '08:35', delay: '10 min' },
    ],
  }

  const handleTrackTrain = () => {
    setIsTracking(true)
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isTracking ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto"
          >
            <h1 className="text-3xl font-bold text-center mb-8">Track Your Train</h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter PNR Number
                </label>
                <input
                  type="text"
                  value={pnrNumber}
                  onChange={(e) => setPnrNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="10 digit PNR number"
                />
              </div>
              <button
                onClick={handleTrackTrain}
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Track Train
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Train Information Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{trainInfo.trainName}</h2>
                  <p className="text-gray-600">Train #{trainInfo.trainNumber}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Last updated: {trainInfo.lastUpdated}</span>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowPathIcon className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-center space-x-3">
                  <ClockIcon className="h-6 w-6 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold text-green-600">{trainInfo.status}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="h-6 w-6 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-600">Current Station</p>
                    <p className="font-semibold">{trainInfo.currentStation}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ClockIcon className="h-6 w-6 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-600">Expected Arrival</p>
                    <p className="font-semibold">{trainInfo.expectedArrival}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <BellAlertIcon className="h-6 w-6 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-600">Delay</p>
                    <p className="font-semibold text-yellow-600">{trainInfo.delay}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Live Map and Route Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Live Map */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold mb-4">Live Location</h3>
                <div className="h-[400px] bg-gray-100 rounded-lg">
                  {/* Map component will be rendered here */}
                  <Map />
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <InformationCircleIcon className="h-5 w-5 mr-1" />
                    <span>Current Speed: {trainInfo.speed}</span>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700">
                    View Full Screen
                  </button>
                </div>
              </motion.div>

              {/* Route Timeline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold mb-4">Journey Timeline</h3>
                <div className="space-y-6">
                  {trainInfo.route.map((station, index) => (
                    <div key={station.station} className="relative">
                      {index !== trainInfo.route.length - 1 && (
                        <div
                          className="absolute left-2.5 top-6 w-0.5 h-full bg-gray-200"
                          style={{
                            backgroundColor: station.status === 'completed' ? '#10B981' : '#E5E7EB',
                          }}
                        />
                      )}
                      <div className="flex items-start">
                        <div
                          className={`relative flex items-center justify-center w-5 h-5 rounded-full ${
                            station.status === 'completed'
                              ? 'bg-green-500'
                              : station.status === 'current'
                              ? 'bg-yellow-500'
                              : 'bg-gray-200'
                          }`}
                        >
                          {station.status === 'current' && (
                            <div className="absolute w-10 h-10 rounded-full border-2 border-yellow-500 animate-ping" />
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{station.station}</p>
                              <p className="text-sm text-gray-600">{station.time}</p>
                            </div>
                            {station.delay !== '0 min' && (
                              <span className="text-sm text-yellow-600">+{station.delay}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Weather Updates</h4>
                  <p className="text-sm text-gray-600">Clear weather conditions along the route</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Platform Information</h4>
                  <p className="text-sm text-gray-600">Expected arrival at Platform 4</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Coach Position</h4>
                  <p className="text-sm text-gray-600">Your coach will be in the middle section</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </MainLayout>
  )
} 