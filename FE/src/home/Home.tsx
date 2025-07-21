import TweetAdd from "../tweets/add/TweetAdd";
import TweetList from "../tweets/list/TweetList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Tweet } from "../utils/tweet";
import './home.css'

export default function Home() {
  const navigate = useNavigate();

  function handleLogOut() {
    navigate("/");
  }

  const [tweet, setTweet] = useState("");

  const [tweets, setTweets] = useState<Tweet[]>([]);

  return (
    <div id="home-div" className="h-screen">
      <div className="home-div">
        <TweetAdd
          tweet={tweet}
          setTweet={setTweet}
          tweets={tweets}
          setTweets={setTweets}
        ></TweetAdd>
        <TweetList tweets={tweets} setTweets={setTweets}></TweetList>
      </div>
      <button
        className="logout-button"
        onClick={handleLogOut}
      >
        Log Out
      </button>
    </div>
  );
}
