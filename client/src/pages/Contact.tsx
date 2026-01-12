import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Send, Loader2 } from 'lucide-react';
import { MapView } from '@/components/Map';
import SEO from '@/components/SEO';

import { toast } from 'sonner';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success("Message sent successfully!", {
      description: "We'll get back to you as soon as possible."
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden font-sans selection:bg-primary/30">
      <SEO 
        title="Contact Us - Get in Touch" 
        description="Contact Zer0Point Tech Ltd for business inquiries, partnerships, and consultancy services in the UAE and KSA."
        keywords="Contact Zer0Point, Business Inquiry, Dubai Office, Riyadh Office, Consulting Request"
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
            <div className="glass-card p-8 md:p-10 rounded-2xl h-full animate-in fade-in slide-in-from-right-10 duration-700 delay-200">
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
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
                  <select 
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-300"
                  >
                    <option value="" disabled>Select a topic</option>
                    <option value="Business Development">Business Development</option>
                    <option value="Consultancy">Consultancy</option>
                    <option value="Entity Setup">Entity Setup</option>
                    <option value="Partnership">Partnership Opportunity</option>
                    <option value="Other">Other Inquiry</option>
                  </select>
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

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
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
                data-url="https://calendly.com/d/ct9r-hgx-ny5?background_color=0f172a&text_color=f8fafc&primary_color=0ea5e9" 
                style={{ minWidth: '320px', height: '700px' }} 
              />
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
