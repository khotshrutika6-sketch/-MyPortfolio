/// <reference path="../vite-env.d.ts" />
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Download,
  ExternalLink,
  Code,
  Palette,
  Database,
  Layout,
  Smartphone,
  Zap,
  Atom,
  Server,
  GitBranch,
  Figma,
  Wind,
  Globe,
  PenTool,
  Terminal,
  Binary,
  Brain,
  FlaskConical,
  Cpu,
  Menu,
  X
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import heroVideo from '../imports/hero-bg.mp4.mp4';
import profileImage from '../assets/profile.png';
import senselinkImg from '../assets/senselink.png';
import lootupImg from '../assets/lootup.png';
import daysyncImg from '../assets/daysync.png';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const phrases = ['Frontend Developer', 'React Developer', 'UI/UX Enthusiast'];
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [nameText, setNameText] = useState('');
  const nameFullText = 'Shrutika Khot';
  const [activeFilter, setActiveFilter] = useState('All');
  const projectCategories = ['All', 'AI', 'Web', 'Apps'];

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Global Mouse Move for Glow Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll logic & Active Section
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Typing effect for Name
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= nameFullText.length) {
        setNameText(nameFullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Looping Typing effect for subtitle
  useEffect(() => {
    // Wait for main name text to finish before starting
    if (nameText.length < nameFullText.length) return;

    let currentText = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping) {
      if (typedText.length < currentText.length) {
        timeout = setTimeout(() => {
          setTypedText(currentText.slice(0, typedText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000); // Pause at end
      }
    } else {
      if (typedText.length > 0) {
        timeout = setTimeout(() => {
          setTypedText(currentText.slice(0, typedText.length - 1));
        }, 50);
      } else {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [typedText, isTyping, phraseIndex, nameText.length, nameFullText.length]);

  const skillCategories = [
    {
      category: "Frontend",
      icon: Code,
      items: [
        { name: "HTML & CSS", level: "Advanced" },
        { name: "JavaScript", level: "Advanced" },
        { name: "React", level: "Advanced" },
        { name: "Next.js", level: "Intermediate" },
      ],
    },
    {
      category: "Styling & UI",
      icon: Palette,
      items: [
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "Responsive Design", level: "Advanced" },
        { name: "UI/UX", level: "Intermediate" },
        { name: "Figma", level: "Intermediate" },
      ],
    },
    {
      category: "Backend",
      icon: Database,
      items: [
        { name: "Python", level: "Advanced" },
        { name: "Flask", level: "Intermediate" },
        { name: "SQL", level: "Intermediate" },
        { name: "MongoDB", level: "Intermediate" },
      ],
    },
    {
      category: "Ecosystem",
      icon: Cpu,
      items: [
        { name: "Git & GitHub", level: "Advanced" },
        { name: "API Integration", level: "Intermediate" },
        { name: "C++ & DSA", level: "Intermediate" },
        { name: "LLMs (AI)", level: "Intermediate" },
      ],
    },
  ];

  const getBadgeStyle = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg";
      case "Intermediate":
        return "bg-purple-600 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };



  const projects = [
    {
      title: 'SenseLink – AI Accessibility',
      description: 'An AI-powered application that converts images to speech and speech to text.',
      impact: 'Helping visually & hearing impaired users communicate in real-time',
      category: 'AI',
      highlights: [
        'Image-to-speech using vision AI',
        'Real-time speech-to-text conversion',
        'Focused on inclusive and accessible design'
      ],
      image: senselinkImg,
      tech: ['React', 'JavaScript', 'AI', 'Tailwind CSS'],
      demo: 'https://senselink-murf.vercel.app',
      github: '#'
    },
    {
      title: 'LOOT UP – Smart Comparison',
      description: 'A web app that compares product prices across platforms and uses AI-driven review analysis.',
      impact: 'Empowering users to find the best value and make informed purchases effortlessly',
      category: 'Web',
      highlights: [
        'Multi-platform price comparison',
        'AI-based sentiment analysis',
        'Smart product recommendations'
      ],
      image: lootupImg,
      tech: ['React', 'APIs', 'CSS', 'JavaScript'],
      demo: 'https://productcomparisonapp-aa8x.vercel.app',
      github: '#'
    },
    {
      title: 'Daily Scheduler – Tracker',
      description: 'A web application that helps users plan daily tasks, set reminders, and stay organized.',
      impact: 'Boosting productivity by keeping daily goals clear, actionable, and on schedule',
      category: 'Apps',
      highlights: [
        'Task creation and management',
        'Reminder and alert system',
        'Focus on productivity and simplicity'
      ],
      image: daysyncImg,
      tech: ['React', 'Local Storage', 'CSS', 'JavaScript'],
      demo: 'https://daily-scheduler-app-nu.vercel.app',
      github: '#'
    }
  ];

  const getTechIcon = (tech: string) => {
    const t = tech.toLowerCase();
    if (t.includes('react')) return '⚛️';
    if (t.includes('java') || t.includes('js')) return '🟨';
    if (t.includes('ai')) return '🧠';
    if (t.includes('tailwind')) return '🌬️';
    if (t.includes('api')) return '🔌';
    if (t.includes('storage')) return '💾';
    if (t.includes('css')) return '🎨';
    return '⚡';
  };

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "f1e3b578-dfa9-43d6-b856-ddd4113c0b3f");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Message sent successfully! I will get back to you soon.');
        (event.target as HTMLFormElement).reset();
      } else {
        console.error("Error", data);
        toast.error(data.message || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
       console.error("Network Error", error);
       toast.error('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      <Toaster theme="dark" position="bottom-right" richColors />
      {/* Global Wow Element: Mouse Follow Glow */}
      {/* Global Wow Element: Mouse Follow Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 198, 255, 0.05), transparent 80%)`
        }}
      />
      {/* Global Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-100"
          src={heroVideo}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-4 left-4 right-4 md:top-6 md:left-auto md:right-auto md:w-[600px] md:translate-x-[-50%] md:ml-[50%] z-[100] transition-all duration-300 rounded-2xl ${
          isScrolled || isMobileMenuOpen
            ? 'bg-black/90 md:bg-white/5 backdrop-blur-[12px] border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent backdrop-blur-none border border-transparent'
        }`}
      >
        <div className="px-6 py-3 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center group cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <div className="text-3xl font-black tracking-tighter bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent transition-all duration-300 group-hover:rotate-12 group-hover:drop-shadow-[0_0_10px_rgba(0,198,255,0.8)]">
              SK<span className="text-white">.</span>
            </div>
          </motion.div>
          <div className="hidden md:flex gap-8 items-center">
            {['About', 'Skills', 'Projects', 'Resume', 'Contact'].map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm transition-all duration-300 relative py-1 ${
                  activeSection === item.toLowerCase() ? 'text-[#f5f5f5] font-bold [text-shadow:0_0_8px_rgba(255,255,255,0.4)]' : 'text-gray-300 hover:text-[#00c6ff]'
                }`}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <motion.div layoutId="navbar-indicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-full shadow-[0_0_8px_rgba(0,198,255,0.8)]" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors p-1"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden px-6 pb-6 overflow-hidden border-t border-white/10"
          >
            <div className="flex flex-col gap-4 pt-4">
              {['About', 'Skills', 'Projects', 'Resume', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item.toLowerCase());
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-sm text-left transition-all duration-300 py-2 border-b border-white/5 ${
                    activeSection === item.toLowerCase() ? 'text-[#00c6ff] font-bold' : 'text-gray-300 hover:text-[#00c6ff]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex flex-col pt-24 pb-6 overflow-hidden">
        {/* Spacer for vertical centering */}
        <div className="flex-1"></div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 text-[#f5f5f5] tracking-wide [text-shadow:0_0_10px_rgba(255,255,255,0.2)] min-h-[50px] md:min-h-[90px]"
          >
            {nameText}
            {nameText.length > 0 && nameText.length < nameFullText.length && (
              <span className="inline-block w-1 h-8 sm:h-12 md:h-16 bg-[#00c6ff] ml-2 animate-pulse shadow-[0_0_10px_#00c6ff]"></span>
            )}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="h-8 sm:h-12 md:h-16 mb-4 sm:mb-8"
          >
            <p className="text-lg sm:text-xl md:text-3xl font-medium tracking-wide bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent">
              {typedText}
              {typedText.length < phrases[phraseIndex].length && (
                <span className="inline-block w-0.5 h-6 bg-[#0072ff] ml-1 animate-pulse"></span>
              )}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-sm sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Designing smooth, scalable & aesthetic web experiences
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto px-8 py-3 sm:py-4 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-[12px] font-semibold relative group overflow-hidden transition-all hover:scale-105 shadow-[0_0_15px_rgba(0,198,255,0.4)] hover:shadow-[0_0_30px_rgba(0,198,255,0.7)] text-white"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 h-full w-full bg-white/20 scale-0 origin-center rounded-[12px] group-hover:scale-100 transition-transform duration-300 ease-out"></div>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto px-8 py-3 sm:py-4 bg-white/5 border border-white/40 backdrop-blur-md rounded-[12px] font-semibold group overflow-hidden relative transition-all hover:bg-white/10 hover:border-white/60 hover:scale-105 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            >
              <span className="relative z-10">Contact Me</span>
            </button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-6 justify-center mt-12 sm:mt-16"
          >
            <a href="https://github.com/khotshrutika6-sketch" title="View GitHub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#00c6ff]/10 hover:-translate-y-[5px] hover:border-[#00c6ff]/50 hover:shadow-[0_0_15px_rgba(0,198,255,0.4)] transition-all duration-300 group">
              <Github className="w-5 h-5 text-gray-300 group-hover:text-[#00c6ff] transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/shrutika-khot-708219380/" title="Connect on LinkedIn" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#00c6ff]/10 hover:-translate-y-[5px] hover:border-[#00c6ff]/50 hover:shadow-[0_0_15px_rgba(0,198,255,0.4)] transition-all duration-300 group">
              <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-[#00c6ff] transition-colors" />
            </a>
            <a href="mailto:khotshrutika6@gmail.com" title="Send Email" className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#00c6ff]/10 hover:-translate-y-[5px] hover:border-[#00c6ff]/50 hover:shadow-[0_0_15px_rgba(0,198,255,0.4)] transition-all duration-300 group">
              <Mail className="w-5 h-5 text-gray-300 group-hover:text-[#00c6ff] transition-colors" />
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex-1 flex items-end justify-center pb-4 mt-8 z-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="animate-bounce"
          >
            <div 
              className="p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,198,255,0.2)] cursor-pointer hover:bg-white/10 transition-colors"
              onClick={() => scrollToSection('about')}
            >
              <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-[#00c6ff]/90" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-24 md:py-32 px-6 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">About Me</h2>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center justify-between">
            {/* Image Container with entrance animation and floating */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full md:w-5/12 lg:w-4/12 order-1 md:order-1 flex justify-center z-20"
            >
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative group w-64 sm:w-72 md:w-full max-w-sm"
              >
                <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-[#00c6ff] to-[#0072ff] opacity-60 group-hover:opacity-100 blur-[40px] transition-opacity duration-500 z-[-1]"></div>
                <div className="relative rounded-[2rem] overflow-hidden bg-black/80 border border-white/20 group-hover:border-[#00c6ff]/50 transition-colors duration-500 transform group-hover:scale-[1.02]">
                  {/* Subtle blur overlay behind image incase it has transparency */}
                  <div className="absolute inset-0 backdrop-blur-sm z-0"></div>
                  <img
                    src={profileImage}
                    alt="Shrutika Khot"
                    className="relative z-10 w-full h-auto object-cover object-top transform transition-transform duration-700 group-hover:scale-110"
                    style={{ aspectRatio: "4/5" }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Text & Stats Glass Card with entrance animation */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative w-full md:w-7/12 lg:w-8/12 order-2 md:order-2 z-10 md:-ml-8"
            >
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 md:p-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="space-y-6 text-center md:text-left relative z-10">
                  <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Hi, I'm Shrutika 👋
                  </p>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                    A <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00c6ff] to-[#0072ff]">Frontend Developer</span> passionate about building clean, <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00c6ff] to-[#0072ff]">responsive</span>, and visually engaging web experiences.
                  </p>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                    Aspiring Developer & CS Student, valuing hands-on experience and innovation over CGPA.
                  </p>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                    I specialize in <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00c6ff] to-[#0072ff]">React</span> and modern JavaScript, with a strong focus on performance, intuitive <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00c6ff] to-[#0072ff]">UI/UX</span>, and smooth user interactions.
                  </p>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                    I enjoy transforming ideas into interactive digital products that not only look great but also deliver seamless user experiences.
                  </p>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light italic opacity-90 border-l-2 border-[#00c6ff] pl-4 py-1 text-left hidden md:block">
                    "Always learning, building, and exploring new technologies to create impactful digital products."
                  </p>
                  {/* Mobile version of Quote */}
                  <p className="text-lg text-gray-300 leading-relaxed font-light italic opacity-90 block md:hidden">
                    "Always learning, building, and exploring new technologies to create impactful digital products."
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 pb-2">
                    <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[16px] p-5 text-center hover:bg-white/10 hover:border-[#00c6ff] transition-all duration-300 hover:-translate-y-[10px] hover:scale-[1.03] group cursor-default shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(0,198,255,0.2)]">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🚀</div>
                      <div className="font-bold text-white text-sm tracking-wide">5+ Projects</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[16px] p-5 text-center hover:bg-white/10 hover:border-[#00c6ff] transition-all duration-300 hover:-translate-y-[10px] hover:scale-[1.03] group cursor-default shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(0,198,255,0.2)]">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">💻</div>
                      <div className="font-bold text-white text-sm tracking-wide">React Specialist</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[16px] p-5 text-center hover:bg-white/10 hover:border-[#00c6ff] transition-all duration-300 hover:-translate-y-[10px] hover:scale-[1.03] group cursor-default shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(0,198,255,0.2)]">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎯</div>
                      <div className="font-bold text-white text-sm tracking-wide">UI Focused</div>
                    </div>
                  </div>

                  <div className="flex justify-center md:justify-start pt-6">
                    <a
                      href="https://drive.google.com/file/d/12MU6innolongNcp0BAW09exQorP5-2DN/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-full font-bold text-white transition-all duration-300 hover:scale-[1.05] shadow-[0_0_15px_rgba(0,198,255,0.2)] hover:shadow-[0_0_20px_rgba(0,198,255,0.5)]"
                    >
                      <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300 ease-in-out" />
                      Download / View Resume
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="skills" className="relative z-10 py-24 md:py-32 bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 px-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">My Tech Stack 🚀</h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Tools I use to build fast, modern web experiences
            </p>
          </motion.div>

          {/* Horizontal Scroll Container */}
          <div
            className="flex gap-6 overflow-x-auto pb-8 px-6"
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,198,255,0.3) transparent' }}
          >
            {skillCategories.map((group, i) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
                  style={{ scrollSnapAlign: 'center' }}
                  className="group relative flex-shrink-0 w-[300px] md:w-[320px] bg-white/[0.03] backdrop-blur-[12px] rounded-[1.5rem] border border-white/10 p-7 transition-all duration-500 hover:-translate-y-[10px] hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(0,198,255,0.15)] cursor-default"
                >
                  {/* Gradient border glow on hover */}
                  <div className="absolute inset-0 rounded-[1.5rem] border border-transparent group-hover:border-[#00c6ff]/50 transition-colors duration-500 pointer-events-none"></div>

                  {/* Top shine line */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-[#00c6ff]/60 transition-colors duration-500"></div>

                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-7">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#00c6ff]/10 group-hover:border-[#00c6ff]/30 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#00c6ff] transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-wide group-hover:[text-shadow:0_0_12px_rgba(0,198,255,0.6)] transition-all duration-300">
                      {group.category}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {group.items.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white/5 px-4 py-3 rounded-xl border border-white/5 hover:bg-white/10 hover:border-[#00c6ff]/20 transition-all duration-300 group/item"
                      >
                        <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors">{skill.name}</span>
                        <span className={`text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap font-semibold ${getBadgeStyle(skill.level)}`}>
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom glow streak on hover */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#00c6ff]/0 to-transparent group-hover:via-[#00c6ff]/40 transition-all duration-500 rounded-full"></div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile swipe hint */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center text-gray-600 text-sm mt-4 px-6 md:hidden"
          >
            ← Swipe to explore →
          </motion.p>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="relative z-10 py-24 md:py-32 px-6">
        {/* Dark overlay specifically for this section to make content pop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-0 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-md">Things I've Built</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto italic">
              "A collection of digital experiences designed with purpose and built with precision."
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-20"
          >
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === cat 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {activeFilter === cat && (
                  <motion.div
                    layoutId="project-filter-active"
                    className="absolute inset-0 bg-gradient-to-r from-[#00c6ff]/80 to-[#0072ff]/80 rounded-full shadow-[0_0_15px_rgba(0,198,255,0.4)]"
                    style={{ zIndex: -1 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </motion.div>

          {/* 3-Column Grid Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const isFeatured = activeFilter === 'All' && index === 0;
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                  className="group relative bg-white/[0.03] backdrop-blur-[12px] border border-white/10 rounded-[1.5rem] p-6 overflow-hidden transition-all duration-500 hover:-translate-y-[10px] hover:scale-[1.02] hover:border-[#00c6ff]/40 hover:shadow-[0_20px_40px_rgba(0,198,255,0.15)] flex flex-col"
                >
                  {/* Top gradient shine */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-[#00c6ff]/50 transition-colors duration-500"></div>

                  {/* Featured badge */}
                  {isFeatured && (
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-[0_0_12px_rgba(0,198,255,0.5)] w-fit">
                      <span>⭐</span> FEATURED
                    </div>
                  )}

                  {/* Mockup screenshot */}
                  <div className="relative rounded-xl overflow-hidden border border-white/10 mb-5 shadow-xl">
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-black/60 backdrop-blur-sm border-b border-white/10">
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-[1.05] transition-transform duration-700 ease-in-out"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-extrabold text-white mb-1 group-hover:[text-shadow:0_0_15px_rgba(0,198,255,0.4)] transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-[#00c6ff] font-medium text-xs mb-3">{project.impact}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-white/5 text-gray-300 rounded-full border border-white/10 hover:border-[#00c6ff]/40 hover:text-[#00c6ff] transition-all"
                      >
                        <span>{getTechIcon(tech)}</span> {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="mt-auto flex flex-wrap gap-3">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-lg font-bold text-white text-sm hover:shadow-[0_0_20px_rgba(0,198,255,0.4)] hover:scale-105 transition-all"
                    >
                      <ExternalLink className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      Live Demo
                    </a>
                    <a
                      href={project.github !== '#' ? project.github : 'https://github.com/khotshrutika6-sketch'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn2 inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg font-bold text-white text-sm hover:bg-white/10 hover:border-white/40 hover:scale-105 transition-all"
                    >
                      <Github className="w-4 h-4 group-hover/btn2:rotate-[-10deg] transition-transform" />
                      Source
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Module */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-24 md:mt-32 text-center relative z-10"
          >
            <p className="text-xl md:text-2xl text-gray-300 font-medium mb-8">Want to see more of my work?</p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/5 backdrop-blur-xl border border-[#00c6ff]/50 rounded-full hover:bg-[#00c6ff]/10 hover:shadow-[0_0_30px_rgba(0,198,255,0.3)] hover:-translate-y-1 transition-all text-lg font-bold text-[#00c6ff] group"
            >
              👉 Let's Work Together
            </a>
          </motion.div>
        </div>
      </section>



      {/* Resume Section */}
      <section id="resume" className="relative z-10 py-32 px-6 bg-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Resume</h2>
            <p className="text-lg text-gray-400 mb-12">
              Download my resume to learn more about my experience and education
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16 text-left relative z-20"
          >
            {/* Education Column */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="group relative bg-white/[0.02] backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 md:p-10 border border-white/10 hover:bg-white/[0.04] hover:border-orange-500/30 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Decor */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-500/20 transition-all duration-700"></div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 flex items-center gap-3">
                <span className="text-2xl">🎓</span> Education
              </h3>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-[2px] before:bg-gradient-to-b before:from-orange-500/50 before:to-transparent">
                
                {/* Item 1 */}
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center">
                     <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,1)] animate-pulse"></div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-orange-500/5 hover:border-orange-500/30 transition-colors group/item">
                    <p className="font-bold text-lg md:text-xl text-white group-hover/item:text-orange-400 transition-colors">B.Tech — AI & Data Science</p>
                    <p className="text-gray-400 font-medium mt-1">Sanjay Ghodawat University</p>
                    <p className="text-orange-400/90 text-sm mt-3 font-mono bg-orange-500/10 inline-block px-3 py-1 rounded-full border border-orange-500/20">2024 – Present</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-6 h-6 bg-orange-500/10 rounded-full flex items-center justify-center transition-colors group-hover:bg-orange-500/20">
                     <div className="w-2.5 h-2.5 rounded-full bg-orange-500/50 transition-colors group-hover:bg-orange-500"></div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-orange-500/5 hover:border-orange-500/30 transition-colors group/item">
                    <p className="font-bold text-lg md:text-xl text-white group-hover/item:text-orange-400 transition-colors">Class XI & XII (CBSE)</p>
                    <p className="text-gray-400 font-medium mt-1">Om Landmark School, Gujarat</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-6 h-6 bg-orange-500/10 rounded-full flex items-center justify-center transition-colors group-hover:bg-orange-500/20">
                     <div className="w-2.5 h-2.5 rounded-full bg-orange-500/50 transition-colors group-hover:bg-orange-500"></div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-orange-500/5 hover:border-orange-500/30 transition-colors group/item">
                    <p className="font-bold text-lg md:text-xl text-white group-hover/item:text-orange-400 transition-colors">Class X (CBSE)</p>
                    <p className="text-gray-400 font-medium mt-1">Greenergy E.M. School, Sangli</p>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Experience Column */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
              className="group relative bg-white/[0.02] backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 md:p-10 border border-white/10 hover:bg-white/[0.04] hover:border-purple-500/30 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Decor */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/20 transition-all duration-700"></div>

              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 flex items-center gap-3">
                <span className="text-2xl">💼</span> Experience
              </h3>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-[2px] before:bg-gradient-to-b before:from-purple-500/50 before:to-transparent">
                
                {/* Item 1 */}
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                     <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,1)] animate-pulse"></div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-purple-500/5 hover:border-purple-500/30 transition-colors group/item">
                    <p className="font-bold text-lg md:text-xl text-white group-hover/item:text-purple-400 transition-colors">NSGC President</p>
                    <p className="text-gray-400 font-medium mt-1">Sanjay Ghodawat University</p>
                    <p className="text-purple-400/90 text-sm mt-3 font-mono bg-purple-500/10 inline-block px-3 py-1 rounded-full border border-purple-500/20">2024 – Present</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-6 h-6 bg-purple-500/10 rounded-full flex items-center justify-center transition-colors group-hover:bg-purple-500/20">
                     <div className="w-2.5 h-2.5 rounded-full bg-purple-500/50 transition-colors group-hover:bg-purple-500"></div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-purple-500/5 hover:border-purple-500/30 transition-colors group/item">
                    <p className="font-bold text-lg md:text-xl text-white group-hover/item:text-purple-400 transition-colors">Core Member — NYEI</p>
                    <p className="text-gray-400 font-medium mt-1">National Youth Exposure Initiative</p>
                    <p className="text-purple-400/90 text-sm mt-3 font-mono bg-purple-500/10 inline-block px-3 py-1 rounded-full border border-purple-500/20">2024 – Present</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-6 h-6 bg-purple-500/10 rounded-full flex items-center justify-center transition-colors group-hover:bg-purple-500/20">
                     <div className="w-2.5 h-2.5 rounded-full bg-purple-500/50 transition-colors group-hover:bg-purple-500"></div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-purple-500/5 hover:border-purple-500/30 transition-colors group/item">
                    <p className="font-bold text-lg md:text-xl text-white group-hover/item:text-purple-400 transition-colors">Head Girl</p>
                    <p className="text-gray-400 font-medium mt-1">Om Landmark School</p>
                    <p className="text-purple-400/90 text-sm mt-3 font-mono bg-purple-500/10 inline-block px-3 py-1 rounded-full border border-purple-500/20">2023 – 2024</p>
                  </div>
                </div>

              </div>
            </motion.div>

          </motion.div>

          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            href="https://drive.google.com/file/d/12MU6innolongNcp0BAW09exQorP5-2DN/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all transform hover:scale-105"
          >
            <Download className="w-5 h-5" />
            Download / View Resume
          </motion.a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-32 px-6 bg-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Let's Work Together</h2>
            <p className="text-lg text-gray-400 mb-12 text-center">
              I'm currently available for freelance work and open to new opportunities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <a href="mailto:khotshrutika6@gmail.com" className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all group">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="font-medium">khotshrutika6@gmail.com</p>
                    </div>
                  </a>

                  <a href="https://www.linkedin.com/in/shrutika-khot-708219380/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all group">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Linkedin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">LinkedIn</p>
                      <p className="font-medium">shrutika-khot</p>
                    </div>
                  </a>

                  <a href="https://github.com/khotshrutika6-sketch" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all group">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Github className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">GitHub</p>
                      <p className="font-medium">khotshrutika6-sketch</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 space-y-6"
              onSubmit={handleContactSubmit}
            >
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all transform hover:scale-[1.02] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Premium Glassmorphism Footer */}
      <footer className="relative z-10 pt-20 pb-10 px-6 bg-black/60 border-t border-white/10 mt-12 backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00c6ff]/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="text-3xl font-black tracking-tighter bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent mb-4 cursor-pointer hover:drop-shadow-[0_0_10px_rgba(0,198,255,0.8)] transition-all duration-300" onClick={() => scrollToSection('hero')}>
                SK<span className="text-white">.</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Designing smooth, scalable & aesthetic web experiences. Let's build something amazing together.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="col-span-1 flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-4">
                {['About', 'Skills', 'Projects', 'Resume', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-gray-400 hover:text-[#00c6ff] transition-colors text-sm hover:translate-x-1 inline-block transform duration-300"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials & Contact Column */}
            <div className="col-span-1 flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold mb-6 text-lg">Connect</h4>
              <div className="flex gap-4">
                <a href="https://github.com/khotshrutika6-sketch" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00c6ff]/10 hover:border-[#00c6ff]/40 hover:-translate-y-1 transition-all group shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(0,198,255,0.4)]">
                  <Github className="w-5 h-5 text-gray-400 group-hover:text-[#00c6ff]" />
                </a>
                <a href="https://www.linkedin.com/in/shrutika-khot-708219380/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00c6ff]/10 hover:border-[#00c6ff]/40 hover:-translate-y-1 transition-all group shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(0,198,255,0.4)]">
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-[#00c6ff]" />
                </a>
                <a href="mailto:khotshrutika6@gmail.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00c6ff]/10 hover:border-[#00c6ff]/40 hover:-translate-y-1 transition-all group shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(0,198,255,0.4)]">
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-[#00c6ff]" />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Shrutika Khot. All rights reserved.
            </p>
            
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#00c6ff] transition-colors group"
            >
              Back to top
              <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-[#00c6ff]/20 transition-colors">
                <ChevronDown className="w-4 h-4 rotate-180" />
              </div>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}