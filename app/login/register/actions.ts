"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const supabase = createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    if (error.status === 429) {
      console.error("Rate Limit Exceeded:", error);
      // レート制限エラーの場合、適切なメッセージを表示
      redirect("/rate-limit-error");
    } else {
      console.error("SignUp Error:", error);
      redirect("/error");
    }
  }

  const userData = await supabase.from("user").insert({
    name: name,
    auth_id: data.user?.id,
  });

  if (userData.error) {
    console.error("Database Insert Error:", userData.error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
