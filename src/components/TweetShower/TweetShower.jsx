import "./TweetShower.css";

export default function TweetShower({ tweets, setTweets }) {
  function handleDeleteTweet(indexToRemove) {
    const newTweets = tweets.filter((_, index) => index !== indexToRemove);
    localStorage.setItem("tweets", JSON.stringify(newTweets));
    setTweets(newTweets);
  }

  return (
    <>
      <br />
      <ul id="tweetShower-ul">
        {tweets.length === 0 ? (
          <li>No Tweets yet</li>
        ) : (
          tweets.map((tweet, index) => (
            <li id="tweetShower-li" key={index}>
              {tweet}
              <button
                id="tweetShower-button"
                type="button"
                onClick={() => handleDeleteTweet(index)}
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
