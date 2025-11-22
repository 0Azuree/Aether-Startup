<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aether | Customized</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Roboto:wght@300;400;500&family=JetBrains+Mono:wght@300;400&family=Lora:ital@0;1&display=swap');
        
        body { margin: 0; overflow: hidden; background: #000; }
        
        /* Transitions */
        .transition-theme { transition: all 0.3s ease; }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }

        /* Animations */
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-enter { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useRef, useMemo } = React;

        // --- Starfield Component ---
        const Starfield = ({ settings }) => {
            const canvasRef = useRef(null);

            useEffect(() => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                let animationFrameId;
                
                let width = window.innerWidth;
                let height = window.innerHeight;
                const resize = () => {
                    width = window.innerWidth;
                    height = window.innerHeight;
                    canvas.width = width;
                    canvas.height = height;
                };
                resize();
                window.addEventListener('resize', resize);

                const particles = [];
                const count = settings.particleCount;
                
                // Initialize Particles
                for (let i = 0; i < count; i++) {
                    particles.push({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        vx: (Math.random() - 0.5) * settings.particleSpeed * 0.5,
                        vy: (Math.random() - 0.5) * settings.particleSpeed * 0.5,
                        size: Math.random() * settings.particleSize,
                        alpha: Math.random() * 0.5 + 0.1
                    });
                }

                const animate = () => {
                    ctx.clearRect(0, 0, width, height);
                    
                    // Draw Particles
                    particles.forEach((p, i) => {
                        p.x += p.vx;
                        p.y += p.vy;

                        // Bounce
                        if (p.x < 0 || p.x > width) p.vx *= -1;
                        if (p.y < 0 || p.y > height) p.vy *= -1;

                        ctx.fillStyle = settings.particleColor + Math.floor(p.alpha * 255).toString(16).padStart(2,'0');
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                        ctx.fill();

                        // Connections
                        if (settings.particleLinks) {
                            for (let j = i + 1; j < particles.length; j++) {
                                const dx = p.x - particles[j].x;
                                const dy = p.y - particles[j].y;
                                const dist = Math.sqrt(dx*dx + dy*dy);

                                if (dist < 150) {
                                    ctx.strokeStyle = settings.particleColor + Math.floor((1 - dist/150) * 50).toString(16).padStart(2,'0');
                                    ctx.lineWidth = 0.5;
                                    ctx.beginPath();
                                    ctx.moveTo(p.x, p.y);
                                    ctx.lineTo(particles[j].x, particles[j].y);
                                    ctx.stroke();
                                }
                            }
                        }
                    });
                    animationFrameId = requestAnimationFrame(animate);
                };

                if (settings.showParticles) animate();
                else ctx.clearRect(0,0,width,height);

                return () => {
                    window.removeEventListener('resize', resize);
                    cancelAnimationFrame(animationFrameId);
                };
            }, [settings.particleCount, settings.particleSpeed, settings.particleSize, settings.particleColor, settings.particleLinks, settings.showParticles]);

            return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
        };

        // --- Main App ---
        const App = () => {
            // --- DEFAULT SETTINGS ---
            const defaultSettings = {
                // Visuals
                bgColor: '#050505',
                bgGradient: true,
                bgGradientEnd: '#1a1a2e',
                fontFamily: 'Inter',
                textColor: '#ffffff',
                accentColor: '#3b82f6',
                uiScale: 1,
                
                // Glassmorphism
                glassBlur: 16,
                glassOpacity: 0.05,
                glassBorder: true,

                // Particles
                showParticles: true,
                particleCount: 80,
                particleSpeed: 1,
                particleSize: 2,
                particleColor: '#ffffff',
                particleLinks: true,

                // Clock & Date
                showClock: true,
                use24Hour: false,
                showSeconds: false,
                clockSize: 6, // rem scale factor
                clockWeight: '100', // font-weight
                showDate: true,
                dateFormat: 'long', // 'long' or 'short'
                
                // Greeting
                showGreeting: true,
                customGreeting: '', // Empty = auto
                
                // Search
                showSearch: true,
                searchEngine: 'google', // google, bing, ddg
                searchPlaceholder: 'Search the universe...',
                searchRoundness: 'full', // none, md, full
                autoFocusSearch: true,

                // Grid
                shortcutSize: 100,
                shortcutGap: 24,
                showLabels: true,
                openNewTab: false,
            };

            // --- STATE ---
            const [time, setTime] = useState(new Date());
            const [searchQuery, setSearchQuery] = useState('');
            const [isSearchFocused, setIsSearchFocused] = useState(false);
            const [showSettings, setShowSettings] = useState(false);
            const [showAddModal, setShowAddModal] = useState(false);
            
            const [settings, setSettings] = useState(() => {
                const saved = localStorage.getItem('aether-settings-v2');
                return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
            });

            const [shortcuts, setShortcuts] = useState(() => {
                const saved = localStorage.getItem('aether-shortcuts');
                return saved ? JSON.parse(saved) : [];
            });
            
            const [newShortcut, setNewShortcut] = useState({ name: '', url: '' });

            // --- EFFECTS ---
            useEffect(() => {
                const timer = setInterval(() => setTime(new Date()), 1000);
                return () => clearInterval(timer);
            }, []);

            useEffect(() => {
                localStorage.setItem('aether-settings-v2', JSON.stringify(settings));
                // Update Font
                document.body.style.fontFamily = settings.fontFamily;
                // Update Background
                document.body.style.background = settings.bgGradient 
                    ? `linear-gradient(to bottom right, ${settings.bgColor}, ${settings.bgGradientEnd})`
                    : settings.bgColor;
            }, [settings]);

            useEffect(() => {
                localStorage.setItem('aether-shortcuts', JSON.stringify(shortcuts));
            }, [shortcuts]);

            useEffect(() => {
                lucide.createIcons();
            });

            // --- LOGIC ---
            const handleSearch = (e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                    let url = '';
                    const q = encodeURIComponent(searchQuery);
                    switch(settings.searchEngine) {
                        case 'bing': url = `https://www.bing.com/search?q=${q}`; break;
                        case 'ddg': url = `https://duckduckgo.com/?q=${q}`; break;
                        case 'youtube': url = `https://www.youtube.com/results?search_query=${q}`; break;
                        default: url = `https://www.google.com/search?q=${q}`;
                    }
                    window.location.href = url;
                }
            };

            const addShortcut = (e) => {
                e.preventDefault();
                if (!newShortcut.name || !newShortcut.url) return;
                let url = newShortcut.url;
                if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
                setShortcuts([...shortcuts, { ...newShortcut, url, id: Date.now() }]);
                setNewShortcut({ name: '', url: '' });
                setShowAddModal(false);
            };

            const getGreeting = () => {
                if (settings.customGreeting) return settings.customGreeting;
                const h = time.getHours();
                return h < 12 ? "Good Morning" : h < 18 ? "Good Afternoon" : "Good Evening";
            };

            // --- STYLES HELPERS ---
            const glassStyle = {
                background: `rgba(255, 255, 255, ${settings.glassOpacity})`,
                backdropFilter: `blur(${settings.glassBlur}px)`,
                WebkitBackdropFilter: `blur(${settings.glassBlur}px)`,
                border: settings.glassBorder ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                color: settings.textColor
            };

            // --- SETTINGS COMPONENT ---
            const SettingItem = ({ label, children }) => (
                <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <span className="text-sm opacity-80">{label}</span>
                    <div className="w-1/2 flex justify-end">{children}</div>
                </div>
            );

            const SettingSection = ({ title, icon, children }) => (
                <div className="mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4 flex items-center gap-2">
                        <i data-lucide={icon} className="w-4 h-4"></i> {title}
                    </h4>
                    {children}
                </div>
            );

            // Input Components
            const Toggle = ({ value, onChange }) => (
                <button onClick={() => onChange(!value)} className={`w-10 h-5 rounded-full relative transition-colors ${value ? 'bg-blue-500' : 'bg-white/20'}`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform ${value ? 'left-6' : 'left-1'}`} />
                </button>
            );

            const Slider = ({ min, max, step, value, onChange }) => (
                <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-blue-500 h-1 bg-white/20 rounded-lg appearance-none" />
            );

            const Select = ({ options, value, onChange }) => (
                <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-black/20 border border-white/10 rounded px-2 py-1 text-xs outline-none focus:border-blue-500">
                    {options.map(o => <option key={o.val} value={o.val}>{o.label}</option>)}
                </select>
            );

            const ColorPicker = ({ value, onChange }) => (
                <div className="flex items-center gap-2">
                    <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-6 h-6 bg-transparent border-0 p-0 cursor-pointer" />
                    <span className="text-xs opacity-50 uppercase">{value}</span>
                </div>
            );

            // --- RENDER ---
            return (
                <div className={`relative min-h-screen flex flex-col items-center justify-center p-6 ${isSearchFocused ? 'blur-sm scale-[0.99]' : ''} transition-all duration-500`}
                     style={{ color: settings.textColor, transform: `scale(${settings.uiScale})` }}>
                    
                    <Starfield settings={settings} />

                    {/* Top Right Controls */}
                    <div className="absolute top-6 right-6 flex gap-2 z-50">
                         <button onClick={() => setShowSettings(true)} className="p-3 rounded-full hover:bg-white/10 transition-colors">
                            <i data-lucide="settings" className="w-6 h-6"></i>
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-10">
                        
                        {/* Clock Header */}
                        <div className="text-center flex flex-col items-center animate-enter">
                            {settings.showGreeting && (
                                <h2 className="text-xl md:text-2xl font-light opacity-60 tracking-[0.2em] uppercase mb-2">
                                    {getGreeting()}
                                </h2>
                            )}
                            {settings.showClock && (
                                <h1 className="leading-none select-none" 
                                    style={{ 
                                        fontSize: `${settings.clockSize}rem`, 
                                        fontWeight: settings.clockWeight,
                                        textShadow: '0 0 40px rgba(255,255,255,0.1)'
                                    }}>
                                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: settings.showSeconds ? '2-digit' : undefined, hour12: !settings.use24Hour })}
                                </h1>
                            )}
                            {settings.showDate && (
                                <p className="text-lg opacity-50 tracking-widest uppercase mt-4">
                                    {time.toLocaleDateString([], { weekday: 'long', month: settings.dateFormat === 'long' ? 'long' : 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                            )}
                        </div>

                        {/* Search Bar */}
                        {settings.showSearch && (
                            <div className="w-full max-w-xl relative animate-enter delay-100 group">
                                <div className="absolute inset-0 bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <i data-lucide="search" className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50"></i>
                                <input 
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearch}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                    placeholder={settings.searchPlaceholder}
                                    className="w-full py-4 pl-14 pr-4 text-lg outline-none transition-all shadow-2xl"
                                    style={{ 
                                        ...glassStyle, 
                                        borderRadius: settings.searchRoundness === 'full' ? '9999px' : settings.searchRoundness === 'md' ? '12px' : '0px'
                                    }}
                                    autoFocus={settings.autoFocusSearch}
                                />
                            </div>
                        )}

                        {/* Shortcuts */}
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 animate-enter delay-200" style={{ gap: `${settings.shortcutGap}px` }}>
                            {shortcuts.map(site => (
                                <a key={site.id} href={site.url} 
                                   target={settings.openNewTab ? "_blank" : "_self"}
                                   className="group relative flex flex-col items-center justify-center transition-transform hover:-translate-y-1"
                                   style={{ width: `${settings.shortcutSize}px`, height: `${settings.shortcutSize}px`, ...glassStyle, borderRadius: '24px' }}>
                                    
                                    <button onClick={(e) => { e.preventDefault(); setShortcuts(shortcuts.filter(s => s.id !== site.id)) }}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10">
                                        <i data-lucide="x" className="w-3 h-3"></i>
                                    </button>
                                    
                                    <i data-lucide="globe" className="w-8 h-8 mb-2 opacity-70 group-hover:opacity-100"></i>
                                    
                                    {settings.showLabels && (
                                        <span className="text-xs opacity-60 group-hover:opacity-100 font-medium truncate w-11/12 text-center">
                                            {site.name}
                                        </span>
                                    )}
                                </a>
                            ))}
                            
                            {/* Add Button */}
                            <button onClick={() => setShowAddModal(true)}
                                    className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 hover:bg-white/5"
                                    style={{ width: `${settings.shortcutSize}px`, height: `${settings.shortcutSize}px`, border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '24px' }}>
                                <i data-lucide="plus" className="w-8 h-8 opacity-30"></i>
                            </button>
                        </div>
                    </div>

                    {/* --- MODALS --- */}
                    
                    {/* Settings Modal */}
                    {showSettings && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/50 backdrop-blur-sm animate-enter" onClick={(e) => e.target === e.currentTarget && setShowSettings(false)}>
                            <div className="h-full w-full max-w-md p-8 overflow-y-auto custom-scrollbar shadow-2xl" style={{ background: '#0a0a0a', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-light">Settings</h2>
                                    <button onClick={() => setShowSettings(false)} className="hover:opacity-70"><i data-lucide="x" className="w-6 h-6"></i></button>
                                </div>

                                {/* Visuals Section */}
                                <SettingSection title="Visuals & Theme" icon="palette">
                                    <SettingItem label="Background Color">
                                        <ColorPicker value={settings.bgColor} onChange={v => setSettings({...settings, bgColor: v})} />
                                    </SettingItem>
                                    <SettingItem label="Enable Gradient">
                                        <Toggle value={settings.bgGradient} onChange={v => setSettings({...settings, bgGradient: v})} />
                                    </SettingItem>
                                    {settings.bgGradient && (
                                        <SettingItem label="Gradient End Color">
                                            <ColorPicker value={settings.bgGradientEnd} onChange={v => setSettings({...settings, bgGradientEnd: v})} />
                                        </SettingItem>
                                    )}
                                    <SettingItem label="Text Color">
                                        <ColorPicker value={settings.textColor} onChange={v => setSettings({...settings, textColor: v})} />
                                    </SettingItem>
                                    <SettingItem label="Font Family">
                                        <Select value={settings.fontFamily} options={[
                                            {val: 'Inter', label: 'Inter (Clean)'},
                                            {val: 'Roboto', label: 'Roboto (Standard)'},
                                            {val: 'JetBrains Mono', label: 'Mono (Code)'},
                                            {val: 'Lora', label: 'Lora (Serif)'},
                                        ]} onChange={v => setSettings({...settings, fontFamily: v})} />
                                    </SettingItem>
                                    <SettingItem label="UI Scale">
                                        <Slider min={0.5} max={1.5} step={0.05} value={settings.uiScale} onChange={v => setSettings({...settings, uiScale: v})} />
                                    </SettingItem>
                                </SettingSection>

                                {/* Glassmorphism Section */}
                                <SettingSection title="Glass Effect" icon="droplets">
                                    <SettingItem label="Blur Amount">
                                        <Slider min={0} max={50} step={1} value={settings.glassBlur} onChange={v => setSettings({...settings, glassBlur: v})} />
                                    </SettingItem>
                                    <SettingItem label="Opacity">
                                        <Slider min={0} max={1} step={0.05} value={settings.glassOpacity} onChange={v => setSettings({...settings, glassOpacity: v})} />
                                    </SettingItem>
                                    <SettingItem label="Show Borders">
                                        <Toggle value={settings.glassBorder} onChange={v => setSettings({...settings, glassBorder: v})} />
                                    </SettingItem>
                                </SettingSection>

                                {/* Particles Section */}
                                <SettingSection title="Starfield" icon="sparkles">
                                    <SettingItem label="Show Particles">
                                        <Toggle value={settings.showParticles} onChange={v => setSettings({...settings, showParticles: v})} />
                                    </SettingItem>
                                    <SettingItem label="Particle Count">
                                        <Slider min={10} max={300} step={10} value={settings.particleCount} onChange={v => setSettings({...settings, particleCount: v})} />
                                    </SettingItem>
                                    <SettingItem label="Speed">
                                        <Slider min={0} max={5} step={0.1} value={settings.particleSpeed} onChange={v => setSettings({...settings, particleSpeed: v})} />
                                    </SettingItem>
                                    <SettingItem label="Size">
                                        <Slider min={1} max={5} step={0.5} value={settings.particleSize} onChange={v => setSettings({...settings, particleSize: v})} />
                                    </SettingItem>
                                    <SettingItem label="Color">
                                        <ColorPicker value={settings.particleColor} onChange={v => setSettings({...settings, particleColor: v})} />
                                    </SettingItem>
                                    <SettingItem label="Show Connections">
                                        <Toggle value={settings.particleLinks} onChange={v => setSettings({...settings, particleLinks: v})} />
                                    </SettingItem>
                                </SettingSection>

                                {/* Clock Section */}
                                <SettingSection title="Time & Date" icon="clock">
                                    <SettingItem label="Show Clock">
                                        <Toggle value={settings.showClock} onChange={v => setSettings({...settings, showClock: v})} />
                                    </SettingItem>
                                    <SettingItem label="Clock Size">
                                        <Slider min={2} max={12} step={0.5} value={settings.clockSize} onChange={v => setSettings({...settings, clockSize: v})} />
                                    </SettingItem>
                                    <SettingItem label="Font Weight">
                                        <Select value={settings.clockWeight} options={[
                                            {val: '100', label: 'Thin'},
                                            {val: '300', label: 'Light'},
                                            {val: '400', label: 'Regular'},
                                            {val: '700', label: 'Bold'},
                                            {val: '900', label: 'Black'},
                                        ]} onChange={v => setSettings({...settings, clockWeight: v})} />
                                    </SettingItem>
                                    <SettingItem label="24-Hour Mode">
                                        <Toggle value={settings.use24Hour} onChange={v => setSettings({...settings, use24Hour: v})} />
                                    </SettingItem>
                                    <SettingItem label="Show Seconds">
                                        <Toggle value={settings.showSeconds} onChange={v => setSettings({...settings, showSeconds: v})} />
                                    </SettingItem>
                                    <SettingItem label="Show Date">
                                        <Toggle value={settings.showDate} onChange={v => setSettings({...settings, showDate: v})} />
                                    </SettingItem>
                                    <SettingItem label="Show Greeting">
                                        <Toggle value={settings.showGreeting} onChange={v => setSettings({...settings, showGreeting: v})} />
                                    </SettingItem>
                                    <SettingItem label="Custom Greeting Name">
                                        <input type="text" value={settings.customGreeting} onChange={e => setSettings({...settings, customGreeting: e.target.value})} placeholder="Leave blank for auto" className="w-32 bg-transparent border-b border-white/20 text-right outline-none text-sm" />
                                    </SettingItem>
                                </SettingSection>

                                {/* Search Section */}
                                <SettingSection title="Search" icon="search">
                                    <SettingItem label="Show Search">
                                        <Toggle value={settings.showSearch} onChange={v => setSettings({...settings, showSearch: v})} />
                                    </SettingItem>
                                    <SettingItem label="Search Engine">
                                        <Select value={settings.searchEngine} options={[
                                            {val: 'google', label: 'Google'},
                                            {val: 'bing', label: 'Bing'},
                                            {val: 'ddg', label: 'DuckDuckGo'},
                                            {val: 'youtube', label: 'YouTube'},
                                        ]} onChange={v => setSettings({...settings, searchEngine: v})} />
                                    </SettingItem>
                                    <SettingItem label="Shape">
                                        <Select value={settings.searchRoundness} options={[
                                            {val: 'none', label: 'Square'},
                                            {val: 'md', label: 'Rounded'},
                                            {val: 'full', label: 'Pill'},
                                        ]} onChange={v => setSettings({...settings, searchRoundness: v})} />
                                    </SettingItem>
                                    <SettingItem label="Auto Focus">
                                        <Toggle value={settings.autoFocusSearch} onChange={v => setSettings({...settings, autoFocusSearch: v})} />
                                    </SettingItem>
                                </SettingSection>

                                {/* Grid Section */}
                                <SettingSection title="Grid & Shortcuts" icon="layout-grid">
                                    <SettingItem label="Icon Size">
                                        <Slider min={60} max={150} step={10} value={settings.shortcutSize} onChange={v => setSettings({...settings, shortcutSize: v})} />
                                    </SettingItem>
                                    <SettingItem label="Grid Gap">
                                        <Slider min={10} max={50} step={5} value={settings.shortcutGap} onChange={v => setSettings({...settings, shortcutGap: v})} />
                                    </SettingItem>
                                    <SettingItem label="Show Labels">
                                        <Toggle value={settings.showLabels} onChange={v => setSettings({...settings, showLabels: v})} />
                                    </SettingItem>
                                    <SettingItem label="Open in New Tab">
                                        <Toggle value={settings.openNewTab} onChange={v => setSettings({...settings, openNewTab: v})} />
                                    </SettingItem>
                                </SettingSection>

                                {/* Danger Zone */}
                                <div className="mt-8 pt-6 border-t border-red-500/20">
                                    <button onClick={() => { if(confirm('Reset all settings to default?')) setSettings(defaultSettings); }} className="w-full py-3 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm font-bold">
                                        RESET TO DEFAULTS
                                    </button>
                                </div>
                                <div className="h-10"></div> {/* Padding for scroll */}
                            </div>
                        </div>
                    )}

                    {/* Add Shortcut Modal */}
                    {showAddModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-enter">
                            <div className="p-8 rounded-2xl w-full max-w-md relative border border-white/10 shadow-2xl" style={{ background: '#111' }}>
                                <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><i data-lucide="x"></i></button>
                                <h3 className="text-2xl font-light mb-6">Add Shortcut</h3>
                                <form onSubmit={addShortcut} className="flex flex-col gap-4">
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Name</label>
                                        <input type="text" className="w-full p-3 rounded-xl text-white outline-none bg-white/5 focus:bg-white/10 transition-colors" placeholder="e.g., Reddit" value={newShortcut.name} onChange={e => setNewShortcut({...newShortcut, name: e.target.value})} autoFocus />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">URL</label>
                                        <input type="text" className="w-full p-3 rounded-xl text-white outline-none bg-white/5 focus:bg-white/10 transition-colors" placeholder="reddit.com" value={newShortcut.url} onChange={e => setNewShortcut({...newShortcut, url: e.target.value})} />
                                    </div>
                                    <button type="submit" className="mt-4 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-500 transition-colors">Add to Dashboard</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
