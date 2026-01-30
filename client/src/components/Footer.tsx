import { Link } from "wouter";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block flex items-center gap-2">
              <img src="/logo.png" alt="Pranora Production" className="h-16 w-auto object-contain rounded-full" />
              <span className="text-2xl font-bold font-display tracking-tight text-white">Pranora<span className="text-secondary"> Production</span></span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              India's premier event management company, crafting unforgettable moments and exquisite experiences for the world's most discerning clients.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-secondary">Explore</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-primary-foreground/70 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/events" className="text-sm text-primary-foreground/70 hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/about" className="text-sm text-primary-foreground/70 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-primary-foreground/70 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-secondary">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-primary-foreground/70">
                <MapPin className="w-5 h-5 text-secondary shrink-0" />
                <span>Pranora Studios, Plot 45<br />Bandra, Mumbai, MH 400050, India</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-primary-foreground/70">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span>+91 (22) 6123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-primary-foreground/70">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span>hello@pranoraevent.in</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-secondary">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-secondary hover:text-primary transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-secondary hover:text-primary transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-secondary hover:text-primary transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-primary-foreground/50">
          <p>© 2024 Pranora Production. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
