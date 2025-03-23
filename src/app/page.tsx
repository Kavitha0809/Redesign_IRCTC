'use client'

import { useState, FormEvent, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MagnifyingGlassIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  CloudIcon,
  BellIcon,
  MoonIcon,
  SunIcon,
  GlobeAltIcon,
  RocketLaunchIcon as TrainIcon,
  MicrophoneIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import TrainAnimation from '@/components/TrainAnimation'
import WeatherWidget from '@/components/WeatherWidget'
import VoiceSearch from '@/components/VoiceSearch'
import AIRecommendations from '@/components/AIRecommendations'
import AIService from '@/services/AIService'
import { Recommendation } from '@/types/ai'

// Popular stations for suggestions
const POPULAR_STATIONS = [
  'New Delhi',
  'Mumbai Central',
  'Chennai Central',
  'Kolkata',
  'Bangalore',
  'Hyderabad',
  'Ahmedabad',
  'Pune',
  'Jaipur',
  'Lucknow',
]

// Language options
const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'mr', name: 'मराठी' },
]

// Recent searches (simulated - would come from backend/localStorage in production)
const RECENT_SEARCHES = [
  { from: 'Mumbai Central', to: 'New Delhi', date: '2024-03-25' },
  { from: 'Bangalore', to: 'Chennai Central', date: '2024-03-26' },
]

// Enhanced weather data
const weatherData = [
  {
    city: 'Delhi',
    temp: '32°C',
    condition: 'Clear',
    time: '2:30 PM',
    humidity: 65,
    feelsLike: '34°C'
  },
  {
    city: 'Mumbai',
    temp: '29°C',
    condition: 'Cloudy',
    time: '2:30 PM',
    humidity: 78,
    feelsLike: '31°C'
  },
  {
    city: 'Chennai',
    temp: '34°C',
    condition: 'Clear',
    time: '2:30 PM',
    humidity: 72,
    feelsLike: '36°C'
  }
]

