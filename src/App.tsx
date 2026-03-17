/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Flame,
  Bookmark,
  Search,
  SlidersHorizontal,
  Volume2,
  X,
  PlayCircle,
  User,
  Settings,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  Pause,
  Play,
  EyeOff,
  SkipBack,
  SkipForward,
  Globe,
  Repeat,
  RotateCcw,
  Check,
  ArrowRight
} from 'lucide-react';

type ThemeVariant = 'v1' | 'v2' | 'v3' | 'v4';

const ThemeContext = React.createContext<{ theme: ThemeVariant, setTheme: (t: ThemeVariant) => void }>({
  theme: 'v1',
  setTheme: () => {},
});

const themeConfig = {
  v1: {
    name: 'Original',
    primaryBtnBg: 'bg-white',
    primaryBtnText: 'text-[#222222]',
    primaryBtnBorder: 'border-gray-200',
    primaryBtnHover: 'hover:bg-gray-50',
    secondaryBtnBg: 'bg-blue-50',
    secondaryBtnText: 'text-blue-600',
    secondaryBtnHover: 'hover:bg-blue-100',
    statusCompletedBg: 'bg-[#00B050]',
    statusCompletedText: 'text-white',
    statusSavedBg: 'bg-[#EEA0FF]',
    statusSavedText: 'text-[#222222]',
    textBtnBg: 'bg-transparent',
    textBtnText: 'text-gray-500',
    textBtnHoverText: 'hover:text-[#222222]',
    highlightColors: ['text-blue-500', 'text-purple-500', 'text-orange-500', 'text-green-500'],
    highlightDecorations: ['decoration-blue-500', 'decoration-purple-500', 'decoration-orange-500', 'decoration-green-500'],
    appBg: 'bg-[#F5F5F5]',
    sidebarActiveBg: 'bg-[#222222]',
    sidebarActiveText: 'text-white',
    sidebarInactiveText: 'text-gray-500',
    sidebarInactiveHoverBg: 'hover:bg-gray-100',
    sidebarInactiveHoverText: 'hover:text-[#222222]',
  },
  v2: {
    name: 'Balanced Professional',
    primaryBtnBg: 'bg-[#5A4EFF]',
    primaryBtnText: 'text-white',
    primaryBtnBorder: 'border-transparent',
    primaryBtnHover: 'hover:bg-[#4a3ee0]',
    secondaryBtnBg: 'bg-[#F5F5F5]',
    secondaryBtnText: 'text-gray-600',
    secondaryBtnHover: 'hover:bg-gray-200',
    statusCompletedBg: 'bg-[#E2F4A6]',
    statusCompletedText: 'text-[#222222]',
    statusSavedBg: 'bg-[#EEA0FF]',
    statusSavedText: 'text-[#222222]',
    textBtnBg: 'bg-[#F5F5F5]',
    textBtnText: 'text-gray-600',
    textBtnHoverText: 'hover:text-[#222222]',
    highlightColors: ['text-[#5A4EFF]', 'text-[#B829D9]', 'text-[#558B2F]', 'text-[#0288D1]'],
    highlightDecorations: ['decoration-[#5A4EFF]', 'decoration-[#B829D9]', 'decoration-[#558B2F]', 'decoration-[#0288D1]'],
    appBg: 'bg-[#F5F5F5]',
    sidebarActiveBg: 'bg-[#5A4EFF]',
    sidebarActiveText: 'text-white',
    sidebarInactiveText: 'text-gray-500',
    sidebarInactiveHoverBg: 'hover:bg-gray-100',
    sidebarInactiveHoverText: 'hover:text-[#222222]',
  },
  v3: {
    name: 'Vibrant Purple',
    primaryBtnBg: 'bg-[#EEA0FF]',
    primaryBtnText: 'text-white',
    primaryBtnBorder: 'border-transparent',
    primaryBtnHover: 'hover:bg-[#e090f0]',
    secondaryBtnBg: 'bg-transparent',
    secondaryBtnText: 'text-[#EEA0FF]',
    secondaryBtnHover: 'hover:text-[#d080e0]',
    statusCompletedBg: 'bg-[#E2F4A6]',
    statusCompletedText: 'text-[#222222]',
    statusSavedBg: 'bg-[#E2F4A6]',
    statusSavedText: 'text-[#222222]',
    textBtnBg: 'bg-transparent',
    textBtnText: 'text-[#EEA0FF]',
    textBtnHoverText: 'hover:text-[#d080e0]',
    highlightColors: ['text-[#B829D9]', 'text-[#558B2F]', 'text-[#0288D1]', 'text-[#5A4EFF]'],
    highlightDecorations: ['decoration-[#B829D9]', 'decoration-[#558B2F]', 'decoration-[#0288D1]', 'decoration-[#5A4EFF]'],
    appBg: 'bg-[#F5F5F5]',
    sidebarActiveBg: 'bg-[#EEA0FF]',
    sidebarActiveText: 'text-white',
    sidebarInactiveText: 'text-gray-500',
    sidebarInactiveHoverBg: 'hover:bg-gray-100',
    sidebarInactiveHoverText: 'hover:text-[#222222]',
  },
  v4: {
    name: 'High-Contrast Minimalist',
    primaryBtnBg: 'bg-[#2D2D2D]',
    primaryBtnText: 'text-white',
    primaryBtnBorder: 'border-transparent',
    primaryBtnHover: 'hover:bg-black',
    secondaryBtnBg: 'bg-transparent',
    secondaryBtnText: 'text-[#2D2D2D]',
    secondaryBtnHover: 'hover:text-black',
    statusCompletedBg: 'bg-gray-100',
    statusCompletedText: 'text-[#222222]',
    statusSavedBg: 'bg-gray-100',
    statusSavedText: 'text-[#222222]',
    textBtnBg: 'bg-transparent',
    textBtnText: 'text-[#2D2D2D]',
    textBtnHoverText: 'hover:text-black',
    highlightColors: ['text-[#2D2D2D]', 'text-gray-600', 'text-gray-500', 'text-gray-800'],
    highlightDecorations: ['decoration-[#2D2D2D]', 'decoration-gray-600', 'decoration-gray-500', 'decoration-gray-800'],
    appBg: 'bg-white',
    sidebarActiveBg: 'bg-[#2D2D2D]',
    sidebarActiveText: 'text-white',
    sidebarInactiveText: 'text-gray-500',
    sidebarInactiveHoverBg: 'hover:bg-gray-200',
    sidebarInactiveHoverText: 'hover:text-[#222222]',
  }
};

