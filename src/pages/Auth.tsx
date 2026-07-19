import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-border bg-background text-heading placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

function safeNext(raw: string | null): string {
  if (!raw) return "/";
  try {
    // must be same-origin relative path
    if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  } catch {}
  return "/";
}

const Auth = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const next = safeNext(params.get("next"));
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate(next, { replace: true });
    });
  }, [navigate, next]);

  const handleGoogle = async () => {
    setError(null);
    const redirect_uri = `${window.location.origin}/auth${
      next && next !== "/" ? `?next=${encodeURIComponent(next)}` : ""
    }`;
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri });
    if (result.error) {
      setError(result.error.message ?? "Could not sign in with Google.");
      return;
    }
    if (result.redirected) return;
    navigate(next, { replace: true });
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setError(error.message);
      navigate(next, { replace: true });
    } else {
      const emailRedirectTo = `${window.location.origin}/auth${
        next && next !== "/" ? `?next=${encodeURIComponent(next)}` : ""
      }`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo },
      });
      setBusy(false);
      if (error) return setError(error.message);
      setError("Check your email to confirm your account, then sign in.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-24 md:py-32 surface-warm">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto bg-card rounded-2xl p-8 md:p-10 shadow-card border border-border/50">
            <h1 className="font-serif text-3xl font-medium mb-2 text-center">
              {mode === "signin" ? "Sign in" : "Create an account"}
            </h1>
            <p className="text-body text-sm text-center mb-8">
              {mode === "signin"
                ? "Welcome back to Sacred Care."
                : "Join Sacred Care."}
            </p>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full mb-6"
              onClick={handleGoogle}
            >
              Continue with Google
            </Button>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-subtle uppercase tracking-wider">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={handleEmail} className="space-y-4">
              <input
                type="email"
                required
                placeholder="Email"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                required
                minLength={6}
                placeholder="Password"
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
                {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
              </Button>
            </form>

            <p className="text-sm text-body text-center mt-6">
              {mode === "signin" ? (
                <>
                  New here?{" "}
                  <button
                    type="button"
                    className="text-primary underline"
                    onClick={() => setMode("signup")}
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-primary underline"
                    onClick={() => setMode("signin")}
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
            <p className="text-xs text-subtle text-center mt-6">
              <Link to="/" className="hover:text-primary">
                Return home
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
