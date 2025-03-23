import { Recommendation } from '../types/ai'

interface PredictionInput {
  from?: string
  to?: string
  date?: string
  preferences?: {
    class?: 'AC' | 'Sleeper' | 'General'
    maxPrice?: number
    timePreference?: 'morning' | 'afternoon' | 'night'
  }
  historicalData?: {
    previousBookings: any[]
    frequentRoutes: string[]
    preferredClass: string[]
  }
}

interface PricePrediction {
  estimatedPrice: number
  confidence: number
  priceRange: {
    min: number
    max: number
  }
  factors: {
    name: string
    impact: number
  }[]
}

class AIService {
  private static instance: AIService
  private popularDestinations: Map<string, number>
  private seasonalEvents: Map<string, string[]>

  private constructor() {
    this.popularDestinations = new Map()
    this.seasonalEvents = new Map()
    this.initializeData()
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService()
    }
    return AIService.instance
  }

  private initializeData(): void {
    // Initialize popular destinations with weighted scores
    this.popularDestinations.set('Mumbai', 95)
    this.popularDestinations.set('Delhi', 90)
    this.popularDestinations.set('Bangalore', 85)
    this.popularDestinations.set('Kolkata', 80)
    this.popularDestinations.set('Chennai', 75)

    // Initialize seasonal events
    this.seasonalEvents.set('October', ['Diwali', 'Durga Puja'])
    this.seasonalEvents.set('December', ['Christmas', 'New Year'])
    this.seasonalEvents.set('March', ['Holi'])
  }

  public async getSmartRecommendations(input: PredictionInput): Promise<Recommendation[]> {
    const recommendations: Recommendation[] = []
    const currentDate = new Date()

    // Generate popular route recommendations
    if (this.popularDestinations.size > 0) {
      const topDestinations = Array.from(this.popularDestinations.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)

      topDestinations.forEach(([destination, score]) => {
        recommendations.push({
          type: 'popular',
          title: `Popular Route to ${destination}`,
          description: `High demand route with excellent connectivity`,
          from: input.from || 'Your Location',
          to: destination,
          date: this.formatDate(currentDate),
          price: `₹${this.generatePrice(score)}`,
          confidence: Math.round(score)
        })
      })
    }

    // Add trending recommendations based on seasonal events
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' })
    const events = this.seasonalEvents.get(currentMonth) || []
    
    if (events.length > 0) {
      events.forEach(event => {
        recommendations.push({
          type: 'holiday',
          title: `${event} Special`,
          description: `Special trains for ${event} celebration`,
          from: input.from || 'Your Location',
          to: this.getRandomDestination(),
          date: this.formatDate(currentDate),
          price: `₹${this.generatePrice(85)}`,
          confidence: 85
        })
      })
    }

    // Add personalized recommendations based on user preferences
    if (input.preferences) {
      recommendations.push({
        type: 'trending',
        title: 'Personalized Route',
        description: `Based on your ${input.preferences.class} class preference`,
        from: input.from || 'Your Location',
        to: this.getRandomDestination(),
        date: this.formatDate(currentDate),
        price: `₹${this.generatePrice(90)}`,
        confidence: 90
      })
    }

    return recommendations
  }

  public async predictPrice(input: PredictionInput): Promise<PricePrediction> {
    const basePrice = 1000
    const factors: { name: string; impact: number }[] = []
    let totalImpact = 0

    // Calculate seasonal impact
    const seasonalImpact = this.calculateSeasonalImpact()
    factors.push({ name: 'Seasonal Demand', impact: seasonalImpact })
    totalImpact += seasonalImpact

    // Calculate class impact
    if (input.preferences?.class) {
      const classImpact = this.calculateClassImpact(input.preferences.class)
      factors.push({ name: 'Class Selection', impact: classImpact })
      totalImpact += classImpact
    }

    // Calculate booking timing impact
    const timingImpact = this.calculateTimingImpact(input.date)
    factors.push({ name: 'Booking Timing', impact: timingImpact })
    totalImpact += timingImpact

    const estimatedPrice = basePrice * (1 + totalImpact / 100)
    const confidence = this.calculateConfidence(factors)

    return {
      estimatedPrice: Math.round(estimatedPrice),
      confidence,
      priceRange: {
        min: Math.round(estimatedPrice * 0.9),
        max: Math.round(estimatedPrice * 1.1)
      },
      factors
    }
  }

  private calculateSeasonalImpact(): number {
    const currentMonth = new Date().getMonth()
    // Peak seasons: October-January (festival season)
    if (currentMonth >= 9 && currentMonth <= 0) {
      return 25
    }
    // Shoulder seasons: February-March, August-September
    if ((currentMonth >= 1 && currentMonth <= 2) || (currentMonth >= 7 && currentMonth <= 8)) {
      return 15
    }
    // Low seasons: April-July
    return 5
  }

  private calculateClassImpact(classType: string): number {
    switch (classType) {
      case 'AC':
        return 30
      case 'Sleeper':
        return 15
      default:
        return 0
    }
  }

  private calculateTimingImpact(bookingDate?: string): number {
    if (!bookingDate) return 0
    
    const daysUntilTravel = Math.max(0, Math.floor((new Date(bookingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    
    if (daysUntilTravel < 7) {
      return 20 // Last minute booking premium
    } else if (daysUntilTravel < 30) {
      return 10 // Standard booking window
    }
    return 0 // Advance booking
  }

  private calculateConfidence(factors: { name: string; impact: number }[]): number {
    const totalImpact = factors.reduce((sum, factor) => sum + Math.abs(factor.impact), 0)
    return Math.min(95, Math.max(70, 100 - (totalImpact / factors.length)))
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  private generatePrice(baseScore: number): string {
    const basePrice = 1000
    return (basePrice + (baseScore * 10)).toString()
  }

  private getRandomDestination(): string {
    const destinations = Array.from(this.popularDestinations.keys())
    return destinations[Math.floor(Math.random() * destinations.length)]
  }
}

export default AIService 