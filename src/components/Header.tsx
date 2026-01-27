import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl md:text-3xl font-medium text-heading tracking-tight">
              Sacred Care
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-body hover:text-heading transition-colors text-sm font-medium">
              Services
            </a>
            <a href="#about" className="text-body hover:text-heading transition-colors text-sm font-medium">
              About
            </a>
            <a href="#process" className="text-body hover:text-heading transition-colors text-sm font-medium">
              How It Works
            </a>
            <a href="#contact" className="text-body hover:text-heading transition-colors text-sm font-medium">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="hero" size="lg">
              Request a Visit
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-heading"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-6 border-t border-border/50">
            <div className="flex flex-col gap-4">
              <a href="#services" className="text-body hover:text-heading transition-colors py-2">
                Services
              </a>
              <a href="#about" className="text-body hover:text-heading transition-colors py-2">
                About
              </a>
              <a href="#process" className="text-body hover:text-heading transition-colors py-2">
                How It Works
              </a>
              <a href="#contact" className="text-body hover:text-heading transition-colors py-2">
                Contact
              </a>
              <Button variant="hero" className="mt-4">
                Request a Visit
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