const ThemeSwitcher = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  return (
    <div className="fixed bottom-24 lg:bottom-8 right-8 z-50 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg border border-gray-200 flex gap-2">
      {(Object.keys(themeConfig) as ThemeVariant[]).map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
            theme === t ? 'bg-[#222222] text-white shadow-md scale-110' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          {t.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

// --- Mock Data ---

const EXPLORE_VIDEOS = [
  { 
    id: 1,
    title: '硅谷软件工程师的一天', 
    diff: 'B1 - 中级', 
    duration: '10:20', 
    img: 'tech',
    author: 'TechVocab',
    authorAvatar: 'https://picsum.photos/seed/techvocab/100/100',
    tags: [
      { text: '科技', color: 'bg-[#E2F4A6]' },
      { text: '日常', color: 'bg-[#E2F4A6]' },
      { text: '职场', color: 'bg-[#EEA0FF]' }
    ],
    status: 'to-learn'
  },
  { 
    id: 2,
    title: '超市英语：如何在地道地购物', 
    diff: 'A2 - 初级', 
    duration: '08:15', 
    img: 'grocery',
    author: 'Sarah\'s English',
    authorAvatar: 'https://picsum.photos/seed/sarah/100/100',
    tags: [
      { text: '生活', color: 'bg-[#EEA0FF]' },
      { text: '美食', color: 'bg-[#E2F4A6]' }
    ],
    status: 'saved'
  },
  { 
    id: 3,
    title: '如何在上一次面试中脱颖而出', 
    diff: 'C1 - 高级', 
    duration: '18:40', 
    img: 'interview',
    author: 'Business Pro',
    authorAvatar: 'https://picsum.photos/seed/business/100/100',
    tags: [
      { text: '商业', color: 'bg-[#E2F4A6]' },
      { text: '技巧', color: 'bg-[#D4CFFF]' }
    ],
    status: 'to-learn'
  },
  { 
    id: 4,
    title: '纽约街头咖啡点单实战', 
    diff: 'B2 - 中高级', 
    duration: '05:30', 
    img: 'coffee',
    author: 'DailyVlog NYC',
    authorAvatar: 'https://picsum.photos/seed/coffee/100/100',
    tags: [
      { text: '生活', color: 'bg-[#EEA0FF]' },
      { text: '旅行', color: 'bg-[#E2F4A6]' }
    ],
    status: 'none'
  },
  { 
    id: 5,
    title: '如何用英语进行有效的商务谈判', 
    diff: 'C1 - 高级', 
    duration: '15:20', 
    img: 'business',
    author: 'Business Pro',
    authorAvatar: 'https://picsum.photos/seed/business/100/100',
    tags: [
      { text: '商业', color: 'bg-[#E2F4A6]' },
      { text: '职场', color: 'bg-[#EEA0FF]' }
    ],
    status: 'none'
  },
  { 
    id: 6,
    title: '伦敦地铁生存指南', 
    diff: 'B1 - 中级', 
    duration: '09:45', 
    img: 'london',
    author: 'Travel English',
    authorAvatar: 'https://picsum.photos/seed/travel/100/100',
    tags: [
      { text: '旅行', color: 'bg-[#E2F4A6]' },
      { text: '生活', color: 'bg-[#EEA0FF]' },
      { text: '文化', color: 'bg-[#D4CFFF]' }
    ],
    status: 'none'
  },
];

const SAVED_WORDS = [
  { id: 1, en: 'Elaborate', zh: '详细说明，阐述', type: 'v.' },
  { id: 2, en: 'Touch base', zh: '联系，碰头', type: 'phrase' },
  { id: 3, en: 'Under the weather', zh: '身体不适', type: 'idiom' },
  { id: 4, en: 'Brainstorm', zh: '头脑风暴，集思广益', type: 'v./n.' },
  { id: 5, en: 'Procrastinate', zh: '拖延', type: 'v.' },
];

const SAVED_SENTENCES = [
  { id: 1, en: 'Can I get a flat white to go?', zh: '我可以要一杯外带的澳白吗？' },
  { id: 2, en: 'That makes perfect sense.', zh: '那完全说得通/很合理。' },
  { id: 3, en: 'Could you elaborate on that?', zh: '你能详细说明一下吗？' },
];

// --- Shared Components ---

const MOCK_TRANSCRIPT = [
  { id: 1, time: '0:00', en: "Today I'm going to show you around my closet.", zh: "今天我要带你们参观我的衣帽间", highlights: ['show you around', 'closet.'] },
  { id: 2, time: '0:02', en: "Come in.", zh: "请进。", highlights: [] },
  { id: 3, time: '0:02', en: "This is where I come every day to get dressed", zh: "我每天都来这里换衣服", highlights: ['get dressed'] },
  { id: 4, time: '0:04', en: "or to pack for a big trip or to do fittings with my stylist.", zh: "或者为了长途旅行打包，或者和造型师一起试衣。", highlights: ['fittings'] },
  { id: 5, time: '0:08', en: "I am insanely organized.", zh: "我是个超级有条理的人", highlights: ['insanely', 'organized.'] },
  { id: 6, time: '0:10', en: "It's actually a pleasure and an obsession of mine.", zh: "这是我的一种乐趣，也是一种执念", highlights: ['pleasure', 'an obsession of'] },
  { id: 7, time: '0:13', en: "So my closets are categorized.", zh: "所以我的衣橱是分类的。", highlights: ['categorized.'] },
];

const VideoCard: React.FC<{ vid: any, onClick?: () => void }> = ({ vid, onClick }) => {
  const { theme } = React.useContext(ThemeContext);
  const currentTheme = themeConfig[theme];
  return (
    <div className="bg-white p-3 flex flex-col group cursor-pointer rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]" onClick={onClick}>
      <div className="relative aspect-video bg-gray-200 rounded-[16px] overflow-hidden mb-3">
        <img 
          src={`https://picsum.photos/seed/${vid.img}/600/338`} 
          alt={vid.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          referrerPolicy="no-referrer" 
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#222222] text-xs font-bold px-3 py-1.5 rounded-full">
          {vid.diff}
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-[#222222] text-xs font-bold px-3 py-1.5 rounded-full">
          {vid.duration}
        </div>
        {vid.status === 'completed' && (
          <div className={`absolute top-3 right-3 ${currentTheme.statusCompletedBg} ${currentTheme.statusCompletedText} text-[10px] font-bold px-2 py-1 rounded-full`}>
            已学完
          </div>
        )}
        {vid.status === 'saved' && (
          <div className={`absolute top-3 right-3 ${currentTheme.statusSavedBg} ${currentTheme.statusSavedText} text-[10px] font-bold px-2 py-1 rounded-full`}>
            已收藏
          </div>
        )}
      </div>
      <div className="px-1 flex flex-col gap-2">
        <div className="flex flex-wrap gap-1.5">
          {vid.tags.map((tag: any, idx: number) => (
            <span key={idx} className={`px-2.5 py-1 ${tag.color} text-[#222222] text-[10px] font-bold rounded-full uppercase tracking-wide`}>
              {tag.text}
            </span>
          ))}
        </div>
        <h4 className="font-bold text-base text-[#222222] leading-snug line-clamp-2">{vid.title}</h4>
        <div className="flex items-center gap-2 mt-1">
          <img src={vid.authorAvatar} alt={vid.author} className="w-5 h-5 rounded-full object-cover" referrerPolicy="no-referrer" />
          <span className="text-xs text-[#222222]/80 font-bold">{vid.author}</span>
        </div>
      </div>
    </div>
  );
}

const HorizontalVideoCard: React.FC<{ vid: any, onClick?: () => void }> = ({ vid, onClick }) => {
  const { theme } = React.useContext(ThemeContext);
  const currentTheme = themeConfig[theme];
  return (
    <div className="w-[260px] lg:w-[300px] bg-white p-3 shrink-0 snap-start group cursor-pointer flex flex-col rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]" onClick={onClick}>
      <div className="relative aspect-video bg-gray-200 rounded-[16px] overflow-hidden mb-3">
        <img 
          src={`https://picsum.photos/seed/${vid.img}/600/338`} 
          alt={vid.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          referrerPolicy="no-referrer" 
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#222222] text-[10px] font-bold px-2 py-1 rounded-full">
          {vid.diff}
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-[#222222] text-[10px] font-bold px-2 py-1 rounded-full">
          {vid.duration}
        </div>
        {vid.status === 'completed' && (
          <div className={`absolute top-3 right-3 ${currentTheme.statusCompletedBg} ${currentTheme.statusCompletedText} text-[10px] font-bold px-2 py-1 rounded-full`}>
            已学完
          </div>
        )}
        {vid.status === 'saved' && (
          <div className={`absolute top-3 right-3 ${currentTheme.statusSavedBg} ${currentTheme.statusSavedText} text-[10px] font-bold px-2 py-1 rounded-full`}>
            已收藏
          </div>
        )}
      </div>
      <div className="px-1 flex flex-col gap-2 flex-1 justify-between">
        <div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {vid.tags.map((tag: any, idx: number) => (
              <span key={idx} className={`px-2 py-0.5 ${tag.color} text-[#222222] text-[9px] font-bold rounded-full uppercase tracking-wide`}>
                {tag.text}
              </span>
            ))}
          </div>
          <h3 className="font-bold text-[#222222] text-sm lg:text-base leading-snug line-clamp-2">{vid.title}</h3>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <img src={vid.authorAvatar} alt={vid.author} className="w-4 h-4 rounded-full object-cover" referrerPolicy="no-referrer" />
          <span className="text-[10px] lg:text-xs text-[#222222]/70 font-bold">{vid.author}</span>
        </div>
      </div>
    </div>
  );
}

// --- Main App ---

function VideoDetailPage({ video, onBack }: { video: any, onBack: () => void }) {
  const { theme } = React.useContext(ThemeContext);
  const currentTheme = themeConfig[theme];

  const [activeTab, setActiveTab] = useState('dictation');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSentenceId, setCurrentSentenceId] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeControls, setActiveControls] = useState<Record<string, boolean>>({
    speed: false,
    hide: false,
    bilingual: false,
    loop: false
  });

  const toggleControl = (key: string) => {
    setActiveControls(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const [dictationState, setDictationState] = useState<Record<number, { status: 'pending' | 'active' | 'completed', userInput: string, isCorrect: boolean | null }>>({
    1: { status: 'completed', userInput: "closet I'm going to show you around my closet.", isCorrect: false },
    2: { status: 'active', userInput: '', isCorrect: null }
  });

  const handleDictationInput = (id: number, value: string) => {
    setDictationState(prev => ({
      ...prev,
      [id]: { ...prev[id], userInput: value }
    }));
  };

  const checkDictation = (id: number) => {
    const item = MOCK_TRANSCRIPT.find(t => t.id === id);
    if (!item) return;
    const state = dictationState[id];
    if (!state || !state.userInput.trim()) return;

    const cleanInput = state.userInput.replace(/[^\w\s]/gi, '').toLowerCase().trim();
    const cleanOriginal = item.en.replace(/[^\w\s]/gi, '').toLowerCase().trim();
    const isCorrect = cleanInput === cleanOriginal;

    setDictationState(prev => ({
      ...prev,
      [id]: { ...prev[id], status: 'completed', isCorrect }
    }));
  };

  const activateDictation = (id: number) => {
    setDictationState(prev => {
      const newState = { ...prev };
      Object.keys(newState).forEach(key => {
        if (newState[Number(key)].status === 'active') {
          newState[Number(key)].status = 'pending';
        }
      });
      newState[id] = { status: 'active', userInput: newState[id]?.userInput || '', isCorrect: null };
      return newState;
    });
    setCurrentSentenceId(id);
  };

  const currentSentence = MOCK_TRANSCRIPT.find(s => s.id === currentSentenceId) || MOCK_TRANSCRIPT[0];

  const renderHighlightedText = (text: string, highlights: string[]) => {
    if (!highlights || highlights.length === 0) return <span>{text}</span>;

    let parts = [{ text, isHighlight: false, highlightText: '' }];
    
    highlights.forEach(highlight => {
      const newParts: any[] = [];
      parts.forEach(part => {
        if (part.isHighlight) {
          newParts.push(part);
        } else {
          const split = part.text.split(new RegExp(`(${highlight})`, 'gi'));
          split.forEach(s => {
            if (s.toLowerCase() === highlight.toLowerCase()) {
              newParts.push({ text: s, isHighlight: true, highlightText: highlight });
            } else if (s) {
              newParts.push({ text: s, isHighlight: false, highlightText: '' });
            }
          });
        }
      });
      parts = newParts;
    });

    const textColors = currentTheme.highlightColors;
    const decorationColors = currentTheme.highlightDecorations;

    return (
      <>
        {parts.map((part, i) => {
          if (part.isHighlight) {
            const hIndex = highlights.findIndex(h => h.toLowerCase() === part.highlightText.toLowerCase());
            const colorIdx = hIndex !== -1 ? hIndex % textColors.length : 0;
            return (
              <span key={i} className={`${textColors[colorIdx]} underline ${decorationColors[colorIdx]} decoration-2 underline-offset-4`}>
                {part.text}
              </span>
            );
          }
          return <span key={i}>{part.text}</span>;
        })}
      </>
    );
  };

  return (
    <div className={`min-h-screen ${currentTheme.appBg} flex flex-col font-sans text-[#222222]`}>
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors bg-white shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-base lg:text-lg font-bold line-clamp-1">{video.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isSaved ? 'bg-[#E2F4A6] text-[#222222]' : 'bg-gray-100 text-[#222222] hover:bg-gray-200'}`}
          >
            <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={() => setIsCompleted(!isCompleted)}
            className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1.5 transition-colors shadow-sm ${isCompleted ? 'bg-[#E2F4A6] text-[#222222]' : 'bg-gray-100 text-[#222222] hover:bg-gray-200'}`}
          >
            <CheckCircle2 size={16} fill={isCompleted ? "currentColor" : "none"} />
            <span className="hidden sm:inline">已学完</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 p-4 lg:p-8">
        
        {/* Left Column: Video & Controls */}
        <div className="w-full lg:w-[60%] flex flex-col gap-6">
          {/* Video Player Placeholder */}
          <div className="w-full aspect-video bg-black rounded-[24px] lg:rounded-[32px] overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 group">
            <img src={`https://picsum.photos/seed/${video.img}/1280/720`} alt="Video Cover" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-105 border border-white/30"
              >
                {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-2" />}
              </button>
            </div>
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
              1x
            </div>
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
              <div className="h-full bg-[#E2F4A6] w-1/3 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>

          {/* Large Subtitle Area */}
          <div className="flex flex-col items-center text-center px-4 py-6 lg:py-10 min-h-[160px] justify-center">
            <h2 className="text-2xl lg:text-4xl font-bold leading-tight mb-4 text-[#222222]">
              {renderHighlightedText(currentSentence.en, currentSentence.highlights)}
            </h2>
            <p className="text-gray-500 font-bold text-sm lg:text-base">{currentSentence.zh}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-2 lg:px-8 py-4 border-t border-gray-200">
            <button 
              onClick={() => toggleControl('speed')}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${activeControls.speed ? 'bg-[#E2F4A6]/20 text-[#222222]' : 'text-[#222222] hover:bg-gray-100'}`}
            >
              <span className="font-bold text-sm">1x</span>
              <span className="text-[10px] font-bold">Speed</span>
            </button>
            <button 
              onClick={() => toggleControl('hide')}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${activeControls.hide ? 'bg-[#E2F4A6]/20 text-[#222222]' : 'text-[#222222] hover:bg-gray-100'}`}
            >
              <EyeOff size={20} />
              <span className="text-[10px] font-bold">Hide</span>
            </button>
            
            <div className="flex items-center gap-6 lg:gap-8">
              <button 
                onClick={() => setCurrentSentenceId(Math.max(1, currentSentenceId - 1))}
                className={`text-[#222222] hover:text-gray-600 transition-colors`}
              >
                <SkipBack size={24} />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-14 h-14 bg-[#2D2D2D] text-white rounded-full flex items-center justify-center hover:bg-black transition-transform active:scale-95 shadow-sm`}
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
              </button>
              <button 
                onClick={() => setCurrentSentenceId(Math.min(MOCK_TRANSCRIPT.length, currentSentenceId + 1))}
                className={`text-[#222222] hover:text-gray-600 transition-colors`}
              >
                <SkipForward size={24} />
              </button>
            </div>

            <button 
              onClick={() => toggleControl('bilingual')}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${activeControls.bilingual ? 'bg-[#E2F4A6]/20 text-[#222222]' : 'text-[#222222] hover:bg-gray-100'}`}
            >
              <Globe size={20} />
              <span className="text-[10px] font-bold">Bilingual</span>
            </button>
            <button 
              onClick={() => toggleControl('loop')}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${activeControls.loop ? 'bg-[#E2F4A6]/20 text-[#222222]' : 'text-[#222222] hover:bg-gray-100'}`}
            >
              <Repeat size={20} />
              <span className="text-[10px] font-bold">Loop</span>
            </button>
          </div>
        </div>

        {/* Right Column: Transcript / Study Area */}
        <div className="w-full lg:w-[40%] flex flex-col h-[600px] lg:h-[calc(100vh-120px)] bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex px-6 pt-6 pb-4 border-b border-gray-100 gap-8">
            <button 
              onClick={() => setActiveTab('study')}
              className={`font-bold text-base pb-2 relative ${activeTab === 'study' ? 'text-[#222222]' : 'text-gray-400 hover:text-[#222222]'}`}
            >
              学习
              {activeTab === 'study' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#222222] rounded-full"></span>}
            </button>
            <button 
              onClick={() => setActiveTab('dictation')}
              className={`font-bold text-base pb-2 relative ${activeTab === 'dictation' ? 'text-[#222222]' : 'text-gray-400 hover:text-[#222222]'}`}
            >
              听写
              {activeTab === 'dictation' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#222222] rounded-full"></span>}
            </button>
            <button 
              onClick={() => setActiveTab('flashcards')}
              className={`font-bold text-base pb-2 relative ${activeTab === 'flashcards' ? 'text-[#222222]' : 'text-gray-400 hover:text-[#222222]'}`}
            >
              词卡
              {activeTab === 'flashcards' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#222222] rounded-full"></span>}
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'study' && (
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 flex flex-col gap-4 no-scrollbar">
              {MOCK_TRANSCRIPT.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setCurrentSentenceId(item.id)}
                  className={`p-5 rounded-[24px] cursor-pointer transition-all border-2 ${
                    currentSentenceId === item.id 
                      ? 'border-[#E2F4A6] bg-[#E2F4A6]/20 shadow-sm' 
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${currentSentenceId === item.id ? 'bg-[#E2F4A6] text-[#222222]' : 'bg-gray-100 text-gray-500'}`}>
                      {item.id}
                    </span>
                    <span className="text-xs font-bold text-gray-400">{item.time}</span>
                  </div>
                  <p className="font-bold text-[#222222] text-base lg:text-lg leading-snug mb-2">
                    {renderHighlightedText(item.en, item.highlights)}
                  </p>
                  <p className="text-sm font-bold text-gray-500">{item.zh}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'dictation' && (
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 flex flex-col no-scrollbar">
              <div className="flex justify-between items-center bg-[#F5F5F5] rounded-2xl p-4 mb-6">
                <span className="text-sm font-bold text-gray-500">
                  已完成 <span className="text-[#222222] text-lg">{Object.values(dictationState).filter((s: any) => s.status === 'completed').length}</span> / {MOCK_TRANSCRIPT.length} 句
                </span>
                <span className="text-sm font-bold text-[#00B050]">
                  {Object.values(dictationState).filter((s: any) => s.isCorrect).length} 句正确
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {MOCK_TRANSCRIPT.map((item) => {
                  const state = dictationState[item.id] || { status: 'pending', userInput: '', isCorrect: null };

                  if (state.status === 'completed') {
                    return (
                      <div key={item.id} className={`border rounded-[24px] p-5 ${state.isCorrect ? 'border-green-200 bg-green-50/30' : 'border-red-200 bg-red-50/30'}`}>
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${state.isCorrect ? 'bg-green-100 text-green-600' : 'bg-[#E2F4A6] text-[#222222]'}`}>
                              {item.id}
                            </span>
                            <span className="text-xs font-bold text-gray-400">{item.time}</span>
                          </div>
                          <span className={`text-xs font-bold flex items-center gap-1 ${state.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                            {state.isCorrect ? <CheckCircle2 size={14} /> : <X size={14} />}
                            {state.isCorrect ? '正确' : '有误'}
                          </span>
                        </div>
                        <p className={`font-bold text-lg mb-4 ${state.isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                          {state.userInput}
                        </p>
                        <div className="text-sm text-gray-500 space-y-2 mb-5">
                          <p><span className="font-bold mr-2 text-gray-400">原文:</span> {renderHighlightedText(item.en, item.highlights)}</p>
                          <p><span className="font-bold mr-2 text-gray-400">翻译:</span> {item.zh}</p>
                        </div>
                        <button 
                          onClick={() => activateDictation(item.id)}
                          className="px-4 py-2 bg-gray-100 text-[#222222] rounded-full text-sm font-bold flex items-center gap-1.5 hover:bg-gray-200 transition-colors w-fit shadow-[0_4px_14px_rgb(0,0,0,0.05)] border border-slate-100"
                        >
                          <RotateCcw size={16} /> 重听
                        </button>
                      </div>
                    );
                  }

                  if (state.status === 'active') {
                    return (
                      <div key={item.id} className="border-2 border-[#E2F4A6] bg-white rounded-[24px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-6 h-6 rounded-full bg-[#E2F4A6] text-[#222222] flex items-center justify-center text-xs font-bold">
                            {item.id}
                          </span>
                          <span className="text-xs font-bold text-gray-400">{item.time}</span>
                        </div>
                        <p className="text-sm font-bold text-gray-400 italic mb-3">正在听写...</p>
                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                          <textarea
                            className="w-full bg-transparent resize-none outline-none font-bold text-lg text-[#222222] placeholder:text-gray-400"
                            rows={3}
                            placeholder="听到什么写什么..."
                            value={state.userInput}
                            onChange={(e) => handleDictationInput(item.id, e.target.value)}
                            autoFocus
                          />
                          <div className="flex justify-end gap-3 mt-4">
                            <button className="px-4 py-2 bg-gray-100 text-[#222222] rounded-full text-sm font-bold flex items-center gap-1.5 hover:bg-gray-200 transition-colors shadow-[0_4px_14px_rgb(0,0,0,0.05)] border border-slate-100">
                              <RotateCcw size={16} /> 重听
                            </button>
                            <button
                              onClick={() => checkDictation(item.id)}
                              disabled={!state.userInput.trim()}
                              className={`px-5 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 transition-colors shadow-[0_4px_14px_rgb(0,0,0,0.05)] border border-slate-100 ${
                                state.userInput.trim() 
                                  ? 'bg-[#E2F4A6] text-[#222222] hover:bg-[#d4e897]' 
                                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              <Check size={16} /> 检查
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={item.id}
                      onClick={() => activateDictation(item.id)}
                      className="border border-slate-100 bg-white rounded-[24px] p-5 cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 rounded-full bg-[#E2F4A6] text-[#222222] flex items-center justify-center text-xs font-bold group-hover:bg-[#d4e897] transition-colors">
                          {item.id}
                        </span>
                        <span className="text-xs font-bold text-gray-400">{item.time}</span>
                      </div>
                      <p className="text-sm font-bold text-gray-400 group-hover:text-gray-600 transition-colors flex items-center gap-1">
                        点击听写这句 <ArrowRight size={14} />
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'flashcards' && (
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 no-scrollbar">
              <div className="grid grid-cols-1 gap-4">
                {Array.from(new Map(MOCK_TRANSCRIPT.flatMap(item => 
                  item.highlights.map(h => ({ word: h, sentenceEn: item.en, sentenceZh: item.zh }))
                ).map(item => [item.word.toLowerCase(), item])).values()).map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow flex flex-col gap-4 group cursor-pointer">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-bold text-[#222222] group-hover:text-[#222222]/80 transition-colors">{item.word}</h3>
                      <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#222222] hover:bg-[#E2F4A6] transition-colors">
                        <Volume2 size={16} />
                      </button>
                    </div>
                    <div className="pt-4 border-t border-gray-50 space-y-2">
                      <p className="text-sm text-[#222222] font-bold leading-relaxed">
                        {item.sentenceEn.split(new RegExp(`(${item.word})`, 'gi')).map((part, i) => 
                          part.toLowerCase() === item.word.toLowerCase() 
                            ? <span key={i} className="text-[#222222] bg-[#E2F4A6]/20 px-1 rounded">{part}</span>
                            : <span key={i}>{part}</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">{item.sentenceZh}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<ThemeVariant>('v1');
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'saved' | 'profile'>('home');
  const [exploreSubTab, setExploreSubTab] = useState<'all' | 'saved' | 'to-learn'>('all');
  const [savedTab, setSavedTab] = useState<'words' | 'sentences'>('words');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  if (selectedVideo) {
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <VideoDetailPage video={selectedVideo} onBack={() => setSelectedVideo(null)} />
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`min-h-screen ${themeConfig[theme].appBg} font-sans text-[#222222] flex justify-center lg:p-8`}>
        {/* Responsive Container */}
        <div className="w-full max-w-[390px] md:max-w-[768px] lg:max-w-[1200px] flex flex-col lg:flex-row gap-8 relative">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:flex flex-col w-64 shrink-0 h-[calc(100vh-64px)] sticky top-8">
            <div className={`${themeConfig[theme].sidebarBg || 'bg-white'} rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex-1 flex flex-col`}>
            <div className="flex items-center gap-3 mb-12 px-2">
              <div className="w-10 h-10 bg-[#E2F4A6] rounded-xl flex items-center justify-center">
                <BookOpen size={24} className="text-[#222222]" />
              </div>
              <div className="text-3xl font-black tracking-tighter text-[#222222]">buddy</div>
            </div>
            
            <nav className="flex flex-col gap-2 flex-1">
              <SidebarItem icon={<PlayCircle size={24} />} label="学习" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
              <SidebarItem icon={<Search size={24} />} label="探索" isActive={activeTab === 'explore'} onClick={() => setActiveTab('explore')} />
              <SidebarItem icon={<Bookmark size={24} />} label="收藏" isActive={activeTab === 'saved'} onClick={() => setActiveTab('saved')} />
              <SidebarItem icon={<User size={24} />} label="我的" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3 px-2">
                <img src="https://picsum.photos/seed/avatar/100/100" alt="Profile" className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
                <div>
                  <p className="text-sm font-bold text-[#222222]">Alex</p>
                  <p className="text-xs font-medium text-gray-500">免费版</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={`flex-1 ${themeConfig[theme].appBg} lg:bg-transparent min-h-screen lg:min-h-0 relative flex flex-col overflow-hidden`}>
          <div className="flex-1 overflow-y-auto no-scrollbar pb-28 lg:pb-0">
            {activeTab === 'home' && <HomeTab setActiveTab={setActiveTab} setExploreSubTab={setExploreSubTab} setSavedTab={setSavedTab} onVideoSelect={setSelectedVideo} />}
            {activeTab === 'explore' && <ExploreTab exploreSubTab={exploreSubTab} setExploreSubTab={setExploreSubTab} onVideoSelect={setSelectedVideo} />}
            {activeTab === 'saved' && <SavedTab savedTab={savedTab} setSavedTab={setSavedTab} />}
            {activeTab === 'profile' && (
              <div className="flex items-center justify-center h-full text-gray-400 font-bold text-xl">
                我的页面占位符
              </div>
            )}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl pb-safe pt-4 px-8 flex justify-between items-center z-30 rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'home' ? 'text-[#222222]' : 'text-gray-400 hover:text-[#222222]'}`}>
            <PlayCircle size={28} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            <span className="text-[10px] font-bold tracking-wide">学习</span>
          </button>
          <button onClick={() => setActiveTab('explore')} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'explore' ? 'text-[#222222]' : 'text-gray-400 hover:text-[#222222]'}`}>
            <Search size={28} strokeWidth={activeTab === 'explore' ? 2.5 : 2} />
            <span className="text-[10px] font-bold tracking-wide">探索</span>
          </button>
          <button onClick={() => setActiveTab('saved')} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'saved' ? 'text-[#222222]' : 'text-gray-400 hover:text-[#222222]'}`}>
            <Bookmark size={28} strokeWidth={activeTab === 'saved' ? 2.5 : 2} />
            <span className="text-[10px] font-bold tracking-wide">收藏</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'profile' ? 'text-[#222222]' : 'text-gray-400 hover:text-[#222222]'}`}>
            <User size={28} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
            <span className="text-[10px] font-bold tracking-wide">我的</span>
          </button>
        </nav>

      </div>
    </div>
    <ThemeSwitcher />
    </ThemeContext.Provider>
  );
}

function SidebarItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  const { theme } = React.useContext(ThemeContext);
  const currentTheme = themeConfig[theme];
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-bold text-lg ${
        isActive 
          ? `${currentTheme.sidebarActiveBg} ${currentTheme.sidebarActiveText} shadow-md` 
          : `${currentTheme.sidebarInactiveText} ${currentTheme.sidebarInactiveHoverBg} ${currentTheme.sidebarInactiveHoverText}`
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// --- Tab Components ---

function HomeTab({ setActiveTab, setExploreSubTab, setSavedTab, onVideoSelect }: { setActiveTab: (tab: any) => void, setExploreSubTab: (tab: any) => void, setSavedTab: (tab: any) => void, onVideoSelect: (vid: any) => void }) {
  const { theme } = React.useContext(ThemeContext);
  const currentTheme = themeConfig[theme];
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (calendarRef.current) {
      // Scroll to the middle week (current week) on mount
      calendarRef.current.scrollLeft = calendarRef.current.clientWidth;
    }
  }, []);

  const handleSeeAllToLearn = () => {
    setActiveTab('explore');
    setExploreSubTab('to-learn');
  };

  const handleSeeAllFeatured = () => {
    setActiveTab('explore');
    setExploreSubTab('all');
  };

  return (
    <>
      {/* Mobile Header */}
      <header className={`lg:hidden px-6 pt-12 pb-4 flex justify-between items-center ${currentTheme.appBg} sticky top-0 z-20`}>
        <h1 className="text-2xl font-bold text-[#222222]">你好！</h1>
        <div className="text-2xl font-black tracking-tighter text-[#222222]">buddy</div>
      </header>

      {/* Desktop Header Spacer */}
      <div className="hidden lg:block h-8"></div>

      <div className="px-6 lg:px-0 flex flex-col gap-8 lg:gap-10">
        
        {/* Row 1: Calendar + Stats */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-stretch">
          
          {/* Calendar: 40% */}
          <section className="w-full md:w-2/5 flex flex-col">
            <div className="bg-[#E2F4A6] rounded-[32px] p-6 lg:p-8 flex flex-col gap-4 lg:gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 h-full justify-center">
              <div className="flex items-center justify-between text-[#222222] font-bold text-lg lg:text-xl">
                <div className="flex items-center gap-2">
                  <Flame size={24} fill="currentColor" />
                  <span>打卡日历</span>
                </div>
              </div>
              
              <div ref={calendarRef} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 px-6 lg:-mx-8 lg:px-8 gap-6 lg:gap-8">
                {[-1, 0, 1].map((weekOffset) => {
                  const today = new Date();
                  const currentDay = today.getDay() === 0 ? 7 : today.getDay(); // 1-7 (Mon-Sun)
                  const startOfWeek = new Date(today);
                  startOfWeek.setDate(today.getDate() - currentDay + 1 + weekOffset * 7);

                  return (
                    <div key={weekOffset} className="flex justify-between min-w-full snap-center">
                      {['一', '二', '三', '四', '五', '六', '日'].map((dayName, i) => {
                        const date = new Date(startOfWeek);
                        date.setDate(startOfWeek.getDate() + i);
                        const isToday = weekOffset === 0 && i + 1 === currentDay;

                        return (
                          <div key={i} className="flex flex-col items-center gap-2 lg:gap-3">
                            <span className="text-[10px] lg:text-xs font-bold text-[#222222]/60">{dayName}</span>
                            <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs lg:text-sm font-bold ${isToday ? 'bg-[#222222] text-white shadow-md' : 'bg-white text-[#222222]'}`}>
                              {date.getDate()}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Stats: 60% */}
          <section className="w-full md:w-3/5 grid grid-cols-3 gap-3 lg:gap-4">
            {/* Card 1: 待学视频 */}
            <div 
              onClick={() => { setActiveTab('explore'); setExploreSubTab('to-learn'); }}
              className="bg-[#E2F4A6] rounded-[24px] py-5 px-2 lg:py-6 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all cursor-pointer active:scale-95"
            >
              <span className="text-3xl lg:text-4xl font-black text-[#222222]">5</span>
              <span className="text-[11px] lg:text-sm font-bold text-[#222222]/70 mt-1 lg:mt-2">待学视频</span>
            </div>
            
            {/* Card 2: 收藏单词 */}
            <div 
              onClick={() => { setActiveTab('saved'); setSavedTab('words'); }}
              className="bg-[#EEA0FF] rounded-[24px] py-5 px-2 lg:py-6 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all cursor-pointer active:scale-95"
            >
              <span className="text-3xl lg:text-4xl font-black text-[#222222]">28</span>
              <span className="text-[11px] lg:text-sm font-bold text-[#222222]/70 mt-1 lg:mt-2">收藏单词</span>
            </div>

            {/* Card 3: 收藏句子 */}
            <div 
              onClick={() => { setActiveTab('saved'); setSavedTab('sentences'); }}
              className="bg-[#E2F4A6] rounded-[24px] py-5 px-2 lg:py-6 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all cursor-pointer active:scale-95"
            >
              <span className="text-3xl lg:text-4xl font-black text-[#222222]">12</span>
              <span className="text-[11px] lg:text-sm font-bold text-[#222222]/70 mt-1 lg:mt-2">收藏句子</span>
            </div>
          </section>
        </div>

        {/* Row 2: Video Feeds */}
        <div className="flex flex-col gap-8 lg:gap-10">
          {/* Pending Videos */}
          <section>
            <div className="flex justify-between items-end mb-4 lg:mb-6">
              <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-[#222222]">待学视频</h2>
              <button onClick={handleSeeAllToLearn} className={`text-sm font-bold ${currentTheme.textBtnText} hover:opacity-70 transition-colors`}>查看全部 &gt;</button>
            </div>
            <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 no-scrollbar snap-x">
              {EXPLORE_VIDEOS.filter(v => v.status === 'to-learn').map((vid) => (
                <HorizontalVideoCard key={vid.id} vid={vid} onClick={() => onVideoSelect(vid)} />
              ))}
            </div>
          </section>

          {/* Featured Videos */}
          <section className="mb-8 lg:mb-12">
          <div className="flex justify-between items-end mb-4 lg:mb-6">
            <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-[#222222]">精选视频</h2>
            <button onClick={handleSeeAllFeatured} className={`text-sm font-bold ${currentTheme.textBtnText} hover:opacity-70 transition-colors`}>查看全部 &gt;</button>
          </div>
          <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 no-scrollbar snap-x">
            {EXPLORE_VIDEOS.map((vid) => (
              <div key={vid.id} className="w-[180px] lg:w-[220px] shrink-0 snap-start">
                <VideoCard vid={vid} onClick={() => onVideoSelect(vid)} />
              </div>
            ))}
          </div>
        </section>
        </div>
      </div>
    </>
  );
}

function ExploreTab({ exploreSubTab, setExploreSubTab, onVideoSelect }: { exploreSubTab: string, setExploreSubTab: (tab: any) => void, onVideoSelect: (vid: any) => void }) {
  const { theme } = React.useContext(ThemeContext);
  const currentTheme = themeConfig[theme];
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const hasActiveFilters = true;

  const filteredVideos = EXPLORE_VIDEOS.filter(vid => {
    if (exploreSubTab === 'all') return true;
    if (exploreSubTab === 'saved') return vid.status === 'saved';
    if (exploreSubTab === 'to-learn') return vid.status === 'to-learn';
    return true;
  });

  return (
    <>
      {/* Header & Search */}
      <header className={`px-6 lg:px-0 pt-12 lg:pt-8 pb-4 ${currentTheme.appBg} lg:bg-transparent sticky top-0 z-20`}>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#222222] mb-6 lg:mb-8">探索</h1>
        
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 mb-6">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="搜索视频..." 
                className="w-full bg-white rounded-full py-4 pl-12 pr-6 text-sm font-bold text-[#222222] placeholder-gray-400 focus:outline-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
              />
            </div>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#222222] relative shrink-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal size={20} />
              {hasActiveFilters && (
                <span className="absolute top-3 right-3 w-3 h-3 bg-[#EEA0FF] rounded-full border-2 border-white"></span>
              )}
            </button>
          </div>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="flex bg-[#E8E8E8] p-1.5 rounded-full lg:w-fit">
          <button 
            onClick={() => setExploreSubTab('all')}
            className={`flex-1 lg:px-8 py-3 rounded-full text-sm font-bold transition-all ${
              exploreSubTab === 'all' 
                ? 'bg-white text-[#222222] shadow-sm' 
                : 'text-[#222222]/60 hover:text-[#222222]'
            }`}
          >
            全部视频
          </button>
          <button 
            onClick={() => setExploreSubTab('saved')}
            className={`flex-1 lg:px-8 py-3 rounded-full text-sm font-bold transition-all ${
              exploreSubTab === 'saved' 
                ? 'bg-white text-[#222222] shadow-sm' 
                : 'text-[#222222]/60 hover:text-[#222222]'
            }`}
          >
            收藏视频
          </button>
          <button 
            onClick={() => setExploreSubTab('to-learn')}
            className={`flex-1 lg:px-8 py-3 rounded-full text-sm font-bold transition-all ${
              exploreSubTab === 'to-learn' 
                ? 'bg-white text-[#222222] shadow-sm' 
                : 'text-[#222222]/60 hover:text-[#222222]'
            }`}
          >
            待学视频
          </button>
        </div>
      </header>

      {/* Video Grid */}
      <div className="px-6 lg:px-0 pt-2 pb-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm font-bold text-gray-500">
            {exploreSubTab === 'all' ? '为您推荐' : exploreSubTab === 'saved' ? '已收藏的内容' : '继续您的学习'}
          </p>
        </div>
        
        {filteredVideos.length > 0 ? (
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {filteredVideos.map((vid) => (
              <VideoCard key={vid.id} vid={vid} onClick={() => onVideoSelect(vid)} />
            ))}
          </section>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <BookOpen size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-[#222222]">暂无内容</h3>
            <p className="text-sm text-gray-500 mt-2">这里还没有相关的视频记录</p>
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:justify-center lg:items-center">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsFilterOpen(false)} 
          />
          <div className={`relative ${currentTheme.appBg} lg:bg-white rounded-t-[40px] lg:rounded-[40px] p-8 pb-safe lg:pb-8 flex flex-col gap-8 shadow-2xl animate-in slide-in-from-bottom-full lg:slide-in-from-bottom-8 duration-300 w-full lg:max-w-md`}>
            
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold tracking-tight text-[#222222]">筛选</h3>
              <button onClick={() => setIsFilterOpen(false)} className="w-10 h-10 bg-[#E8E8E8] rounded-full flex items-center justify-center text-[#222222] hover:bg-gray-200 transition-colors">
                <X size={20}/>
              </button>
            </div>

            {/* Difficulty */}
            <div>
              <h4 className="text-base font-bold text-[#222222] mb-4">难度等级</h4>
              <div className="flex flex-wrap gap-3">
                {['不限', '初级', '中级', '高级'].map(d => (
                  <button 
                    key={d}
                    className={`px-5 py-3 rounded-full text-sm font-bold transition-all ${
                      d === '中级' 
                        ? 'bg-[#222222] text-white shadow-md' 
                        : 'bg-white lg:bg-gray-50 text-[#222222] hover:bg-gray-100'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div>
              <h4 className="text-base font-bold text-[#222222] mb-4">话题</h4>
              <div className="flex flex-wrap gap-3">
                {['旅行', '科技', '美食', '日常', '商业', '文化'].map(t => (
                  <button 
                    key={t}
                    className={`px-5 py-3 rounded-full text-sm font-bold transition-all ${
                      ['科技', '日常'].includes(t) 
                        ? 'bg-[#E2F4A6] text-[#222222] shadow-sm' 
                        : 'bg-white lg:bg-gray-50 text-[#222222] hover:bg-gray-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button 
              className="w-full py-5 bg-[#EEA0FF] text-[#222222] rounded-full font-bold text-lg mt-4 active:scale-95 transition-transform shadow-sm hover:shadow-md" 
              onClick={() => setIsFilterOpen(false)}
            >
              显示结果
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function SavedTab({ savedTab, setSavedTab }: { savedTab: 'words' | 'sentences', setSavedTab: (tab: 'words' | 'sentences') => void }) {
  const { theme } = React.useContext(ThemeContext);
  const currentTheme = themeConfig[theme];
  return (
    <>
      {/* Header */}
      <header className={`px-6 lg:px-0 pt-12 lg:pt-8 pb-4 flex justify-between items-center ${currentTheme.appBg} lg:bg-transparent sticky top-0 z-20`}>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#222222]">内容库</h1>
        <div className="flex gap-3 items-center lg:hidden">
          <button className="w-12 h-12 rounded-full bg-[#E8E8E8] flex items-center justify-center text-[#222222]">
            <Settings size={20} />
          </button>
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            <img 
              src="https://picsum.photos/seed/avatar/100/100" 
              alt="Profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      {/* Segmented Control */}
      <div className="px-6 lg:px-0 mb-8">
        <div className="flex bg-[#E8E8E8] p-1.5 rounded-full lg:w-fit">
          <button 
            onClick={() => setSavedTab('words')}
            className={`flex-1 lg:px-12 py-3 rounded-full text-sm font-bold transition-all ${
              savedTab === 'words' 
                ? 'bg-white text-[#222222] shadow-sm' 
                : 'text-[#222222]/60 hover:text-[#222222]'
            }`}
          >
            收藏单词
          </button>
          <button 
            onClick={() => setSavedTab('sentences')}
            className={`flex-1 lg:px-12 py-3 rounded-full text-sm font-bold transition-all ${
              savedTab === 'sentences' 
                ? 'bg-white text-[#222222] shadow-sm' 
                : 'text-[#222222]/60 hover:text-[#222222]'
            }`}
          >
            收藏句子
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 lg:px-0 pb-8">
        {savedTab === 'words' ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAVED_WORDS.map((word) => (
              <div key={word.id} className="bg-white rounded-[24px] p-6 flex items-center justify-between group cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                <div className="pr-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <h4 className="font-bold text-[#222222] text-xl leading-snug">{word.en}</h4>
                    <span className="text-xs font-bold text-gray-400">{word.type}</span>
                  </div>
                  <p className="text-sm text-[#222222]/70 font-bold">{word.zh}</p>
                </div>
                <button className="w-12 h-12 rounded-full bg-[#E2F4A6] text-[#222222] flex items-center justify-center shrink-0 transition-transform active:scale-95 hover:bg-[#d6eb96]">
                  <Volume2 size={20} />
                </button>
              </div>
            ))}
          </section>
        ) : (
          <section className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6">
            {SAVED_SENTENCES.map((phrase) => (
              <div key={phrase.id} className="bg-white rounded-[32px] p-6 lg:p-8 flex items-center justify-between group cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                <div className="pr-4">
                  <h4 className="font-bold text-[#222222] text-lg lg:text-xl leading-snug">{phrase.en}</h4>
                  <p className="text-sm lg:text-base text-[#222222]/60 mt-3 font-bold">{phrase.zh}</p>
                </div>
                <button className="w-14 h-14 rounded-full bg-[#E2F4A6] text-[#222222] flex items-center justify-center shrink-0 transition-transform active:scale-95 hover:bg-[#d4e897]">
                  <Volume2 size={24} />
                </button>
              </div>
            ))}
          </section>
        )}
      </div>
    </>
  );
}
