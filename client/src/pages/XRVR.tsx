import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function XRVR() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/30">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="font-display font-bold text-4xl md:text-6xl mb-6 leading-tight">
              Immersive Tech <span className="text-gradient">(XR/VR)</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Experience the future of digital interaction with our cutting-edge Extended Reality and Virtual Reality solutions.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary text-background hover:bg-primary/90 text-lg px-8 py-6 h-auto rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                onClick={() => window.open('https://www.zer0point.io', '_blank')}
              >
                Visit Legacy Site <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="font-display font-bold text-2xl mb-4 relative z-10">Virtual Reality</h3>
              <p className="text-muted-foreground mb-6 relative z-10">
                Fully immersive digital environments for training, simulation, and entertainment.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="font-display font-bold text-2xl mb-4 relative z-10">Augmented Reality</h3>
              <p className="text-muted-foreground mb-6 relative z-10">
                Overlay digital information onto the real world for enhanced productivity and interaction.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
