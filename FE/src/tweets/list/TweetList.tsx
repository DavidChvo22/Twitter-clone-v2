import React, { useEffect } from "react";
import type { Tweet } from "../../utils/tweet";
import "./tweetList.css";
import { api } from "../../utils/api";

type TweetDisplayProps = {
  tweets: Tweet[];
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>;
};

export default function TweetDisplay({ tweets, setTweets }: TweetDisplayProps) {

  useEffect(() => {
    async function fetchTweets() {
      const data: Tweet[] = await api.get('/tweets');
      setTweets(data);
    }
    fetchTweets();
  }, [setTweets]);

  async function handleDeleteTweet(id: string) {
    await api.delete(`/tweets/${id}`);
    setTweets((prev) => prev.filter((tweet) => tweet._id !== id));
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
              key={tweet._id}
              className="tweet-display-list-item"
            >
              {tweet.content}
              <button
                id="tweetDisplay-button"
                className="delete-button"
                type="button"
                onClick={() => handleDeleteTweet(tweet._id)}
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
