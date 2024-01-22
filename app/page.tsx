'use client'
import { useEffect, useState } from 'react'
import Header from '@/components/header'
import Sebha from '@/components/sebha'
import { SebhaProvider } from '@/contexts/SebhaProvider'
import BrowserNotSupported from '@/components/browserNotSupported'
import Footer from '@/components/footer'
import { AzkarProvider } from '@/contexts/AzkarProvider'

export default function Home() {
  const [hasBrowserSupport, setHasbrowserSupport] = useState(false)

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      setHasbrowserSupport(true)
    }
  }, [])

  return (
    <main className="flex items-center justify-center h-screen w-screen bg-gray-200 mx-auto">
      <div className="w-min whitespace-nowrap mb-20 flex flex-col gap-3">
        <AzkarProvider>
          <SebhaProvider>
            {hasBrowserSupport ? (
              <>
                <Header />
                <Sebha />
                <Footer />
              </>
            ) : (
              <BrowserNotSupported />
            )}
          </SebhaProvider>
        </AzkarProvider>
      </div>
    </main>
  )
}
