import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// 1. Data Definitions
const LOVE_MEMORIES = [
  {
    id: 1,
    date: "August 14, 2023",
    title: "The Day We First Met",
    desc: "A simple glance that changed my world forever. The day my soul recognized yours.",
    icon: "✨",
    story: "It was a warm afternoon when our eyes met. The crowded room suddenly grew quiet, and in that split second, I knew my life would never be the same. That initial smile of yours remains etched in my heart."
  },
  {
    id: 2,
    date: "Aug 2023 - Feb 2025",
    title: "Beautiful Friendship",
    desc: "A chapter of shared secrets, endless laughter, and a bond that grew stronger every day.",
    icon: "☕",
    story: "We built our bond cup by cup, laugh by laugh. We shared dreams, supported each other through late-night study sessions, and talked about everything under the sun. You became my safe space."
  },
  {
    id: 3,
    date: "February 24, 2025",
    title: "The Big Proposal",
    desc: "With a heart full of hope, I asked you to be my forever. The day I promised to love you always.",
    icon: "💍",
    story: "My heart was pounding, my hands slightly shaking as I looked into your eyes and asked you to stand by me for the rest of our lives. It was a promise of a lifetime, wrapped in hope."
  },
  {
    id: 4,
    date: "August 24, 2025",
    title: "She Accepted! ❤️",
    desc: "The most beautiful 'Yes' I've ever heard. Our story officially entered its greatest chapter.",
    icon: "💝",
    story: "The moment you officially agreed to be mine. It marked the start of our countdown of pure, endless love. From that day on, it has been 'us' against the world."
  }
];

const ROMANTIC_WISHES = [
  "You are the peace in my chaos, the light in my dark, and the love of my life. ❤️",
  "I love you not only for what you are, but for what I am when I am with you.",
  "In a room full of art, I'd still stare at you. ✨",
  "You are my today, and all of my tomorrows. 🌸",
  "If I had a flower for every time I thought of you... I could walk through my garden forever.",
  "Every love story is beautiful, but ours is my favorite. 💖",
  "Your smile is my favorite view, and your voice is my favorite sound.",
  "Holding your hand is like holding a dream. Never let go."
];

