'use client';

import React, { useState } from 'react'
import { ArrowLeft, BarChart2, PieChart, TrendingUp, Info } from 'lucide-react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import styles from './TransparencyTracker.module.scss'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

export default function TransparencyTracker() {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [activeTab, setActiveTab] = useState('spending')

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'sw' : 'en')
  }

  const spendingData = {
    labels: ['Education', 'Healthcare', 'Infrastructure', 'Agriculture', 'Security'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
      }
    ]
  }

  const projectProgressData = {
    labels: ['Road Construction', 'School Building', 'Water Supply', 'Electrification', 'Healthcare Facility', 'Fertilizer'],
    datasets: [
      {
        label: 'Completion Percentage',
        data: [75, 40, 60, 40, 85, 59],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      }
    ]
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <button className={styles.backButton} aria-label="Go back" onClick={() => window.location.href = '/'}>
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold font-ubuntu">
            {currentLanguage === 'en' ? 'Transparency Tracker' : 'Kifuatiliaji cha Uwazi'}
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
          className={`${styles.tab} ${activeTab === 'spending' ? styles.active : ''}`}
          onClick={() => setActiveTab('spending')}
        >
          <div className="flex items-center justify-center relative">
        <PieChart className="w-5 h-5 mr-2 absolute left-0" />
        {currentLanguage === 'en' ? 'Public Spending' : 'Matumizi ya Umma'}
          </div>
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'projects' ? styles.active : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <div className="flex items-center justify-center relative">
        <BarChart2 className="w-5 h-5 mr-2 absolute left-0" />
        {currentLanguage === 'en' ? 'Project Progress' : 'Maendeleo ya Miradi'}
          </div>
        </button>
      </div>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <h2 className={styles.sectionTitle}>
              {activeTab === 'spending' 
                ? (currentLanguage === 'en' ? 'Public Spending Monitor' : 'Kifuatiliaji cha Matumizi ya Umma')
                : (currentLanguage === 'en' ? 'Project Progress Tracker' : 'Kifuatiliaji cha Maendeleo ya Miradi')
              }
            </h2>
            <div className={styles.chartContainer}>
              {activeTab === 'spending' ? (
                <Pie 
                  data={spendingData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((Number(value) / Number(total)) * 100).toFixed(2);
                            return `${label}: ${percentage}% (${value}B KSh)`;
                          }
                        }
                      }
                    }
                  }}
                />
              ) : (
                <Bar
                  data={projectProgressData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                          display: true,
                          text: currentLanguage === 'en' ? 'Completion Percentage' : 'Asilimia ya Ukamilishaji'
                        }
                      }
                    }
                  }}
                />
              )}
            </div>
            <div className={styles.infoSection}>
              <div className={styles.infoHeader}>
                <h3 className={styles.totalInfo}>
                  {activeTab === 'spending'
                    ? (currentLanguage === 'en' ? 'Total Budget' : 'Bajeti Jumla')
                    : (currentLanguage === 'en' ? 'Total Projects' : 'Jumla ya Miradi')
                  }: 
                  {activeTab === 'spending' ? ' KSh 1,500,000,000,000' : ' 5'}
                </h3>
                <div className={styles.lastUpdated}>
                  <Info className="w-4 h-4 mr-1" />
                  {currentLanguage === 'en'
                    ? 'Last updated: June 1, 2023'
                    : 'Imesasishwa mwisho: Juni 1, 2023'}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.insights}>
            <h4 className={styles.insightsTitle}>
              {currentLanguage === 'en' ? 'Key Insights' : 'Maoni Muhimu'}:
            </h4>
            <ul className={styles.insightsList}>
              <li>{currentLanguage === 'en' ? 'Education receives the largest share of the budget' : 'Elimu inapokea sehemu kubwa ya bajeti'}</li>
              <li>{currentLanguage === 'en' ? 'School building projects are progressing well' : 'Miradi ya ujenzi wa shule inaendelea vizuri'}</li>
              <li>{currentLanguage === 'en' ? 'Infrastructure spending has increased by 15% from last year' : 'Matumizi ya miundombinu yameongezeka kwa 15% kutoka mwaka jana'}</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}