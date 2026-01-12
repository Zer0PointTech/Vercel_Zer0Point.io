import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, Home } from 'lucide-react';
import { useLocation } from 'wouter';
import SEO from '@/components/SEO';

export default function ThankYou() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Optional: Fire conversion tracking events here
    // e.g., window.gtag('event', 'conversion', { ... });
  }, []);

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden selection:bg-primary/30 flex items-center justify-center relative">
      <SEO 
        title="Thank You - Booking Confirmed" 
        description="Thank you for scheduling a call with Zer0Point Tech Ltd. We look forward to speaking with you."
        keywords="Thank You, Booking Confirmed, Zer0Point"
      />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-card p-12 rounded-3xl border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-700">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-in zoom-in delay-300 duration-500">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">
              Booking <span className="text-gradient">Confirmed!</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Thank you for scheduling a time with us. A calendar invitation has been sent to your email address. We look forward to our conversation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-12 px-8 bg-primary text-background hover:bg-primary/90 font-bold"
                onClick={() => setLocation('/')}
              >
                <Home className="mr-2 w-4 h-4" />
                Back to Home
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto h-12 px-8 border-white/10 hover:bg-white/5"
                onClick={() => setLocation('/work-examples')}
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
