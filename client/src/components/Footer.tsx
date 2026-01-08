import { Link } from 'wouter';
import logoTransparent from '@/assets/logo-white-slogan.png';
import { Twitter, Linkedin, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background pt-20 pb-10 relative overflow-hidden" style={{borderStyle: 'none'}}>
      {/* Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white"></div>
        <div className="absolute right-1/4 top-0 bottom-0 w-px bg-white"></div>
      </div>

      <div className="container relative z-10 border-t border-white/10 pt-20" style={{borderStyle: 'none'}}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
                <img src={logoTransparent} alt="Zer0Point Logo" className="h-16 w-auto" style={{width: '83px', height: '80px'}} />
                {/* Logo includes text now */}
            </Link>
            <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
              Zero limits. Infinite possibilities. Enabling rapid, scalable GCC market access with global standards and local execution.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Tech', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Level 3, Innovation Hub,<br />DIFC, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@zer0point.io" className="hover:text-white transition-colors">
                  info@zer0point.io
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-background transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-background transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{borderStyle: 'none'}}>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Zer0Point Tech Ltd. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
