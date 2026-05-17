import React, { useEffect, useState } from 'react'
import SignsAndPlanets from './SignsAndPlanets'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000'

const GenerateKundli = () => {
  const [viewportWidth, setViewportWidth] = useState(() => (
    typeof window !== 'undefined' ? window.innerWidth : 1280
  ))
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    hour: '',
    minute: '',
    place: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [chartData, setChartData] = useState(null)
  const [kundliDataResult, setKundliDataResult] = useState(null)
  const [activeTab, setActiveTab] = useState('chart')
  const [exaltationLoading, setExaltationLoading] = useState(false)
  const [aspectsLoading, setAspectsLoading] = useState(false)
  const [dashaLoading, setDashaLoading] = useState(false)
  const [dashaData, setDashaData] = useState(null)
  const [janmaksharLoading, setJanmaksharLoading] = useState(false)
  const [janmaksharData, setJanmaksharData] = useState(null)
  const [yogasLoading, setYogasLoading] = useState(false)
  const [yogasData, setYogasData] = useState(null)
  const [lastFormData, setLastFormData] = useState(null)
  const [locationData, setLocationData] = useState(null)
  const [locationSuggestions, setLocationSuggestions] = useState([])
  const [suggestionsLoading, setSuggestionsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedLocationSuggestion, setSelectedLocationSuggestion] = useState(null)
  const isMobile = viewportWidth <= 768
  const isSmallMobile = viewportWidth <= 480

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const placeQuery = formData.place.trim()

    if (placeQuery.length < 2) {
      setLocationSuggestions([])
      setShowSuggestions(false)
      setSuggestionsLoading(false)
      return
    }

    if (selectedLocationSuggestion && placeQuery === selectedLocationSuggestion.name) {
      setShowSuggestions(false)
      return
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(async () => {
      setSuggestionsLoading(true)

      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/location-suggestions?place=${encodeURIComponent(placeQuery)}`, {
          signal: controller.signal
        })

        if (!response.ok) {
          throw new Error('Failed to fetch place suggestions')
        }

        const data = await response.json()
        const suggestions = data.suggestions || []
        setLocationSuggestions(suggestions)
        setShowSuggestions(suggestions.length > 0)
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Suggestion Error:', err)
          setLocationSuggestions([])
          setShowSuggestions(false)
        }
      } finally {
        if (!controller.signal.aborted) {
          setSuggestionsLoading(false)
        }
      }
    }, 350)

    return () => {
      controller.abort()
      clearTimeout(timeoutId)
    }
  }, [formData.place, selectedLocationSuggestion])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    if (name === 'place') {
      setSelectedLocationSuggestion(null)
      setLocationData(null)
    }
  }

  const handleSuggestionSelect = (suggestion) => {
    setFormData((prev) => ({
      ...prev,
      place: suggestion.name
    }))
    setSelectedLocationSuggestion(suggestion)
    setLocationSuggestions([])
    setShowSuggestions(false)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setChartData(null)
    setKundliDataResult(null)
    setDashaData(null)
    setJanmaksharData(null)
    setYogasData(null)
    setActiveTab('chart')

    try {
      let resolvedLocation = selectedLocationSuggestion

      if (!resolvedLocation) {
        const locationResponse = await fetch(`${API_BASE_URL}/api/v1/location`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            place: formData.place
          })
        })

        if (!locationResponse.ok) {
          throw new Error('Failed to fetch location')
        }

        resolvedLocation = await locationResponse.json()
      }

      // console.log('Location Data:', locationData)

      // Parse date to get day, month, year
      const [year, month, day] = formData.date.split('-')

      // Second API call to generate kundli
      const kundliResponse = await fetch(`${API_BASE_URL}/api/v1/generate-kundli`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          day: parseInt(day),
          month: parseInt(month),
          year: parseInt(year),
          hour: parseInt(formData.hour),
          min: parseInt(formData.minute),
          lat: resolvedLocation.lat,
          lon: resolvedLocation.lon
        })
      })




      if (!kundliResponse.ok) {
        throw new Error('Failed to generate Kundli')
      }

      const kundliData = await kundliResponse.json()
      // console.log('Kundli Data:', kundliData)

      if (kundliData.success) {
        setChartData(kundliData)
      } else {
        throw new Error('Failed to generate birth chart')
      }

      // Store form data and location for later use
      setLastFormData({
        day: parseInt(day),
        month: parseInt(month),
        year: parseInt(year),
        hour: parseInt(formData.hour),
        minute: parseInt(formData.minute)
      })
      setLocationData(resolvedLocation)

    } catch (err) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleExaltationTab = async () => {
    // console.log("tab clikced");

    if (activeTab === 'exaltation') return
    // console.log("here");

    setActiveTab('exaltation')

    // console.log("kundliDataResult",kundliDataResult);


    if (kundliDataResult) return // Already loaded

    if (!lastFormData || !locationData) {
      setError('Please generate Kundli first')
      return
    }
    // console.log("tr");


    setExaltationLoading(true)
    try {
      const kundliDataResponse = await fetch(`${API_BASE_URL}/api/v1/kundli-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          day: lastFormData.day,
          month: lastFormData.month,
          year: lastFormData.year,
          hour: lastFormData.hour,
          min: lastFormData.minute,
          lat: locationData.lat,
          lon: locationData.lon
        })
      })

      if (!kundliDataResponse.ok) {
        throw new Error('Failed to fetch exaltation and debilitation data')
      }

      const kundliDataResult = await kundliDataResponse.json()
      // console.log('Kundli Data Result:', kundliDataResult)
      setKundliDataResult(kundliDataResult)
    } catch (err) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setExaltationLoading(false)
    }
  }

  const handleAspectsTab = async () => {
    if (activeTab === 'aspects') return

    setActiveTab('aspects')

    if (kundliDataResult && kundliDataResult.data.aspects) return // Already loaded

    if (!lastFormData || !locationData) {
      setError('Please generate Kundli first')
      return
    }

    setAspectsLoading(true)
    try {
      const kundliDataResponse = await fetch(`${API_BASE_URL}/api/v1/kundli-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          day: lastFormData.day,
          month: lastFormData.month,
          year: lastFormData.year,
          hour: lastFormData.hour,
          min: lastFormData.minute,
          lat: locationData.lat,
          lon: locationData.lon
        })
      })

      if (!kundliDataResponse.ok) {
        throw new Error('Failed to fetch aspects data')
      }

      const kundliDataResult = await kundliDataResponse.json()
      // console.log('Kundli Data Result:', kundliDataResult)
      setKundliDataResult(kundliDataResult)
    } catch (err) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setAspectsLoading(false)
    }
  }

  const handleDashaTab = async () => {
    if (activeTab === 'dasha') return

    setActiveTab('dasha')

    if (dashaData) return // Already loaded

    if (!lastFormData || !locationData) {
      setError('Please generate Kundli first')
      return
    }

    setDashaLoading(true)
    try {
      const dashaResponse = await fetch(`${API_BASE_URL}/api/v1/dasha-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          day: lastFormData.day,
          month: lastFormData.month,
          year: lastFormData.year,
          hour: lastFormData.hour,
          min: lastFormData.minute,
          lat: locationData.lat,
          lon: locationData.lon
        })
      })

      if (!dashaResponse.ok) {
        throw new Error('Failed to fetch dasha data')
      }

      const dashaResult = await dashaResponse.json()
      // console.log('Dasha Data Result:', dashaResult)
      setDashaData(dashaResult)
    } catch (err) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setDashaLoading(false)
    }
  }

  const handleJanmaksharTab = async () => {
    if (activeTab === 'janmakshar') return

    setActiveTab('janmakshar')

    if (janmaksharData) return // Already loaded

    if (!lastFormData || !locationData) {
      setError('Please generate Kundli first')
      return
    }

    setJanmaksharLoading(true)
    try {
      const janmaksharResponse = await fetch(`${API_BASE_URL}/api/v1/birth-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          day: lastFormData.day,
          month: lastFormData.month,
          year: lastFormData.year,
          hour: lastFormData.hour,
          min: lastFormData.minute,
          lat: locationData.lat,
          lon: locationData.lon
        })
      })

      if (!janmaksharResponse.ok) {
        throw new Error('Failed to fetch janmakshar data')
      }

      const janmaksharResult = await janmaksharResponse.json()
      // console.log('Janmakshar Data Result:', janmaksharResult)
      setJanmaksharData(janmaksharResult)
    } catch (err) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setJanmaksharLoading(false)
    }
  }

  const handleYogasTab = async () => {
    if (activeTab === 'yogas') return

    setActiveTab('yogas')

    if (yogasData) return // Already loaded

    if (!lastFormData || !locationData) {
      setError('Please generate Kundli first')
      return
    }

    setYogasLoading(true)
    try {
      const yogasResponse = await fetch(`${API_BASE_URL}/api/v1/kundli-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          day: lastFormData.day,
          month: lastFormData.month,
          year: lastFormData.year,
          hour: lastFormData.hour,
          min: lastFormData.minute,
          lat: locationData.lat,
          lon: locationData.lon
        })
      })

      if (!yogasResponse.ok) {
        throw new Error('Failed to fetch yogas data')
      }

      const yogasResult = await yogasResponse.json()
      // console.log('Yogas Data Result:', yogasResult)
      setYogasData(yogasResult)
    } catch (err) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setYogasLoading(false)
    }
  }

  const handleChartDownload = () => {
    if (!chartData?.svgRaw) {
      setError('No birth chart available to download')
      return
    }

    const svgBlob = new Blob([chartData.svgRaw], {
      type: 'image/svg+xml;charset=utf-8'
    })
    const downloadUrl = URL.createObjectURL(svgBlob)
    const link = document.createElement('a')
    const safeName = (formData.name || 'kundli').trim().replace(/[^a-z0-9]+/gi, '_')

    link.href = downloadUrl
    link.download = `${safeName || 'kundli'}_chart.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(downloadUrl)
  }

  /**
   * Download Kundli as PDF with all data
   */
  const handleDownloadPDF = async () => {
    try {
      const element = document.getElementById('kundli-download-content')
      if (!element) {
        alert('No data to download. Please generate a Kundli first.')
        return
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      })

      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      const pdf = new jsPDF('p', 'mm', 'a4')
      let position = 0

      // Add title page
      pdf.setFontSize(24)
      pdf.text('✨ Kundli Report', 15, 20)
      pdf.setFontSize(12)
      pdf.text(`Name: ${formData.name || 'N/A'}`, 15, 35)
      pdf.text(`Date: ${formData.date} | Time: ${formData.hour}:${formData.minute}`, 15, 45)
      pdf.text(`Place: ${formData.place || 'N/A'}`, 15, 55)
      pdf.addPage()

      // Add content pages
      const imgData = canvas.toDataURL('image/png')
      position = 0

      while (heightLeft >= 0) {
        const heightDraw = Math.min(pageHeight, heightLeft)
        pdf.addImage(
          imgData,
          'PNG',
          0,
          position,
          imgWidth,
          (heightDraw * imgWidth) / canvas.width
        )
        heightLeft -= pageHeight
        position -= pageHeight
        if (heightLeft > 0) {
          pdf.addPage()
        }
      }

      // Download PDF
      pdf.save(`Kundli_${formData.name || 'Report'}_${formData.date}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  const aspectStrengthConfigs = [
    {
      key: 'complete',
      label: '100%',
      planetKey: 'complete_aspected_planets',
      houseKey: 'complete_aspected_houses',
      badgeColor: '#ff1744'
    },
    {
      key: 'third',
      label: '75%',
      planetKey: 'third_aspected_planets',
      houseKey: 'third_aspected_houses',
      badgeColor: '#f50057'
    },
    {
      key: 'second',
      label: '50%',
      planetKey: 'second_aspected_planets',
      houseKey: 'second_aspected_houses',
      badgeColor: '#ff6090'
    },
    {
      key: 'first',
      label: '25%',
      planetKey: 'first_aspected_planets',
      houseKey: 'first_aspected_houses',
      badgeColor: '#ff80ab'
    }
  ]

  const renderAspectContent = (planets = [], houses = []) => {
    if (planets.length === 0 && houses.length === 0) {
      return <span style={{ color: '#ccc' }}>-</span>
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {planets.length > 0 && (
          <span style={{
            backgroundColor: '#e3f2fd',
            color: '#1565c0',
            padding: '6px 8px',
            borderRadius: '14px',
            fontSize: '11px',
            fontWeight: '600',
            display: 'inline-block'
          }}>
            {planets.join(', ')}
          </span>
        )}
        {houses.length > 0 && (
          <span style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '6px 8px',
            borderRadius: '14px',
            fontSize: '11px',
            fontWeight: '600',
            display: 'inline-block'
          }}>
            {houses.map((h) => `H${h}`).join(', ')}
          </span>
        )}
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f9ff',
      padding: isMobile ? '20px 12px' : '40px 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header */}
        {/* <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            color: '#667eea',
            fontSize: '48px',
            margin: '0 0 10px 0',
            fontWeight: '700'
          }}>
            ✨ Kundli Generator
          </h1>
          <p style={{ 
            color: '#666',
            fontSize: '16px',
            margin: 0
          }}>
            Discover your astrological profile with precision
          </p>
        </div> */}

        {/* Main Container - Side by Side Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '20px' : '30px',
          alignItems: 'start'
        }}>
          {/* Form Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: isMobile ? '22px 16px' : '40px',
            boxShadow: '0 5px 30px rgba(0,0,0,0.08)',
            height: 'fit-content',
            position: isMobile ? 'static' : 'sticky',
            top: isMobile ? 'auto' : '20px'
          }}>
            <h2 style={{
              color: '#667eea',
              fontSize: isMobile ? '22px' : '28px',
              marginTop: 0,
              marginBottom: '30px',
              fontWeight: '600'
            }}>
              Birth Information
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#333',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  👤 Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '10px',
                    fontSize: '15px',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease',
                    ':focus': { borderColor: '#667eea' }
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              {/* Date Input */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#333',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  📅 Date of Birth
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '10px',
                    fontSize: '15px',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              {/* Time Inputs */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#333',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  🕐 Time of Birth
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isSmallMobile ? '1fr' : '1fr 1fr',
                  gap: '15px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '6px',
                      color: '#666',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>
                      Hour (0-23)
                    </label>
                    <input
                      type="number"
                      id="hour"
                      name="hour"
                      min="0"
                      max="23"
                      value={formData.hour}
                      onChange={handleChange}
                      placeholder="00"
                      required
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '10px',
                        fontSize: '15px',
                        boxSizing: 'border-box',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '6px',
                      color: '#666',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>
                      Minute (0-59)
                    </label>
                    <input
                      type="number"
                      id="minute"
                      name="minute"
                      min="0"
                      max="59"
                      value={formData.minute}
                      onChange={handleChange}
                      placeholder="00"
                      required
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '10px',
                        fontSize: '15px',
                        boxSizing: 'border-box',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                  </div>
                </div>
              </div>

              {/* Place Input */}
              <div style={{ marginBottom: '24px', position: 'relative' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#333',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  📍 Place of Birth
                </label>
                <input
                  type="text"
                  id="place"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  placeholder="Enter city/town name"
                  required
                  autoComplete="off"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '10px',
                    fontSize: '15px',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e0e0e0'
                    setTimeout(() => setShowSuggestions(false), 150)
                  }}
                  onClick={() => {
                    if (locationSuggestions.length > 0) {
                      setShowSuggestions(true)
                    }
                  }}
                />
                {suggestionsLoading && (
                  <div style={{
                    marginTop: '8px',
                    color: '#667eea',
                    fontSize: '13px'
                  }}>
                    Searching places...
                  </div>
                )}
                {showSuggestions && locationSuggestions.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    marginTop: '8px',
                    backgroundColor: '#fff',
                    border: '1px solid #e6e9f5',
                    borderRadius: '12px',
                    boxShadow: '0 12px 28px rgba(31, 45, 61, 0.12)',
                    maxHeight: '240px',
                    overflowY: 'auto',
                    zIndex: 10
                  }}>
                    {locationSuggestions.map((suggestion, index) => (
                      <button
                        key={`${suggestion.name}-${index}`}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSuggestionSelect(suggestion)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '12px 14px',
                          border: 'none',
                          borderBottom: index === locationSuggestions.length - 1 ? 'none' : '1px solid #f1f3f9',
                          backgroundColor: '#fff',
                          cursor: 'pointer',
                          color: '#333',
                          fontSize: '14px',
                          lineHeight: '1.4'
                        }}
                      >
                        {suggestion.name}
                      </button>
                    ))}
                  </div>
                )}
                <div style={{
                  marginTop: '8px',
                  color: selectedLocationSuggestion ? '#2e7d32' : '#666',
                  fontSize: '12px'
                }}>
                  {selectedLocationSuggestion
                    ? 'Selected recommended place for accurate coordinates.'
                    : 'Start typing and choose one of the recommended places.'}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div style={{
                  marginBottom: '24px',
                  padding: '16px 20px',
                  backgroundColor: '#ffebee',
                  border: '2px solid #f44336',
                  borderRadius: '10px',
                  color: '#c62828',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '20px' }}>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  background: loading
                    ? 'linear-gradient(135deg, #ccc 0%, #aaa 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: loading ? 'none' : '0 10px 25px rgba(102, 126, 234, 0.4)',
                  transform: loading ? 'scale(1)' : 'scale(1)',
                  opacity: loading ? 0.8 : 1
                }}
                onMouseOver={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
                onMouseOut={(e) => !loading && (e.target.style.transform = 'scale(1)')}
              >
                {loading ? '⏳ Generating Kundli...' : '✨ Generate Kundli'}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div>
            {!chartData ? (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: isMobile ? '36px 18px' : '60px 40px',
                boxShadow: '0 5px 30px rgba(0,0,0,0.08)',
                textAlign: 'center'
              }}>
                <p style={{ color: '#999', fontSize: '18px', margin: 0 }}>
                  📊 Fill the form and generate your Kundli to see results here
                </p>
              </div>
            ) : (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: isMobile ? '22px 16px' : '40px',
                boxShadow: '0 5px 30px rgba(0,0,0,0.08)',
                overflow: 'hidden'
              }}>
                {/* Modern Tab Navigation */}
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  marginBottom: '30px',
                  borderBottom: '2px solid #f0f0f0',
                  flexWrap: 'wrap',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  justifyContent: 'space-between',
                  flexDirection: isMobile ? 'column' : 'row'
                }}>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', width: '100%' }}>
                    {[
                      { key: 'chart', label: '📊 Chart', color: '#2196F3' },
                      { key: 'exaltation', label: '⭐ Planets', color: '#4CAF50', loading: exaltationLoading },
                      { key: 'aspects', label: '🔗 Aspects', color: '#e91e63', loading: aspectsLoading },
                      { key: 'dasha', label: '⏰ Dasha', color: '#ff9800', loading: dashaLoading },
                      { key: 'yogas', label: '✨ Yogas', color: '#673AB7', loading: yogasLoading },
                      { key: 'janmakshar', label: 'Details', color: '#9c27b0', loading: janmaksharLoading }
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => {
                          if (tab.key === 'exaltation') handleExaltationTab()
                          else if (tab.key === 'aspects') handleAspectsTab()
                          else if (tab.key === 'dasha') handleDashaTab()
                          else if (tab.key === 'yogas') handleYogasTab()
                          else if (tab.key === 'janmakshar') handleJanmaksharTab()
                          else setActiveTab('chart')
                        }}
                        disabled={tab.loading}
                        style={{
                          padding: '12px 18px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          cursor: tab.loading ? 'not-allowed' : 'pointer',
                          fontSize: '14px',
                          fontWeight: activeTab === tab.key ? '700' : '500',
                          color: activeTab === tab.key ? tab.color : '#999',
                          borderBottom: activeTab === tab.key ? `3px solid ${tab.color}` : 'none',
                          transition: 'all 0.3s ease',
                          opacity: tab.loading ? 0.6 : 1,
                          paddingBottom: '10px'
                        }}
                        onMouseOver={(e) => !tab.loading && (e.target.style.color = tab.color)}
                        onMouseOut={(e) => activeTab !== tab.key && (e.target.style.color = '#999')}
                      >
                        {tab.loading ? '⏳' : tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Download PDF Button */}
                  {/* {chartData && (
                    <button
                      onClick={handleDownloadPDF}
                      style={{
                        padding: '12px 24px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)'
                        e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)'
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)'
                      }}
                    >
                      📥 Download PDF
                    </button>
                  )} */}
                </div>

                {/* Chart Tab */}
                <div id="kundli-download-content" style={{ minHeight: '400px' }}>
                  {activeTab === 'chart' && (
                    <div style={{ textAlign: 'center' }}>
                      <h3 style={{ color: '#333', marginBottom: '20px' }}>📊 Your Birth Chart</h3>
                      <div style={{
                        display: 'inline-block',
                        border: '2px solid #e0e0e0',
                        borderRadius: '15px',
                        padding: isMobile ? '10px' : '15px',
                        backgroundColor: '#fafafa',
                        marginBottom: '20px',
                        maxWidth: '100%',
                        overflowX: 'auto'
                      }}>
                        <div dangerouslySetInnerHTML={{ __html: chartData.svgRaw }} />
                      </div>
                      <div style={{ marginBottom: '12px' }}>
                        <button
                          type="button"
                          onClick={handleChartDownload}
                          style={{
                            display: 'inline-block',
                            padding: '10px 24px',
                            background: 'linear-gradient(135deg, #2196F3 0%, #1976d2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            boxShadow: '0 5px 15px rgba(33, 150, 243, 0.4)',
                            transition: 'all 0.3s ease',
                            fontSize: '13px'
                          }}
                          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                        >
                          Download Chart
                        </button>
                      </div>
                      <div style={{ display: 'none' }}>
                        <a href={chartData.chartUrl} download="kundli.png" style={{
                          display: 'inline-block',
                          padding: '10px 24px',
                          background: 'linear-gradient(135deg, #2196F3 0%, #1976d2 100%)',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          boxShadow: '0 5px 15px rgba(33, 150, 243, 0.4)',
                          transition: 'all 0.3s ease',
                          fontSize: '13px'
                        }}
                          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                        >
                          ⬇️ Download
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Exaltation & Debilitation Tab */}
                  {activeTab === 'exaltation' && exaltationLoading ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                      <p style={{ fontSize: '16px', color: '#999' }}>⏳ Loading...</p>
                    </div>
                  ) : activeTab === 'exaltation' && kundliDataResult?.data?.exaltation_debilitation ? (
                    <div>
                      <h3 style={{ color: '#333', marginBottom: '20px' }}>⭐ Planetary Positions</h3>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: '15px'
                      }}>
                        {/* Exalted Planets */}
                        <div style={{
                          border: '2px solid #4CAF50',
                          borderRadius: '12px',
                          padding: '18px',
                          backgroundColor: '#f1f8f4'
                        }}>
                          <h4 style={{ color: '#2e7d32', marginTop: 0, fontSize: '16px', marginBottom: '12px' }}>✨ Exalted</h4>
                          {kundliDataResult.data.exaltation_debilitation.filter(p => p && p.is_exalted === true).length > 0 ? (
                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                              {kundliDataResult.data.exaltation_debilitation.filter(p => p && p.is_exalted === true).map((planet, index) => (
                                <li key={index} style={{
                                  padding: '8px 10px',
                                  marginBottom: '6px',
                                  borderRadius: '6px',
                                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                  color: '#1b5e20',
                                  fontWeight: '500',
                                  fontSize: '13px'
                                }}>
                                  🪐 {planet.planet_name} ({planet.sign})
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p style={{ color: '#999', fontStyle: 'italic', margin: 0, fontSize: '12px' }}>None</p>
                          )}
                        </div>

                        {/* Debilitated Planets */}
                        <div style={{
                          border: '2px solid #f44336',
                          borderRadius: '12px',
                          padding: '18px',
                          backgroundColor: '#fef5f5'
                        }}>
                          <h4 style={{ color: '#c62828', marginTop: 0, fontSize: '16px', marginBottom: '12px' }}>⚠️ Debilitated</h4>
                          {kundliDataResult.data.exaltation_debilitation.filter(p => p && p.is_debilitated === true).length > 0 ? (
                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                              {kundliDataResult.data.exaltation_debilitation.filter(p => p && p.is_debilitated === true).map((planet, index) => (
                                <li key={index} style={{
                                  padding: '8px 10px',
                                  marginBottom: '6px',
                                  borderRadius: '6px',
                                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                  color: '#b71c1c',
                                  fontWeight: '500',
                                  fontSize: '13px'
                                }}>
                                  🪐 {planet.planet_name} ({planet.sign})
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p style={{ color: '#999', fontStyle: 'italic', margin: 0, fontSize: '12px' }}>None</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : activeTab === 'exaltation' ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                      <p style={{ fontSize: '16px', color: '#999' }}>No data available</p>
                    </div>
                  ) : null}

                  {/* Aspects Tab */}
                  {activeTab === 'aspects' && aspectsLoading ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                      <p style={{ fontSize: '16px', color: '#999' }}>⏳ Loading...</p>
                    </div>
                  ) : activeTab === 'aspects' && kundliDataResult && kundliDataResult.data.aspects ? (
                    <div>
                      <h3 style={{ color: '#333', marginBottom: '20px' }}>🔗 Planetary Aspects</h3>

                      {isMobile && (
                        <div style={{ display: 'grid', gap: '14px', marginBottom: '8px' }}>
                          {kundliDataResult.data.aspects.map((aspect, idx) => (
                            <div
                              key={`mobile-aspect-${idx}`}
                              style={{
                                border: '1px solid #e0e0e0',
                                borderRadius: '16px',
                                padding: '14px',
                                backgroundColor: '#fff',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                              }}
                            >
                              <div style={{
                                fontWeight: '700',
                                color: '#333',
                                fontSize: '16px',
                                marginBottom: '12px',
                                paddingBottom: '10px',
                                borderBottom: '1px solid #eef1f7'
                              }}>
                                {aspect.planet_name}
                              </div>

                              {aspectStrengthConfigs.map((strength) => (
                                <div
                                  key={strength.key}
                                  style={{
                                    border: '1px solid #edf0f7',
                                    borderRadius: '12px',
                                    padding: '10px',
                                    backgroundColor: '#fafbff',
                                    marginBottom: '10px'
                                  }}
                                >
                                  <div style={{ marginBottom: '8px' }}>
                                    <span style={{
                                      backgroundColor: strength.badgeColor,
                                      color: 'white',
                                      padding: '4px 10px',
                                      borderRadius: '12px',
                                      fontSize: '11px',
                                      fontWeight: '700'
                                    }}>
                                      {strength.label}
                                    </span>
                                  </div>
                                  {renderAspectContent(aspect[strength.planetKey], aspect[strength.houseKey])}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}

                      <div style={{
                        display: isMobile ? 'none' : 'block',
                        overflowX: 'auto',
                        borderRadius: '12px',
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                      }}>
                        <table style={{
                          width: '100%',
                          borderCollapse: 'collapse',
                          fontSize: '13px'
                        }}>
                          <thead>
                            <tr style={{
                              backgroundColor: '#667eea',
                              color: 'white'
                            }}>
                              <th style={{
                                padding: '14px 12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                borderBottom: '2px solid #5568d3',
                                minWidth: '100px'
                              }}>Planet</th>
                              <th style={{
                                padding: '14px 12px',
                                textAlign: 'center',
                                fontWeight: '600',
                                borderBottom: '2px solid #5568d3',
                                minWidth: '130px'
                              }}>
                                <span style={{ backgroundColor: '#ff1744', padding: '4px 10px', borderRadius: '12px', fontSize: '11px' }}>
                                  100%
                                </span>
                              </th>
                              <th style={{
                                padding: '14px 12px',
                                textAlign: 'center',
                                fontWeight: '600',
                                borderBottom: '2px solid #5568d3',
                                minWidth: '130px'
                              }}>
                                <span style={{ backgroundColor: '#f50057', padding: '4px 10px', borderRadius: '12px', fontSize: '11px' }}>
                                  75%
                                </span>
                              </th>
                              <th style={{
                                padding: '14px 12px',
                                textAlign: 'center',
                                fontWeight: '600',
                                borderBottom: '2px solid #5568d3',
                                minWidth: '130px'
                              }}>
                                <span style={{ backgroundColor: '#ff6090', padding: '4px 10px', borderRadius: '12px', fontSize: '11px' }}>
                                  50%
                                </span>
                              </th>
                              <th style={{
                                padding: '14px 12px',
                                textAlign: 'center',
                                fontWeight: '600',
                                borderBottom: '2px solid #5568d3',
                                minWidth: '130px'
                              }}>
                                <span style={{ backgroundColor: '#ff80ab', padding: '4px 10px', borderRadius: '12px', fontSize: '11px' }}>
                                  25%
                                </span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {kundliDataResult.data.aspects.map((aspect, idx) => (
                              <tr key={idx} style={{
                                backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9f9f9',
                                borderBottom: '1px solid #e0e0e0'
                              }}>
                                <td style={{
                                  padding: '12px',
                                  fontWeight: '600',
                                  backgroundColor: '#f5f5f5',
                                  borderRight: '2px solid #e0e0e0',
                                  color: '#333'
                                }}>
                                  {aspect.planet_name}
                                </td>
                                {/* 100% Full Strength */}
                                <td style={{
                                  padding: '12px',
                                  textAlign: 'center',
                                  fontSize: '12px',
                                  color: '#555'
                                }}>
                                  {aspect.complete_aspected_planets.length > 0 || aspect.complete_aspected_houses.length > 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                      {aspect.complete_aspected_planets.length > 0 && (
                                        <span style={{
                                          backgroundColor: '#e3f2fd',
                                          color: '#1565c0',
                                          padding: '6px 8px',
                                          borderRadius: '14px',
                                          fontSize: '11px',
                                          fontWeight: '600',
                                          display: 'inline-block'
                                        }}>
                                          {aspect.complete_aspected_planets.join(', ')}
                                        </span>
                                      )}
                                      {aspect.complete_aspected_houses.length > 0 && (
                                        <span style={{
                                          backgroundColor: '#ffebee',
                                          color: '#c62828',
                                          padding: '6px 8px',
                                          borderRadius: '14px',
                                          fontSize: '11px',
                                          fontWeight: '600',
                                          display: 'inline-block'
                                        }}>
                                          {aspect.complete_aspected_houses.map(h => `H${h}`).join(', ')}
                                        </span>
                                      )}
                                    </div>
                                  ) : (
                                    <span style={{ color: '#ccc' }}>—</span>
                                  )}
                                </td>
                                {/* 75% Third Strength */}
                                <td style={{
                                  padding: '12px',
                                  textAlign: 'center',
                                  fontSize: '12px',
                                  color: '#555'
                                }}>
                                  {aspect.third_aspected_planets.length > 0 || aspect.third_aspected_houses.length > 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                      {aspect.third_aspected_planets.length > 0 && (
                                        <span style={{
                                          backgroundColor: '#e3f2fd',
                                          color: '#1565c0',
                                          padding: '6px 8px',
                                          borderRadius: '14px',
                                          fontSize: '11px',
                                          fontWeight: '600',
                                          display: 'inline-block'
                                        }}>
                                          {aspect.third_aspected_planets.join(', ')}
                                        </span>
                                      )}
                                      {aspect.third_aspected_houses.length > 0 && (
                                        <span style={{
                                          backgroundColor: '#ffebee',
                                          color: '#c62828',
                                          padding: '6px 8px',
                                          borderRadius: '14px',
                                          fontSize: '11px',
                                          fontWeight: '600',
                                          display: 'inline-block'
                                        }}>
                                          {aspect.third_aspected_houses.map(h => `H${h}`).join(', ')}
                                        </span>
                                      )}
                                    </div>
                                  ) : (
                                    <span style={{ color: '#ccc' }}>—</span>
                                  )}
                                </td>
                                {/* 50% Second Strength */}
                                <td style={{
                                  padding: '12px',
                                  textAlign: 'center',
                                  fontSize: '12px',
                                  color: '#555'
                                }}>
                                  {aspect.second_aspected_planets.length > 0 || aspect.second_aspected_houses.length > 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                      {aspect.second_aspected_planets.length > 0 && (
                                        <span style={{
                                          backgroundColor: '#e3f2fd',
                                          color: '#1565c0',
                                          padding: '6px 8px',
                                          borderRadius: '14px',
                                          fontSize: '11px',
                                          fontWeight: '600',
                                          display: 'inline-block'
                                        }}>
                                          {aspect.second_aspected_planets.join(', ')}
                                        </span>
                                      )}
                                      {aspect.second_aspected_houses.length > 0 && (
                                        <span style={{
                                          backgroundColor: '#ffebee',
                                          color: '#c62828',
                                          padding: '6px 8px',
                                          borderRadius: '14px',
                                          fontSize: '11px',
                                          fontWeight: '600',
                                          display: 'inline-block'
                                        }}>
                                          {aspect.second_aspected_houses.map(h => `H${h}`).join(', ')}
                                        </span>
                                      )}
                                    </div>
                                  ) : (
                                    <span style={{ color: '#ccc' }}>—</span>
                                  )}
                                </td>
                                {/* 25% First Strength */}
                                <td style={{
                                  padding: '12px',
                                  textAlign: 'center',
                                  fontSize: '12px',
                                  color: '#555'
                                }}>
                                  {aspect.first_aspected_planets.length > 0 || aspect.first_aspected_houses.length > 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                      {aspect.first_aspected_planets.length > 0 && (
                                        <span style={{
                                          backgroundColor: '#e3f2fd',
                                          color: '#1565c0',
                                          padding: '6px 8px',
                                          borderRadius: '14px',
                                          fontSize: '11px',
                                          fontWeight: '600',
                                          display: 'inline-block'
                                        }}>
                                          {aspect.first_aspected_planets.join(', ')}
                                        </span>
                                      )}
                                      {aspect.first_aspected_houses.length > 0 && (
                                        <span style={{
                                          backgroundColor: '#ffebee',
                                          color: '#c62828',
                                          padding: '6px 8px',
                                          borderRadius: '14px',
                                          fontSize: '11px',
                                          fontWeight: '600',
                                          display: 'inline-block'
                                        }}>
                                          {aspect.first_aspected_houses.map(h => `H${h}`).join(', ')}
                                        </span>
                                      )}
                                    </div>
                                  ) : (
                                    <span style={{ color: '#ccc' }}>—</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : null}

                  {/* Dasha Tab */}
                  {activeTab === 'dasha' && dashaLoading ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                      <p style={{ fontSize: '16px', color: '#999' }}>⏳ Loading...</p>
                    </div>
                  ) : activeTab === 'dasha' && dashaData && dashaData.currentDasha ? (
                    <div>
                      <h3 style={{ color: '#333', marginBottom: '20px' }}>⏰ Dasha Periods</h3>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                        {/* Mahadasha */}
                        <div style={{
                          border: '2px solid #d32f2f',
                          borderRadius: '12px',
                          padding: '16px',
                          backgroundColor: '#ffebee'
                        }}>
                          <h4 style={{ color: '#c62828', marginTop: 0, fontSize: '15px', marginBottom: '10px' }}>🔴 Mahadasha: {dashaData.currentDasha.mahadasha.name}</h4>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            <p style={{ margin: '4px 0' }}><strong>Start:</strong> {new Date(dashaData.currentDasha.mahadasha.start).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                            <p style={{ margin: '4px 0' }}><strong>End:</strong> {new Date(dashaData.currentDasha.mahadasha.end).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                          </div>
                        </div>

                        {/* Antardasha */}
                        <div style={{
                          border: '2px solid #f57c00',
                          borderRadius: '12px',
                          padding: '16px',
                          backgroundColor: '#fff3e0'
                        }}>
                          <h4 style={{ color: '#e65100', marginTop: 0, fontSize: '15px', marginBottom: '10px' }}>🟠 Antardasha: {dashaData.currentDasha.antardasha.name}</h4>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            <p style={{ margin: '4px 0' }}><strong>Start:</strong> {new Date(dashaData.currentDasha.antardasha.start).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                            <p style={{ margin: '4px 0' }}><strong>End:</strong> {new Date(dashaData.currentDasha.antardasha.end).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                          </div>
                        </div>

                        {/* Pratyantardasha */}
                        <div style={{
                          border: '2px solid #7b1fa2',
                          borderRadius: '12px',
                          padding: '16px',
                          backgroundColor: '#f3e5f5'
                        }}>
                          <h4 style={{ color: '#6a1b9a', marginTop: 0, fontSize: '15px', marginBottom: '10px' }}>🟣 Pratyantardasha: {dashaData.currentDasha.pratyantardasha.name}</h4>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            <p style={{ margin: '4px 0' }}><strong>Start:</strong> {new Date(dashaData.currentDasha.pratyantardasha.start).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                            <p style={{ margin: '4px 0' }}><strong>End:</strong> {new Date(dashaData.currentDasha.pratyantardasha.end).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Janmakshar Tab */}
                  {activeTab === 'janmakshar' && janmaksharLoading ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                      <p style={{ fontSize: '16px', color: '#999' }}>⏳ Loading...</p>
                    </div>
                  ) : activeTab === 'janmakshar' && janmaksharData && janmaksharData.data ? (
                    <div>
                      <h3 style={{ color: '#333', marginBottom: '20px' }}> Birth Details</h3>

                      {/* Janmakshar Display */}
                      <div style={{
                        background: 'linear-gradient(135deg, #e8d5f2 0%, #f3e5f5 100%)',
                        border: '2px solid #9c27b0',
                        borderRadius: '12px',
                        padding: '25px',
                        textAlign: 'center',
                        marginBottom: '20px'
                      }}>
                        <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>Birth Syllable</p>
                        <p style={{
                          margin: '0 0 10px 0',
                          fontSize: isMobile ? '44px' : '64px',
                          fontWeight: 'bold',
                          color: '#6a1b9a',
                          fontFamily: 'serif'
                        }}>
                          {janmaksharData.data.janmakshar}
                        </p>
                        <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                          <strong>Charan:</strong> {janmaksharData.data.charan}
                        </p>
                      </div>

                      {/* Birth Details Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: '12px',
                        marginBottom: '15px'
                      }}>
                        {/* Nakshatra */}
                        <div style={{
                          border: '2px solid #9c27b0',
                          borderRadius: '10px',
                          padding: '15px',
                          backgroundColor: '#f3e5f5'
                        }}>
                          <h4 style={{ color: '#6a1b9a', marginTop: 0, fontSize: '14px', marginBottom: '8px' }}>⭐ Nakshatra</h4>
                          <p style={{ margin: '0 0 6px 0', fontSize: '13px', fontWeight: 'bold', color: '#6a1b9a' }}>
                            {janmaksharData.data.birth_details.nakshatra.name}
                          </p>
                          <p style={{ margin: '4px 0', fontSize: '11px', color: '#666' }}>
                            <strong>Lord:</strong> {janmaksharData.data.birth_details.nakshatra.lord.name}
                          </p>
                          <p style={{ margin: '0', fontSize: '11px', color: '#666' }}>
                            <strong>Pada:</strong> {janmaksharData.data.birth_details.nakshatra.pada}
                          </p>
                        </div>

                        {/* Chandra Rasi */}
                        <div style={{
                          border: '2px solid #2196F3',
                          borderRadius: '10px',
                          padding: '15px',
                          backgroundColor: '#e3f2fd'
                        }}>
                          <h4 style={{ color: '#1565c0', marginTop: 0, fontSize: '14px', marginBottom: '8px' }}>🌙 Chandra Rasi</h4>
                          <p style={{ margin: '0 0 6px 0', fontSize: '13px', fontWeight: 'bold', color: '#1565c0' }}>
                            {janmaksharData.data.birth_details.chandra_rasi.name}
                          </p>
                          <p style={{ margin: '0', fontSize: '11px', color: '#666' }}>
                            <strong>Lord:</strong> {janmaksharData.data.birth_details.chandra_rasi.lord.name}
                          </p>
                        </div>

                        {/* Surya Rasi */}
                        <div style={{
                          border: '2px solid #ff9800',
                          borderRadius: '10px',
                          padding: '15px',
                          backgroundColor: '#fff3e0'
                        }}>
                          <h4 style={{ color: '#e65100', marginTop: 0, fontSize: '14px', marginBottom: '8px' }}>☀️ Surya Rasi</h4>
                          <p style={{ margin: '0 0 6px 0', fontSize: '13px', fontWeight: 'bold', color: '#e65100' }}>
                            {janmaksharData.data.birth_details.soorya_rasi.name}
                          </p>
                          <p style={{ margin: '0', fontSize: '11px', color: '#666' }}>
                            <strong>Lord:</strong> {janmaksharData.data.birth_details.soorya_rasi.lord.name}
                          </p>
                        </div>

                        {/* Zodiac */}
                        <div style={{
                          border: '2px solid #4CAF50',
                          borderRadius: '10px',
                          padding: '15px',
                          backgroundColor: '#f1f8f4'
                        }}>
                          <h4 style={{ color: '#2e7d32', marginTop: 0, fontSize: '14px', marginBottom: '8px' }}>♈ Zodiac</h4>
                          <p style={{ margin: '0', fontSize: '13px', fontWeight: 'bold', color: '#2e7d32' }}>
                            {janmaksharData.data.birth_details.zodiac.name}
                          </p>
                        </div>
                      </div>

                      {/* Additional Info */}
                      {/* {janmaksharData.data.birth_details.additional_info && (
                        <div style={{
                          border: '1px solid #ddd',
                          borderRadius: '10px',
                          padding: '15px',
                          backgroundColor: '#fafafa',
                          maxHeight: '200px',
                          overflowY: 'auto'
                        }}>
                          <h4 style={{ color: '#333', marginTop: 0, fontSize: '13px', marginBottom: '10px' }}>📋 Info</h4>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            gap: '10px'
                          }}>
                            {Object.entries(janmaksharData.data.birth_details.additional_info).map(([key, value]) => (
                              <div key={key} style={{
                                padding: '8px',
                                backgroundColor: 'white',
                                borderRadius: '6px',
                                border: '1px solid #e0e0e0'
                              }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '10px', color: '#999', fontWeight: '600', textTransform: 'uppercase' }}>
                                  {key.replace(/_/g, ' ')}
                                </p>
                                <p style={{ margin: 0, fontSize: '12px', color: '#333', fontWeight: '500' }}>
                                  {value}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )} */}
                    </div>
                  ) : null}

                  {/* Yogas Tab */}
                  {activeTab === 'yogas' && yogasLoading ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                      <p style={{ fontSize: '16px', color: '#999' }}>⏳ Loading...</p>
                    </div>
                  ) : activeTab === 'yogas' && yogasData && yogasData.data && yogasData.data.yogas ? (
                    <div>
                      <h3 style={{ color: '#333', marginBottom: '20px' }}>✨ Astrological Yogas</h3>

                      {yogasData.data.yogas.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                          {yogasData.data.yogas.map((yoga, idx) => (
                            <div key={idx} style={{
                              border: '2px solid #673AB7',
                              borderRadius: '12px',
                              padding: '18px',
                              backgroundColor: '#f3e5f5',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}>


                              {yoga.description_mr && (
                                <div style={{ marginBottom: '10px' }}>
                                  <p style={{ color: '#7b1fa2', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>
                                    {yoga.description_mr}
                                  </p>
                                </div>
                              )}

                              {yoga.description_en
                                && (
                                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #ce93d8' }}>
                                    <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>
                                      {yoga.description_en}
                                    </p>
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                          <p style={{ fontSize: '16px', color: '#999' }}>No yogas found in your birth chart</p>
                        </div>
                      )}
                    </div>
                  ) : activeTab === 'yogas' ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                      <p style={{ fontSize: '16px', color: '#999' }}>No data available</p>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
        <SignsAndPlanets />
      </div>
    </div>
  )
}

export default GenerateKundli

