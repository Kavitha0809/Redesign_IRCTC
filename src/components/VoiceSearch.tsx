import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/outline'

interface VoiceSearchProps {
  onResult: (text: string) => void
  onError: (error: string) => void
}

const VoiceSearch = ({ onResult, onError }: VoiceSearchProps) => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')

  useEffect(() => {
    let recognition: any = null

    if ('webkitSpeechRecognition' in window) {
      recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = true

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('')
        
        setTranscript(transcript)
        if (event.results[0].isFinal) {
          onResult(transcript)
          setIsListening(false)
        }
      }

      recognition.onerror = (event: any) => {
        onError('Error occurred in recognition: ' + event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }
    }

    return () => {
      if (recognition) recognition.abort()
    }
  }, [onResult, onError])

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      onError('Voice recognition is not supported in your browser')
      return
    }

    if (isListening) {
      (window as any).recognition?.abort()
    } else {
      (window as any).recognition?.start()
    }
  }

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={toggleListening}
        className={`flex items-center justify-center p-2 rounded-full ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-primary-500 hover:bg-primary-600'
        } text-white transition-colors`}
        whileTap={{ scale: 0.95 }}
        animate={isListening ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: isListening ? Infinity : 0, duration: 1 }}
      >
        {isListening ? (
          <StopIcon className="h-5 w-5" />
        ) : (
          <MicrophoneIcon className="h-5 w-5" />
        )}
      </motion.button>
      
      {isListening && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-sm text-gray-600 dark:text-gray-300 min-w-[200px]"
        >
          {transcript || 'Listening...'}
        </motion.div>
      )}
    </div>
  )
}

export default VoiceSearch 