'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ChevronDown, ChevronUp, Plus, ArrowLeft, Camera, Paperclip, Share2, Copy, QrCode, Edit3, Users, Home, FileText, BarChart2, Heart, Facebook, Twitter, Linkedin } from 'lucide-react'
import Image from 'next/image'
import styles from './CivicEngagement.module.scss'
import CreatePetition from './CreatePetition'

interface Petition {
  id: number
  title: string
  signatures: number
  goal: number
  stage: 'trending' | 'victory' | 'urgent'
  description: string
}

export function CivicEngagement() {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [expandedPetition, setExpandedPetition] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState('petitions')
  const [showAllUpdates, setShowAllUpdates] = useState(false)
  const [signatures, setSignatures] = useState<Record<number, number>>({})
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [showCreatePetition, setShowCreatePetition] = useState(false)

  const [petitions, setPetitions] = useState<Petition[]>([
    { id: 1, title: 'Improve Public Transportation in Nairobi', signatures: 15000, goal: 20000, stage: 'trending', description: 'We need better public transportation in Nairobi to reduce traffic congestion and improve air quality.' },
    { id: 2, title: 'Increase Funding for Primary Education in Rural Areas', signatures: 23000, goal: 30000, stage: 'victory', description: 'Rural schools need more funding to provide quality education and resources for students.' },
    { id: 3, title: 'Protect Nairobi National Park from Encroachment', signatures: 18000, goal: 25000, stage: 'urgent', description: 'The Nairobi National Park is under threat from urban development. We must act now to protect this vital ecosystem.' },
  ])

  const toggleLanguage = () => setCurrentLanguage(currentLanguage === 'en' ? 'sw' : 'en')
  const togglePetition = (id: number) => setExpandedPetition(expandedPetition === id ? null : id)
  const handleCreatePetition = () => setShowCreatePetition(true)
  const handleCloseCreatePetition = () => setShowCreatePetition(false)

  const addNewPetition = useCallback((newPetition: Petition) => {
    setPetitions(prevPetitions => [...prevPetitions, newPetition])
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSignatures(prev => {
        const newSignatures = { ...prev }
        petitions.forEach(petition => {
          if (!newSignatures[petition.id]) {
            newSignatures[petition.id] = petition.signatures
          }
          newSignatures[petition.id] += Math.floor(Math.random() * 5)
        })
        return newSignatures
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [petitions])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const renderPetitionDetails = (petition: Petition) => (
    <div className={styles.cardContent}>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${((signatures[petition.id] || petition.signatures) / petition.goal) * 100}%` }}
          ></div>
        </div>
        <div className={styles.progressInfo}>
          <span>{currentLanguage === 'en' ? 'Signatures:' : 'Sahihi:'} {(signatures[petition.id] || petition.signatures).toLocaleString()}</span>
          <span>{currentLanguage === 'en' ? 'Goal:' : 'Lengo:'} {petition.goal.toLocaleString()}</span>
        </div>
      </div>

      <p className={styles.petitionDescription}>{petition.description}</p>

      <div className={styles.stepsContainer}>
        <h3 className={styles.sectionTitle}>{currentLanguage === 'en' ? 'Daily Steps to Victory' : 'Hatua za Kila Siku za Ushindi'}</h3>
        <ul className={styles.stepsList}>
          {[
            { title: 'Share your petition in person', description: 'Print your petition and distribute it in your area', action: 'Choose Size' },
            { title: 'Create your custom petition link', description: 'Share this custom link to promote your petition', action: 'Create Link' },
            { title: 'Share on social communities', description: 'Share on Facebook, Twitter, WhatsApp, etc.', action: 'Share' },
          ].map((step, index) => (
            <li key={index} className={styles.step}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.stepContent}>
                <p className={styles.stepTitle}>{currentLanguage === 'en' ? step.title : `${step.title} (SW)`}</p>
                <p className={styles.stepDescription}>{currentLanguage === 'en' ? step.description : `${step.description} (SW)`}</p>
              </div>
              <button className={styles.secondaryButton}>
                {currentLanguage === 'en' ? step.action : `${step.action} (SW)`}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.shareContainer}>
        <div className={styles.shareSection}>
          <h4 className={styles.sectionTitle}>{currentLanguage === 'en' ? 'Share petition online' : 'Shiriki ombi mtandaoni'}</h4>
          <div className={styles.buttonGroup}>
            <button className={styles.secondaryButton}>
              <Copy className="w-5 h-5 mr-2" />
              {currentLanguage === 'en' ? 'Copy' : 'Nakili'}
            </button>
            <button className={styles.secondaryButton}>
              <Share2 className="w-5 h-5 mr-2" />
              {currentLanguage === 'en' ? 'Share' : 'Shiriki'}
            </button>
          </div>
        </div>
        <div className={styles.shareSection}>
          <h4 className={styles.sectionTitle}>{currentLanguage === 'en' ? 'Share petition in person' : 'Shiriki ombi ana kwa ana'}</h4>
          <div className={styles.buttonGroup}>
            <button className={styles.secondaryButton}>
              <QrCode className="w-5 h-5 mr-2" />
              {currentLanguage === 'en' ? 'QR Code' : 'Msimbo wa QR'}
            </button>
            <button className={styles.secondaryButton}>
              <Edit3 className="w-5 h-5 mr-2" />
              {currentLanguage === 'en' ? 'Print' : 'Chapisha'}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.socialShareContainer}>
        <button className={`${styles.socialButton} ${styles.facebook}`}>
          <Facebook className="w-5 h-5 mr-2" />
          Facebook
        </button>
        <button className={`${styles.socialButton} ${styles.twitter}`}>
          <Twitter className="w-5 h-5 mr-2" />
          Twitter
        </button>
        <button className={`${styles.socialButton} ${styles.linkedin}`}>
          <Linkedin className="w-5 h-5 mr-2" />
          LinkedIn
        </button>
      </div>

      <button className={`${styles.primaryButton} ${styles.signPetitionButton}`}>
        {currentLanguage === 'en' ? 'Sign Petition' : 'Tia Sahihi'}
      </button>
    </div>
  )

  const renderPetitionCard = (petition: Petition) => (
    <div key={petition.id} className={styles.petitionCard}>
      <div
        className={styles.petitionHeader}
        onClick={() => togglePetition(petition.id)}
      >
        <h3 className={styles.petitionTitle}>{petition.title}</h3>
        <div className={styles.petitionStats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{currentLanguage === 'en' ? 'Signatures' : 'Sahihi'}</span>
            <span className={styles.statValue}>{(signatures[petition.id] || petition.signatures).toLocaleString()}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{currentLanguage === 'en' ? 'Goal' : 'Lengo'}</span>
            <span className={styles.statValue}>{petition.goal.toLocaleString()}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{currentLanguage === 'en' ? 'Stage' : 'Hatua'}</span>
            <span className={`${styles.statValue} ${styles.badge} ${styles[petition.stage]}`}>
              {currentLanguage === 'en' ? petition.stage.charAt(0).toUpperCase() + petition.stage.slice(1) : `${petition.stage} (SW)`}
            </span>
          </div>
        </div>
        {expandedPetition === petition.id ? <ChevronUp className={styles.chevronIcon} /> :
        <ChevronDown className={styles.chevronIcon} />}
      </div>
      {expandedPetition === petition.id && renderPetitionDetails(petition)}
    </div>
  )

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
        <button className={styles.backButton} aria-label="Go back" onClick={() => window.location.href = '/'}>
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className={styles.pageTitle}>
            {currentLanguage === 'en' ? 'Civic Engagement' : 'Ushiriki wa Kiraia'}
          </h1>
        </div>
        <button
          onClick={toggleLanguage}
          className={styles.languageToggle}
        >
          {currentLanguage === 'en' ? 'SW' : 'EN'}
        </button>
      </header>

      <div className={styles.tabContainer}>
        <button
          className={`${styles.tab} ${activeTab === 'report' ? styles.active : ''}`}
          onClick={() => setActiveTab('report')}
        >
          {currentLanguage === 'en' ? 'Report Issue' : 'Ripoti Suala'}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'petitions' ? styles.active : ''}`}
          onClick={() => setActiveTab('petitions')}
        >
          {currentLanguage === 'en' ? 'Petitions' : 'Maombi'}
        </button>
      </div>

      <main className={styles.main}>
        {activeTab === 'report' ? (
          <form className={styles.reportForm}>
            <div className={styles.formGroup}>
              <label htmlFor="category" className={styles.label}>
                {currentLanguage === 'en' ? 'Category' : 'Kategoria'}
              </label>
              <select
                id="category"
                className={styles.select}
              >
                <option>{currentLanguage === 'en' ? 'Corruption' : 'Ufisadi'}</option>
                <option>{currentLanguage === 'en' ? 'Human Rights Violation' : 'Ukiukaji wa Haki za Binadamu'}</option>
                <option>{currentLanguage === 'en' ? 'Public Service Issue' : 'Suala la Huduma ya Umma'}</option>
                <option value="discrimination">{currentLanguage === 'en' ? 'Discrimination' : 'Ubaguzi'}</option>
                <option value="freedom_of_speech">{currentLanguage === 'en' ? 'Freedom of Speech' : 'Uhuru wa Kujieleza'}</option>
                <option value="police_brutality">{currentLanguage === 'en' ? 'Police Brutality' : 'Ukatili wa Polisi'}</option>
                <option value="other">{currentLanguage === 'en' ? 'Other' : 'Nyingine'}</option>
              </select>

            </div>
            <div className={styles.formGroup}>
              <label htmlFor="location" className={styles.label}>
              {currentLanguage === 'en' ? 'Location' : 'Mahali'}
              </label>
              <select id="location" className={styles.select}>
              <option value="">{currentLanguage === 'en' ? 'Select a location' : 'Chagua mahali'}</option>
              {[
                'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Kitale', 'Malindi', 'Garissa', 'Kakamega', 
                'Kericho', 'Nyeri', 'Machakos', 'Meru', 'Embu', 'Isiolo', 'Lamu', 'Mandera', 'Marsabit', 'Migori', 
                'Murang\'a', 'Nandi', 'Narok', 'Nyamira', 'Samburu', 'Siaya', 'Taita Taveta', 'Tana River', 'Trans Nzoia', 
                'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'
              ].map((county) => (
                <option key={county} value={county}>{county}</option>
              ))}
              </select>
            </div>
 
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                {currentLanguage === 'en' ? 'Description' : 'Maelezo'}
              </label>
              <textarea
                id="description"
                rows={4}
                className={styles.textarea}
                placeholder={currentLanguage === 'en' ? 'Describe the issue...' : 'Eleza suala...'}
              ></textarea>
            </div>
            <div className={styles.formActions}>
              <label className={styles.fileInputLabel}>
                <Camera className="w-5 h-5 mr-2" />
                {currentLanguage === 'en' ? 'Add Photo' : 'Ongeza Picha'}
                <input
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            {imagePreview && (
              <div className={styles.imagePreview}>
                <Image src={imagePreview} alt="Preview" width={200} height={200} />
              </div>
            )}
            <button
              type="submit"
              className={styles.submitButton}
            >
              {currentLanguage === 'en' ? 'Submit Report' : 'Wasilisha Ripoti'}
            </button>
          </form>
        ) : (
          <div className={styles.petitionsList}>
            {petitions.map(renderPetitionCard)}
          </div>
        )}
      </main>

      {activeTab === 'petitions' && (
        <button className={styles.createPetitionButton} onClick={handleCreatePetition}>
          <Plus className="h-6 w-6" />
        </button>
      )}

      {showCreatePetition && (
        <CreatePetition currentLanguage={currentLanguage} onClose={handleCloseCreatePetition} />
      )}
    </div>
  )
}