"use client";
import { supabase } from "@/utils/supabase/client";
import { AuthError } from "@supabase/supabase-js";
import React, { FormEvent, useState } from "react";

function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<AuthError | null>(null);
  const [isSend, setIsSend] = useState(false);

  const handleSubmitEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost3000:/login/reset-password",
      });

      if (error) {
        setError(error);
        throw error;
      }

      setIsSend(true);
    } catch (err) {
      console.error(err);
    }

    if (error) {
      return <p className="text-red-500">エラーが発生しました。</p>;
    }

    if (isSend) {
      return <p className="text-green-500">メールを送信しました。</p>;
    }
  };
  return (
    <div>
      <div className="flex flex-col max-w-[420px] mx-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <h1 className=" text-2xl mb-4">
          登録されているメールアドレスを入力してください
        </h1>

        <form onSubmit={handleSubmitEmail}>
          <input
            className="w-[300px] mx-auto py-2 border-2"
            type="email"
            id="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-[300px] mx-auto py-2 mt-4 bg-blue-600 text-white"
          >
            送信
          </button>
        </form>

        {error && <p className="text-red-500">エラーが発生しました。</p>}
        {isSend && <p className="text-green-500">メールを送信しました。</p>}
      </div>
    </div>
  );
}

export default ForgetPasswordPage;
