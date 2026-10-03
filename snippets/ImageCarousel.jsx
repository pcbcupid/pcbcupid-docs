import React, { useState } from 'react';

export const ImageCarousel = ({ images = [] }) => {
  const defaultImages = [
    {
      src: "https://placehold.co/800x450/0f172a/38bdf8?text=Step+1:+Hardware+Wiring",
      title: "Step 1: Wire Your Hardware",
      caption: "Connect the T5848 I2S microphone to the GLYPH C6 development board using 5 jumper wires."
    },
    {
      src: "https://placehold.co/800x450/0f172a/34d399?text=Step+2:+Flash+Firmware",
      title: "Step 2: Flash Firmware",
      caption: "Flash glyph_voice.ino.merged.bin at 0x0 using the browser-based Espressif Web Flasher."
    },
    {
      src: "https://placehold.co/800x450/0f172a/fbbf24?text=Step+3:+Wi-Fi+Setup",
      title: "Step 3: Wi-Fi Configuration",
      caption: "Connect to the setup hotspot and configure your 2.4 GHz Wi-Fi credentials at 192.168.4.1."
    },
    {
      src: "https://placehold.co/800x450/0f172a/a855f7?text=Step+4:+Live+Transcription",
      title: "Step 4: Live Transcription",
      caption: "Connect via the Android companion app or React web app, tap Connect, and press BOOT to record."
    }
  ];

  const slides = images && images.length > 0 ? images : defaultImages;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const current = slides[currentIndex] || slides[0];

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '820px',
      margin: '1.75rem auto',
      borderRadius: '14px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backgroundColor: '#0f172a',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)'
    }}>
      {/* Slide Viewport */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#020617',
        overflow: 'hidden'
      }}>
        <img
          src={current.src}
          alt={current.alt || current.title || `Slide ${currentIndex + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transition: 'opacity 0.3s ease-in-out'
          }}
        />

        {/* Counter Badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          color: '#e2e8f0',
          padding: '4px 10px',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.05em'
        }}>
          {currentIndex + 1} / {slides.length}
        </div>

        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.2s, transform 0.2s'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.2s, transform 0.2s'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Caption & Navigation Controls */}
      <div style={{
        padding: '1rem 1.25rem',
        backgroundColor: '#0f172a',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        <div>
          {current.title && (
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.25rem' }}>
              {current.title}
            </div>
          )}
          {current.caption && (
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.4' }}>
              {current.caption}
            </div>
          )}
        </div>

        {/* Dot Indicators */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          paddingTop: '0.25rem'
        }}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: idx === currentIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '9999px',
                backgroundColor: idx === currentIndex ? '#0D9373' : 'rgba(255, 255, 255, 0.25)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
