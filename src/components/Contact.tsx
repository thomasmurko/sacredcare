import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 surface-warm">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Get in Touch
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
              Let's talk about your needs
            </h2>
            <p className="text-body text-lg max-w-2xl mx-auto">
              Whether you need a single visit or ongoing care, we're here to help. 
              Reach out and tell us about the person you'd like us to honour.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card rounded-xl p-8 shadow-card border border-border/50">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-heading mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-heading placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-heading mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-heading placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-heading mb-2">
                    Cemetery Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-heading placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="City or cemetery name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-heading mb-2">
                    Tell Us About Your Needs
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-heading placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                    placeholder="Share any details about the care you're looking for..."
                  />
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-2xl font-medium mb-4">
                  We're here for you
                </h3>
                <p className="text-body leading-relaxed">
                  Every inquiry is answered personally. We understand this is a 
                  sensitive matter, and we treat every conversation with the care 
                  and respect it deserves.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-heading">Service Areas</p>
                    <p className="text-body">Australia-wide coverage</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="text-subtle text-sm">
                  Response time: Within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
