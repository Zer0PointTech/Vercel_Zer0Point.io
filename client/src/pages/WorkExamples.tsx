import { useEffect, useRef, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HardHat, Users, Truck, Flame, Zap, Building, MonitorPlay, ShieldCheck, BrainCircuit, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function WorkExamples() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'experiences' | 'safety' | 'videos'>('experiences');

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in', 'fade-in', 'slide-in-from-bottom-10');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000');
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const galleryImages = [
    { src: "https://zer0point.io/MarketingPack/VR%20PHOTOS/People%20in%20VR/2.jpg", title: "Immersive Learning Experience" },
    { src: "https://zer0point.io/MarketingPack/VR%20PHOTOS/People%20in%20VR/3.jpg", title: "Confined Spaces Training" },
    { src: "https://zer0point.io/MarketingPack/VR%20PHOTOS/People%20in%20VR/4.jpg", title: "Industrial Training" },
    { src: "https://zer0point.io/MarketingPack/VR%20PHOTOS/People%20in%20VR/5.jpg", title: "Corporate Training" },
    { src: "https://zer0point.io/MarketingPack/VR%20Screenshots/Safety%20Skills/Fire%20Extinguisher/image.png", title: "Safety Training Demo" },
    { src: "https://zer0point.io/MarketingPack/VR%20Screenshots/Safety%20Skills/Working%20at%20Heights/image.png", title: "VR Training Modules" }
  ];

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % galleryImages.length));
    }
  }, [lightboxIndex, galleryImages.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length));
    }
  }, [lightboxIndex, galleryImages.length]);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  const safetyModules = [
    "Hand Safety", "Hazard Identification", "Manual Handling", "Working Around Forklifts",
    "Forklift Inspection", "Hazardous Substances", "Office Hazards", "Confined Space Entry",
    "Lock-Out Tag Out", "Slips, Trips & Falls", "Fire Extinguisher Skills", "Fire Hazard Identification",
    "EWP Operations", "Working At Heights", "Bus Driver Safety", "Electric Vehicle Safety",
    "Hand & Power Tools Safety", "Working at Heights: Oil Rig"
  ];

  const softSkillsModules = [
    "Customer Service", "Workplace Communication", "Understanding Conflict", "Resolving Conflict",
    "Delivering Feedback", "Public Speaking & Presentations", "Job Interview Preparation",
    "Negotiation & Conflict Management", "Team Building", "Understanding Microagressions",
    "Combating Unconscious Bias", "Sustaining Better Conversations", "Leading DEI at Work",
    "Active Listening", "Interview Auditor", "Remote Inclusion", "Career Communication", "Reporting Racism"
  ];

  const demoVideos = [
    {
      title: "Next World VR Product Reel",
      description: "35-second showcase of our Next World VR platform capabilities",
      src: "https://zer0point.io/MarketingPack/VIDEOS/Promo%20Reels/35%20sec%20Next%20World%20-%20Product%20Reel%20(with%20BGM).mp4"
    },
    {
      title: "VR Trainer Onboarding",
      description: "Complete onboarding experience for VR training instructors",
      src: "https://zer0point.io/MarketingPack/VIDEOS/compressed/Next%20World%20-%20VR%20Trainer%20Onboarding%20Day_compressed.mp4"
    },
    {
      title: "Fire Extinguisher Skills Demo",
      description: "Interactive fire safety training demonstration",
      src: "https://zer0point.io/MarketingPack/VIDEOS/compressed/Fire%20Extinguisher%20Skills_compressed.mp4"
    },
    {
      title: "Hand Safety Training",
      description: "Comprehensive hand safety protocols in VR",
      src: "https://zer0point.io/MarketingPack/VIDEOS/compressed/Hand%20Safety_compressed.mp4"
    },
    {
      title: "Electric Vehicle Safety Demo",
      description: "EV depower and initialization training module",
      src: "https://zer0point.io/MarketingPack/VIDEOS/Safety%20Training/NW%20Depower%20and%20Initialise%20Electric%20Vehicle%20Demo%20Video%20(muted).mp4"
    },
    {
      title: "Bodyswaps Platform Trailer",
      description: "Soft skills training platform demonstration",
      src: "https://zer0point.io/MarketingPack/VIDEOS/compressed/Bodyswaps%20Platform%20Trailer%20-%20social%20edit_compressed.mp4"
    }
  ];

  const categories = [
    {
      icon: <HardHat className="w-8 h-8 text-primary" />,
      title: "Industrial Safety",
      description: "Comprehensive safety protocols for industrial environments including machinery operation, hazard identification, and emergency procedures."
    },
    {
      icon: <Truck className="w-8 h-8 text-primary" />,
      title: "Vehicle Operations",
      description: "Specialized training for forklift operations, electric vehicle handling, and general vehicle safety in workplace settings."
    },
    {
      icon: <Flame className="w-8 h-8 text-primary" />,
      title: "Emergency Response",
      description: "Fire safety, evacuation procedures, first aid, and emergency equipment operation training modules."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Professional Development",
      description: "Soft skills enhancement including communication, leadership, conflict resolution, and diversity training."
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Electrical Safety",
      description: "Lock-out/tag-out procedures, electrical hazard identification, and safe work practices around electrical equipment."
    },
    {
      icon: <Building className="w-8 h-8 text-primary" />,
      title: "Office Safety",
      description: "Ergonomics, office hazard identification, and creating safe work environments in corporate settings."
    }
  ];

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden selection:bg-primary selection:text-background">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="container relative z-10 text-center">
          <h1 className="font-display font-bold text-5xl md:text-7xl tracking-tight mb-6 reveal">
            Work Examples & <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed reveal">
            Explore our comprehensive XR training solutions and implementations, designed to transform workforce capability through immersive learning.
          </p>
        </div>
      </section>

      {/* VR Libraries Section */}
      <section className="py-20 relative">
        <div className="container">
          <div className="text-center mb-16 reveal">
            <h2 className="font-display font-bold text-4xl mb-4">VR Training Libraries</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Safety Library */}
            <Card className="glass-card border-white/10 bg-transparent reveal group h-full flex flex-col">
              <div className="p-6 pb-0">
                <div className="relative w-full overflow-hidden rounded-xl border border-white/10">
                  <img 
                    src="https://zer0point.io/MarketingPack/VR%20LIBRARY/VR%20Safety%20Library.png" 
                    alt="VR Safety Library"
                    loading="lazy"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="font-display text-3xl text-white">VR Safety Library</CardTitle>
                <p className="text-muted-foreground mt-2">Comprehensive safety training modules designed for immersive learning experiences.</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {safetyModules.map((module, idx) => (
                    <div key={idx} className="bg-white/5 hover:bg-primary/20 border border-white/10 rounded-lg p-3 text-sm text-gray-300 transition-colors text-center">
                      {module}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Soft Skills Library */}
            <Card className="glass-card border-white/10 bg-transparent reveal group h-full flex flex-col">
              <div className="p-6 pb-0">
                <div className="relative w-full overflow-hidden rounded-xl border border-white/10">
                  <img 
                    src="https://zer0point.io/MarketingPack/VR%20LIBRARY/VR%20Soft%20Skills%20Library.png" 
                    alt="VR Soft Skills Library"
                    loading="lazy"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="font-display text-3xl text-white">VR Soft Skills Library</CardTitle>
                <p className="text-muted-foreground mt-2">Professional development and interpersonal skills training in virtual environments.</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {softSkillsModules.map((module, idx) => (
                    <div key={idx} className="bg-white/5 hover:bg-primary/20 border border-white/10 rounded-lg p-3 text-sm text-gray-300 transition-colors text-center">
                      {module}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Gallery Section */}
      <section className="py-20 relative overflow-hidden bg-white/5">
        <div className="container relative z-10 text-center reveal">
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-12">VR Experience Gallery</h2>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('experiences')}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'experiences' 
                  ? 'bg-white/10 text-white border border-white/20' 
                  : 'bg-transparent text-muted-foreground hover:text-white border border-transparent'
              }`}
            >
              Experiences
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'safety' 
                  ? 'bg-white/10 text-white border border-white/20' 
                  : 'bg-transparent text-muted-foreground hover:text-white border border-transparent'
              }`}
            >
              Safety Training
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'videos' 
                  ? 'bg-white/10 text-white border border-white/20' 
                  : 'bg-transparent text-muted-foreground hover:text-white border border-transparent'
              }`}
            >
              Demo Videos
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {activeTab === 'experiences' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto animate-in fade-in zoom-in duration-500">
                {galleryImages.map((item, idx) => (
                  <div key={idx} className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.src} 
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onClick={() => setLightboxIndex(idx)}
                      />
                    </div>
                    <div className="p-4 text-left bg-white/5 border-t border-white/10">
                      <h3 className="text-lg font-medium text-white">{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'safety' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto animate-in fade-in zoom-in duration-500">
                {/* Reusing gallery images as placeholders for safety training visuals if specific ones aren't provided, 
                    or we can map specific safety training images here if available. 
                    For now, using a subset or specific safety images if we had them. 
                    Based on the original site, this tab shows similar grid of images but focused on safety.
                    I'll use the first 3 gallery images as placeholders to demonstrate structure. */}
                 {galleryImages.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.src} 
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4 text-left bg-white/5 border-t border-white/10">
                      <h3 className="text-lg font-medium text-white">{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto animate-in fade-in zoom-in duration-500">
                {demoVideos.map((video, idx) => (
                  <Card key={idx} className="glass-card border-white/10 bg-transparent overflow-hidden group hover:border-primary/50 transition-all duration-300">
                    <div className="relative aspect-video bg-black">
                      <video 
                        src={video.src}
                        controls
                        className="w-full h-full object-cover"
                        poster={galleryImages[idx]?.src || undefined}
                      />
                    </div>
                    <CardHeader className="p-6 text-left">
                      <CardTitle className="font-display text-lg text-white mb-2">{video.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{video.description}</p>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Training Categories Grid */}
      <section className="py-20 relative">
        <div className="container">
          <div className="text-center mb-16 reveal">
            <h2 className="font-display font-bold text-4xl mb-4">Training Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specialized training tracks tailored to specific industry needs and operational requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="glass-card border-white/10 bg-transparent reveal group hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="mb-4 p-3 bg-white/5 w-fit rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                    {category.icon}
                  </div>
                  <CardTitle className="font-display text-xl text-white">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors hidden md:block"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors hidden md:block"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div 
            className="relative max-w-7xl max-h-[90vh] w-full flex flex-col items-center justify-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={galleryImages[lightboxIndex].src} 
              alt={galleryImages[lightboxIndex].title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="text-center">
              <h3 className="text-xl font-medium text-white mb-1">{galleryImages[lightboxIndex].title}</h3>
              <p className="text-white/70 text-sm">Image {lightboxIndex + 1} of {galleryImages.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
