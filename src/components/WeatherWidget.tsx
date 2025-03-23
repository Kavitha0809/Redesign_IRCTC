import { motion } from 'framer-motion'
import { CloudIcon, SunIcon } from '@heroicons/react/24/outline'

interface WeatherData {
  city: string
  temp: string
  condition: string
  time: string
  humidity: number
  feelsLike: string
}

interface WeatherWidgetProps {
  weatherData: WeatherData[]
}

const WeatherWidget = ({ weatherData }: WeatherWidgetProps) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <SunIcon className="h-8 w-8 text-yellow-500" />
      case 'cloudy':
        return <CloudIcon className="h-8 w-8 text-gray-500" />
      default:
        return <SunIcon className="h-8 w-8 text-yellow-500" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <CloudIcon className="h-5 w-5 mr-2 text-primary-500" />
        Weather Updates
      </h3>

      <div className="space-y-4">
        {weatherData.map((data, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {data.city}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {data.time}
                </p>
              </div>
              <div className="flex items-center">
                {getWeatherIcon(data.condition)}
                <span className="ml-2 text-2xl font-semibold text-gray-900 dark:text-white">
                  {data.temp}
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
              <div className="text-gray-600 dark:text-gray-300">
                <span className="block">Humidity</span>
                <span className="font-medium">{data.humidity}%</span>
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                <span className="block">Feels Like</span>
                <span className="font-medium">{data.feelsLike}</span>
              </div>
            </div>

            {/* Weather Condition Animation */}
            <motion.div
              className="mt-2 h-1 bg-primary-100 dark:bg-gray-600 rounded-full overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              <motion.div
                className="h-full bg-primary-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default WeatherWidget 