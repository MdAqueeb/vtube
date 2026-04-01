import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import VideoCard from '../components/video/VideoCard';
import { getVideos } from '../api/videoApi';
import { Loader2, PlayCircle } from 'lucide-react';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const data = await getVideos();
        // Filter locally if search query exists (as backend search is UI-only per instructions)
        if (searchQuery) {
          const filtered = data.filter(v => 
            v.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setVideos(filtered);
        } else {
          setVideos(data);
        }
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 selection:bg-red-500/30">
      <Navbar />
      
      <main className="max-w-[1700px] mx-auto px-6 md:px-10">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-red-500 mb-2">
              <PlayCircle size={18} />
              <span className="text-[10px] uppercase font-black tracking-[0.2em]">Latest Content</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {searchQuery ? `Search: "${searchQuery}"` : 'Recommended For You'}
            </h1>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
            {['All', 'Development', 'Design', 'Science', 'Gaming', 'Music', 'Tech'].map((tag) => (
              <button 
                key={tag} 
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  tag === 'All' 
                    ? 'bg-white text-black border-white shadow-lg' 
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="animate-spin text-red-600 mb-4" size={48} />
            <p className="text-zinc-500 font-bold animate-pulse">Scanning the platform...</p>
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-500">No videos found.</h2>
            <p className="text-zinc-600 text-sm mt-2">Try adjusting your search or category filters.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
