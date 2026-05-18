import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-video.mp4";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-2xl">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4 animate-fade-up">
            Burial Care Service
          </p>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6 animate-fade-up-delay-1">
            Care from any distance
          </h1>
          
          <p className="text-lg md:text-xl text-body leading-relaxed mb-8 max-w-xl animate-fade-up-delay-2">
            When you can't be there in person, we tend to the resting place of 
            those you love, with the same care you would give yourself.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up-delay-3">
            <a href="#contact">
              <Button variant="hero" size="xl">
                Request a Visit
              </Button>
            </a>
            <a href="#services">
              <Button variant="heroOutline" size="xl">
                Learn More
              </Button>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
