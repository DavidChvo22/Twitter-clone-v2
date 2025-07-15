import React, { useEffect } from "react";
import type { Tweet } from "../../home/tweet";
import './tweetDisplay.css';

type TweetDisplayProps = {
  tweets: Tweet[];
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>;
};

export default function TweetDisplay({ tweets, setTweets }: TweetDisplayProps) {
  useEffect(() => {
    async function fetchTweets() {
      const response = await fetch("http://localhost:3001/tweets");
      const data: Tweet[] = await response.json();
      setTweets(data);
    }
    fetchTweets();
  }, [setTweets]);

  async function handleDeleteTweet(id: string) {
    await fetch(`http://localhost:3001/tweets/${id}`, { method: "DELETE" });
    setTweets((prev) => prev.filter((tweet) => tweet.id !== id));
  }

  return (
    <>
      <br />
      <ul id="tweetDisplay-ul" className="tweet-display-list">
        {tweets.length === 0 ? (
          <li>No Tweets yet</li>
        ) : (
          tweets.map((tweet) => (
            <li
              id="tweetDisplay-li"
              key={tweet.id}
              className="tweet-display-list-item"
            >
              {tweet.content}
              <button
                id="tweetDisplay-button"
                className="delete-button"
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
