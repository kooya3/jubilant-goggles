'use client';

import React, { useState } from 'react'
import RecentReports from './components/RecentReports'; 
import AppLayout from './components/AppLayout';
import { PetitionProvider } from './ PetitionContext';
// Import other components as needed

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState('en')

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'sw' : 'en')
  }

  return (
    <div className="container mx-auto px-4">
      <main>
      <PetitionProvider>
        <AppLayout />
        </PetitionProvider>
      </main>
    </div>
  )
}