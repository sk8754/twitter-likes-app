"use client";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type tweet = {
  id: string;
  userName: string;
  content: string;
};

export default function Home() {
  const Router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [tweetList, setTweetList] = useState<tweet[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const userData = await supabase.auth.getUser();

      if (!userData.data.user) {
        Router.push("/login");
        return;
      }

      const userNameResponse = await supabase
        .from("user")
        .select("id, name")
        .eq("auth_id", userData.data.user.id)
        .single();

      if (userNameResponse.data) {
        setUserId(userNameResponse.data.id);
        setUserName(userNameResponse.data.name);
      }

      // getUser関数の外でgetTweetを呼び出す
      getTweet();
    };

    getUser();
  }, []);

  const getTweet = async () => {
    const tweetResponse = (await supabase
      .from("tweet")
      .select("id, content, user:user_id (name)")) as {
      data: { id: string; content: string; user: { name: string } }[];
    };

    if (tweetResponse.data) {
      const tweetData = tweetResponse.data.map((tweet) => {
        return {
          id: tweet.id,
          userName: tweet.user.name,
          content: tweet.content,
        };
      });
      setTweetList(tweetData);
    }
  };

  const handleAddTweet = async () => {
    const { error } = await supabase.from("tweet").insert({
      content: content,
      user_id: userId,
    });

    if (error) {
      console.error(error);
    } else {
      setContent("");
      await getTweet();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    Router.push("/login");
  };
  return (
    <main>
      <div className="w-[600px] mx-auto">
        <h1 className="text-3xl font-bold mb-4">Twitter Timeline</h1>

        <div className="flex gap-6 items-center ">
          <img src="./imgs/pekora.jpg" className="h-20" />
          <input
            type="text"
            className=" border-2 rounded-3xl w-full h-12"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="text-right">
          <button
            className="text-white py-2 bg-blue-500 rounded-2xl w-[60px]"
            onClick={handleAddTweet}
          >
            Post
          </button>
        </div>

        {/* tweetの表示エリア */}

        {tweetList.map((tweetList) => (
          <div className="flex items-center gap-4 mb-4" key={tweetList.id}>
            <img src="./imgs/hubuki01.png" className="h-20" />

            <div className="border-2 w-full rounded-3xl pl-3">
              <h1 className="font-bold">{tweetList.userName}</h1>
              <p className="w-full">{tweetList.content}</p>
            </div>
          </div>
        ))}

        {/* ログアウトボタン */}
        <div className="text-center">
          <button
            className="bg-red-500 text-xl rounded-3xl p-3 text-white"
            onClick={handleLogout}
          >
            ログアウト
          </button>
        </div>
      </div>
    </main>
  );
}
