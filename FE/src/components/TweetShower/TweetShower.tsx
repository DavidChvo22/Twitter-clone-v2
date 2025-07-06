import React, { useEffect } from "react";

type Tweet = {
  id: string;
  content: string;
};

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

  async function handleDeleteTweet(id: string) {
    await fetch(`http://localhost:3001/${id}`, { method: "DELETE" });
    setTweets((prev) => prev.filter((tweet) => tweet.id !== id));
  }

  return (
    <>
      <br />
      <ul
        id="tweetShower-ul"
        className="
            bg-white max-w-[calc(100%-5px)] min-h-[150px] h-[calc(100%-5px)] 
              m-[5px] overflow-auto"
      >
        {tweets.length === 0 ? (
          <li>No Tweets yet</li>
        ) : (
          tweets.map((tweet) => (
            <li
              id="tweetShower-li"
              key={tweet.id}
              className="
                    max-w-[calc(100%-5px)] ml-[5px] flex flex-wrap 
                    items-center gap-0.5 my-[2px] "
            >
              {tweet.content}
              <button
                id="tweetShower-button"
                className="
                      float-right mx-[10px] bg-red-700 text-white rounded hover:bg-white 
                    hover:text-red-700 border border-black px-1 "
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
