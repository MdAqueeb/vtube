import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share2, MoreHorizontal, CheckCircle, MessageSquare, Send, Loader2 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { getVideoById } from '../api/videoApi';
import { getCommentsByVideoId, addComment } from '../api/commentApi';
import { reactToVideo } from '../api/reactionApi';
import { useAuth } from '../context/AuthContext';
import { getAvatarColor, getInitials } from '../utils/avatar';

const VideoDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true);
      try {
        const [videoData, commentsData] = await Promise.all([
          getVideoById(id),
          getCommentsByVideoId(id)
        ]);
        setVideo(videoData);
        setComments(commentsData);
      } catch (error) {
        console.error('Failed to fetch video details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setCommentLoading(true);
    try {
      const addedComment = await addComment(id, { content: newComment });
      setComments([addedComment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleReaction = async (type) => {
  try {
    await reactToVideo(id, { type });

    setVideo((prev) => ({
      ...prev,
      likes_count:
        type === 'LIKE'
          ? (prev.likes_count || 0) + 1
          : (prev.likes_count || 0) - 1
    }));

  } catch (error) {
    console.error(`Failed to ${type} video:`, error);
  }
};


  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center p-20">
      <Loader2 className="animate-spin text-red-600" size={60} />
    </div>
  );

  if (!video) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <h2 className="text-zinc-500 font-bold">Video not found.</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-16 pb-12 selection:bg-red-500/30">
      <Navbar />
      
      <main className="max-w-[1800px] mx-auto px-6 md:px-10 lg:flex gap-10 mt-8">
        <div className="flex-1">
          <div className="aspect-video bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl relative border border-zinc-900 group">
            <video 
              src={video.video_url} 
              poster={video.thumbnail_url}
              controls 
              className="w-full h-full"
            />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-black text-white mt-6 tracking-tight leading-snug">
            {video.title}
          </h1>
          
          <div className="mt-6 flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-zinc-900">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black shadow-lg"
                style={{ backgroundColor: getAvatarColor(video.author?.username || 'Channel') }}
              >
                {getInitials(video.author?.username || 'Channel')}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="font-black text-white">{video.author?.username || 'Vtube Creator'}</h3>
                  <CheckCircle size={14} className="text-blue-500 fill-blue-500" />
                </div>
                <p className="text-xs text-zinc-500 font-bold">Verified Artist</p>
              </div>
              {/* <Button variant="secondary" className="ml-6 rounded-2xl px-6 h-10 text-xs font-black tracking-widest uppercase">Subscribe</Button> */}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-xl">
                <button 
                  onClick={() => handleReaction('LIKE')}
                  className="flex items-center gap-2 px-6 py-2.5 hover:bg-zinc-800 hover:text-red-500 transition-all border-r border-zinc-800"
                >
                  <ThumbsUp size={20} />
                  <span className="text-sm font-black text-white">{video.likes_count || 0}</span>
                </button>
                <button 
                  onClick={() => handleReaction('DISLIKE')}
                  className="px-6 py-2.5 hover:bg-zinc-800 hover:text-red-500 transition-all"
                >
                  <ThumbsDown size={20} />
                </button>
              </div>
              
              <button className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl px-6 py-2.5 transition-all border border-zinc-800 shadow-xl font-black text-xs uppercase tracking-widest">
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>
          
          <div className="mt-8 bg-zinc-900/40 rounded-3xl p-6 border border-zinc-900/60 leading-relaxed">
            <div className="flex gap-4 font-black text-xs text-zinc-500 uppercase tracking-widest">
              <span>{video.views_count || 0} views</span>
              <span>{new Date(video.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-zinc-200 mt-4 text-sm font-medium">
              {video.description || 'No description provided.'}
            </p>
          </div>

          <div className="mt-12">
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare size={24} className="text-red-600" />
              <h2 className="text-2xl font-black text-white tracking-tight">
                {comments.length} Comments
              </h2>
            </div>
            
            <form onSubmit={handleCommentSubmit} className="flex gap-4 mb-10 items-start">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-black shadow-lg shadow-red-600/20 text-xs">
                {user ? getInitials(user.username) : '?'}
              </div>
              <div className="flex-1 relative">
                <textarea
                  placeholder="Write a public comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-red-600 outline-none py-2 text-white font-medium resize-none transition-all placeholder:text-zinc-600"
                  rows={2}
                />
                <div className="mt-3 flex justify-end">
                  <Button 
                    type="submit" 
                    className="rounded-xl px-5 h-9 text-xs font-black tracking-widest uppercase"
                    disabled={commentLoading || !newComment.trim()}
                  >
                    {commentLoading ? <Loader2 className="animate-spin" size={16} /> : 'Post Comment'}
                  </Button>
                </div>
              </div>
            </form>

            <div className="space-y-8">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4 group">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black shadow-lg"
                    style={{ backgroundColor: getAvatarColor(comment.author?.username || 'Anon') }}
                  >
                    {getInitials(comment.author?.username || 'Anon')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-black text-white">{comment.author?.username}</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{new Date(comment.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-zinc-300 font-medium leading-relaxed">{comment.content}</p>
                    <div className="mt-2 flex items-center gap-4 text-zinc-500">
                      <button className="hover:text-red-500 transition-colors"><ThumbsUp size={14} /></button>
                      <button className="hover:text-zinc-300 transition-colors text-[10px] font-black uppercase tracking-wider">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <aside className="lg:w-[450px] mt-12 lg:mt-0">
          <h2 className="text-lg font-black text-white mb-6 tracking-tight uppercase border-l-4 border-red-600 pl-4">Next For You</h2>
          <div className="flex flex-col gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="w-44 aspect-video rounded-2xl overflow-hidden flex-shrink-0 bg-zinc-900 border border-zinc-800 shadow-md">
                  <img 
                    src={`https://plus.unsplash.com/premium_photo-1678565869434-c81195663466?auto=format&fit=crop&q=80&w=400&sig=${i}`} 
                    alt="Recommended" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 py-1">
                  <h3 className="text-sm font-black text-white line-clamp-2 leading-tight group-hover:text-red-500 transition-colors">
                    The absolute future of modular and scalable web development
                  </h3>
                  <p className="text-xs text-zinc-500 mt-2 font-bold uppercase tracking-widest">NextTube</p>
                  <p className="text-[10px] text-zinc-600 mt-1 font-black">1.2M VIEWS • 1 YEAR AGO</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default VideoDetail;
