import Link from "next/link";
import React from "react";
import { login } from "./actions";

export default function LoginPage() {
  return (
    <div className="max-w-[600px] mx-auto p-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl">
      <form>
        <div className="flex flex-col mb-4">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            className="border-2"
            placeholder="メールアドレス"
            name="email"
            type="email"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            className="border-2"
            placeholder="パスワード"
            name="password"
            type="password"
            required
          />
        </div>

        <button
          formAction={login}
          className=" bg-blue-500 text-white w-[100%] py-2 rounded-lg mb-4"
        >
          Log in
        </button>
        <br />
        <Link href={"/login/register"}>
          <button className=" bg-green-500 text-white w-[100%] py-2 rounded-lg mb-4">
            Sign up
          </button>
        </Link>

        <Link href={"/login/forget-password"}>
          <p className="text-center text-blue-600">Forget Password?</p>
        </Link>
      </form>
    </div>
  );
}
