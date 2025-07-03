import InputField from "../InputField/InputField";
import TweetShower from "../TweetShower/TweetShower";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import type { Tweet } from "../Types/tweet"

export default function Home() {
  const navigate = useNavigate();

  function handleLogOut() {
    navigate("/");
  }

  const [tweet, setTweet] = useState("");

  const [tweets, setTweets] = useState<Tweet[]>([]);

  return (
    <div id="home-div">
      <InputField
        tweet={tweet}
        setTweet={setTweet}
        tweets={tweets}
        setTweets={setTweets}
      ></InputField>
      <TweetShower tweets={tweets} setTweets={setTweets}></TweetShower>
      <button id="home-button" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
}
