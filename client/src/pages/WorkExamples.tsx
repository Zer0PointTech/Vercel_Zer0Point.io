import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HardHat, Users, Truck, Flame, Zap, Building, MonitorPlay, ShieldCheck, BrainCircuit, GraduationCap } from 'lucide-react';

export default function WorkExamples() {
  const observerRef = useRef<IntersectionObserver | null>(null);

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Safety Library */}
            <Card className="glass-card border-white/10 bg-transparent reveal group h-full flex flex-col">
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

      {/* Training Categories Grid */}
      <section className="py-20 relative bg-white/5">
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

      {/* Experience Gallery Teaser */}
      <section className="py-20 relative overflow-hidden">
        <div className="container relative z-10 text-center reveal">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-8">
            <MonitorPlay className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">VR Experience Gallery</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            From confined space training to complex industrial simulations, our gallery showcases the depth and breadth of our immersive learning solutions.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {["Safety Training Demos", "Immersive Learning", "Confined Spaces", "Industrial Training", "Corporate Training"].map((tag, idx) => (
              <span key={idx} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
