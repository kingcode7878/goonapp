import React from 'react';

export default function Profile() {
  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-24 h-24 bg-zinc-800 rounded-full mb-4 border-2 border-accent flex items-center justify-center">
        <span className="text-3xl font-black italic">X</span>
      </div>
      <h2 className="text-2xl font-black uppercase italic italic tracking-tighter">User Profile</h2>
      <p className="text-zinc-500 text-sm mt-2">Manage your account and saved videos.</p>
      
      <div className="w-full mt-8 space-y-2">
        <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">My Uploads</div>
        <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">Settings</div>
      </div>
    </div>
  );
}