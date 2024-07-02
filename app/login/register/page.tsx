import React from "react";
import { signup } from "./actions";
export default function RegisterUser() {
  return (
    <div className=" bg-slate-100 w-full h-screen">
      <div className="w-[300px] mx-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-6">
        <form>
          <div className=" border-[2px] py-1 mb-3">
            <input
              type="text"
              name="name"
              placeholder="名前"
              className=" pl-2"
            />
          </div>

          <div className="border-[2px] py-1 mb-3">
            <input
              type="email"
              name="email"
              placeholder="メールアドレス"
              className="pl-2"
            />
          </div>

          <div className="border-[2px] py-1 mb-3">
            <input
              type="password"
              name="password"
              placeholder="パスワード"
              className="pl-2"
            />
          </div>

          <button
            formAction={signup}
            className=" bg-blue-600 py-2 w-full text-white"
          >
            登録
          </button>
        </form>
      </div>
    </div>
  );
}
