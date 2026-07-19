ALTER TABLE public.interest_registrations
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

GRANT SELECT, INSERT ON public.interest_registrations TO authenticated;

DROP POLICY IF EXISTS "Authenticated users can view their own registrations" ON public.interest_registrations;
CREATE POLICY "Authenticated users can view their own registrations"
  ON public.interest_registrations
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Authenticated users can insert their own registrations" ON public.interest_registrations;
CREATE POLICY "Authenticated users can insert their own registrations"
  ON public.interest_registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());