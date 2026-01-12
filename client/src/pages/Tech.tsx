import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Glasses, Smartphone, Globe, Gamepad2, Building, Sparkles, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';


export default function Tech() {
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

  const techServices = [
    {
      icon: <Glasses className="w-12 h-12 text-primary" />,
      title: "Virtual Reality",
      description: "Immersive VR experiences and applications that transport users to new worlds."
    },
    {
      icon: <Smartphone className="w-12 h-12 text-primary" />,
      title: "Augmented Reality",
      description: "Mobile AR solutions and interactive experiences that overlay digital content on the real world."
    },
    {
      icon: <Globe className="w-12 h-12 text-primary" />,
      title: "Mixed Reality",
      description: "Seamless blend of physical and digital worlds for advanced interaction and visualization."
    },
    {
      icon: <Gamepad2 className="w-12 h-12 text-primary" />,
      title: "Interactive Experiences",
      description: "Engaging and intuitive XR applications designed for maximum user retention."
    },
    {
      icon: <Building className="w-12 h-12 text-primary" />,
      title: "Enterprise Solutions",
      description: "Custom XR solutions for business transformation, training, and operational efficiency."
    }
  ];

  const team = [
    { name: "Daniel Khayat", role: "Project Manager" },
    { name: "Josh Cook", role: "Technical Director" },
    { name: "Mukesh Kumar", role: "Unity Lead" },
    { name: "Abhijit Paul", role: "SAP Expert" }
  ];

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden selection:bg-primary selection:text-background">
      <SEO 
        title="Tech - AR/VR & Digital Twins" 
        description="Cutting-edge AR/VR and Digital Twin solutions for enterprise training, marketing, and operational efficiency."
        keywords="AR/VR Solutions, Digital Twins, Enterprise Metaverse, Virtual Reality Training, Augmented Reality Marketing"
      />
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 reveal">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide text-primary uppercase">Pioneering the Future of Extended Reality</span>
          </div>
          
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-8 leading-[1.1] reveal">
            Expert XR Solutions <br />
            <span className="text-gradient">for Tomorrow's World</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed reveal">
            We specialize in cutting-edge Extended Reality technologies, delivering immersive experiences that transform industries and reshape digital interactions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 reveal">
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg bg-primary text-background hover:bg-primary/90 rounded-none border border-primary/50 shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all hover:shadow-[0_0_40px_rgba(var(--primary),0.5)]"
              onClick={() => setLocation('/contact')}
            >
              Get In Touch <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="h-14 px-8 text-lg text-white hover:bg-white/10 rounded-none border border-white/20"
              onClick={() => setLocation('/tech/work-examples')}
            >
              View Work Examples
            </Button>
          </div>
        </div>
      </section>

      {/* Tech Services Grid */}
      <section className="py-32 relative">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {techServices.slice(0, 3).map((service, index) => (
              <Card key={index} className="glass-card border-white/10 bg-transparent reveal group hover:-translate-y-2 transition-transform duration-300">
                <CardHeader className="text-center">
                  <div className="mb-6 p-4 bg-white/5 w-fit mx-auto rounded-full group-hover:bg-primary/20 transition-colors duration-500">
                    {service.icon}
                  </div>
                  <CardTitle className="font-display text-2xl text-white mb-2">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
            {techServices.slice(3, 5).map((service, index) => (
              <Card key={index + 3} className="glass-card border-white/10 bg-transparent reveal group hover:-translate-y-2 transition-transform duration-300">
                <CardHeader className="text-center">
                  <div className="mb-6 p-4 bg-white/5 w-fit mx-auto rounded-full group-hover:bg-primary/20 transition-colors duration-500">
                    {service.icon}
                  </div>
                  <CardTitle className="font-display text-2xl text-white mb-2">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Partnership */}
      <section className="py-32 relative border-t border-white/5">
        <div className="container text-center reveal">
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-12">Strategic Partnership</h2>
          <div className="max-w-3xl mx-auto p-8 border border-white/10 bg-white/5 rounded-2xl backdrop-blur-sm">
            <div className="flex flex-col items-center gap-6">
              <Sparkles className="w-16 h-16 text-primary animate-pulse" />
              <h3 className="text-2xl font-bold text-white">Official Partner of Blippar</h3>
              <p className="text-lg text-muted-foreground">
                Proud technology partner leveraging cutting-edge innovations. Utilizing Blippar's advanced technology stack to deliver superior XR experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 relative">
        <div className="container">
          <div className="text-center mb-20 reveal">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">Our Expert Team</h2>
            <p className="text-xl text-muted-foreground">
              Meet the talented professionals driving our XR innovations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="group reveal text-center p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors rounded-xl">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-2xl font-bold text-primary border border-white/10">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2">{member.name}</h3>
                <p className="text-primary font-medium uppercase text-sm tracking-wider">{member.role}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center reveal">
            <p className="text-lg text-muted-foreground">
              <span className="text-primary font-bold">Supporting Teams:</span> Infrastructure, DevOps, and Back-end Technical Support
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container relative z-10 text-center reveal">
          <h2 className="font-display font-bold text-5xl md:text-6xl mb-8">Ready to Transform Your Vision?</h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Let's discuss how our XR expertise can elevate your project.
          </p>
          
          <Button size="lg" className="h-16 px-10 text-xl bg-white text-background hover:bg-gray-200 rounded-none border-0 shadow-xl transition-transform hover:-translate-y-1" onClick={() => setLocation('/contact')}>
            Contact Us
          </Button>
        </div>
      </section>

    </div>
  );
}
