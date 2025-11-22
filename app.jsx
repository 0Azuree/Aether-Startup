import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Settings, X, Trash2, Globe, Clock, Type, Sparkles, ExternalLink } from 'lucide-react';

// --- Canvas Background Component ---
const Starfield = ({ speed = 1 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particles = [];
        const particleCount = 100;
        const connectionDistance = 150;
        let mouse = { x: null, y: null };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5 * speed;
                this.vy = (Math.random() - 0.5) * 0.5 * speed;
                this.size = Math.random() * 2;
                this.baseColor = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse repulsion
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx*dx + dy*dy);
                    if (distance < 200) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (200 - distance) / 200;
                        const directionX = forceDirectionX * force * 0.5;
                        const directionY = forceDirectionY * force * 0.5;
                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }
            }

            draw() {
                ctx.fillStyle = this.baseColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Connect particles
                for (let j = i; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let distance = Math.sqrt(dx*dx + dy*dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance/connectionDistance * 0.1})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [speed]);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
};

// --- Main App Component ---
export default function App() {
    // --- State ---
    const [time, setTime] = useState(new Date());
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    
    // Settings State
    const [showSettings, setShowSettings] = useState(false);
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('aether-settings');
        return saved ? JSON.parse(saved) : {
            use24Hour: false,
            showGreeting: true,
            starSpeed: 1,
            showSeconds: false
        };
    });

    // Shortcuts State
    const [shortcuts, setShortcuts] = useState(() => {
        const saved = localStorage.getItem('aether-shortcuts');
        return saved ? JSON.parse(saved) : [];
    });
    const [showAddModal, setShowAddModal] = useState(false);
    const [newShortcut, setNewShortcut] = useState({ name: '', url: '' });

    // --- Effects ---
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        localStorage.setItem('aether-shortcuts', JSON.stringify(shortcuts));
    }, [shortcuts]);

    useEffect(() => {
        localStorage.setItem('aether-settings', JSON.stringify(settings));
    }, [settings]);

    // --- Handlers ---
    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    const handleAddShortcut = (e) => {
        e.preventDefault();
        if (newShortcut.name && newShortcut.url) {
            let url = newShortcut.url;
            if (!/^https?:\/\//i.test(url)) {
                url = 'https://' + url;
            }
            setShortcuts([...shortcuts, { ...newShortcut, url, id: Date.now() }]);
            setNewShortcut({ name: '', url: '' });
            setShowAddModal(false);
        }
    };

    const removeShortcut = (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        setShortcuts(shortcuts.filter(s => s.id !== id));
    };

    const getGreeting = () => {
        const hour = time.getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    // --- Render Helpers ---
    const formatTime = () => {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: !settings.use24Hour,
            second: settings.showSeconds ? '2-digit' : undefined
        };
        return time.toLocaleTimeString([], options);
    };

    return (
        <div className={`relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden transition-all duration-500 bg-[#050505] text-white font-sans ${isSearchFocused ? 'focus-mode' : ''}`}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&display=swap');
                
                /* Smooth entrance animations */
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .animate-enter {
                    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }

                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }

                /* Glassmorphism Utilities */
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                }
                
                .glass-modal {
                    background: rgba(20, 20, 23, 0.85);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                }

                .glass-input {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .glass-input:focus {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: rgba(255, 255, 255, 0.3);
                    box-shadow: 0 0 40px rgba(255, 255, 255, 0.05);
                    transform: scale(1.02);
                }

                /* Search Focus Mode */
                .focus-mode .blur-target {
                    filter: blur(8px);
                    opacity: 0.3;
                    transform: scale(0.98);
                    transition: all 0.5s ease;
                }
                
                .blur-target {
                    transition: all 0.5s ease;
                }

                /* Icon Hover Glow */
                .icon-btn {
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .icon-btn:hover {
                    background: rgba(255, 255, 255, 0.15);
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px -5px rgba(255,255,255, 0.15);
                }
                
                .delete-btn {
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }
                .icon-btn:hover .delete-btn {
                    opacity: 1;
                }
            `}</style>

            <Starfield speed={settings.starSpeed} />
            
            {/* Top Right Settings Button */}
            <button 
                onClick={() => setShowSettings(true)}
                className="absolute top-6 right-6 p-3 rounded-full text-gray-500 hover:text-white hover:bg-white/10 transition-all z-50"
            >
                <Settings className="w-6 h-6" />
            </button>

            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-12">
                
                {/* Header Section */}
                <div className={`text-center flex flex-col items-center gap-4 blur-target animate-enter`}>
                    {settings.showGreeting && (
                        <h2 className="text-lg md:text-xl font-light text-gray-400 tracking-[0.2em] uppercase">
                            {getGreeting()}
                        </h2>
                    )}
                    <h1 className="text-7xl md:text-9xl font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-2xl select-none">
                        {formatTime()}
                    </h1>
                    <p className="text-sm text-gray-500 tracking-widest uppercase mt-2">
                        {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Search Section */}
                <div className="w-full max-w-2xl relative group animate-enter delay-100">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl transition-opacity duration-500 ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`}></div>
                    <div className="relative">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search className="w-6 h-6" />
                        </div>
                        <input 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            placeholder="Search the universe..."
                            className="glass-input w-full py-5 pl-16 pr-6 rounded-full text-xl text-white placeholder-gray-500 outline-none shadow-2xl"
                            autoFocus
                        />
                    </div>
                </div>

                {/* Shortcuts Grid */}
                <div className={`grid grid-cols-3 md:grid-cols-6 gap-6 blur-target animate-enter delay-200`}>
                    {shortcuts.map((site) => (
                        <a 
                            key={site.id} 
                            href={site.url}
                            className="icon-btn glass-panel w-24 h-24 rounded-3xl flex flex-col items-center justify-center gap-3 group text-gray-300 hover:text-white hover:border-white/20 no-underline relative"
                        >
                            <button 
                                onClick={(e) => removeShortcut(site.id, e)}
                                className="delete-btn absolute -top-2 -right-2 bg-red-500/80 text-white p-1 rounded-full hover:bg-red-600"
                            >
                                <X className="w-3 h-3" />
                            </button>
                            <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
                                <Globe className="w-8 h-8" />
                            </div>
                            <span className="text-xs font-medium tracking-wide opacity-70 group-hover:opacity-100 truncate w-20 text-center">{site.name}</span>
                        </a>
                    ))}
                    
                    {/* Add Button */}
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="icon-btn glass-panel w-24 h-24 rounded-3xl flex flex-col items-center justify-center gap-3 group text-gray-500 hover:text-white hover:border-white/20"
                    >
                        <Plus className="w-8 h-8 opacity-50 group-hover:opacity-100" />
                        <span className="text-xs font-medium tracking-wide opacity-50 group-hover:opacity-100">Add</span>
                    </button>
                </div>

            </div>

            {/* Footer Quote/Info */}
            <div className="fixed bottom-8 text-center blur-target animate-enter delay-300">
                 <p className="text-xs text-gray-600 hover:text-gray-400 transition-colors cursor-default">
                    DESIGNED FOR FOCUS
                 </p>
            </div>

            {/* --- Modals --- */}
            
            {/* Add Shortcut Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-enter">
                    <div className="glass-modal p-8 rounded-3xl w-full max-w-md relative">
                        <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-6 h-6"/></button>
                        <h3 className="text-2xl font-light mb-6">Add Shortcut</h3>
                        <form onSubmit={handleAddShortcut} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Name</label>
                                <input 
                                    type="text" 
                                    className="glass-input w-full p-3 rounded-xl text-white outline-none"
                                    placeholder="e.g., YouTube"
                                    value={newShortcut.name}
                                    onChange={e => setNewShortcut({...newShortcut, name: e.target.value})}
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">URL</label>
                                <input 
                                    type="text" 
                                    className="glass-input w-full p-3 rounded-xl text-white outline-none"
                                    placeholder="youtube.com"
                                    value={newShortcut.url}
                                    onChange={e => setNewShortcut({...newShortcut, url: e.target.value})}
                                />
                            </div>
                            <button type="submit" className="mt-4 bg-white text-black py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                                Add to Dashboard
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-enter">
                    <div className="glass-modal p-8 rounded-3xl w-full max-w-md relative">
                        <button onClick={() => setShowSettings(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-6 h-6"/></button>
                        <div className="flex items-center gap-3 mb-8">
                            <Settings className="w-6 h-6 text-gray-400" />
                            <h3 className="text-2xl font-light">Settings</h3>
                        </div>
                        
                        <div className="space-y-6">
                            {/* Time Format */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Clock className="w-5 h-5" />
                                    <span>24-Hour Clock</span>
                                </div>
                                <button 
                                    onClick={() => setSettings(s => ({...s, use24Hour: !s.use24Hour}))}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${settings.use24Hour ? 'bg-blue-500' : 'bg-gray-700'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.use24Hour ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>

                            {/* Show Seconds */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Clock className="w-5 h-5" />
                                    <span>Show Seconds</span>
                                </div>
                                <button 
                                    onClick={() => setSettings(s => ({...s, showSeconds: !s.showSeconds}))}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${settings.showSeconds ? 'bg-blue-500' : 'bg-gray-700'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.showSeconds ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>

                            {/* Show Greeting */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Type className="w-5 h-5" />
                                    <span>Show Greeting</span>
                                </div>
                                <button 
                                    onClick={() => setSettings(s => ({...s, showGreeting: !s.showGreeting}))}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${settings.showGreeting ? 'bg-blue-500' : 'bg-gray-700'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.showGreeting ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>

                            {/* Animation Speed */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Sparkles className="w-5 h-5" />
                                    <span>Starfield Speed</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="5" 
                                    step="0.5"
                                    value={settings.starSpeed}
                                    onChange={(e) => setSettings(s => ({...s, starSpeed: parseFloat(e.target.value)}))}
                                    className="w-full accent-white h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>

                            {/* Reset Data */}
                            <div className="pt-6 border-t border-white/10">
                                <button 
                                    onClick={() => {
                                        if(confirm('Clear all shortcuts?')) setShortcuts([]);
                                    }}
                                    className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Clear All Shortcuts
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
