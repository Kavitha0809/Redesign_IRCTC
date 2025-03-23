'use client'

import { motion } from 'framer-motion'
import { SparklesIcon } from '@heroicons/react/24/outline'
import { Recommendation } from '@/types/ai'

interface AIRecommendationsProps {
  recommendations: Recommendation[]
  onSelect: (recommendation: Recommendation) => void
}

const AIRecommendations = ({ recommendations, onSelect }: AIRecommendationsProps) => {
  const getIcon = (type: Recommendation['type']) => {
    switch (type) {
      case 'popular':
        return <SparklesIcon className="h-6 w-6 text-yellow-500" />
      case 'trending':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-green-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
        )
      case 'holiday':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-blue-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        )
      default:
        return <SparklesIcon className="h-6 w-6 text-yellow-500" />
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <SparklesIcon className="h-5 w-5 mr-2 text-primary-500" />
        AI Recommendations
      </h3>
      
      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelect(recommendation)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getIcon(recommendation.type)}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {recommendation.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {recommendation.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                  {recommendation.price}
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm">
              <div className="text-gray-600 dark:text-gray-300">
                {recommendation.from} → {recommendation.to}
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                {recommendation.date}
              </div>
            </div>

            {/* AI Confidence Indicator */}
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>AI Confidence</span>
                <span>{recommendation.confidence}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                <motion.div
                  className="bg-primary-500 h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${recommendation.confidence}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default AIRecommendations 