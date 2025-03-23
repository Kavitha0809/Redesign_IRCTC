'use client'

import { motion } from 'framer-motion'
import { CloudIcon } from '@heroicons/react/24/outline'

const TrainAnimation = () => {
  return (
    <div className="relative h-24 mb-8 overflow-hidden">
      {/* Background with moving clouds */}
      <div className="absolute inset-0 flex items-center">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ x: '100%' }}
            animate={{ x: '-100%' }}
            transition={{
              duration: 20,
              repeat: Infinity,
              delay: index * 5,
              ease: 'linear',
            }}
            className="absolute"
            style={{ left: `${index * 33}%` }}
          >
            <CloudIcon className="h-12 w-12 text-gray-200 dark:text-gray-700" />
          </motion.div>
        ))}
      </div>

      {/* Train */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{
          x: '100%',
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-1/2 -translate-y-1/2"
      >
        <div className="relative flex items-center">
          {/* Train body */}
          <motion.div
            animate={{
              y: [-2, 2, -2],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative"
          >
            <div className="bg-primary-500 rounded-lg p-3 shadow-lg">
              <div className="w-8 h-8 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Steam/Smoke effect */}
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5],
                  x: [-10 * (index + 1)],
                  y: [-10 * (index + 1)],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: 'easeOut',
                }}
                className="absolute right-0 bottom-full"
              >
                <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
              </motion.div>
            ))}
          </motion.div>

          {/* Track */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600" />
        </div>
      </motion.div>

      {/* Track base */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600" />
    </div>
  )
}

export default TrainAnimation 