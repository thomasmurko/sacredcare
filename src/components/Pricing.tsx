import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Monthly",
    price: "$89",
    cadence: "per month",
    billing: "Billed monthly",
    highlighted: true,
    badge: "Best value",
  },
  {
    name: "Quarterly",
    price: "$99",
    cadence: "per visit",
    billing: "Billed every 3 months",
  },
  {
    name: "Bi-yearly",
    price: "$109",
    cadence: "per visit",
    billing: "Billed every 6 months",
  },
  {
    name: "Yearly",
    price: "$119",
    cadence: "per visit",
    billing: "Billed once a year",
  },
];

const includes = [
  "Headstone clean",
  "Plot tidy",
  "Before and after photos",
];

const addons = [
  { name: "Fresh flowers", price: "+$25" },
  { name: "Candle and memorial item", price: "+$15" },
  { name: "Extra plot, same cemetery", price: "+$49" },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 md:py-32 surface-sage">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
            Pricing
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
            Simple, transparent care plans
          </h2>
          <p className="text-body text-lg">
            Choose the rhythm of care that feels right. Every plan includes the
            essentials, with thoughtful add-ons available whenever you need them.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 border flex flex-col ${
                plan.highlighted
                  ? "bg-primary text-primary-foreground border-primary shadow-elevated"
                  : "bg-card border-border/50 shadow-card"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background text-primary text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full border border-border">
                  {plan.badge}
                </span>
              )}
              <h3
                className={`font-serif text-2xl font-medium mb-4 ${
                  plan.highlighted ? "text-primary-foreground" : "text-heading"
                }`}
              >
                {plan.name}
              </h3>
              <div className="mb-2">
                <span
                  className={`font-serif text-4xl font-medium ${
                    plan.highlighted ? "text-primary-foreground" : "text-heading"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`ml-2 text-sm ${
                    plan.highlighted
                      ? "text-primary-foreground/80"
                      : "text-body"
                  }`}
                >
                  {plan.cadence}
                </span>
              </div>
              <p
                className={`text-sm mb-6 ${
                  plan.highlighted
                    ? "text-primary-foreground/80"
                    : "text-subtle"
                }`}
              >
                {plan.billing}
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        plan.highlighted
                          ? "text-primary-foreground"
                          : "text-primary"
                      }`}
                    />
                    <span
                      className={
                        plan.highlighted
                          ? "text-primary-foreground/90"
                          : "text-body"
                      }
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a href="#contact">
                <Button
                  variant={plan.highlighted ? "hero" : "heroOutline"}
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-background text-primary hover:bg-background/90"
                      : ""
                  }`}
                >
                  Choose {plan.name}
                </Button>
              </a>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl md:text-3xl font-medium mb-3">
              Optional add-ons
            </h3>
            <p className="text-body">
              Personal touches you can include with any plan.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="bg-card rounded-xl p-6 border border-border/50 flex items-center justify-between"
              >
                <span className="text-heading font-medium">{addon.name}</span>
                <span className="font-serif text-lg text-primary font-medium">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
