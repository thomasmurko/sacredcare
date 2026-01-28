import { Droplets, Flower2, Camera, Heart, Calendar } from "lucide-react";

const services = [
  {
    icon: Droplets,
    title: "Gravestone Cleaning",
    description: "Gentle, professional cleaning that restores dignity and clarity to headstones without causing damage to delicate stonework.",
  },
  {
    icon: Flower2,
    title: "Fresh Flowers & Tributes",
    description: "Thoughtfully selected seasonal flowers or specific arrangements placed with care on meaningful dates.",
  },
  {
    icon: Heart,
    title: "Plot Maintenance",
    description: "Comprehensive ground care including weeding, edging, and maintaining a tidy, respectful appearance year-round.",
  },
  {
    icon: Camera,
    title: "Photo Updates",
    description: "Clear, dignified photographs sent to you after each visit, so you can see that everything is just as it should be.",
  },
  {
    icon: Calendar,
    title: "Scheduled Care Plans",
    description: "Flexible care plans — one-time visits, seasonal maintenance, or year-round stewardship tailored to your needs.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
            Our Services
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
            Thoughtful care for sacred spaces
          </h2>
          <p className="text-body text-lg">
            Every service is performed with respect, attention to detail, and 
            the understanding that these are more than just tasks — they're 
            acts of love.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-lg bg-card border border-border/50 hover:border-primary/20 hover:shadow-card transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-3">
                {service.title}
              </h3>
              <p className="text-body leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
