import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import { getAvatarColor, getInitials } from '../utils/avatar';
import { User, Mail, Calendar, Shield, Edit, Save, Loader2, CheckCircle } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { getUserProfile, updateUserProfile } from '../api/authApi';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getUserProfile();
        setFormData({ name: data.name, email: data.email });
        updateUser(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      const updatedUser = await updateUserProfile(formData);
      updateUser(updatedUser);
      setIsEditing(false);
      // Toast message handles success
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="animate-spin text-red-600" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 selection:bg-red-500/30">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 overflow-hidden relative shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-red-600/30 to-black/10 opacity-30 z-0"></div>
          
          <div className="relative flex flex-col md:flex-row items-center md:items-end gap-8 z-10">
            <div 
              className="w-40 h-40 rounded-[2.5rem] border-[6px] border-zinc-900 shadow-2xl flex items-center justify-center text-5xl font-black text-white hover:rotate-2 transition-transform duration-500 cursor-default"
              style={{ backgroundColor: getAvatarColor(user?.name || 'User') }}
            >
              {getInitials(user?.name || 'User')}
            </div>
            
            <div className="flex-1 text-center md:text-left mb-4">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <h1 className="text-4xl font-black text-white tracking-tighter">{user?.name}</h1>
                <CheckCircle size={20} className="text-red-500 fill-red-500" />
              </div>
              <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center md:justify-start gap-2">
                <Mail size={12} className="text-red-600" /> {user?.email}
              </p>
            </div>
            
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? 'secondary' : 'outline'}
              className="flex items-center gap-2 rounded-2xl mb-4 px-6 h-11 font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all"
            >
              {isEditing ? 'Cancel Edit' : <><Edit size={14} /> Edit Identity</>}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 shadow-2xl animate-in fade-in duration-1000">
              <h2 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                <div className="w-2 h-6 bg-red-600 rounded-full"></div>
                Profile Details
              </h2>
              
              {isEditing ? (
                <form onSubmit={handleUpdate} className="space-y-8">
                  <Input 
                    label="Display Name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />
                  <Input 
                    label="Sync Email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  />
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full h-14 rounded-2xl font-black uppercase text-xs tracking-[0.2em]" 
                      loading={saveLoading}
                    >
                      <Save size={18} className="mr-2" /> Commit Changes
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-10">
                  <div className="flex items-center justify-between group">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Username</p>
                      <p className="text-lg font-bold text-white transition-all group-hover:text-red-500">{user?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between group">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Primary Email</p>
                      <p className="text-lg font-bold text-white transition-all group-hover:text-red-500">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between group">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Access Role</p>
                      <div className={`mt-2 inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                        user?.role === 'admin' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      }`}>
                        {user?.role}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 shadow-2xl flex flex-col justify-center items-center text-center">
              <Shield size={48} className="text-red-600 mb-6" />
              <h2 className="text-2xl font-black text-white tracking-tight">Security & Privacy</h2>
              <p className="text-zinc-500 text-sm mt-3 font-medium px-10 leading-relaxed mb-8">Maintain account integrity by rotating credentials and managing access tiers.</p>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button variant="secondary" className="flex-1 rounded-2xl h-12 font-black uppercase text-[10px] tracking-widest">Reset Keys</Button>
                <Button variant="outline" className="flex-1 rounded-2xl h-12 font-black uppercase text-[10px] tracking-widest text-red-500/60 hover:text-red-500">Purge Memory</Button>
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 text-center shadow-2xl">
              <div className="space-y-10">
                <div>
                  <p className="text-4xl font-black text-white tracking-tighter">1,240</p>
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-2 border-b border-zinc-800 pb-4">Views Generated</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-white tracking-tighter">45</p>
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-2 border-b border-zinc-800 pb-4">Subscribed Channels</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-white tracking-tighter">2.4K</p>
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-2 border-zinc-800">Total Interactions</p>
                </div>
              </div>
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 text-center shadow-2xl relative overflow-hidden group">
               <Calendar size={80} className="absolute -right-4 -bottom-4 text-zinc-800 opacity-20 transform -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
               <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Archive Member</p>
               <p className="text-sm font-bold text-white">Joined OCT 2023</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Profile;
