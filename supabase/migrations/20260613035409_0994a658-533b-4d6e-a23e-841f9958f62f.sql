
CREATE TABLE public.interest_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  first_name text NOT NULL,
  email text NOT NULL,
  cemetery text NOT NULL,
  services jsonb NOT NULL DEFAULT '[]'::jsonb
);

GRANT INSERT ON public.interest_registrations TO anon;
GRANT INSERT ON public.interest_registrations TO authenticated;
GRANT ALL ON public.interest_registrations TO service_role;

ALTER TABLE public.interest_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register interest"
  ON public.interest_registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
