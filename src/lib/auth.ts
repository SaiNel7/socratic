import { supabase } from "./supabase";

export async function signInCornell(email: string) {
  if (!email.endsWith("@cornell.edu")) throw new Error("Cornell email required");
  const { error } = await supabase.auth.signInWithOtp({ email });
  if (error) throw error;
}

export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}
