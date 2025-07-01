import "./TweetShower.css";
import { useEffect } from "react";

export default function TweetShower({ tweets, setTweets }) {
  useEffect(() => {
    async function fetchTweets() {
      const response = await fetch("http://localhost:3001");
      const data = await response.json();
      setTweets(data);
    }
    fetchTweets();
  }, [setTweets]);

  async function handleDeleteTweet(id) {
    await fetch(`http://localhost:3001/${id}` , { method: "DELETE" });
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