const GALLERY_ITEMS = [
  { type: "image", url: "/assets/gallery/gallery1.png", title: "Every moment with you is a dream..." },
  { type: "image", url: "/assets/gallery/gallery2.png", title: "Our smiles say it all ❤️" },
  { type: "image", url: "/assets/gallery/gallery3.jpg", title: "Adventuring together, forever." },
  { type: "image", url: "/assets/gallery/gallery4.jpg", title: "The way you look at me..." },
  { type: "image", url: "/assets/gallery/gallery5.jpg", title: "A perfect cafe date ☕" },
  { type: "image", url: "/assets/gallery/gallery6.jpg", title: "Wrapped in your love..." },
  { type: "image", url: "/assets/gallery/gallery7.jpg", title: "A beautiful bond 💫" },
  { type: "image", url: "/assets/gallery/gallery8.jpg", title: "Creating memories..." },
  { type: "image", url: "/assets/gallery/gallery9.png", title: "Holding your hand..." },
  { type: "image", url: "/assets/gallery/gallery10.jpg", title: "Endless love..." },
  { type: "image", url: "/assets/gallery/gallery11.png", title: "Sunsets and you..." },
  { type: "image", url: "/assets/gallery/gallery12.jpg", title: "I will always choose you." },
  { type: "image", url: "/assets/gallery/gallery13.jpg", title: "Your gifts 😘🏎️" },
  { type: "image", url: "/assets/gallery/gallery14.jpg", title: "Together is a wonderful place to be" },
  { type: "image", url: "/assets/gallery/gallery15.jpg", title: "Soul Connection - In your arms, I have found my forever home. ❤️" },
  { type: "image", url: "/assets/gallery/gallery16.jpg", title: "Double the Joy - Two phases of our beautiful journey, bound by one endless love. ✨" },
  { type: "image", url: "/assets/gallery/gallery17.jpg", title: "Sunset Silhouette - Walking hand in hand as the waves sing of our eternity. 🌅" },
  { type: "image", url: "/assets/gallery/gallery18.jpg", title: "DEC '23 - A golden beach memory, frozen in polaroid time. 📸" },
  { type: "image", url: "/assets/gallery/gallery19.jpg", title: "Blessed Moments - Beach waves, warm smiles, and family memories. 🌊" },
  { type: "image", url: "/assets/anu/IMG-20250326-WA0038.jpg", title: "Your Smile - It's my favorite view in the world." },
  { type: "image", url: "/assets/anu/IMG-20250326-WA0049.jpg", title: "Radiance - You shine brighter than any star." },
  { type: "image", url: "/assets/anu/IMG-20250502-WA0018.jpg", title: "Timeless - Like our love, beautiful and eternal." },
  { type: "image", url: "/assets/anu/IMG-20250815-WA0208.jpg", title: "Elegance - In everything you do." },
  { type: "image", url: "/assets/anu/IMG-20250829-WA0047.jpg", title: "Forever - Is just the beginning with you." },
  { type: "image", url: "/assets/anu/anuuuu.jpeg", title: "Anu - The name that makes my heart beat." },
  { type: "image", url: "/assets/anu/image.png", title: "Perfection - Captured in a frame." },
  { type: "video", url: "/assets/anu/WhatsApp Video 2026-04-24 at 1.08.47 PM (1).mp4", title: "Captured Magic - Every second with you is a gift." },
  { type: "video", url: "/assets/anu/WhatsApp Video 2026-04-24 at 1.08.47 PM.mp4", title: "Our Little Moments - The ones I'll cherish forever." },
  { type: "video", url: "/assets/anu/WhatsApp Video 2026-04-24 at 1.08.48 PM (1).mp4", title: "Pure Happiness - Found only in your presence." },
  { type: "video", url: "/assets/anu/WhatsApp Video 2026-04-24 at 1.08.48 PM (2).mp4", title: "My Whole Heart - Belongs to no one but you." },
  { type: "video", url: "/assets/anu/WhatsApp Video 2026-04-24 at 1.08.48 PM.mp4", title: "Endless Joy - Thank you for being mine." }
];

