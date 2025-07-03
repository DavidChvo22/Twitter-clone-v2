import "./TweetShower.css";
import React, { useEffect } from "react";

// 1. Define a type for a Tweet
type Tweet = {
  id: string;
  content: string;
  // Add other fields if needed
};

// 2. Define a type for the component props
type TweetShowerProps = {
  tweets: Tweet[];
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>;
};

export default function TweetShower({ tweets, setTweets }: TweetShowerProps) {
  useEffect(() => {
    async function fetchTweets() {
      const response = await fetch("http://localhost:3001");
      const data: Tweet[] = await response.json();
      setTweets(data);
    }
    fetchTweets();
  }, [setTweets]);

  // 3. Type the id parameter
  async function handleDeleteTweet(id: string) {
    await fetch(`http://localhost:3001/${id}`, { method: "DELETE" });
    setTweets((prev) => prev.filter((tweet) => tweet.id !== id));
  }

  return (
    <>
      <br />
      <ul id="tweetShower-ul">
        {tweets.length === 0 ? (
          <li>No Tweets yet</li>
        ) : (
          tweets.map((tweet) => (
            <li id="tweetShower-li" key={tweet.id}>
              {tweet.content}
              <button
                id="tweetShower-button"
                type="button"
                onClick={() => handleDeleteTweet(tweet.id)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
