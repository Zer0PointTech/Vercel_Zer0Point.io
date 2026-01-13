import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, MapPin, Send, Loader2, CheckCircle2, Home, Shield } from 'lucide-react';
import { MapView } from '@/components/Map';
import SEO from '@/components/SEO';
import { Link, useLocation } from 'wouter';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { trpc } from '@/lib/trpc';

import { toast } from 'sonner';

// reCAPTCHA Enterprise Site Key
const RECAPTCHA_SITE_KEY = "6LdazkgsAAAAADErTkGR5KnN7w-n04qdfxHXRfYA";

// Declare grecaptcha types
declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

export default function Contact() {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [phone, setPhone] = useState<string | undefined>('');
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setPhone('');
      setPrivacyAccepted(false);
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send message. Please try again.");
      setIsSubmitting(false);
    }
  });

  // Load reCAPTCHA Enterprise script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => {
      window.grecaptcha.enterprise.ready(() => {
        setRecaptchaLoaded(true);
      });
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(`script[src*="recaptcha/enterprise.js"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

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

  const executeRecaptcha = useCallback(async (): Promise<string | null> => {
    if (!recaptchaLoaded || !window.grecaptcha?.enterprise) {
      console.warn("reCAPTCHA not loaded yet");
      return null;
    }

    try {
      const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, {
        action: 'CONTACT_FORM'
      });
      return token;
    } catch (error) {
      console.error("reCAPTCHA execution failed:", error);
      return null;
    }
  }, [recaptchaLoaded]);

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

    // Execute reCAPTCHA Enterprise
    const token = await executeRecaptcha();
    if (!token) {
      toast.error("Security verification failed. Please refresh and try again.");
      setIsSubmitting(false);
      return;
    }

    contactMutation.mutate({
      name: formData.name,
      email: formData.email,
      phone: phone,
      subject: formData.subject,
      message: formData.message,
      recaptchaToken: token,
    });
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
                      <MapView 
                        className="w-full h-full"
                        onMapReady={(map: google.maps.Map) => {
                          const difcLocation = { lat: 25.2115, lng: 55.2838 };
                          map.setCenter(difcLocation);
                          map.setZoom(15);
                          new google.maps.Marker({
                            position: difcLocation,
                            map: map,
                            title: "Zer0Point Tech Ltd - DIFC Innovation Hub"
                          });
                        }}
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
                      className="phone-input-dark w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
                    <Select 
                      value={formData.subject} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                      required
                    >
                      <SelectTrigger className="w-full h-[50px] bg-white/5 border-white/10 text-gray-300 focus:ring-primary">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0f172a] border-white/10 text-gray-300">
                        <SelectItem value="Business Development" className="focus:bg-primary/20 focus:text-primary cursor-pointer">Business Development</SelectItem>
                        <SelectItem value="Consultancy" className="focus:bg-primary/20 focus:text-primary cursor-pointer">Consultancy</SelectItem>
                        <SelectItem value="Tech" className="focus:bg-primary/20 focus:text-primary cursor-pointer">Tech</SelectItem>
                        <SelectItem value="Entity Setup" className="focus:bg-primary/20 focus:text-primary cursor-pointer">Entity Setup</SelectItem>
                        <SelectItem value="Partnership" className="focus:bg-primary/20 focus:text-primary cursor-pointer">Partnership Opportunity</SelectItem>
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
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 min-h-[150px] resize-y"
                    placeholder="Tell us about your project or requirements..."
                  ></textarea>
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox 
                    id="privacy" 
                    checked={privacyAccepted}
                    onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                    className="mt-1 border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="privacy"
                      className="text-sm font-medium leading-relaxed text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> and consent to the processing of my personal data in accordance with UAE laws and GDPR regulations.
                    </label>
                  </div>
                </div>

                {/* reCAPTCHA Enterprise Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                  <Shield className="w-4 h-4" />
                  <span>Protected by reCAPTCHA Enterprise</span>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting || !recaptchaLoaded}
                  className="w-full h-14 text-lg bg-primary text-background hover:bg-primary/90 font-bold rounded-lg shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Calendly Widget */}
          <div className="mt-20 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <div className="glass-card p-8 md:p-10 rounded-2xl">
              <h3 className="font-display font-bold text-3xl mb-8 text-center">Schedule a Call</h3>
              <div 
                className="calendly-inline-widget w-full" 
                data-url="https://calendly.com/info-zer0point/15min?background_color=0f172a&text_color=f8fafc&primary_color=0ea5e9" 
                style={{ minWidth: '320px', height: '700px' }} 
              />
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .phone-input-dark input {
          background: transparent !important;
          border: none !important;
          color: #e5e7eb !important;
          outline: none !important;
          width: 100%;
        }
        .phone-input-dark input::placeholder {
          color: #4b5563 !important;
        }
        .phone-input-dark .PhoneInputCountry {
          margin-right: 0.75rem;
        }
        .phone-input-dark .PhoneInputCountrySelect {
          background: #0f172a !important;
          color: #e5e7eb !important;
          border: none !important;
        }
        .phone-input-dark .PhoneInputCountrySelect option {
          background: #0f172a !important;
          color: #e5e7eb !important;
          padding: 8px 12px;
        }
        .phone-input-dark .PhoneInputCountrySelect option:hover,
        .phone-input-dark .PhoneInputCountrySelect option:focus,
        .phone-input-dark .PhoneInputCountrySelect option:checked {
          background: #1e293b !important;
          color: #0ea5e9 !important;
        }
        .phone-input-dark .PhoneInputCountrySelectArrow {
          color: #9ca3af !important;
          border-color: #9ca3af !important;
        }
        .phone-input-dark .PhoneInputCountryIcon {
          border-radius: 4px;
          overflow: hidden;
        }
        .grecaptcha-badge {
          visibility: hidden !important;
        }
      `}</style>
    </div>
  );
}