function GalleryCard({ item }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handleVideoClick = () => {
    if (item.type !== 'video') return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      // Pause other videos
      document.querySelectorAll('video').forEach(vid => {
        if (vid !== videoRef.current) vid.pause();
      });
      videoRef.current.play().catch(e => console.log(e));
      setPlaying(true);
    }
  };

  return (
    <div 
      className={`gallery-card glass-card ${playing ? 'playing' : ''}`}
      onClick={handleVideoClick}
    >
      {item.type === 'video' ? (
        <React.Fragment>
          <video ref={videoRef} loop playsInline muted={false}>
            <source src={item.url} type="video/mp4" />
          </video>
          <div className="play-indicator"></div>
        </React.Fragment>
      ) : (
        <img src={item.url} alt={item.title} loading="lazy" />
      )}
      
      <div className="gallery-card-caption">
        <h4>{item.title.split(' - ')[0]}</h4>
        <p>{item.title.split(' - ')[1] || item.title}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'story' | 'gallery' | 'calculator'
  const [activeTheme, setActiveTheme] = useState('midnight'); // 'midnight' | 'rosegold' | 'emerald'
  const [daysLeft, setDaysLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [activeMemory, setActiveMemory] = useState(LOVE_MEMORIES[3]);
  const [currentWish, setCurrentWish] = useState(ROMANTIC_WISHES[0]);
  const [wishFade, setWishFade] = useState(false);

  // Love Calculator States
  const [calcNames, setCalcNames] = useState({ name1: 'Ashik', name2: 'Anu' });
  const [calcResult, setCalcResult] = useState(null);
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcProgress, setCalcProgress] = useState(0);

  // Audio BGM Ref
  const audioRef = useRef(null);

  // Trigger global falling hearts animation periodically
  useEffect(() => {
    const generateHeart = () => {
      const container = document.getElementById('hearts-bg-particles');
      if (!container) return;

      const heart = document.createElement('div');
      heart.innerHTML = Math.random() > 0.5 ? '❤️' : '💖';
      heart.style.position = 'absolute';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.bottom = '-40px';
      heart.style.fontSize = (Math.random() * 18 + 12) + 'px';
      heart.style.opacity = Math.random() * 0.45 + 0.15;
      heart.style.color = activeTheme === 'rosegold' ? '#d4a373' : (activeTheme === 'emerald' ? '#00f2fe' : '#ff4e79');
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '0';
      
      container.appendChild(heart);
      
      const duration = Math.random() * 8 + 8;
      gsap.to(heart, {
        y: -window.innerHeight - 200,
        x: (Math.random() - 0.5) * 160,
        rotation: Math.random() * 360,
        duration: duration,
        ease: "none",
        onComplete: () => heart.remove()
      });
    };

    const heartTimer = setInterval(generateHeart, 1200);
    return () => clearInterval(heartTimer);
  }, [activeTheme]);

  // Mouse trail particles
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (Math.random() > 0.2) return; // Limit spawn rate

      const element = document.createElement('div');
      const isStar = Math.random() > 0.5;
      
      if (isStar) {
        element.innerHTML = Math.random() > 0.5 ? '✨' : '⭐';
        element.style.color = 'var(--accent)';
      } else {
        element.innerHTML = Math.random() > 0.5 ? '❤️' : '💖';
        element.style.color = 'var(--primary)';
      }
      
      element.style.position = 'fixed';
      element.style.left = e.clientX + 'px';
      element.style.top = e.clientY + 'px';
      element.style.fontSize = (Math.random() * 12 + 6) + 'px';
      element.style.pointerEvents = 'none';
      element.style.zIndex = '9999';
      element.style.opacity = '0.9';
      document.body.appendChild(element);

      gsap.to(element, {
        y: e.clientY + (Math.random() - 0.5) * 70 - 70,
        x: e.clientX + (Math.random() - 0.5) * 70,
        scale: 0.1,
        opacity: 0,
        duration: 1.2,
        ease: "power1.out",
        onComplete: () => element.remove()
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Live anniversary counter updater
  useEffect(() => {
    const startDate = new Date('2025-08-24T00:00:00');
    
    const updateTimer = () => {
      const now = new Date();
      const difference = now - startDate;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setDaysLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync active theme class to HTML element
  useEffect(() => {
    const docElement = document.documentElement;
    docElement.className = '';
    docElement.classList.add(`theme-${activeTheme}`);
  }, [activeTheme]);

  // Handle Play/Pause music
  const handleToggleMusic = () => {
    if (isPlayingMusic) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Music blocked: " + e));
    }
    setIsPlayingMusic(!isPlayingMusic);
  };

  // Draw romantic wish card
  const handleNextWish = (e) => {
    setWishFade(true);
    setTimeout(() => {
      let newWish = currentWish;
      while (newWish === currentWish) {
        const index = Math.floor(Math.random() * ROMANTIC_WISHES.length);
        newWish = ROMANTIC_WISHES[index];
      }
      setCurrentWish(newWish);
      setWishFade(false);

      // Heart burst from click origin
      const rect = e.target.getBoundingClientRect();
      for(let i = 0; i < 8; i++) {
        const h = document.createElement('div');
        h.innerHTML = '❤️';
        h.style.position = 'fixed';
        h.style.left = (rect.left + rect.width / 2) + 'px';
        h.style.top = rect.top + 'px';
        h.style.zIndex = '9999';
        h.style.pointerEvents = 'none';
        document.body.appendChild(h);
        
        gsap.to(h, {
          y: rect.top - 120 - Math.random() * 80,
          x: (rect.left + rect.width / 2) + (Math.random() - 0.5) * 180,
          opacity: 0,
          scale: 1.6,
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => h.remove()
        });
      }
    }, 300);
  };

  // Calculate compatibility score + spawn particles
  const handleCalculateLove = (e) => {
    e.preventDefault();
    if (!calcNames.name1 || !calcNames.name2) return;
    
    setCalcLoading(true);
    setCalcProgress(0);
    setCalcResult(null);
    
    let currentP = 0;
    const interval = setInterval(() => {
      currentP += 5;
      setCalcProgress(currentP);
      if (currentP >= 100) {
        clearInterval(interval);
        
        const n1 = calcNames.name1.toLowerCase().trim();
        const n2 = calcNames.name2.toLowerCase().trim();
        
        let score = 95 + Math.floor(Math.random() * 5); // Base romantic range
        let message = "A perfect cosmic connection! Your paths were written in the stars.";
        
        if ((n1.includes('ashik') && n2.includes('anu')) || (n1.includes('anu') && n2.includes('ashik'))) {
          score = 100;
          message = "100% Eternal Soulmates! Ashik ❤️ Anu. Your love is destined to stand the test of time and space.";
        }
        
        setCalcResult({ score, message });
        setCalcLoading(false);
        
        // Spawn giant burst of falling/floating hearts
        for (let i = 0; i < 35; i++) {
          const heart = document.createElement('div');
          heart.innerHTML = i % 2 === 0 ? '❤️' : '💖';
          heart.style.position = 'fixed';
          heart.style.left = Math.random() * 100 + 'vw';
          heart.style.bottom = '-50px';
          heart.style.fontSize = (Math.random() * 30 + 15) + 'px';
          heart.style.zIndex = '9999';
          heart.style.pointerEvents = 'none';
          heart.style.color = 'var(--primary)';
          document.body.appendChild(heart);
          
          gsap.to(heart, {
            y: -window.innerHeight - 100,
            x: `+=${(Math.random() - 0.5) * 400}`,
            rotation: Math.random() * 360,
            duration: Math.random() * 3 + 2.5,
            ease: "power2.out",
            onComplete: () => heart.remove()
          });
        }
      }
    }, 70);
  };


  return (
    <React.Fragment>
      {/* Background Audio BGM */}
      <audio ref={audioRef} id="romantic-music-audio" loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Background Blobs */}
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* CSS Hearts particles background container */}
      <div id="hearts-bg-particles" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}></div>

      {/* Unified Nav Bar */}
      <nav className="navbar glass-card">
        <div className="logo" onClick={() => setActiveTab('home')}>A&A</div>
        <ul className="nav-links">
          <li>
            <button className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>
              <i className="fa-solid fa-house"></i> Home
            </button>
          </li>
          <li>
            <button className={activeTab === 'story' ? 'active' : ''} onClick={() => setActiveTab('story')}>
              <i className="fa-solid fa-heart-pulse"></i> Our Story
            </button>
          </li>
          <li>
            <button className={activeTab === 'gallery' ? 'active' : ''} onClick={() => setActiveTab('gallery')}>
              <i className="fa-solid fa-images"></i> Gallery
            </button>
          </li>
          <li>
            <button className={activeTab === 'calculator' ? 'active' : ''} onClick={() => setActiveTab('calculator')}>
              <i className="fa-solid fa-calculator"></i> Compatibility
            </button>
          </li>
        </ul>

        {/* Dynamic Theme Selector */}
        <div className="theme-toggle-bar">
          <button 
            className={`theme-toggle-btn active-midnight ${activeTheme === 'midnight' ? 'active' : ''}`} 
            onClick={() => setActiveTheme('midnight')}
            style={{ backgroundColor: '#ff4e79', color: 'white' }}
            title="Midnight Dream"
          >
            🌌
          </button>
          <button 
            className={`theme-toggle-btn active-rosegold ${activeTheme === 'rosegold' ? 'active' : ''}`} 
            onClick={() => setActiveTheme('rosegold')}
            style={{ backgroundColor: '#d4a373', color: 'white' }}
            title="Rose Gold Champagne"
          >
            💫
          </button>
          <button 
            className={`theme-toggle-btn active-emerald ${activeTheme === 'emerald' ? 'active' : ''}`} 
            onClick={() => setActiveTheme('emerald')}
            style={{ backgroundColor: '#00f2fe', color: 'white' }}
            title="Emerald Twilight"
          >
            ✨
          </button>
        </div>
      </nav>

      {/* Floating Music widget */}
      <div className="music-widget-floating glass-card" onClick={handleToggleMusic}>
        <div className={`equalizer-container ${isPlayingMusic ? 'playing' : ''}`}>
          <div className="equalizer-bar"></div>
          <div className="equalizer-bar"></div>
          <div className="equalizer-bar"></div>
          <div className="equalizer-bar"></div>
        </div>
        <span style={{ fontSize: '0.9rem', fontWeight: '700', color: isPlayingMusic ? 'var(--primary)' : '#fff' }}>
          {isPlayingMusic ? 'Now Playing' : 'Play Love Song'}
        </span>
      </div>

      {/* Main Tab Routing Rendering */}
      <main style={{ minHeight: '90vh', position: 'relative', zIndex: 1 }}>
        
        {/* TAB 1: HOME LANDING */}
        {activeTab === 'home' && (
          <div className="hero-container">
            <h1 className="hero-title">
              Every Love Story is Beautiful, but ours is my <span className="highlight-text">favorite</span>.
            </h1>
            <p className="hero-subtitle">Dedicated to the one who makes my heart skip a beat.</p>
            
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
              <button onClick={() => setActiveTab('gallery')} className="btn-primary">
                Browse Photos
              </button>
            </div>

            {/* Anniversary Countdown Counter */}
            <div className="countdown-card glass-card">
              <h2 className="countdown-header">Our Journey Started</h2>
              <div className="countdown-date">August 24, 2025</div>
              
              <div className="countdown-grid">
                <div className="countdown-item">
                  <span className="countdown-number">{daysLeft.days}</span>
                  <span className="countdown-label">Days</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-number">{String(daysLeft.hours).padStart(2, '0')}</span>
                  <span className="countdown-label">Hours</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-number">{String(daysLeft.minutes).padStart(2, '0')}</span>
                  <span className="countdown-label">Mins</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-number" style={{ color: 'var(--primary-light)' }}>
                    {String(daysLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="countdown-label">Secs</span>
                </div>
              </div>
              
              <div style={{ fontSize: '0.95rem', background: 'rgba(255, 78, 121, 0.08)', padding: '10px 24px', borderRadius: '50px', border: '1px solid var(--primary)', display: 'inline-block' }}>
                Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>

            {/* Love Notes Note Box */}
            <div className="glass-card" style={{ maxWidth: '650px', width: '100%', padding: '40px', margin: '20px auto', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'Dancing Script, cursive', fontSize: '2.4rem', color: 'var(--primary)', marginBottom: '10px' }}>Love Notes</h3>
              <div className="quote-icon" style={{ fontSize: '3rem', opacity: 0.15, marginBottom: '-10px' }}>“</div>
              <p 
                className={wishFade ? 'fade' : ''} 
                style={{ 
                  transition: 'opacity 0.3s', 
                  opacity: wishFade ? 0 : 1, 
                  fontSize: '1.65rem', 
                  fontFamily: 'Dancing Script, cursive', 
                  color: 'var(--primary-light)',
                  minHeight: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: '1.4'
                }}
              >
                {currentWish}
              </p>
              <button 
                id="wish-btn" 
                className="btn-primary" 
                onClick={handleNextWish}
                style={{ padding: '10px 24px', fontSize: '0.85rem', marginTop: '20px' }}
              >
                Draw Another Note 💖
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: OUR STORY TIMELINE */}
        {activeTab === 'story' && (
          <section className="timeline-section">
            <h2 className="timeline-title">Our Romantic Odyssey</h2>
            
            <div className="timeline-grid">
              {/* Left Timeline milestone lists */}
              <div className="timeline-list">
                {LOVE_MEMORIES.map((memory) => (
                  <div 
                    key={memory.id} 
                    className={`timeline-card glass-card ${activeMemory.id === memory.id ? 'active' : ''}`}
                    onClick={() => setActiveMemory(memory)}
                  >
                    <div className="timeline-header">
                      <span className="timeline-icon">{memory.icon}</span>
                      <div className="timeline-meta">
                        <span className="timeline-date">{memory.date}</span>
                        <h3>{memory.title}</h3>
                        <p>{memory.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Memory spotlights */}
              <div className="timeline-detail-card glass-card">
                <div className="timeline-detail-decor">
                  <i className="fa-solid fa-heart"></i>
                </div>
                <span className="timeline-detail-tag">Memory Spotlight</span>
                <h3 className="timeline-detail-title">{activeMemory.title}</h3>
                <p className="timeline-detail-text">
                  "{activeMemory.story}"
                </p>
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: MEDIA GALLERY */}
        {activeTab === 'gallery' && (
          <section className="gallery-section">
            <h2 className="timeline-title">Captured Moments</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.1rem' }}>
              Every photograph and clip is a page in our memory book. Click to play videos.
            </p>
            
            <div className="gallery-grid">
              {GALLERY_ITEMS.map((item, index) => (
                <GalleryCard key={index} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* TAB 4: COMPATIBILITY CALCULATOR */}
        {activeTab === 'calculator' && (
          <section className="calculator-section">
            <h2 className="timeline-title">Spark Calculator</h2>
            <div className="calc-card glass-card">
              
              {!calcResult && !calcLoading && (
                <form onSubmit={handleCalculateLove} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="calc-inputs">
                    <div className="calc-input-group">
                      <label className="calc-label">Your Name</label>
                      <input 
                        type="text" 
                        value={calcNames.name1} 
                        onChange={(e) => setCalcNames({ ...calcNames, name1: e.target.value })}
                        className="calc-field"
                        required 
                      />
                    </div>
                    <div className="calc-input-group">
                      <label className="calc-label">Her Name</label>
                      <input 
                        type="text" 
                        value={calcNames.name2} 
                        onChange={(e) => setCalcNames({ ...calcNames, name2: e.target.value })}
                        className="calc-field"
                        required 
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Calculate Compatibility ❤️
                  </button>
                </form>
              )}

              {calcLoading && (
                <div className="calc-progress-container">
                  <div className="calc-progress-heart">❤️</div>
                  <div className="calc-progress-text">Connecting Souls... {calcProgress}%</div>
                  <div className="calc-progress-bg">
                    <div className="calc-progress-bar" style={{ width: `${calcProgress}%` }}></div>
                  </div>
                </div>
              )}

              {calcResult && (
                <div className="calc-result-container">
                  <div className="calc-result-title">Compatibility Score</div>
                  <div className="calc-result-score">{calcResult.score}%</div>
                  <p className="calc-result-message">"{calcResult.message}"</p>
                  <button 
                    className="btn-secondary" 
                    onClick={() => setCalcResult(null)} 
                    style={{ padding: '12px 30px', borderRadius: '50px' }}
                  >
                    Try Again 💫
                  </button>
                </div>
              )}

            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p style={{ color: 'var(--text-muted)' }}>Made with ❤️ for Anu & Ashik</p>
        <button className="scroll-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ↑
        </button>
      </footer>
    </React.Fragment>
  );
}
