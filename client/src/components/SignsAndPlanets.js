import React, { useEffect, useState } from 'react'

const signs = [
  { id: 1, english: 'Aries', marathi: 'मेष' },
  { id: 2, english: 'Taurus', marathi: 'वृषभ' },
  { id: 3, english: 'Gemini', marathi: 'मिथुन' },
  { id: 4, english: 'Cancer', marathi: 'कर्क' },
  { id: 5, english: 'Leo', marathi: 'सिंह' },
  { id: 6, english: 'Virgo', marathi: 'कन्या' },
  { id: 7, english: 'Libra', marathi: 'तुला' },
  { id: 8, english: 'Scorpio', marathi: 'वृश्चिक' },
  { id: 9, english: 'Sagittarius', marathi: 'धनु' },
  { id: 10, english: 'Capricorn', marathi: 'मकर' },
  { id: 11, english: 'Aquarius', marathi: 'कुंभ' },
  { id: 12, english: 'Pisces', marathi: 'मीन' }
]

const planets = [
  { english: 'Sun', marathi: 'सूर्य' },
  { english: 'Moon', marathi: 'चंद्र' },
  { english: 'Mercury', marathi: 'बुध' },
  { english: 'Venus', marathi: 'शुक्र' },
  { english: 'Mars', marathi: 'मंगल' },
  { english: 'Jupiter', marathi: 'गुरु' },
  { english: 'Saturn', marathi: 'शनि' },
  { english: 'Rahu', marathi: 'राहु' },
  { english: 'Ketu', marathi: 'केतू' }
]

const SignsAndPlanets = () => {
  const [activeTab, setActiveTab] = useState('signs')
  const [viewportWidth, setViewportWidth] = useState(() => (
    typeof window !== 'undefined' ? window.innerWidth : 1280
  ))

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = viewportWidth <= 768
  const isSmallMobile = viewportWidth <= 480
  const gridColumns = isSmallMobile ? 'repeat(2, minmax(0, 1fr))' : isMobile ? 'repeat(3, minmax(0, 1fr))' : 'repeat(6, minmax(0, 1fr))'

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f1f1f2',
      padding: isMobile ? '16px 12px' : '25px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          boxShadow: '0 5px 30px rgba(0,0,0,0.08)',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            gap: '10px',
            padding: isMobile ? '16px' : '20px',
            borderBottom: '2px solid #f0f0f0',
            flexWrap: 'wrap'
          }}>
            {[
              { key: 'signs', label: 'Zodiac Signs', color: '#667eea' },
              { key: 'planets', label: 'Planets', color: '#ff9800' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: isMobile ? '3px 3px' : '12px 24px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontSize: isMobile ? '14px' : '15px',
                  fontWeight: activeTab === tab.key ? '700' : '500',
                  color: activeTab === tab.key ? tab.color : '#999',
                  borderBottom: activeTab === tab.key ? `3px solid ${tab.color}` : 'none',
                  transition: 'all 0.3s ease',
                  paddingBottom: '10px'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = tab.color
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab.key) e.target.style.color = '#999'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding: isMobile ? '18px 14px' : '30px' }}>
            {activeTab === 'signs' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: gridColumns,
                gap: isMobile ? '12px' : '15px'
              }}>
                {signs.map((sign) => (
                  <div
                    key={sign.id}
                    style={{
                      padding: isMobile ? '8px 6px' : '12px',
                      border: '2px solid #667eea',
                      borderRadius: '12px',
                      backgroundColor: '#f0f0ff',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      minHeight: isMobile ? '90px' : '70px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#e8e8ff'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#f0f0ff'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div style={{
                      fontSize: isMobile ? '14px' : '15px',
                      fontWeight: '600',
                      color: '#333',
                      wordBreak: 'break-word',
                      lineHeight: '1.2'
                    }}>
                      <div style={{ color: '#667eea', fontWeight: '700', marginBottom: '2px' }}>{sign.id}</div>
                      <div>{sign.english}</div>
                      <div style={{ color: '#667eea', fontWeight: '500', marginTop: '2px' }}>({sign.marathi})</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'planets' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: gridColumns,
                gap: isMobile ? '12px' : '15px'
              }}>
                {planets.map((planet) => (
                  <div
                    key={planet.english}
                    style={{
                      padding: isMobile ? '8px 6px' : '12px',
                      border: '2px solid #ff9800',
                      borderRadius: '12px',
                      backgroundColor: '#fff8f0',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      minHeight: isMobile ? '80px' : '70px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#fff3e0'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(255, 152, 0, 0.3)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#fff8f0'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div style={{
                      fontSize: isMobile ? '14px' : '15px',
                      fontWeight: '600',
                      color: '#333',
                      wordBreak: 'break-word',
                      lineHeight: '1.2'
                    }}>
                      <div>{planet.english}</div>
                      <div style={{ color: '#ff9800', fontWeight: '500', marginTop: '2px' }}>({planet.marathi})</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignsAndPlanets
