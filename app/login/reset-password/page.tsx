"use client";

import { supabase } from "@/utils/supabase/client";
import { AuthError } from "@supabase/supabase-js";
import { FormEvent, useState } from "react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<AuthError | null>(null);
  const [isSend, setIsSend] = useState(false);

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setError(error);
        throw error;
      }

      setIsSend(true);
    } catch (e) {
      console.error(e);
    }

    if (error) {
      return <p className="text-red-500">エラーが発生しました。</p>;
    }

    if (isSend) {
      return <p className="text-green-500">パスワードを変更しました</p>;
    }
  };
  return (
    <div>
      <div>
        <p>新しいパスワードを入力してください。</p>
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>送信</button>
        </form>
      </div>
    </div>
  );
}
