const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-serif text-2xl font-medium tracking-tight">
              Sacred Care
            </span>
            <p className="mt-4 text-primary-foreground/70 max-w-md leading-relaxed">
              Compassionate gravesite care for families who want peace of mind 
              knowing their loved one's resting place is being looked after with 
              genuine respect.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium mb-4">Services</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li><a href="#services" className="hover:text-primary-foreground transition-colors">Gravestone Cleaning</a></li>
              <li><a href="#services" className="hover:text-primary-foreground transition-colors">Fresh Flowers</a></li>
              <li><a href="#services" className="hover:text-primary-foreground transition-colors">Plot Maintenance</a></li>
              <li><a href="#services" className="hover:text-primary-foreground transition-colors">Photo Updates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li><a href="#about" className="hover:text-primary-foreground transition-colors">About Us</a></li>
              <li><a href="#process" className="hover:text-primary-foreground transition-colors">How It Works</a></li>
              <li><a href="#contact" className="hover:text-primary-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © 2026 Sacred Care. All rights reserved.
          </p>
          <p className="text-primary-foreground/50 text-sm">
            Made with care in Australia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
