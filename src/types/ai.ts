export interface Recommendation {
  type: 'popular' | 'trending' | 'holiday'
  title: string
  description: string
  from: string
  to: string
  date: string
  price: string
  confidence: number
}

export interface SearchResult {
  trainNumber: string
  trainName: string
  departure: {
    station: string
    time: string
  }
  arrival: {
    station: string
    time: string
  }
  duration: string
  price: {
    AC: number
    Sleeper: number
    General: number
  }
  availability: {
    AC: number
    Sleeper: number
    General: number
  }
  aiScore: number
  matchScore: number
}

export interface VoiceSearchResult {
  transcript: string
  confidence: number
  from?: string
  to?: string
  date?: string
  class?: string
  passengers?: number
}

export interface AIAnalytics {
  searchPatterns: {
    popularRoutes: Array<{
      from: string
      to: string
      count: number
    }>
    peakTimes: Array<{
      hour: number
      count: number
    }>
  }
  userPreferences: {
    preferredClass: string
    preferredTiming: string
    maxBudget: number
  }
  seasonalTrends: Array<{
    season: string
    routes: Array<{
      from: string
      to: string
      demand: number
    }>
  }>
} 