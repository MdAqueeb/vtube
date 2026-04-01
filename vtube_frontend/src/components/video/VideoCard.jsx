import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Eye, Calendar } from 'lucide-react';

const VideoCard = ({ video }) => {
  if (!video) return null;

  const { id, title, thumbnail_url, views_count, created_at, author } = video;

  return (
    <Link to={`/video/${id}`} className="group cursor-pointer block bg-zinc-900 overflow-hidden rounded-2xl hover:bg-zinc-800 transition-all border border-zinc-900 group-hover:border-zinc-700 shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={thumbnail_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-all duration-300 shadow-2xl">
            <Play fill="white" size={24} className="ml-1 text-white" />
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-red-500 transition-colors">
          {title}
        </h3>
        
        <div className="mt-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 text-[10px] font-bold border border-zinc-700 overflow-hidden">
            {author?.avatar_url ? (
              <img src={author.avatar_url} alt={author.username} className="w-full h-full object-cover" />
            ) : (
              author?.username?.charAt(0).toUpperCase() || 'U'
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-xs text-zinc-300 font-medium truncate">
              {author?.username || 'Channel Name'}
            </p>
            <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-500 font-semibold tracking-wider uppercase">
              <span className="flex items-center gap-1"><Eye size={10} /> {views_count || 0}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar size={10} /> {new Date(created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
