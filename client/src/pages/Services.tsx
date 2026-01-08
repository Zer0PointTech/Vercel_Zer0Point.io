import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, TrendingUp, Handshake, Languages, Target, Briefcase, CheckCircle, ArrowRight, Shield, Globe } from 'lucide-react';


export default function Services() {
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

  const allServices = [
    {
      icon: <Handshake className="w-10 h-10 text-primary" />,
      title: "Business Development",
      description: "Accelerate your market penetration with our embedded regional presence and strategic partnership networks.",
      features: [
        "Strategic Partnership Development",
        "Key Account Management",
        "Lead Generation & Qualification",
        "Reseller & JV Vetting",
        "Sales Cycle Orchestration"
      ]
    },
    {
      icon: <Briefcase className="w-10 h-10 text-primary" />,
      title: "Consultancy",
      description: "Expert guidance on navigating complex markets, digital transformation, and sustainability initiatives.",
      features: [
        "Market Entry Strategy",
        "Digital Transformation Roadmaps",
        "Sustainability & ESG Consulting",
        "Competitor Analysis & Benchmarking",
        "Supply Chain Optimization"
      ]
    },
    {
      icon: <Building2 className="w-10 h-10 text-primary" />,
      title: "Entity Setup",
      description: "Streamlined company formation and regulatory structuring to get you operational faster.",
      features: [
        "LLC, Branch & Regional HQ Setup",
        "Mainland vs. Free Zone Advisory",
        "Government Relations (PRO Services)",
        "License & Permit Acquisition",
        "Office Space Solutions"
      ]
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-primary" />,
      title: "Banking & Tax",
      description: "Financial structuring to optimize tax efficiency and ensure compliance with local regulations.",
      features: [
        "Corporate Tax Planning (UAE 9%)",
        "VAT Registration & Compliance",
        "Corporate Bank Account Opening",
        "Cross-border Financial Structuring",
        "Audit & Bookkeeping Support"
      ]
    },
    {
      icon: <Languages className="w-10 h-10 text-primary" />,
      title: "Cultural Intelligence",
      description: "Bridge the cultural gap with our specialized training and localization services.",
      features: [
        "Business Etiquette Training",
        "Multilingual Negotiation Support",
        "Team Cultural Onboarding",
        "Localization of Marketing Materials",
        "Regional Talent Acquisition"
      ]
    },
    {
      icon: <Target className="w-10 h-10 text-primary" />,
      title: "Marketing & Brand",
      description: "Amplify your brand presence with targeted digital and on-ground marketing strategies.",
      features: [
        "Digital Marketing Strategy",
        "Social Media Management",
        "Event Management & Representation",
        "Brand Localization",
        "PR & Media Relations"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container relative z-10 text-center">
          <h1 className="font-display font-bold text-5xl md:text-7xl tracking-tight mb-6 reveal">
            Comprehensive <span className="text-gradient">Services</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed reveal">
            From initial market entry to sustained growth, we provide end-to-end solutions tailored to your business needs in the GCC region.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative bg-white/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service, index) => (
              <Card key={index} className="glass-card border-white/10 bg-transparent reveal group h-full flex flex-col">
                <CardHeader>
                  <div className="mb-4 p-3 bg-white/5 w-fit rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="font-display text-2xl text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <div className="mt-auto">
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-primary mr-3 shrink-0 mt-0.5" />
                          <span>{feature}</span>
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

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container relative z-10 text-center reveal">
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-8">Tailored Solutions for Your Business</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Don't see exactly what you need? We customize our engagement models to fit your specific goals and requirements.
          </p>
          
          <Button size="lg" className="h-16 px-10 text-xl bg-primary text-background hover:bg-primary/90 rounded-none border border-primary/50 shadow-xl" onClick={() => setLocation('/contact')}>
            Get a Custom Proposal <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

    </div>
  );
}
