'use client'
import { useEffect, useState } from 'react'
import Header from '@/components/header'
import Sebha from '@/components/sebha'
import { SebhaProvider } from '@/contexts/SebhaProvider'
import BrowserNotSupported from '@/components/browserNotSupported'
import Footer from '@/components/footer'
import { AzkarProvider } from '@/contexts/AzkarProvider'
import Contribute from '@/components/contribute'
import DarkMode from '@/components/darkmode'

export default function Home() {
  const [hasBrowserSupport, setHasbrowserSupport] = useState(true)

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setHasbrowserSupport(false)
    }
  }, [])

  return (
    <main className="flex items-center transition-all duration-300 justify-center h-screen w-screen bg-gray-200 dark:bg-zinc-900 dark:text-gray-200 mx-auto">
      <div className="w-min whitespace-nowrap mb-20 flex flex-col gap-3 m-4">
        <AzkarProvider>
          <SebhaProvider>
            {hasBrowserSupport ? (
              <>
                <DarkMode />
                <Header />
                <Sebha />
                <Footer />
              </>
            ) : (
              <BrowserNotSupported />
            )}
          </SebhaProvider>
        </AzkarProvider>
        <Contribute />
      </div>
    </main>
  )
}