export default function Home() {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    class: 'All Classes',
    passengers: '1',
  })
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeField, setActiveField] = useState<'from' | 'to' | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Effect for dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Add useEffect for handling clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.language-dropdown')) {
        setShowLanguageDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Smart station suggestions
  const getSuggestions = (input: string) => {
    if (!input) return []
    
    const filtered = POPULAR_STATIONS.filter(station =>
      station.toLowerCase().includes(input.toLowerCase())
    )
    return filtered
  }

  const handleInputChange = (field: 'from' | 'to', value: string) => {
    setSearchParams(prev => ({ ...prev, [field]: value }))
    setActiveField(field)
    setSuggestions(getSuggestions(value))
    setShowSuggestions(true)
  }

  const handleSuggestionClick = (suggestion: string) => {
    if (activeField) {
      setSearchParams(prev => ({ ...prev, [activeField]: suggestion }))
      setShowSuggestions(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    setSearchError('')
    
    try {
      // Create the search params string
      const searchParamsString = new URLSearchParams(searchParams).toString()
      
      // Use Next.js router to navigate
      router.push(`/search-results?${searchParamsString}`)
    } catch (error) {
      setSearchError('Unable to search for trains. Please try again.')
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const popularDestinations = [
    { from: 'New Delhi', to: 'Mumbai' },
    { from: 'Bangalore', to: 'Chennai' },
    { from: 'Kolkata', to: 'Hyderabad' },
    { from: 'Pune', to: 'Ahmedabad' },
  ]

  useEffect(() => {
    loadRecommendations()
  }, [])

  const loadRecommendations = async () => {
    const aiService = AIService.getInstance()
    const recs = await aiService.getSmartRecommendations({
      from: searchParams.from,
      to: searchParams.to,
      date: searchParams.date,
      preferences: {
        class: 'AC'
      }
    })
    setRecommendations(recs)
  }

  const handleVoiceSearchResult = async (transcript: string) => {
    // Simple parsing logic - could be enhanced with NLP
    const words = transcript.toLowerCase().split(' ')
    let newFrom = ''
    let newTo = ''
    
    const fromIndex = words.indexOf('from')
    const toIndex = words.indexOf('to')
    
    if (fromIndex !== -1 && fromIndex + 1 < words.length) {
      newFrom = words[fromIndex + 1]
      setSearchParams(prev => ({ ...prev, from: newFrom.charAt(0).toUpperCase() + newFrom.slice(1) }))
    }
    
    if (toIndex !== -1 && toIndex + 1 < words.length) {
      newTo = words[toIndex + 1]
      setSearchParams(prev => ({ ...prev, to: newTo.charAt(0).toUpperCase() + newTo.slice(1) }))
    }

    await loadRecommendations()
  }

  const handleRecommendationSelect = (recommendation: Recommendation) => {
    setSearchParams(prev => ({
      ...prev,
      from: recommendation.from,
      to: recommendation.to,
      date: recommendation.date,
    }))
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleLanguageChange = (code: string) => {
    setCurrentLanguage(code)
    setShowLanguageDropdown(false)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Language and Theme Toggles */}
        <div className="flex justify-end space-x-4 mb-8">
          <div className="relative language-dropdown">
            <button
              type="button"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-600"
              onClick={() => setShowLanguageDropdown(prev => !prev)}
            >
              <GlobeAltIcon className="h-5 w-5" />
              <span>{LANGUAGES.find(lang => lang.code === currentLanguage)?.name || 'English'}</span>
            </button>
            {showLanguageDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  {LANGUAGES.map(language => (
                    <button
                      key={language.code}
                      type="button"
                      className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                      onClick={() => {
                        handleLanguageChange(language.code)
                        setShowLanguageDropdown(false)
                      }}
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button
            className="text-gray-600 dark:text-gray-300 hover:text-primary-600"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Main Search Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Book Your Train Journey
          </h1>

          {/* Add Train Animation */}
          <TrainAnimation />

          <div className="space-y-6">
            {/* From and To Fields with Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  From
                </label>
                <input
                  type="text"
                  value={searchParams.from}
                  onChange={(e) => handleInputChange('from', e.target.value)}
                  onFocus={() => setActiveField('from')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter departure station"
                />
                {showSuggestions && activeField === 'from' && suggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-md shadow-lg">
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To
                </label>
                <input
                  type="text"
                  value={searchParams.to}
                  onChange={(e) => handleInputChange('to', e.target.value)}
                  onFocus={() => setActiveField('to')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter destination station"
                />
                {showSuggestions && activeField === 'to' && suggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-md shadow-lg">
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Date, Class, and Passengers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date of Journey
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={searchParams.date}
                    onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Class
                </label>
                <select
                  value={searchParams.class}
                  onChange={(e) => setSearchParams({ ...searchParams, class: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option>All Classes</option>
                  <option>AC First Class (1A)</option>
                  <option>AC 2 Tier (2A)</option>
                  <option>AC 3 Tier (3A)</option>
                  <option>Sleeper (SL)</option>
                  <option>Second Sitting (2S)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Passengers
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={searchParams.passengers}
                    onChange={(e) => setSearchParams({ ...searchParams, passengers: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <UserGroupIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Recent Searches */}
            {RECENT_SEARCHES.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Recent Searches
                </h3>
                <div className="space-y-2">
                  {RECENT_SEARCHES.map((search, index) => (
                    <button
                      key={index}
                      type="button"
                      className="w-full text-left px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => setSearchParams({
                        ...searchParams,
                        from: search.from,
                        to: search.to,
                        date: search.date,
                      })}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{search.from}</span>
                          <span className="mx-2">→</span>
                          <span className="font-medium">{search.to}</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(search.date).toLocaleDateString()}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSearching}
                className={`w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                  isSearching ? 'bg-primary-400' : 'bg-primary-600 hover:bg-primary-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200`}
              >
                {isSearching ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  <>
                    <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                    Search Trains
                  </>
                )}
              </button>
              {searchError && (
                <p className="mt-2 text-center text-red-600 text-sm">{searchError}</p>
              )}
            </div>
          </div>
        </motion.form>

        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Weather Widget */}
              <WeatherWidget weatherData={weatherData} />

              {/* Smart Features */}
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center mb-4">
                    <BellIcon className="h-8 w-8 text-primary-600" />
                    <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                      Smart Notifications
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get real-time updates about price drops, seat availability, and special offers.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center mb-4">
                    <UserGroupIcon className="h-8 w-8 text-primary-600" />
                    <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                      Group Booking
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Optimize seat arrangements for groups and get special group discounts.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Routes */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Routes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularDestinations.map((route, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-lg shadow-lg p-6 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-semibold">{route.from}</div>
                    <div className="text-primary-600">→</div>
                    <div className="text-lg font-semibold">{route.to}</div>
                  </div>
                  <button
                    type="button"
                    className="w-full mt-4 bg-primary-50 text-primary-600 px-4 py-2 rounded-md hover:bg-primary-100 transition-colors"
                  >
                    Check Availability
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Recommendations */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">AI Recommendations</h2>
            <div className="flex justify-between items-center mb-8">
              <VoiceSearch onResult={handleVoiceSearchResult} />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => loadRecommendations()}
                className="bg-primary-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Search Trains
              </motion.button>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              </div>
            ) : recommendations.length > 0 && (
              <AIRecommendations
                recommendations={recommendations}
                onSelect={handleRecommendationSelect}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  )
} 