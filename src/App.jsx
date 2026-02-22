import React, { useEffect, useState } from "react";
import { Home as HomeIcon, User as UserIcon, X, ChevronLeft } from "lucide-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  
  /* 🟢 Update: Default category set to "Leaks" for your new app */
  const [category, setCategory] = useState("Leaks"); 
  const [viewMode, setViewMode] = useState("category"); 
  const [selectedVideo, setSelectedVideo] = useState(null);

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

  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent/30 font-sans">
      
      <main className="pb-[90px] relative z-0">
        {activeTab === "home" ? (
          <Home 
            category={category} 
            setCategory={setCategory} 
            viewMode={viewMode} 
            setViewMode={setViewMode}
            onVideoSelect={(video) => setSelectedVideo(video)}
          />
        ) : (
          <Profile />
        )}
      </main>

      {/* 🧭 NAVIGATION */}
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
            <div style={centerButtonBg} />
            <button style={centerButtonStyle}>
              <span className="mb-0.5 pointer-events-none">+</span>
            </button>
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

      {/* FULLSCREEN PLAYER */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[2000] bg-black flex flex-col animate-in fade-in slide-in-from-bottom duration-300">
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between z-[2002] bg-gradient-to-b from-black/80 to-transparent">
            <button 
              onClick={() => setSelectedVideo(null)} 
              className="p-2 bg-white/10 backdrop-blur-md rounded-full"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={() => setSelectedVideo(null)} 
              className="p-2 bg-white/10 backdrop-blur-md rounded-full"
            >
              <X size={28} />
            </button>
          </div>

          <div className="relative h-full w-full flex items-center justify-center">
            <video 
              autoPlay 
              controls 
              /* 🚫 SECURITY: Disable download menu and picture-in-picture */
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              /* 🚫 PREVENTS RIGHT-CLICK SAVE-AS MENU */
              onContextMenu={(e) => e.preventDefault()}
              src={selectedVideo.video_url} 
              className="w-full h-full object-contain relative z-[2001]" 
            />
          </div>

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent z-[2002] pointer-events-none">
             <h2 className="text-xl font-black italic uppercase tracking-tighter">
               {selectedVideo.caption}
             </h2>
             <p className="text-xs text-zinc-400 mt-1">{selectedVideo.views} views</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const navWrapperStyle = { position: 'fixed', bottom: 0, left: 0, right: 0, height: '88px', backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255, 255, 255, 0.08)', zIndex: 1000, display: 'flex', justifyContent: 'center', paddingBottom: 'env(safe-area-inset-bottom)', pointerEvents: 'auto' };
const navInnerContainer = { width: '100%', maxWidth: '450px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0 10px', height: '100%', position: 'relative' };
const baseBtnStyle = { background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', outline: 'none', flex: 1, height: '100%', position: 'relative', zIndex: 10 };
const activeBtnStyle = { ...baseBtnStyle, color: '#ff3b30' };
const inactiveBtnStyle = { ...baseBtnStyle, color: '#555' };
const labelStyle = { fontSize: '10px', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase' };
const activeIndicator = { position: 'absolute', bottom: '-14px', width: '12px', height: '2px', backgroundColor: '#ff3b30', borderRadius: '2px', boxShadow: '0 0 10px rgba(255, 59, 48, 0.5)' };
const centerButtonStyle = { width: '52px', height: '52px', backgroundColor: '#ff3b30', borderRadius: '50%', border: 'none', color: 'white', fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, position: 'absolute', top: '-26px', boxShadow: '0 4px 15px rgba(255, 59, 48, 0.3)' };
const centerButtonBg = { position: 'absolute', top: '-32px', width: '64px', height: '64px', backgroundColor: '#000', borderRadius: '50%', zIndex: 1 };