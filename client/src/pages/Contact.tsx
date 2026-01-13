import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, MapPin, Send, Loader2, CheckCircle2, Home } from 'lucide-react';
import SEO from '@/components/SEO';
import { useLocation } from 'wouter';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { toast } from 'sonner';

export default function Contact() {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [phone, setPhone] = useState<string | undefined>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Load Calendly widget
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!privacyAccepted) {
      toast.error("Please accept the Privacy Policy to continue.");
      return;
    }

    if (!phone) {
      toast.error("Please enter your mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setPhone('');
        setPrivacyAccepted(false);
      } else {
        toast.error(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden font-sans selection:bg-primary/30">
      <SEO 
        title="Contact Us - Schedule a Call" 
        description="Contact Zer0Point Tech Ltd for business inquiries, partnerships, and consultancy services in the UAE and KSA. Schedule a call with our experts."
        keywords="Contact Zer0Point, Business Inquiry, Dubai Office, Riyadh Office, Consulting Request, Schedule Call"
      />
      <main className="pt-40 pb-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <h1 className="font-display font-bold text-5xl md:text-7xl mb-6 leading-tight">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Ready to accelerate your growth in the GCC? Connect with our experts today for a strategic call.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="glass-card p-8 md:p-10 rounded-2xl h-full animate-in fade-in slide-in-from-left-10 duration-700 delay-100 flex flex-col">
              <h3 className="font-display font-bold text-3xl mb-8">Contact Information</h3>
              <div className="space-y-8 flex-grow">
                <div className="flex items-start gap-5 group">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">Email Us</p>
                    <a href="mailto:info@zer0point.io" className="text-muted-foreground hover:text-primary transition-colors text-lg">
                      info@zer0point.io
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">For general inquiries and partnership opportunities</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5 group">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="w-full">
                    <p className="font-bold text-lg mb-1">Office: Dubai, UAE</p>
                    <div className="space-y-4 mt-2">
                      <div>
                        <p className="text-muted-foreground">Level 3, Innovation Hub, DIFC</p>
                      </div>
                    </div>
                    <div className="mt-6 w-full h-[300px] rounded-lg overflow-hidden border border-white/10">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.8693!2d55.2763263!3d25.2075206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4282b7f0e8a9%3A0x8c5f8c8c8c8c8c8c!2sDIFC%20Innovation%20Hub!5e0!3m2!1sen!2sae!4v1705000000000"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Zer0Point Office Location - DIFC Innovation Hub, Dubai"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card p-8 md:p-10 rounded-2xl h-full animate-in fade-in slide-in-from-right-10 duration-700 delay-200 relative overflow-hidden">
              {isSuccess ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#0f172a]/95 backdrop-blur-sm z-20 animate-in fade-in duration-500">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-3xl mb-4">Thank You!</h3>
                  <p className="text-xl text-muted-foreground mb-8 max-w-md">
                    Your message has been sent successfully. Our team will review your inquiry and get back to you shortly.
                  </p>
                  <Button 
                    onClick={() => setLocation('/')}
                    className="bg-primary text-background hover:bg-primary/90"
                  >
                    <Home className="mr-2 h-5 w-5" />
                    Back to Home
                  </Button>
                </div>
              ) : null}

              <h3 className="font-display font-bold text-3xl mb-2">Send us a Message</h3>
              <p className="text-muted-foreground mb-8">Fill out the form below and we'll respond within 24 hours.</p>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name</label>
                    <input 
                      id="name"
                      name="name"
                      type="text" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
                    <input 
                      id="email"
                      name="email"
                      type="email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-300">Mobile Number <span className="text-red-400">*</span></label>
                    <PhoneInput
                      international
                      defaultCountry="AE"
                      value={phone}
                      onChange={setPhone}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:border-none [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:text-white [&_.PhoneInputCountrySelect]:bg-[#1e293b] [&_.PhoneInputCountrySelect]:text-white"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject <span className="text-red-400">*</span></label>
                    <Select 
                      value={formData.subject} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                      required
                    >
                      <SelectTrigger className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 h-auto focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-left">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1e293b] border-white/10">
                        <SelectItem value="Consultancy">Consultancy</SelectItem>
                        <SelectItem value="Tech Solutions">Tech Solutions</SelectItem>
                        <SelectItem value="Business Development">Business Development</SelectItem>
                        <SelectItem value="Partnership">Partnership</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none placeholder:text-gray-600"
                    placeholder="Tell us about your project or requirements..."
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="privacy" 
                    checked={privacyAccepted}
                    onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                    className="mt-1 border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed">
                    I agree to the <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> and consent to the processing of my personal data in accordance with UAE laws and GDPR regulations.
                  </label>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary text-background hover:bg-primary/90 py-6 text-lg font-semibold group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Calendly Section */}
          <div className="max-w-6xl mx-auto mt-20 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
                Schedule a <span className="text-gradient">Call</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Book a 15-minute introductory call with our team to discuss your needs.
              </p>
            </div>
            <div className="glass-card rounded-2xl overflow-hidden">
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/zer0point/scheduled-call?hide_gdpr_banner=1&background_color=0f172a&text_color=ffffff&primary_color=0ea5e9"
                style={{ minWidth: '320px', height: '700px' }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
