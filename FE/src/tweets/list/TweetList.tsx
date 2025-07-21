import { useEffect } from "react";
import "./tweetList.css";
import { useTweetDelete, useTweetFetch } from "../../store/useTweetActions";
import { useTweetStore } from "../../store/tweetStore";

export default function TweetList() {
  const tweets = useTweetStore((state) => state.tweets);
  const fetchTweets = useTweetFetch();
  const deleteTweet = useTweetDelete();

  useEffect(() => {
    fetchTweets();
  }, [fetchTweets]);

  async function handleDeleteTweet(id: string) {
    await deleteTweet(id);
  }

  return (
    <>
      <br />
      <ul id="tweetlist-ul" className="tweet-list-list">
        {tweets.length === 0 ? (
          <li>No Tweets yet</li>
        ) : (
          tweets.map((tweet) => (
            <li
              id="tweetList-li"
              key={tweet._id}
              className="tweet-list-list-item"
            >
              {tweet.content}
              <button
                id="tweetlist-button"
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
