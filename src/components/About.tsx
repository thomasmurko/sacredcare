const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 surface-sage">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Why Sacred Care
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-8">
              Because distance shouldn't diminish devotion
            </h2>
            
            <div className="space-y-6 text-body text-lg">
              <p>
                Life takes us places. We move for work, for family, for opportunity. 
                But our hearts often remain tethered to those we've lost, and to the 
                places where they rest.
              </p>
              <p>
                Sacred Care was founded on a simple belief: that everyone deserves 
                to know their loved one's resting place is being cared for with 
                genuine respect and attention, regardless of distance.
              </p>
              <p>
                We're not a cleaning service. We're a care service. Every visit is 
                an act of remembrance, performed with the same reverence you would 
                bring yourself.
              </p>
            </div>

            {/* Values */}
            <div className="mt-12 grid sm:grid-cols-2 gap-6">
              {[
                { title: "Dignity", desc: "Every site is treated as sacred" },
                { title: "Trust", desc: "Transparent communication always" },
                { title: "Care", desc: "Genuine attention to every detail" },
                { title: "Reliability", desc: "Consistent, dependable service" },
              ].map((value, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-1 bg-primary/30 rounded-full flex-shrink-0" />
                  <div>
                    <h4 className="font-serif text-lg font-medium text-heading">
                      {value.title}
                    </h4>
                    <p className="text-body text-sm">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote Card */}
          <div className="relative">
            <div className="bg-card rounded-2xl p-10 md:p-12 shadow-elevated border border-border/50">
              <div className="font-serif text-6xl text-primary/20 leading-none mb-4">
                "
              </div>
              <blockquote className="font-serif text-2xl md:text-3xl text-heading leading-relaxed mb-8">
                We believe that tending to a gravesite is one of the most 
                meaningful ways to honour someone's memory.
              </blockquote>
              <div className="border-t border-border pt-6">
                <p className="text-heading font-medium">Our Mission</p>
                <p className="text-body text-sm mt-1">
                  To bring peace of mind to families by providing compassionate, 
                  reliable care for the final resting places of their loved ones.
                </p>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -z-10 top-6 -right-6 w-full h-full rounded-2xl bg-primary/5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
