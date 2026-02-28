import React, { useEffect, useState, useRef } from "react";
import { Home as HomeIcon, User as UserIcon, X, ChevronLeft } from "lucide-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  
  /* 🟢 State set to match your first new category */
  const [category, setCategory] = useState("Leaks"); 
  const [viewMode, setViewMode] = useState("category"); 
  const [selectedVideo, setSelectedVideo] = useState(null);

  // 🟢 List of 10 Ad Links (Preserved)
  const adLinks = [
    "https://omg10.com/4/10607690",
    "https://omg10.com/4/10607684",
    "https://omg10.com/4/10607691",
    "https://omg10.com/4/10607685",
    "https://omg10.com/4/10607693",
    "https://omg10.com/4/10607686",
    "https://omg10.com/4/10607692",
    "https://omg10.com/4/10607687",
    "https://omg10.com/4/10607689",
    "https://omg10.com/4/10607691"
  ];

  // 🟢 Handle random ad and video selection (Preserved Ad Logic)
  const handleVideoSelect = (video) => {
    const randomAd = adLinks[Math.floor(Math.random() * adLinks.length)];
    
    // Attempt pop-under (opens new tab, brings focus back to app)
    const adWindow = window.open(randomAd, '_blank');
    if (adWindow) {
      window.focus();
    }
    
    setSelectedVideo(video);
  };

  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#000000');
      tg.setBackgroundColor('#000000');
    }
  }, []);

  // --- 🟢 Video Player Component (Static Centering, Interaction Fix, & 3s Auto-Hide) ---
  const VideoPlayer = ({ video, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
    const timerRef = useRef(null);

    const resetTimer = () => {
      setIsVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    useEffect(() => {
      resetTimer();
      return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, []);

    return (
      <div 
        className="absolute inset-0 z-[2000] bg-black flex flex-col h-full w-full overflow-hidden animate-in fade-in slide-in-from-bottom duration-300"
        onMouseMove={resetTimer}
        onClick={resetTimer}
        onTouchStart={resetTimer}
      >
        {/* Header: Controls (pointer-events-auto ensures buttons work) */}
        <div className={`absolute top-0 left-0 right-0 p-6 flex justify-between z-[2002] bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-500 pointer-events-none ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <button onClick={onClose} className="p-2 bg-white/10 backdrop-blur-md rounded-full pointer-events-auto active:scale-95 transition-transform"><ChevronLeft size={28} /></button>
          <button onClick={onClose} className="p-2 bg-white/10 backdrop-blur-md rounded-full pointer-events-auto active:scale-95 transition-transform"><X size={28} /></button>
        </div>

        {/* Video: Centered (Always interactive) */}
        <div className="flex-1 flex items-center justify-center bg-black h-full w-full relative z-[2001]">
          <video 
            autoPlay controls 
            controlsList="nodownload noplaybackrate" 
            disablePictureInPicture 
            onContextMenu={(e) => e.preventDefault()}
            src={video.video_url} 
            className="w-full max-h-full object-contain" 
            onPlay={resetTimer}
          />
        </div>

        {/* Footer: Caption (pointer-events-none lets you click the video controls THROUGH the text) */}
        <div className={`absolute bottom-0 left-0 right-0 p-8 pb-12 bg-gradient-to-t from-black via-black/60 to-transparent z-[2002] transition-opacity duration-500 pointer-events-none ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-xl font-black italic uppercase tracking-tighter leading-tight">{video.caption}</h2>
          <p className="text-xs text-zinc-400 mt-1 font-bold uppercase tracking-widest">{video.views} views</p>
        </div>
      </div>
    );
  };

  // --- Shared Navigation UI ---
  const NavigationUI = () => (
    <nav style={navWrapperStyle}>
      <div style={navInnerContainer}>
        <button onClick={() => handleTabClick("home")} style={activeTab === 'home' ? activeBtnStyle : inactiveBtnStyle}>
          <div className="relative flex flex-col items-center pointer-events-none">
            <HomeIcon size={22} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            {activeTab === 'home' && <div style={activeIndicator} />}
          </div>
          <span style={labelStyle}>Home</span>
        </button>
        <div className="relative flex items-center justify-center w-[64px]">
          <div style={centerButtonBg} /><button style={centerButtonStyle}>+</button>
        </div>
        <button onClick={() => handleTabClick("profile")} style={activeTab === 'profile' ? activeBtnStyle : inactiveBtnStyle}>
          <div className="relative flex flex-col items-center pointer-events-none">
            <UserIcon size={22} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
            {activeTab === 'profile' && <div style={activeIndicator} />}
          </div>
          <span style={labelStyle}>Profile</span>
        </button>
      </div>
    </nav>
  );

  const isTelegram = !!window.Telegram?.WebApp?.initData;

  // 1. 🟢 TELEGRAM VIEW CODE
  if (isTelegram) {
    return (
      <div className="min-h-screen bg-black text-white selection:bg-accent/30 font-sans relative overflow-hidden">
        <main className="pb-[90px] h-full overflow-y-auto relative z-0">
          {activeTab === "home" ? <Home category={category} setCategory={setCategory} viewMode={viewMode} setViewMode={setViewMode} onVideoSelect={handleVideoSelect} /> : <Profile />}
        </main>
        <NavigationUI />
        {selectedVideo && <VideoPlayer video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
      </div>
    );
  }

  // Detect Mobile Web
  const isMobileWeb = typeof window !== "undefined" && window.innerWidth < 768;

  // 2. 🟢 MOBILE WEB VIEW CODE
  if (isMobileWeb) {
    return (
      <div className="h-screen w-full bg-black text-white selection:bg-accent/30 font-sans relative overflow-hidden">
        <main className="pb-[90px] h-full overflow-y-auto relative z-0">
          {activeTab === "home" ? <Home category={category} setCategory={setCategory} viewMode={viewMode} setViewMode={setViewMode} onVideoSelect={handleVideoSelect} /> : <Profile />}
        </main>
        <NavigationUI />
        {selectedVideo && <VideoPlayer video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
      </div>
    );
  }

  // 3. 🟢 DESKTOP VIEW CODE
  return (
    <div className="min-h-screen bg-zinc-950 flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-[450px] h-screen bg-black text-white selection:bg-accent/30 font-sans relative overflow-hidden border-x border-zinc-900/50 shadow-2xl">
        <main className="pb-[90px] h-full overflow-y-auto relative z-0">
          {activeTab === "home" ? <Home category={category} setCategory={setCategory} viewMode={viewMode} setViewMode={setViewMode} onVideoSelect={handleVideoSelect} /> : <Profile />}
        </main>
        <NavigationUI />
        {selectedVideo && <VideoPlayer video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
      </div>
    </div>
  );
}

// Styles (Kept Exactly as Original)
const navWrapperStyle = { position: 'absolute', bottom: 0, left: 0, right: 0, height: '88px', backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255, 255, 255, 0.08)', zIndex: 1000, display: 'flex', justifyContent: 'center', paddingBottom: 'env(safe-area-inset-bottom)' };
const navInnerContainer = { width: '100%', maxWidth: '450px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0 10px', height: '100%', position: 'relative' };
const baseBtnStyle = { background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', outline: 'none', flex: 1, height: '100%', position: 'relative', zIndex: 10 };
const activeBtnStyle = { ...baseBtnStyle, color: '#ff3b30' };
const inactiveBtnStyle = { ...baseBtnStyle, color: '#555' };
const labelStyle = { fontSize: '10px', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase' };
const activeIndicator = { position: 'absolute', bottom: '-14px', width: '12px', height: '2px', backgroundColor: '#ff3b30', borderRadius: '2px', boxShadow: '0 0 10px rgba(255, 59, 48, 0.5)' };
const centerButtonStyle = { width: '52px', height: '52px', backgroundColor: '#ff3b30', borderRadius: '50%', border: 'none', color: 'white', fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, position: 'absolute', top: '-26px', boxShadow: '0 4px 15px rgba(255, 59, 48, 0.3)' };
const centerButtonBg = { position: 'absolute', top: '-32px', width: '64px', height: '64px', backgroundColor: '#000', borderRadius: '50%', zIndex: 1 };