import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  const url = process.env.SUPABASE_URL!;
  const anon = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient(url, anon, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "create_interest_registration",
  title: "Register interest",
  description:
    "Create a Sacred Care interest registration for the signed-in user. Use this when the caller asks to register interest in Sacred Care's burial care services.",
  inputSchema: {
    first_name: z.string().trim().min(1).max(100).describe("First name of the person registering."),
    cemetery: z
      .string()
      .trim()
      .min(1)
      .max(200)
      .describe("Cemetery where the loved one is resting."),
    services: z
      .array(z.string().min(1).max(120))
      .max(20)
      .optional()
      .describe(
        "Optional list of services the caller is interested in (e.g. 'One-time clean & restore', 'Ongoing care visits').",
      ),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: false,
  },
  handler: async ({ first_name, cemetery, services }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return {
        content: [{ type: "text", text: "Not authenticated." }],
        isError: true,
      };
    }
    const email = ctx.getUserEmail();
    if (!email) {
      return {
        content: [
          { type: "text", text: "Your account has no email on file." },
        ],
        isError: true,
      };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("interest_registrations")
      .insert({
        user_id: ctx.getUserId(),
        first_name,
        email,
        cemetery,
        services: services ?? [],
      })
      .select()
      .single();

    if (error) {
      return {
        content: [{ type: "text", text: error.message }],
        isError: true,
      };
    }
    return {
      content: [
        {
          type: "text",
          text: `Registered interest for ${first_name} at ${cemetery}.`,
        },
      ],
      structuredContent: { registration: data },
    };
  },
});
