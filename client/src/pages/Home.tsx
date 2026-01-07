import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Globe, Shield, TrendingUp, Building2, CheckCircle, Users, Target, Handshake, Languages } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
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

  const services = [
    {
      icon: <Building2 className="w-10 h-10 text-primary" />,
      title: "Entity Setup",
      description: "Complete regulatory structuring and compliance setup 4-6 weeks faster than standard.",
      features: ["LLC, Branch, Regional HQ", "Mainland vs. Free Zone", "Sponsor Requirements", "Consulting"]
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-primary" />,
      title: "Banking & Tax",
      description: "Financial foundations with 15-25% tax optimization through strategic structuring.",
      features: ["UAE Corporate Tax (9%)", "UAE VAT (5%)", "Cross-border Planning"]
    },
    {
      icon: <Handshake className="w-10 h-10 text-primary" />,
      title: "Business Development",
      description: "Local representation and partnership development with embedded presence.",
      features: ["Lead Generation", "Reseller/JV Vetting", "Network Access"]
    },
    {
      icon: <Languages className="w-10 h-10 text-primary" />,
      title: "Cultural Intelligence",
      description: "Team preparation and talent enablement with 90% retention success rate.",
      features: ["Multilingual Fluency", "Business Etiquette", "Scalable Presence"]
    },
    {
      icon: <Target className="w-10 h-10 text-primary" />,
      title: "Marketing",
      description: "Digital presence and brand amplification with 40% awareness boost potential.",
      features: ["Social Media Strategy", "On-Ground Campaigns", "Digital Localization"]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[128px]"></div>
          <div className="absolute inset-0 bg-[url('/src/assets/abstract-tech.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        </div>

        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 reveal">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide text-primary uppercase">Zero Limits. Infinite Possibilities.</span>
          </div>
          
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-8 leading-[1.1] reveal">
            Market Entry & Consultancy <br />
            <span className="text-gradient">Global & Regional Solutions</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed reveal">
            Enable rapid, scalable GCC market access with global standards and local execution. Your trusted bridge to success in the UAE and KSA.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 reveal">
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg bg-primary text-background hover:bg-primary/90 rounded-none border border-primary/50 shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all hover:shadow-[0_0_40px_rgba(var(--primary),0.5)]"
              onClick={() => window.location.href = '/contact'}
            >
              Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-8 text-lg border-white/20 hover:bg-white/5 hover:text-white rounded-none backdrop-blur-sm"
              onClick={() => window.location.href = '/contact'}
            >
              View Success Stories
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent"></div>
        </div>
      </section>

      {/* The $100B GCC Opportunity */}
      <section className="py-32 relative border-t border-white/5">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
                The $100B <span className="text-primary">GCC Opportunity</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Vision 2030 & Beyond. Economic diversification drives unprecedented opportunities across UAE and KSA markets.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <Globe />, title: "Strategic Trade Hub", desc: "Global connectivity with Asia, Europe, and Africa." },
                  { icon: <Shield />, title: "Government Support", desc: "Innovation-friendly policies and SME-focused initiatives." },
                  { icon: <TrendingUp />, title: "Tax Efficiency", desc: "Competitive tax regimes and world-class infrastructure." },
                  { icon: <Building2 />, title: "Economic Growth", desc: "Rapid diversification beyond oil sectors." },
                  { icon: <Target />, title: "Consulting", desc: "Chemicals, Digitalization, Sustainability." }
                ].map((item, i) => (
                  <div key={i} className="p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="mb-4 text-primary">{item.icon}</div>
                    <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative reveal">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl"></div>
              <img 
                src="/src/assets/dubai-skyline.jpg" 
                alt="Dubai Skyline" 
                className="relative z-10 w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 border border-white/10 shadow-2xl"
              />
              <div className="absolute -bottom-10 -left-10 bg-background border border-white/10 p-8 z-20 max-w-xs hidden md:block">
                <p className="font-display font-bold text-4xl text-primary mb-2">20+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Years of Regional Leadership</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Five-Pillar Service Framework */}
      <section className="py-32 bg-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 reveal">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">Five-Pillar Service Framework</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive solutions designed to navigate the complexities of GCC incorporation with precision and expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="glass-card border-white/10 bg-transparent reveal group">
                <CardHeader>
                  <div className="mb-4 p-3 bg-white/5 w-fit rounded-lg group-hover:bg-primary/20 transition-colors">
                    {service.icon}
                  </div>
                  <CardTitle className="font-display text-2xl text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 h-12">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-primary mr-3 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 relative">
        <div className="container">
          <div className="text-center mb-20 reveal">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">Meet Your GCC Gateway Partners</h2>
            <p className="text-xl text-muted-foreground">
              We don't just advise—we activate. Our team becomes your trusted representatives on the ground.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              {
                name: "Naji Masri",
                role: "Co-Founder",
                desc: "20+ years driving innovation leadership across MEA markets, specializing in startup scaling and strategic partnerships.",
                image: "/src/assets/NajiMasriPortraitWhiteBackground.png"
              },
              {
                name: "Daniel Khayat",
                role: "Co-Founder",
                desc: "Deep tech expertise in AI/AR/VR with proven project management and international partnership development experience.",
                image: "/src/assets/DK(1).jpg"
              }
            ].map((member, index) => (
              <div key={index} className="group reveal">
                <div className="relative mb-6 overflow-hidden border border-white/10 aspect-[4/5]">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80 z-10"></div>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 p-8 z-20">
                    <h3 className="font-display font-bold text-3xl text-white mb-1">{member.name}</h3>
                    <p className="text-primary font-medium tracking-wide uppercase text-sm">{member.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="absolute inset-0 bg-[url('/src/assets/abstract-tech.jpg')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
        
        <div className="container relative z-10 text-center reveal">
          <h2 className="font-display font-bold text-5xl md:text-6xl mb-8">Your GROWTH Starts Here</h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Ready to Transform Your Business? Partner with Zer0Point Tech Ltd for proven frameworks, legal precision, and human-centric enablement.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" className="h-16 px-10 text-xl bg-white text-background hover:bg-gray-200 rounded-none border-0 shadow-xl transition-transform hover:-translate-y-1">
              Schedule a Consultation
            </Button>
            <Button variant="outline" size="lg" className="h-16 px-10 text-xl border-white/20 hover:bg-white/10 text-white rounded-none backdrop-blur-sm">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
