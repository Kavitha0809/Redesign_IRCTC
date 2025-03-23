# IRCTC Redesign 🚂

A modern, user-friendly train booking application built with Next.js 13, Tailwind CSS, and TypeScript. This project reimagines the IRCTC booking experience with a clean UI, smooth animations, and real-time tracking features.

## Features

### Core Features
- **Train Booking System**
  - Intuitive search interface
  - Real-time search results
  - Interactive booking process
  - Smart fare calculation
  - Seat selection

- **Live Train Tracking**
  - Real-time train location
  - Interactive map interface
  - Journey timeline visualization
  - Station-wise delay information
  - Platform updates
  - Weather conditions along route

- **Smart Recommendations**
  - AI-powered route suggestions
  - Popular destinations
  - Seasonal event specials
  - Price predictions
  - Trending routes

### User Experience
- **Modern Authentication**
  - Email & Password authentication
  - Secure session management
  - Responsive login/signup forms
  - Remember me functionality

- **Interactive UI Elements**
  - Train animation on landing page
  - Smooth transitions and effects
  - Loading states and feedback
  - Error handling
  - Toast notifications

- **Responsive Design**
  - Mobile-first approach
  - Tailwind CSS styling
  - Dark mode support
  - Accessible components

### Additional Features
- **PNR Status Tracking**
  - Quick PNR lookup
  - Detailed booking status
  - Journey information
  - Coach position

- **Journey Planning**
  - Multiple search options
  - Fare enquiry
  - Schedule checking
  - Route information

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Maps**: Leaflet.js for train tracking
- **Animations**: CSS Animations & Transitions
- **State Management**: React Hooks
- **Authentication**: Custom implementation
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   ├── auth/
│   ├── booking/
│   ├── track/
│   ├── search-results/
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── MainLayout.tsx
│   ├── tracking/
│   │   └── Map.tsx
│   ├── TrainAnimation.tsx
│   └── Icons.tsx
├── services/
│   └── AIService.ts
└── types/
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd irctc-redesign
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## Features in Detail

### Train Tracking System
- Live location tracking on map
- Real-time updates for train status
- Detailed journey timeline
- Station-wise delay information
- Platform and weather updates
- Coach position information

### Authentication System
- Secure login/signup functionality
- Form validation
- Error handling
- Session persistence
- Remember me functionality

### Smart AI Recommendations
- Popular route suggestions
- Seasonal event specials
- Price predictions
- Trending destinations
- Personalized recommendations

### Navigation
- Responsive navbar
- Dynamic route handling
- Protected routes
- Smooth transitions

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Leaflet.js for the mapping functionality
- TypeScript team for the type safety
- Vercel for the deployment platform

---

Built with ❤️ using Next.js and Tailwind CSS 