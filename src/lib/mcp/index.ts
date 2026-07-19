import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listMyInterestRegistrations from "./tools/list-my-interest-registrations";
import createInterestRegistration from "./tools/create-interest-registration";

const projectRef =
  import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "sacred-care-mcp",
  title: "Sacred Care",
  version: "0.1.0",
  instructions:
    "Tools for Sacred Care, a compassionate burial-care service. Use these to help a signed-in user view and create their interest registrations.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listMyInterestRegistrations, createInterestRegistration],
});
