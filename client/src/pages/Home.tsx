import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Globe, TrendingUp, Building2, CheckCircle, Target, Handshake, Briefcase, BarChart3 } from 'lucide-react';


export default function Home() {
  const [, setLocation] = useLocation();
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

  const pillars = [
    {
      icon: <Handshake className="w-12 h-12 text-primary" />,
      title: "Business Development",
      description: "Driving growth through strategic partnerships, market penetration, and ecosystem building across the MEA region.",
      examples: [
        "Unlocked €300M+ growth potential through strategic partnerships with top regional key accounts.",
        "Led end-to-end enterprise sales cycles for multimillion-dollar program wins (Aramco, NEOM, STC).",
        "Built and scaled channel ecosystems (SIs/ISVs/Distributors) to accelerate solution adoption.",
        "Orchestrated cross-functional teams to shorten deal cycles and improve win rates."
      ]
    },
    {
      icon: <Briefcase className="w-12 h-12 text-primary" />,
      title: "Consultancy",
      description: "Expert guidance on digital transformation, sustainability, and market entry strategies for complex global markets.",
      examples: [
        "Advised on specialty chemical entry strategies and conducted competitor diversification studies.",
        "Developed industry-focused restructuring approaches to improve customer focus and operational resilience.",
        "Led sustainability initiatives including circular economy models and ESG compliance frameworks.",
        "Designed partner development programs for global tech giants (Microsoft, HP, Dell) across the region."
      ]
    }
  ];

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden selection:bg-primary selection:text-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden">
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 reveal">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide text-primary uppercase">Zero Limits. Infinite Possibilities.</span>
          </div>
          
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-8 leading-[1.1] reveal">
            Business Development <br />
            <span className="text-gradient">& Consultancy</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed reveal">
            Your trusted bridge to success in the UAE and KSA. We enable rapid, scalable market access through proven frameworks and deep regional expertise.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 reveal">
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg bg-primary text-background hover:bg-primary/90 rounded-none border border-primary/50 shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all hover:shadow-[0_0_40px_rgba(var(--primary),0.5)]"
              onClick={() => setLocation('/contact')}
            >
              Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-8 text-lg border-white/20 hover:bg-white/5 hover:text-white rounded-none backdrop-blur-sm"
              onClick={() => setLocation('/services')}
            >
              View All Services
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent"></div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section className="py-32 relative border-t border-white/5">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20 reveal">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">Our Core Expertise</h2>
            <p className="text-xl text-muted-foreground">
              Focused on two key pillars to drive your business forward in the Middle East & Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {pillars.map((pillar, index) => (
              <Card key={index} className="glass-card border-white/10 bg-transparent reveal group h-full">
                <CardHeader className="pb-2">
                  <div className="mb-6 p-4 bg-white/5 w-fit rounded-xl group-hover:bg-primary/20 transition-colors duration-500">
                    {pillar.icon}
                  </div>
                  <CardTitle className="font-display text-3xl text-white mb-4">{pillar.title}</CardTitle>
                  <p className="text-lg text-muted-foreground leading-relaxed">{pillar.description}</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Key Achievements & Capabilities</h4>
                    <ul className="space-y-4">
                      {pillar.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start text-gray-300 group/item">
                          <CheckCircle className="w-5 h-5 text-primary mr-3 shrink-0 mt-1 group-hover/item:text-white transition-colors" />
                          <span className="leading-relaxed">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The GCC Opportunity */}
      <section className="py-32 relative">
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
                  { icon: <Building2 />, title: "Economic Growth", desc: "Rapid diversification beyond oil sectors." },
                  { icon: <TrendingUp />, title: "Market Expansion", desc: "High-growth potential in emerging sectors." },
                  { icon: <Target />, title: "Digital Transformation", desc: "Government-led innovation initiatives." }
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
                src="/images/dubai-skyline.jpg" 
                alt="Dubai Skyline" 
                loading="lazy"
                className="relative z-10 w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 border border-white/10 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10"></div>
        
        <div className="container relative z-10 text-center reveal">
          <h2 className="font-display font-bold text-5xl md:text-6xl mb-8">Ready to Scale?</h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Partner with Zer0Point Tech Ltd for proven frameworks, strategic insights, and operational excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" className="h-16 px-10 text-xl bg-white text-background hover:bg-gray-200 rounded-none border-0 shadow-xl transition-transform hover:-translate-y-1" onClick={() => setLocation('/contact')}>
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
