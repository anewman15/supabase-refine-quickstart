import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://rgwukmbwmpdsczyttzqg.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnd3VrbWJ3bXBkc2N6eXR0enFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYyMjIzMTYsImV4cCI6MjAwMTc5ODMxNn0.jEZrHDhRLTx3VDc0_zfjO6SLS_-VQn7gofMp8VEGIew";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
