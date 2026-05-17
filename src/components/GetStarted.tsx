import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, ArrowRight, Plus, X } from "lucide-react";

type BurialSite = {
  burialType: string;
  cemeteryName: string;
  plotInfo: string;
};

type FormState = {
  sites: BurialSite[];
  frequency: string;
  flowers: boolean;
  flowerType: string;
  candle: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  privacyAccepted: boolean;
};

const emptySite: BurialSite = {
  burialType: "",
  cemeteryName: "",
  plotInfo: "",
};

const initialState: FormState = {
  sites: [{ ...emptySite }],
  frequency: "",
  flowers: false,
  flowerType: "",
  candle: false,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
  privacyAccepted: false,
};

const MAX_SITES = 5; // 1 initial + up to 4 additional

const burialOptions = [
  "Lawn burial",
  "Wall niche / above-ground",
  "Mausoleum",
  "Unsure",
];

const frequencyOptions = [
  "Monthly (recommended)",
  "Every 3 months",
  "Once-off visit",
];

const stepLabels = [
  "About the burial",
  "Choose your service",
  "Add extras",
  "Your details",
];

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-border bg-background text-heading placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

const labelClass = "block text-sm font-medium text-heading mb-2";

const GetStarted = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedCount, setSubmittedCount] = useState(0);
  const [privacyError, setPrivacyError] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const updateSite = <K extends keyof BurialSite>(
    index: number,
    key: K,
    value: BurialSite[K],
  ) =>
    setForm((f) => ({
      ...f,
      sites: f.sites.map((s, i) => (i === index ? { ...s, [key]: value } : s)),
    }));

  const addSite = () =>
    setForm((f) =>
      f.sites.length >= MAX_SITES
        ? f
        : { ...f, sites: [...f.sites, { ...emptySite }] },
    );

  const removeSite = (index: number) =>
    setForm((f) => ({
      ...f,
      sites: f.sites.filter((_, i) => i !== index),
    }));

  const canContinue = () => {
    if (step === 1)
      return form.sites.every(
        (s) => !!s.burialType && !!s.cemeteryName.trim(),
      );
    if (step === 2) return !!form.frequency;
    if (step === 3) return !form.flowers || !!form.flowerType;
    return true;
  };

  const canSubmit =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    if (!form.privacyAccepted) {
      setPrivacyError(true);
      return;
    }
    setPrivacyError(false);
    setSubmitting(true);

    const extras = [
      form.flowers ? `Flowers (${form.flowerType || "unspecified"})` : null,
      form.candle ? "Memorial candle" : null,
    ]
      .filter(Boolean)
      .join(", ");

    const sitesDescription = form.sites
      .map(
        (s, i) =>
          `Site ${i + 1}: ${s.burialType} at ${s.cemeteryName}${s.plotInfo ? ` (${s.plotInfo})` : ""}`,
      )
      .join(" | ");

    const payload = {
      burialSites: form.sites,
      sitesSummary: sitesDescription,
      siteCount: form.sites.length,
      visitFrequency: form.frequency,
      extras: extras || "None",
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      notes: form.notes,
    };

    try {
      await fetch("https://formspree.io/f/xrejnold", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // proceed to confirmation regardless
    } finally {
      setSubmittedCount(form.sites.length);
      setSubmitted(true);
      setSubmitting(false);
    }
  };

  const ToggleBtn = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-3 rounded-lg border text-sm font-medium transition-all ${
        active
          ? "bg-primary text-primary-foreground border-primary shadow-sm"
          : "bg-background text-heading border-border hover:border-primary/40"
      }`}
    >
      {children}
    </button>
  );

  return (
    <section id="contact" className="py-24 md:py-32 surface-warm">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Get Started
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
              Arrange your loved one's care
            </h2>
            <p className="text-body text-lg max-w-2xl mx-auto">
              A few short steps to set up a care plan that's right for your family.
            </p>
          </div>

          {submitted ? (
            <div className="max-w-2xl mx-auto bg-card rounded-2xl p-10 md:p-14 shadow-card border border-border/50 text-center">
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
                <Check className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-medium mb-4">
                Your care plan request for {submittedCount}{" "}
                {submittedCount === 1 ? "burial site" : "burial sites"} has been received
              </h3>
              <p className="text-body text-lg">
                {form.firstName ? `Thank you, ${form.firstName}. ` : "Thank you. "}
                We'll be in touch soon to confirm the details of your care plan.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-12">
              {/* Form */}
              <div className="bg-card rounded-2xl p-6 md:p-10 shadow-card border border-border/50">
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-heading">
                      Step {step} of 4
                    </p>
                    <p className="text-sm text-subtle">{stepLabels[step - 1]}</p>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${(step / 4) * 100}%` }}
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 1 && (
                    <>
                      {form.sites.map((site, idx) => (
                        <div
                          key={idx}
                          className={
                            idx === 0
                              ? "space-y-6"
                              : "space-y-6 pt-6 border-t border-border/60"
                          }
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif text-lg text-heading">
                              Burial site {idx + 1}
                            </h4>
                            {idx > 0 && (
                              <button
                                type="button"
                                onClick={() => removeSite(idx)}
                                className="inline-flex items-center gap-1 text-sm text-subtle hover:text-primary transition-colors"
                              >
                                <X className="w-3.5 h-3.5" /> Remove
                              </button>
                            )}
                          </div>
                          <div>
                            <label className={labelClass}>Type of burial</label>
                            <div className="grid sm:grid-cols-2 gap-2">
                              {burialOptions.map((opt) => (
                                <ToggleBtn
                                  key={opt}
                                  active={site.burialType === opt}
                                  onClick={() => updateSite(idx, "burialType", opt)}
                                >
                                  {opt}
                                </ToggleBtn>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className={labelClass}>Cemetery name</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={site.cemeteryName}
                              onChange={(e) =>
                                updateSite(idx, "cemeteryName", e.target.value)
                              }
                              placeholder="e.g. Rookwood Cemetery"
                            />
                          </div>
                          <div>
                            <label className={labelClass}>
                              Section, row or plot number (if known)
                            </label>
                            <input
                              type="text"
                              className={inputClass}
                              value={site.plotInfo}
                              onChange={(e) =>
                                updateSite(idx, "plotInfo", e.target.value)
                              }
                              placeholder="Optional"
                            />
                          </div>
                        </div>
                      ))}

                      {form.sites.length < MAX_SITES && (
                        <button
                          type="button"
                          onClick={addSite}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          <Plus className="w-4 h-4" /> Add another burial site
                        </button>
                      )}
                    </>
                  )}

                  {step === 2 && (
                    <div>
                      <label className={labelClass}>
                        How often would you like visits?
                      </label>
                      <p className="text-sm text-subtle mb-3">
                        This frequency will apply to all burial sites.
                      </p>
                      <div className="grid sm:grid-cols-1 gap-2">
                        {frequencyOptions.map((opt) => (
                          <ToggleBtn
                            key={opt}
                            active={form.frequency === opt}
                            onClick={() => update("frequency", opt)}
                          >
                            {opt}
                          </ToggleBtn>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <label className={labelClass}>Add-ons</label>
                        <p className="text-sm text-subtle mb-3">
                          Select any personal touches you'd like included. These will apply to all burial sites.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <ToggleBtn
                            active={form.flowers}
                            onClick={() => {
                              const next = !form.flowers;
                              update("flowers", next);
                              if (!next) update("flowerType", "");
                            }}
                          >
                            Flowers
                          </ToggleBtn>
                          <ToggleBtn
                            active={form.candle}
                            onClick={() => update("candle", !form.candle)}
                          >
                            Memorial candle
                          </ToggleBtn>
                        </div>

                        {form.flowers && (
                          <div className="mt-4 p-4 rounded-lg bg-accent/40 border border-border/50">
                            <p className="text-sm font-medium text-heading mb-3">
                              Choose flower type
                            </p>
                            <div className="flex gap-2">
                              <ToggleBtn
                                active={form.flowerType === "Fresh"}
                                onClick={() => update("flowerType", "Fresh")}
                              >
                                Fresh
                              </ToggleBtn>
                              <ToggleBtn
                                active={form.flowerType === "Artificial"}
                                onClick={() => update("flowerType", "Artificial")}
                              >
                                Artificial
                              </ToggleBtn>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="firstName" className={labelClass}>
                            First name
                          </label>
                          <input
                            id="firstName"
                            type="text"
                            required
                            className={inputClass}
                            value={form.firstName}
                            onChange={(e) => update("firstName", e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className={labelClass}>
                            Last name
                          </label>
                          <input
                            id="lastName"
                            type="text"
                            required
                            className={inputClass}
                            value={form.lastName}
                            onChange={(e) => update("lastName", e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass}>
                          Email address
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          className={inputClass}
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelClass}>
                          Phone number <span className="text-subtle font-normal">(optional)</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          className={inputClass}
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="notes" className={labelClass}>
                          Anything else we should know? <span className="text-subtle font-normal">(optional)</span>
                        </label>
                        <textarea
                          id="notes"
                          rows={4}
                          className={`${inputClass} resize-none`}
                          value={form.notes}
                          onChange={(e) => update("notes", e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4 gap-3">
                    {step > 1 ? (
                      <Button
                        type="button"
                        variant="heroOutline"
                        onClick={() => setStep((s) => s - 1)}
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </Button>
                    ) : (
                      <span />
                    )}

                    {step < 4 ? (
                      <Button
                        type="button"
                        variant="hero"
                        disabled={!canContinue()}
                        onClick={() => setStep((s) => s + 1)}
                      >
                        Continue <ArrowRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        disabled={!canSubmit || submitting}
                      >
                        {submitting ? "Sending..." : "Request my care plan"}
                      </Button>
                    )}
                  </div>
                </form>
              </div>

              {/* Summary - desktop */}
              <aside className="hidden lg:block">
                <div className="sticky top-28 bg-card rounded-2xl p-6 shadow-card border border-border/50">
                  <h3 className="font-serif text-xl font-medium mb-5 text-heading">
                    Your care plan
                  </h3>
                  <SummaryContent form={form} />
                </div>
              </aside>

              {/* Summary - mobile sticky */}
              <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border shadow-elevated px-4 py-3">
                <details>
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="text-sm font-medium text-heading">
                      Your care plan
                    </span>
                    <span className="text-xs text-subtle">Tap to view</span>
                  </summary>
                  <div className="pt-3 max-h-64 overflow-y-auto">
                    <SummaryContent form={form} />
                  </div>
                </details>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5 py-2 border-b border-border/50 last:border-0">
    <span className="text-xs uppercase tracking-wider text-subtle">{label}</span>
    <span className="text-sm text-heading">{value || "Not provided"}</span>
  </div>
);

const SummaryContent = ({ form }: { form: FormState }) => {
  const extras: string[] = [];
  if (form.flowers)
    extras.push(`Flowers${form.flowerType ? ` (${form.flowerType})` : ""}`);
  if (form.candle) extras.push("Memorial candle");

  return (
    <div className="space-y-4">
      {form.sites.map((site, idx) => (
        <div key={idx} className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Burial site {idx + 1}
          </p>
          <SummaryRow label="Burial type" value={site.burialType} />
          <SummaryRow label="Cemetery" value={site.cemeteryName} />
          {site.plotInfo && (
            <SummaryRow label="Section / plot" value={site.plotInfo} />
          )}
        </div>
      ))}
      <div className="space-y-1 pt-2 border-t border-border/60">
        <SummaryRow label="Visit frequency" value={form.frequency} />
        <SummaryRow label="Add-ons" value={extras.join(", ")} />
      </div>
    </div>
  );
};

export default GetStarted;
