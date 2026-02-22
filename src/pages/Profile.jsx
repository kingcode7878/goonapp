import React from 'react';
import { User, Settings, Shield, Crown, LogOut, ChevronRight } from 'lucide-react';

const ProfileItem = ({ icon: Icon, label, value, color = "text-zinc-400" }) => (
  <button className="w-full flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl mb-2 active:scale-[0.98] transition-all group">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-zinc-800 rounded-xl group-active:bg-accent/20 transition-colors">
        <Icon size={20} className="text-zinc-300 group-active:text-accent" />
      </div>
      <span className="text-sm font-bold tracking-tight text-zinc-200">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {value && <span className={`text-xs font-black uppercase italic ${color}`}>{value}</span>}
      <ChevronRight size={16} className="text-zinc-600" />
    </div>
  </button>
);

export default function Profile() {
  return (
    <div className="p-5 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col items-center mt-6 mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-zinc-900 border-2 border-accent p-1 shadow-[0_0_20px_rgba(255,59,48,0.2)]">
            <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
               <User size={48} className="text-zinc-500 mt-2" />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-accent p-1.5 rounded-full border-4 border-black">
            <Crown size={12} className="text-white" />
          </div>
        </div>
        <h2 className="mt-4 text-2xl font-black italic uppercase tracking-tighter">Premium Member</h2>
        <p className="text-accent text-[10px] font-black tracking-[0.2em] uppercase">Status: Active</p>
      </div>

      {/* Account Section */}
      <div className="mb-6">
        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 mb-3">Account Settings</p>
        <ProfileItem icon={User} label="Display Name" value="Anonymous" />
        <ProfileItem icon={Shield} label="Subscription" value="Lifetime" color="text-accent" />
        <ProfileItem icon={Settings} label="Preferences" />
      </div >

      {/* Support Section */}
      <div className="mb-8">
        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 mb-3">Support</p>
        <ProfileItem icon={Shield} label="Privacy Policy" />
        <ProfileItem icon={LogOut} label="Log Out" color="text-red-500" />
      </div>

      <p className="text-center text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
        Xclusive Premium v1.0.4
      </p>
    </div>
  );
}