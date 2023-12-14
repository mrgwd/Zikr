'use client'
import { useContext } from 'react'
import Header from './components/header'
import Sebha from './components/sebha'
import { SebhaProvider } from './contexts/SebhaProvider'
import { SebhaContext } from './contexts/SebhaProvider'
import BrowserNotSupported from './components/browserNotSupported'
import Footer from './components/footer'

export default function Home() {
  const { hasBrowserSupport } = useContext(SebhaContext)

  return (
    <main className="flex items-center justify-center h-screen w-screen bg-gray-200 mx-auto">
      <div className="w-min whitespace-nowrap mb-20 flex flex-col gap-3">
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
      </div>
    </main>
  )
}
