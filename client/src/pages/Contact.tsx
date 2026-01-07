import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/30">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="font-display font-bold text-4xl md:text-6xl mb-6 leading-tight">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Ready to start your journey? Contact us today to discuss your market entry strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="font-display font-bold text-2xl mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <p className="font-bold mb-1">Email</p>
                    <a href="mailto:info@zer0point.io" className="text-muted-foreground hover:text-primary transition-colors">
                      info@zer0point.io
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <p className="font-bold mb-1">Location</p>
                    <p className="text-muted-foreground">
                      Dubai, United Arab Emirates<br />
                      Riyadh, Saudi Arabia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <h3 className="font-display font-bold text-2xl mb-6">Send us a Message</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors h-32"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <Button className="w-full bg-primary text-background hover:bg-primary/90 font-bold py-6">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
