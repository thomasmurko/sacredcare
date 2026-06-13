import { useState } from "react";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";

const SERVICE_OPTIONS = [
  "One-time clean & restore",
  "Ongoing care visits",
  "Flowers or tribute placement",
  "Photo updates after each visit",
];

const schema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  cemetery: z.string().trim().min(1, "Please tell us the cemetery").max(200),
});

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-border bg-background text-heading placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";
const labelClass = "block text-sm font-medium text-heading mb-2";

const RegisterInterest = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [cemetery, setCemetery] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (s: string) =>
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = schema.safeParse({ firstName, email, cemetery });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setSubmitting(true);
    const { error: dbError } = await supabase
      .from("interest_registrations")
      .insert({
        first_name: parsed.data.firstName,
        email: parsed.data.email,
        cemetery: parsed.data.cemetery,
        services,
      });
    setSubmitting(false);

    if (dbError) {
      setError("Something went wrong. Please try again in a moment.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="register" className="py-24 md:py-32 surface-warm">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Pre-launch
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
              Register your interest
            </h2>
            <p className="text-body text-lg">
              Be among the first families we care for. Registering takes a
              moment and places no obligation on you — we'll simply let you know
              when bookings open.
            </p>
          </div>

          {submitted ? (
            <div className="bg-card rounded-2xl p-10 md:p-14 shadow-card border border-border/50 text-center">
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
                <Check className="w-7 h-7 text-primary" />
              </div>
              <p className="text-body text-lg leading-relaxed">
                Thank you — we've received your registration. We know that
                caring for a loved one's resting place is deeply personal, and
                we're grateful for your trust. We'll be in touch as soon as
                bookings open at your cemetery.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-6 md:p-10 shadow-card border border-border/50 space-y-6"
            >
              <div>
                <label htmlFor="ri-firstName" className={labelClass}>
                  First name
                </label>
                <input
                  id="ri-firstName"
                  type="text"
                  required
                  className={inputClass}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="ri-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="ri-email"
                  type="email"
                  required
                  className={inputClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="ri-cemetery" className={labelClass}>
                  Which cemetery is your loved one resting at?
                </label>
                <input
                  id="ri-cemetery"
                  type="text"
                  required
                  className={inputClass}
                  placeholder="e.g. Rookwood Cemetery, Lidcombe"
                  value={cemetery}
                  onChange={(e) => setCemetery(e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>
                  What would be most helpful?{" "}
                  <span className="text-subtle font-normal">(optional)</span>
                </label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {SERVICE_OPTIONS.map((opt) => {
                    const active = services.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleService(opt)}
                        className={`text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                          active
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-background text-heading border-border hover:border-primary/40"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? "Registering…" : "Register interest"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default RegisterInterest;
