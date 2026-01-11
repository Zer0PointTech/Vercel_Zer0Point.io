import { useEffect, useRef, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HardHat, Users, Truck, Flame, Zap, Building, MonitorPlay, ShieldCheck, BrainCircuit, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function WorkExamples() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
    "https://zer0point.io/MarketingPack/VR%20PHOTOS/People%20in%20VR/2.jpg",
    "https://zer0point.io/MarketingPack/VR%20PHOTOS/People%20in%20VR/3.jpg",
    "https://zer0point.io/MarketingPack/VR%20PHOTOS/People%20in%20VR/4.jpg",
    "https://zer0point.io/MarketingPack/VR%20PHOTOS/People%20in%20VR/5.jpg",
    "https://zer0point.io/MarketingPack/VR%20Screenshots/Safety%20Skills/Fire%20Extinguisher/image.png",
    "https://zer0point.io/MarketingPack/VR%20Screenshots/Safety%20Skills/Working%20at%20Heights/image.png"
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
              <div className="relative h-64 w-full overflow-hidden rounded-t-xl border-b border-white/10">
                <img 
                  src="https://zer0point.io/MarketingPack/VR%20LIBRARY/VR%20Safety%20Library.png" 
                  alt="VR Safety Library"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              </div>
              <CardHeader>
                <div className="mb-4 p-3 bg-white/5 w-fit rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                  <ShieldCheck className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="font-display text-3xl text-white">VR Safety Library</CardTitle>
                <p className="text-muted-foreground mt-2">Comprehensive safety training modules designed for immersive learning experiences.</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mt-4">
                  {safetyModules.map((module, idx) => (
                    <Badge key={idx} variant="outline" className="bg-white/5 hover:bg-primary/20 border-white/10 text-gray-300 py-1.5 px-3 transition-colors">
                      {module}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Soft Skills Library */}
            <Card className="glass-card border-white/10 bg-transparent reveal group h-full flex flex-col">
              <div className="relative h-64 w-full overflow-hidden rounded-t-xl border-b border-white/10">
                <img 
                  src="https://zer0point.io/MarketingPack/VR%20LIBRARY/VR%20Soft%20Skills%20Library.png" 
                  alt="VR Soft Skills Library"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              </div>
              <CardHeader>
                <div className="mb-4 p-3 bg-white/5 w-fit rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                  <BrainCircuit className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="font-display text-3xl text-white">VR Soft Skills Library</CardTitle>
                <p className="text-muted-foreground mt-2">Professional development and interpersonal skills training in virtual environments.</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mt-4">
                  {softSkillsModules.map((module, idx) => (
                    <Badge key={idx} variant="outline" className="bg-white/5 hover:bg-primary/20 border-white/10 text-gray-300 py-1.5 px-3 transition-colors">
                      {module}
                    </Badge>
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
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-8">
            <MonitorPlay className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">VR Experience Gallery</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            From confined space training to complex industrial simulations, our gallery showcases the depth and breadth of our immersive learning solutions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {galleryImages.map((src, idx) => (
              <div 
                key={idx} 
                className="group relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer"
                onClick={() => setLightboxIndex(idx)}
              >
                <img 
                  src={src} 
                  alt={`VR Experience ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-medium flex items-center gap-2">
                    <MonitorPlay className="w-4 h-4" /> View Experience
                  </span>
                </div>
              </div>
            ))}
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
            className="relative max-w-7xl max-h-[90vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={galleryImages[lightboxIndex]} 
              alt={`Gallery Image ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-[-3rem] left-0 right-0 text-center text-white/70">
              Image {lightboxIndex + 1} of {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
