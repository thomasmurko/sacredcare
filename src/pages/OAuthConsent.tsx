import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type AuthorizationDetails = {
  client?: { name?: string; client_id?: string; redirect_uri?: string };
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
};

type OAuthNamespace = {
  getAuthorizationDetails: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (
    id: string,
  ) => Promise<{
    data: { redirect_url?: string; redirect_to?: string } | null;
    error: { message: string } | null;
  }>;
  denyAuthorization: (
    id: string,
  ) => Promise<{
    data: { redirect_url?: string; redirect_to?: string } | null;
    error: { message: string } | null;
  }>;
};

const authOAuth = (
  supabase.auth as unknown as { oauth: OAuthNamespace }
).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization request.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?next=" + encodeURIComponent(next);
        return;
      }
      setUserEmail(sess.session.user.email ?? null);

      const { data, error } = await authOAuth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await authOAuth.approveAuthorization(authorizationId)
      : await authOAuth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("The authorization server did not return a redirect.");
      return;
    }
    window.location.href = target;
  };

  const clientName = details?.client?.name ?? "an external app";

  return (
    <main className="min-h-screen surface-warm py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-lg mx-auto bg-card rounded-2xl p-8 md:p-10 shadow-card border border-border/50">
          {error ? (
            <>
              <h1 className="font-serif text-2xl font-medium mb-3">
                Authorization request could not be completed
              </h1>
              <p className="text-body text-sm">{error}</p>
            </>
          ) : !details ? (
            <p className="text-body">Loading authorization request…</p>
          ) : (
            <>
              <h1 className="font-serif text-2xl md:text-3xl font-medium mb-3">
                Connect {clientName} to Sacred Care
              </h1>
              <p className="text-body text-sm mb-2">
                This lets {clientName} use Sacred Care as you.
              </p>
              {userEmail && (
                <p className="text-subtle text-xs mb-6">Signed in as {userEmail}</p>
              )}
              <ul className="text-sm text-body space-y-2 mb-8 list-disc pl-5">
                <li>Share your basic profile</li>
                <li>Share your email address</li>
                <li>Access Sacred Care tools while you are signed in</li>
              </ul>
              <p className="text-xs text-subtle mb-8">
                This does not bypass Sacred Care's permissions or data policies.
              </p>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="hero"
                  size="lg"
                  className="flex-1"
                  disabled={busy}
                  onClick={() => decide(true)}
                >
                  Approve
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  disabled={busy}
                  onClick={() => decide(false)}
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default OAuthConsent;
