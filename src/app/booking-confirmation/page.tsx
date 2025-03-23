'use client'

import { motion } from 'framer-motion'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function BookingConfirmation() {
  // Generate a random PNR number
  const pnr = Math.random().toString(36).substring(2, 10).toUpperCase()

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-lg p-8 text-center"
        >
          <div className="flex justify-center mb-6">
            <CheckCircleIcon className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Your train ticket has been successfully booked.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Booking Details
            </h2>
            <div className="text-left">
              <div className="mb-4">
                <p className="text-sm text-gray-600">PNR Number</p>
                <p className="text-lg font-medium">{pnr}</p>
              </div>
              <p className="text-sm text-gray-600">
                A copy of the ticket has been sent to your registered email address.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full px-6 py-3 text-base font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Back to Home
            </Link>
            
            <button
              onClick={() => window.print()}
              className="block w-full px-6 py-3 text-base font-medium text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Print Ticket
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 