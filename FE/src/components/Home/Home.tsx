import InputField from "../InputField/InputField";
import TweetShower from "../TweetShower/TweetShower";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Tweet } from "../Types/tweet";

export default function Home() {
  const navigate = useNavigate();

  function handleLogOut() {
    navigate("/");
  }

  const [tweet, setTweet] = useState("");

  const [tweets, setTweets] = useState<Tweet[]>([]);

  return (
    <div id="home-div" className="h-screen">
      <div className="absolute top-0 bg-gray-800 m-[10px] w-[50%] h-[70vh] left-1/2 -translate-x-1/2 flex flex-col min-h-[218px]">
        <InputField
          tweet={tweet}
          setTweet={setTweet}
          tweets={tweets}
          setTweets={setTweets}
        ></InputField>
        <TweetShower tweets={tweets} setTweets={setTweets}></TweetShower>
      </div>
      <button
        className="bg-blue-500 text-white p-4 fixed top-0 right-0 m-[5px] hover:bg-red-500 inline-flex items-center px-4 py-2 rounded border border-black"
        onClick={handleLogOut}
      >
        Log Out
      </button>
    </div>
  );
}
