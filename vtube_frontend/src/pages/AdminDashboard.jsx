import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Plus, Search, Edit2, Trash2, Video, BarChart2, Users, Settings, Layout, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { getVideos, createVideo, updateVideo, patchVideoAvailability } from '../api/videoApi';

const AdminDashboard = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', poster_url: '', video_url: '' });
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const data = await getVideos();
      setVideos(data);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      const updated = await patchVideoAvailability(id, { availability: !currentStatus });
      setVideos(videos.map(v => v.id === id ? { ...v, availability: updated.availability } : v));
      // Toast handles success
    } catch (error) {
      console.error('Failed to toggle availability:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (editingVideo) {
        const updated = await updateVideo(editingVideo.id, formData);
        setVideos(videos.map(v => v.id === editingVideo.id ? updated : v));
      } else {
        const created = await createVideo(formData);
        setVideos([created, ...videos]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description || '',
      poster_url: video.poster_url || '',
      video_url: video.video_url || ''
    });
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingVideo(null);
    setFormData({ title: '', description: '', poster_url: '', video_url: '' });
  };

  return (
    <div className="min-h-screen bg-black pt-16 flex selection:bg-red-500/30">
      <Navbar />
      
      {/* Sidebar */}
      <aside className="w-72 bg-zinc-950 border-r border-zinc-900 hidden xl:flex flex-col p-8 fixed h-[calc(100vh-64px)] top-16 left-0 z-40">
        <div className="space-y-4">
          <button className="w-full flex items-center gap-4 px-6 py-4 bg-red-600/10 text-red-500 rounded-3xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-600/5 ring-1 ring-red-600/20">
            <Layout size={20} /> Dashboard
          </button>
          {[
            { icon: Video, label: 'Content' },
            { icon: BarChart2, label: 'Analytics' },
            { icon: Users, label: 'Audience' },
            { icon: Settings, label: 'System' },
          ].map((item, idx) => (
            <button key={idx} className="w-full flex items-center gap-4 px-6 py-4 text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-3xl transition-all font-black text-xs uppercase tracking-widest">
              <item.icon size={20} /> {item.label}
            </button>
          ))}
        </div>
        
        <div className="mt-auto p-6 bg-zinc-900/50 rounded-[2rem] border border-zinc-800">
          <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-3">Storage Health</p>
          <div className="w-full bg-zinc-800 rounded-full h-1.5 ring-1 ring-zinc-700/50">
            <div className="bg-red-600 h-1.5 rounded-full w-3/4 shadow-lg shadow-red-600/50"></div>
          </div>
          <p className="text-[10px] text-zinc-400 mt-4 font-bold flex justify-between">
            <span>7.8 GB USED</span>
            <span className="text-red-500">75%</span>
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 xl:ml-72 p-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter">Command Center</h1>
            <p className="text-zinc-500 mt-2 font-medium">Synchronizing your channel's digital assets</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-3 px-8 h-14 rounded-3xl shadow-2xl shadow-red-600/30 text-xs font-black uppercase tracking-[0.2em] group transition-all active:scale-95">
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Create Content
          </Button>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { label: 'Cloud Views', value: '12.8M', growth: '+24%', icon: BarChart2, color: 'text-blue-500' },
            { label: 'Active Users', value: '4.2M', growth: '+15%', icon: Users, color: 'text-purple-500' },
            { label: 'Net Revenue', value: '$84,500', growth: '+42%', icon: Layout, color: 'text-green-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative group hover:border-red-600/30 transition-all cursor-default">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <stat.icon size={100} />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                <h3 className="text-4xl font-black text-white tracking-tighter">{stat.value}</h3>
                <div className="mt-4 inline-flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full ring-1 ring-zinc-800">
                  <CheckCircle size={10} className="text-green-500" />
                  <span className="text-green-500 text-[10px] font-black uppercase tracking-widest">{stat.growth}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6 bg-zinc-950/20">
            <h2 className="text-2xl font-black text-white tracking-tight uppercase">Channel Assets</h2>
            <div className="relative w-full md:w-80 group">
              <input 
                type="text" 
                placeholder="Search index..." 
                className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-3 pl-12 text-sm text-white focus:outline-none focus:border-red-600 transition-all font-medium" 
              />
              <Search size={18} className="absolute left-4 top-3.5 text-zinc-600 group-focus-within:text-red-600 transition-colors" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-red-600" size={40} />
                <p className="text-zinc-600 font-black uppercase text-[10px] tracking-widest animate-pulse">Syncing Database...</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-zinc-500 text-[10px] uppercase font-black tracking-[0.2em] bg-black/40">
                    <th className="px-8 py-5">Video Asset</th>
                    <th className="px-8 py-5">Availability</th>
                    <th className="px-8 py-5">Timestamp</th>
                    <th className="px-8 py-5">Metrics</th>
                    <th className="px-8 py-5 text-right">Admin Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {videos.map(v => (
                    <tr key={v.id} className="hover:bg-red-600/[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-5">
                          <div className="w-24 aspect-video bg-black rounded-xl overflow-hidden ring-1 ring-zinc-800 shadow-xl">
                            <img src={v.poster_url || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=150'} alt="thumb" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          </div>
                          <span className="text-white font-black text-sm tracking-tight leading-tight max-w-[200px] block">{v.title}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <button 
                          onClick={() => handleToggle(v.id, v.availability)}
                          className={`group flex items-center gap-3 px-4 py-1.5 rounded-full ring-1 transition-all ${
                            v.availability 
                              ? 'bg-green-500/10 text-green-500 ring-green-500/20' 
                              : 'bg-zinc-800/50 text-zinc-500 ring-zinc-700/30'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full shadow-[0_0_8px] ${v.availability ? 'bg-green-500 shadow-green-500' : 'bg-zinc-600 shadow-zinc-600'}`}></div>
                          <span className="text-[10px] font-black uppercase tracking-widest">{v.availability ? 'Active' : 'Offline'}</span>
                        </button>
                      </td>
                      <td className="px-8 py-6 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                        {new Date(v.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-6 text-zinc-300 text-sm font-black tracking-tighter">
                        {v.views_count?.toLocaleString() || 0}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleEdit(v)} className="p-3 bg-zinc-800 hover:bg-white hover:text-black text-zinc-400 rounded-2xl transition-all shadow-md active:scale-90"><Edit2 size={16} /></button>
                          <button className="p-3 bg-zinc-800 hover:bg-red-600 hover:text-white text-zinc-400 rounded-2xl transition-all shadow-md active:scale-90"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* Upload/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-12 w-full max-w-xl shadow-[0_0_100px_rgba(220,38,38,0.15)] animate-in zoom-in-95 duration-500">
            <h2 className="text-3xl font-black text-white mb-10 tracking-tight uppercase text-center">
              {editingVideo ? 'Update Resource' : 'Create New Asset'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <Input label="Asset Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Mastering the Digital Realm" required />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Source URL (Video)" value={formData.video_url} onChange={(e) => setFormData({...formData, video_url: e.target.value})} placeholder="https://..." required />
                <Input label="Poster URL (Thumbnail)" value={formData.poster_url} onChange={(e) => setFormData({...formData, poster_url: e.target.value})} placeholder="https://..." required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Description Brief</label>
                <textarea 
                   className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-red-600 transition-all h-32 font-medium"
                   value={formData.description}
                   onChange={(e) => setFormData({...formData, description: e.target.value})}
                   placeholder="Synthesizing the core of this content..."
                />
              </div>
              <div className="flex gap-4 pt-6">
                <button type="button" className="flex-1 rounded-[1.5rem] h-14 font-black uppercase text-[10px] tracking-widest text-zinc-500 hover:text-white transition-colors" onClick={handleCloseModal}>Discard</button>
                <Button type="submit" className="flex-1 rounded-[1.5rem] h-14 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-red-600/20" loading={actionLoading}>
                  {editingVideo ? 'Sync Changes' : 'Initialize Asset'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
