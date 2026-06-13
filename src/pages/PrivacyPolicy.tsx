import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-28 md:pt-36 pb-20 surface-warm">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-subtle hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>

            <h1 className="font-serif text-4xl md:text-5xl font-medium text-heading mb-3">
              Privacy Policy
            </h1>
            <p className="text-subtle text-sm mb-12">Last updated: May 2026</p>

            <div className="space-y-10 text-body leading-relaxed">
              <section>
                <h2 className="font-serif text-2xl font-medium text-heading mb-3">
                  1. About us
                </h2>
                <p>
                  Sacred Care ("we", "us", "our") provides burial care and memorial services
                  to families across New South Wales, Australia. We are committed to
                  protecting your personal information in accordance with the Privacy Act
                  1988 (Cth) and the Australian Privacy Principles (APPs).
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-heading mb-3">
                  2. What information we collect
                </h2>
                <p className="mb-3">
                  We collect the following personal information when you submit a care plan
                  request through our website:
                </p>
                <ul className="list-disc pl-6 space-y-1.5">
                  <li>Your first and last name</li>
                  <li>Email address</li>
                  <li>Phone number (if provided)</li>
                  <li>Cemetery name, section, row or plot number</li>
                  <li>Type of burial and service preferences</li>
                  <li>Any additional information you choose to provide</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-heading mb-3">
                  3. How we use your information
                </h2>
                <p className="mb-3">We use your personal information solely to:</p>
                <ul className="list-disc pl-6 space-y-1.5 mb-3">
                  <li>Contact you to confirm and arrange your care plan</li>
                  <li>Deliver the services you have requested</li>
                  <li>Send before and after photos of completed visits</li>
                  <li>Respond to any enquiries you make</li>
                </ul>
                <p>
                  We do not use your information for marketing purposes without your explicit
                  consent, and we do not sell, trade, or share your personal information with
                  third parties except where required to deliver your requested service (for
                  example, a florist fulfilling a flower order).
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-heading mb-3">
                  4. How we store your information
                </h2>
                <p className="mb-3">
                  Your information is stored securely and is only accessible to Sacred Care
                  staff involved in delivering your service. We take reasonable steps to
                  protect your personal information from misuse, interference, loss, and
                  unauthorised access.
                </p>
                <p>
                  We will retain your information for as long as necessary to deliver your
                  service and comply with any legal obligations, after which it will be
                  securely deleted.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-heading mb-3">
                  5. Disclosure to third parties
                </h2>
                <p className="mb-3">
                  We will only disclose your personal information to third parties in the
                  following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 mb-3">
                  <li>Where it is necessary to fulfil your service request</li>
                  <li>Where required or authorised by law</li>
                  <li>With your consent</li>
                </ul>
                <p>We do not disclose your information to overseas recipients.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-heading mb-3">
                  6. Your rights
                </h2>
                <p className="mb-3">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1.5 mb-3">
                  <li>Request access to the personal information we hold about you</li>
                  <li>Request correction of any inaccurate or incomplete information</li>
                  <li>Make a complaint about how we have handled your information</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us at{" "}
                  <a
                    href="mailto:thomas@brinvas.com"
                    className="text-primary hover:underline"
                  >
                    thomas@brinvas.com
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-heading mb-3">
                  7. Complaints
                </h2>
                <p>
                  If you are not satisfied with how we have handled your personal
                  information, you may lodge a complaint with the Office of the Australian
                  Information Commissioner (OAIC) at{" "}
                  <a
                    href="https://www.oaic.gov.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    www.oaic.gov.au
                  </a>{" "}
                  or by calling 1300 363 992.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-medium text-heading mb-3">
                  8. Changes to this policy
                </h2>
                <p>
                  We may update this privacy policy from time to time. Any changes will be
                  posted on this page with an updated date.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
