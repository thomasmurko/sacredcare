const steps = [
  {
    number: "01",
    title: "You book online",
    description:
      "Tell us the cemetery, loved one's name, and what you'd like done. Takes under 3 minutes.",
  },
  {
    number: "02",
    title: "We visit and care",
    description:
      "Our team cleans the headstone, tidies the plot, and places flowers if requested.",
  },
  {
    number: "03",
    title: "Careful attention",
    description:
      "We perform the agreed services with respect and precision.",
  },
  {
    number: "04",
    title: "Photo confirmation",
    description:
      "After each visit, we send before and after photos directly to you.",
  },
];

const Process = () => {
  return (
    <section id="process" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
            How It Works
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
            Simple, respectful, reliable
          </h2>
          <p className="text-body text-lg">
            We've designed our process to be as seamless as possible, giving you 
            peace of mind without adding complexity to your life.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6 md:gap-10 relative">
                  {/* Number */}
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center relative z-10">
                    <span className="font-serif text-lg md:text-xl font-medium text-primary-foreground">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2 md:pt-4">
                    <h3 className="font-serif text-xl md:text-2xl font-medium mb-3">
                      {step.title}
                    </h3>
                    <p className="text-body leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
