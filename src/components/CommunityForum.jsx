import React, { useState } from 'react';
import { MessageSquare, Heart, Share2, Image as ImageIcon, Send, MoreHorizontal } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    author: 'Ramesh Patel',
    avatar: 'https://ui-avatars.com/api/?name=Ramesh+Patel&background=047857&color=fff',
    role: 'Farmer • Gujarat',
    time: '2 hours ago',
    content: 'My cotton leaves are turning yellow with some curling at the edges. I suspect Whitefly but not sure. Has anyone faced this recently? Attached a picture of the affected plant.',
    image: 'https://cdn.pixabay.com/photo/2021/11/14/06/17/cotton-6792410_1280.jpg',
    likes: 24,
    comments: [
      {
        id: 'c1',
        author: 'Dr. Sharma',
        role: 'Agronomy Expert',
        content: 'Yes Ramesh, this is a classic symptom of Whitefly infestation. Spray Neem oil (1500 ppm) @ 5ml/litre of water as an immediate organic control.',
        time: '1 hour ago'
      }
    ]
  },
  {
    id: 2,
    author: 'Sita Devi',
    avatar: 'https://ui-avatars.com/api/?name=Sita+Devi&background=ea580c&color=fff',
    role: 'Farmer • Madhya Pradesh',
    time: '5 hours ago',
    content: 'Very happy with the Soybean yield this season using the new organic compost method discussed here! Harvest looks great.',
    image: 'https://cdn.pixabay.com/photo/2014/10/22/18/24/soybeans-498520_1280.jpg',
    likes: 156,
    comments: []
  }
];

export default function CommunityForum({ user }) {
  const [posts, setPosts] = useState(mockPosts);
  const [newPost, setNewPost] = useState('');
  
  const handlePost = () => {
    if(!newPost.trim()) return;
    
    const post = {
      id: Date.now(),
      author: user?.name || 'Local Farmer',
      avatar: `https://ui-avatars.com/api/?name=${user?.name || 'Farmer'}&background=059669&color=fff`,
      role: `Farmer • ${user?.state || 'India'}`,
      time: 'Just now',
      content: newPost,
      likes: 0,
      comments: []
    };
    
    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-600 rounded-xl p-6 text-white shadow-sm">
        <h2 className="text-2xl font-bold mb-1">Krishi Samvad (Community)</h2>
        <p className="text-emerald-50">Connect with expert agronomists and thousands of farmers across India.</p>
      </div>

      {/* Create Post Box */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-4">
        <div className="flex gap-4">
          <img src={`https://ui-avatars.com/api/?name=${user?.name || 'You'}&background=059669&color=fff`} alt="User" className="w-10 h-10 rounded-full" />
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Ask a question or share a farming experience..."
            className="flex-1 resize-none bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[100px]"
          />
        </div>
        <div className="flex justify-between items-center mt-3 ml-14">
          <button className="flex items-center gap-2 text-stone-500 hover:text-emerald-600 transition-colors font-medium text-sm px-3 py-2 rounded-lg hover:bg-emerald-50">
            <ImageIcon size={18} /> Add Photo
          </button>
          <button 
            onClick={handlePost}
            disabled={!newPost.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 text-sm"
          >
            Post <Send size={16} />
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            
            {/* Post Header */}
            <div className="p-4 flex items-start justify-between">
              <div className="flex gap-3">
                <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full border border-stone-100" />
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight">{post.author}</h3>
                  <p className="text-xs text-stone-500">{post.role} • {post.time}</p>
                </div>
              </div>
              <button className="text-stone-400 hover:text-stone-600">
                <MoreHorizontal size={20} />
              </button>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-3 text-gray-800 text-sm leading-relaxed">
              {post.content}
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="w-full h-64 bg-stone-100 overflow-hidden">
                <img src={post.image} alt="Farm post" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Action Bar */}
            <div className="px-4 py-3 border-t border-b border-stone-100 flex items-center justify-between text-sm text-stone-500 font-medium">
              <button className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors">
                <Heart size={18} /> {post.likes} <span className="hidden sm:inline">Likes</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                <MessageSquare size={18} /> {post.comments.length} <span className="hidden sm:inline">Comments</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-stone-800 transition-colors">
                <Share2 size={18} /> <span className="hidden sm:inline">Share</span>
              </button>
            </div>

            {/* Comments Section */}
            {post.comments.length > 0 && (
              <div className="p-4 bg-stone-50 space-y-3">
                {post.comments.map(comment => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {comment.author.charAt(0)}
                    </div>
                    <div className="bg-white border border-stone-200 p-3 rounded-2xl rounded-tl-sm flex-1">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-bold text-sm text-gray-900">{comment.author} <span className="text-[10px] font-normal text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full ml-1">{comment.role}</span></span>
                        <span className="text-xs text-stone-400">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
