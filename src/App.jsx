import React, { useState, useEffect, useRef } from 'react';

// 1. Data Definitions
const LOVE_MEMORIES = [
  {
    id: 1,
    date: "August 14, 2023",
    title: "The Day We First Met",
    desc: "A simple glance that changed my world forever. The day my soul recognized yours.",
    icon: "fa-calendar-days",
    iconBg: "#ff758c",
    thumb: "/assets/gallery/gallery3.jpg",
    story: "It was a warm afternoon when our eyes met. The crowded room suddenly grew quiet, and in that split second, I knew my life would never be the same. That initial smile of yours remains etched in my heart."
  },
  {
    id: 2,
    date: "Aug 2023 - Feb 2025",
    title: "Beautiful Friendship",
    desc: "A chapter of shared secrets, endless laughter, and a bond that grew stronger every day.",
    icon: "fa-mug-hot",
    iconBg: "#f3a683",
    thumb: "/assets/gallery/gallery5.jpg",
    story: "We built our bond cup by cup, laugh by laugh. We shared dreams, supported each other through late-night study sessions, and talked about everything under the sun. You became my safe space."
  },
  {
    id: 3,
    date: "February 24, 2025",
    title: "The Big Proposal",
    desc: "With a heart full of hope, I asked you to be my forever. The day I promised to love you always.",
    icon: "fa-ring",
    iconBg: "#786fa6",
    thumb: "/assets/gallery/gallery15.jpg",
    story: "My heart was pounding, my hands slightly shaking as I looked into your eyes and asked you to stand by me for the rest of our lives. It was a promise of a lifetime, wrapped in hope."
  },
  {
    id: 4,
    date: "August 24, 2025",
    title: "She Accepted! ❤️",
    desc: "The most beautiful 'Yes' I've ever heard. Our story officially entered its greatest chapter.",
    icon: "fa-heart",
    iconBg: "#e84393",
    thumb: "/assets/gallery/gallery2.png",
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

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [daysLeft, setDaysLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [activeMemory, setActiveMemory] = useState(LOVE_MEMORIES[0]);
  const [currentWish, setCurrentWish] = useState(ROMANTIC_WISHES[0]);

  // Life Journey Scroll Fill Height State (%)
  const [journeyProgress, setJourneyProgress] = useState(0);

  // Video Lightbox Modal State
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('/assets/anu/WhatsApp Video 2026-04-24 at 1.08.47 PM (1).mp4');

  // Love Calculator States
  const [calcNames, setCalcNames] = useState({ name1: 'Ashik', name2: 'Anu' });
  const [calcResult, setCalcResult] = useState(null);
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcProgress, setCalcProgress] = useState(0);

  // Audio BGM Ref
  const audioRef = useRef(null);

  // Calculate Life Journey Path Progress on Scroll
  useEffect(() => {
    const handleJourneyScroll = () => {
      const section = document.getElementById('story');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;
      const currentPos = windowHeight - rect.top;

      let percentage = (currentPos / (totalHeight + windowHeight * 0.2)) * 100;
      percentage = Math.max(0, Math.min(100, percentage));
      setJourneyProgress(percentage);
    };

    window.addEventListener('scroll', handleJourneyScroll);
    return () => window.removeEventListener('scroll', handleJourneyScroll);
  }, []);

  // IntersectionObserver for Scroll Reveal Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-scale, .reveal-left, .reveal-right, .journey-item');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Smooth scroll handler
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveTab(sectionId);
    }
  };

  // Scroll active section sync
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'story', 'moments', 'gallery', 'widgets'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live anniversary counter
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

  // Music toggle
  const handleToggleMusic = () => {
    if (isPlayingMusic) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Music blocked: " + e));
    }
    setIsPlayingMusic(!isPlayingMusic);
  };

  // Open Video Lightbox
  const handleOpenVideo = (videoUrl) => {
    if (videoUrl) setCurrentVideoUrl(videoUrl);
    setShowVideoModal(true);
  };

  // Wish Card
  const handleNextWish = () => {
    let newWish = currentWish;
    while (newWish === currentWish) {
      const index = Math.floor(Math.random() * ROMANTIC_WISHES.length);
      newWish = ROMANTIC_WISHES[index];
    }
    setCurrentWish(newWish);
  };

  // Spark Calculator
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
        
        let score = 95 + Math.floor(Math.random() * 5);
        let message = "A perfect cosmic connection! Your paths were written in the stars.";
        
        if ((n1.includes('ashik') && n2.includes('anu')) || (n1.includes('anu') && n2.includes('ashik'))) {
          score = 100;
          message = "100% Eternal Soulmates! Ashik ❤️ Anu. Your love is destined to stand the test of time and space.";
        }
        
        setCalcResult({ score, message });
        setCalcLoading(false);
      }
    }, 60);
  };

  return (
    <React.Fragment>
      {/* Audio BGM */}
      <audio ref={audioRef} id="romantic-music-audio" loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>

      {/* Navigation Header */}
      <nav className="navbar">
        <div className="logo" onClick={() => scrollToSection('home')}>
          <i className="fa-solid fa-heart" style={{ color: 'var(--primary-rose)', fontSize: '1.4rem' }}></i> Our Story
        </div>

        <ul className="nav-links">
          <li>
            <button className={activeTab === 'home' ? 'active' : ''} onClick={() => scrollToSection('home')}>
              Home
            </button>
          </li>
          <li>
            <button className={activeTab === 'story' ? 'active' : ''} onClick={() => scrollToSection('story')}>
              Our Story
            </button>
          </li>
          <li>
            <button className={activeTab === 'gallery' ? 'active' : ''} onClick={() => scrollToSection('gallery')}>
              Gallery
            </button>
          </li>
          <li>
            <button className={activeTab === 'moments' ? 'active' : ''} onClick={() => scrollToSection('moments')}>
              Moments
            </button>
          </li>
          <li>
            <button className={activeTab === 'widgets' ? 'active' : ''} onClick={() => scrollToSection('widgets')}>
              Music
            </button>
          </li>
        </ul>

        <div className="nav-right-group">
          <button className="btn-header-watch" onClick={() => handleOpenVideo('/assets/anu/WhatsApp Video 2026-04-24 at 1.08.47 PM (1).mp4')}>
            Watch Our Video <i className="fa-solid fa-circle-play"></i>
          </button>
        </div>
      </nav>

      {/* Floating BGM Player */}
      <div className="music-widget-floating" onClick={handleToggleMusic}>
        <div className={`equalizer-container ${isPlayingMusic ? 'playing' : ''}`}>
          <div className="equalizer-bar"></div>
          <div className="equalizer-bar"></div>
          <div className="equalizer-bar"></div>
          <div className="equalizer-bar"></div>
        </div>
        <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
          {isPlayingMusic ? 'Now Playing' : 'Play Music'}
        </span>
      </div>

      <main>
        {/* HERO SECTION (ULTRA-PREMIUM SIDE-BY-SIDE DESIGN) */}
        <section id="home" className="hero-section">
          {/* Left Text Content */}
          <div className="hero-left-content reveal-left">
            <div className="welcome-pill-badge">
              <span>✨</span> WELCOME TO OUR STORY <span>✨</span>
            </div>
            
            <h1 className="hero-title">
              Our <span className="title-pink-gradient">Love Story</span>
              <span className="title-accent">💕</span>
            </h1>

            <p className="hero-subtitle">
              A journey that started with a glance and became our forever. Dedicated to the one who makes my heart skip a beat.
            </p>

            <div className="hero-actions">
              <button className="btn-primary-gradient" onClick={() => scrollToSection('story')}>
                Explore Our Story 💖
              </button>

              <button className="btn-outline-glass" onClick={() => handleOpenVideo('/assets/anu/WhatsApp Video 2026-04-24 at 1.08.47 PM (1).mp4')}>
                Watch Video <i className="fa-solid fa-circle-play"></i>
              </button>
            </div>
          </div>

          {/* Right Hero Portrait Frame */}
          <div className="hero-right-container reveal-right">
            <div className="hero-portrait-card">
              {/* Top Glass Tag Badge */}
              <div className="hero-top-tag-badge">
                <i className="fa-solid fa-heart" style={{ color: '#ff4757' }}></i> Soulmates Forever
              </div>

              <img 
                src="/assets/gallery/gallery1.png" 
                alt="Ashik & Anu" 
              />
            </div>

            {/* Overlaid Corner Glass Quote Badge */}
            <div className="hero-right-badge reveal-scale stagger-2">
              <div className="badge-heart-icon">
                <i className="fa-solid fa-heart"></i>
              </div>
              <p className="badge-quote-text">
                Every love story is beautiful, ours is my favorite.
              </p>
              <div style={{ marginTop: '8px', color: 'var(--primary-rose)', fontSize: '0.9rem' }}>♥</div>
            </div>
          </div>

          {/* Curved SVG Wave Divider */}
          <svg className="hero-wave-divider" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 40C360 90 720 10 1080 60C1260 85 1380 50 1440 40V100H0V40Z" fill="var(--bg-cream)"/>
          </svg>

          {/* Scroll Down Arrow */}
          <button className="scroll-down-btn" onClick={() => scrollToSection('story')}>
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        </section>

        {/* SECTION 2: OUR STORY - LIFE JOURNEY SCROLL PATH TIMELINE */}
        <section id="story" className="timeline-section-custom">
          <div className="section-tagline reveal-on-scroll">
            <i className="fa-solid fa-heart"></i> LIFE JOURNEY <i className="fa-solid fa-heart"></i>
          </div>

          <h2 className="section-main-title reveal-on-scroll">
            The Moments That Made <span className="highlight-pink">Us</span>
          </h2>

          <div className="journey-timeline-container">
            {/* Background Track Line */}
            <div className="journey-track-bg"></div>

            {/* Animated Dynamic Scroll Progress Line */}
            <div className="journey-progress-bar" style={{ height: `${journeyProgress}%` }}></div>

            {/* Alternating Journey Milestones */}
            {LOVE_MEMORIES.map((memory, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={memory.id} 
                  className={`journey-item ${isEven ? 'journey-item-left reveal-left' : 'journey-item-right reveal-right'}`}
                  onClick={() => setActiveMemory(memory)}
                >
                  {/* Center Node Badge */}
                  <div className="journey-center-node" style={{ backgroundColor: memory.iconBg }}>
                    <i className={`fa-solid ${memory.icon}`}></i>
                  </div>

                  {/* Card Box */}
                  <div className="journey-card-box">
                    <span className="journey-date-tag">{memory.date}</span>
                    <h3 className="journey-card-title">{memory.title}</h3>
                    <p className="journey-card-desc">{memory.desc}</p>
                    <img src={memory.thumb} alt={memory.title} className="journey-photo-thumb" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: AND THIS IS JUST THE BEGINNING */}
        <section id="moments" className="beginning-banner-section">
          {/* Left Polaroid Stack */}
          <div className="polaroid-stack-container reveal-left">
            <div className="polaroid-card polaroid-1">
              <div className="polaroid-tape"></div>
              <img src="/assets/gallery/gallery18.jpg" alt="Polaroid Memory 1" />
            </div>

            <div className="polaroid-card polaroid-2">
              <div className="polaroid-tape"></div>
              <img src="/assets/gallery/gallery19.jpg" alt="Polaroid Memory 2" />
            </div>

            <div className="polaroid-label">
              Memories we cherish forever 💕
            </div>
          </div>

          {/* Right Content */}
          <div className="beginning-right-content reveal-right">
            <div className="section-tagline" style={{ justifyContent: 'flex-start' }}>
              <i className="fa-solid fa-heart"></i> COUNTLESS MEMORIES <i className="fa-solid fa-heart"></i>
            </div>

            <h2 className="beginning-title">
              And This Is Just the Beginning 💕
            </h2>

            <p className="beginning-desc">
              Thank you for being the most beautiful part of my story. Every day spent with you is a gift I will treasure for the rest of my life.
            </p>

            <button className="btn-primary-gradient" onClick={() => scrollToSection('gallery')}>
              See Our Gallery <i className="fa-solid fa-images"></i>
            </button>
          </div>
        </section>

        {/* SECTION 4: CAPTURED MOMENTS (GALLERY) */}
        <section id="gallery" className="gallery-section-custom">
          <div className="section-tagline reveal-on-scroll">
            <i className="fa-solid fa-heart"></i> OUR MEMORIES <i className="fa-solid fa-heart"></i>
          </div>

          <h2 className="section-main-title reveal-on-scroll">Captured Moments</h2>

          <div className="gallery-grid-custom">
            {GALLERY_ITEMS.map((item, index) => (
              <div 
                key={index} 
                className={`gallery-card-item reveal-scale stagger-${(index % 4) + 1}`} 
                onClick={() => item.type === 'video' ? handleOpenVideo(item.url) : null}
              >
                <div className="gallery-media-wrapper">
                  {item.type === 'video' ? (
                    <React.Fragment>
                      <video src={item.url} muted preload="metadata" />
                      <div className="play-overlay-badge">
                        <i className="fa-solid fa-play"></i>
                      </div>
                    </React.Fragment>
                  ) : (
                    <img src={item.url} alt={item.title} loading="lazy" />
                  )}
                </div>

                <div className="gallery-card-caption-custom">
                  <h4>{item.title.split(' - ')[0]}</h4>
                  <p>{item.title.split(' - ')[1] || item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: COUNTDOWN & SPARK CALCULATOR */}
        <section id="widgets" className="widgets-section-custom">
          <div className="section-tagline reveal-on-scroll">
            <i className="fa-solid fa-heart"></i> FOREVER & ALWAYS <i className="fa-solid fa-heart"></i>
          </div>

          <h2 className="section-main-title reveal-on-scroll">Love & Compatibility</h2>

          <div className="widgets-grid-container">
            {/* Live Counter Widget */}
            <div className="widget-card-custom reveal-left">
              <h3 className="widget-title">Our Journey Started</h3>
              <div style={{ color: 'var(--primary-rose)', fontWeight: '600', marginBottom: '20px' }}>August 24, 2025</div>

              <div className="countdown-grid-custom">
                <div className="countdown-box">
                  <div className="countdown-num">{daysLeft.days}</div>
                  <div className="countdown-lbl">Days</div>
                </div>
                <div className="countdown-box">
                  <div className="countdown-num">{String(daysLeft.hours).padStart(2, '0')}</div>
                  <div className="countdown-lbl">Hours</div>
                </div>
                <div className="countdown-box">
                  <div className="countdown-num">{String(daysLeft.minutes).padStart(2, '0')}</div>
                  <div className="countdown-lbl">Mins</div>
                </div>
                <div className="countdown-box">
                  <div className="countdown-num">{String(daysLeft.seconds).padStart(2, '0')}</div>
                  <div className="countdown-lbl">Secs</div>
                </div>
              </div>

              {/* Love Note Drawer */}
              <div style={{ background: 'var(--bg-cream)', padding: '20px', borderRadius: '16px', marginTop: '20px' }}>
                <p style={{ fontFamily: 'var(--font-cursive)', fontSize: '1.5rem', color: 'var(--primary-rose)', minHeight: '60px' }}>
                  "{currentWish}"
                </p>
                <button className="btn-primary-gradient" onClick={handleNextWish} style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
                  Draw Another Note 💖
                </button>
              </div>
            </div>

            {/* Spark Calculator Widget */}
            <div className="widget-card-custom reveal-right">
              <h3 className="widget-title">Spark Calculator</h3>

              {!calcResult && !calcLoading && (
                <form onSubmit={handleCalculateLove} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                  <input 
                    type="text" 
                    value={calcNames.name1} 
                    onChange={(e) => setCalcNames({ ...calcNames, name1: e.target.value })}
                    className="calc-field-custom"
                    placeholder="Your Name"
                    required 
                  />
                  <input 
                    type="text" 
                    value={calcNames.name2} 
                    onChange={(e) => setCalcNames({ ...calcNames, name2: e.target.value })}
                    className="calc-field-custom"
                    placeholder="Her Name"
                    required 
                  />
                  <button type="submit" className="btn-primary-gradient" style={{ justifyContent: 'center', width: '100%' }}>
                    Calculate Compatibility ❤️
                  </button>
                </form>
              )}

              {calcLoading && (
                <div style={{ padding: '30px 0' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>❤️</div>
                  <div style={{ fontWeight: '600', color: 'var(--primary-rose)' }}>Connecting Souls... {calcProgress}%</div>
                </div>
              )}

              {calcResult && (
                <div style={{ padding: '20px 0' }}>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Compatibility Score</div>
                  <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--primary-rose)' }}>{calcResult.score}%</div>
                  <p style={{ fontStyle: 'italic', margin: '15px 0' }}>"{calcResult.message}"</p>
                  <button className="btn-outline-glass" onClick={() => setCalcResult(null)} style={{ color: 'var(--primary-rose)', borderColor: 'var(--primary-rose)' }}>
                    Try Again 💫
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* VIDEO LIGHTBOX POPUP MODAL */}
      {showVideoModal && (
        <div className="video-modal-backdrop" onClick={() => setShowVideoModal(false)}>
          <div className="video-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setShowVideoModal(false)}>×</button>
            <video className="video-modal-player" src={currentVideoUrl} controls autoPlay />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="app-footer-custom">
        <p style={{ color: 'var(--text-muted)' }}>Made with ❤️ for Anu & Ashik</p>
      </footer>
    </React.Fragment>
  );
}
