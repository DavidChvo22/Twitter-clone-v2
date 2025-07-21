import { api } from "../../utils/api";
import type { Tweet } from "../../utils/tweet";

type TweetAddProps = {
  tweet: string;
  setTweet: React.Dispatch<React.SetStateAction<string>>;
  tweets: Tweet[];
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>;
};

export default function TweetAdd({
  tweet,
  setTweet,
  tweets,
  setTweets,
}: TweetAddProps) {
  async function handleAddTweet(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (tweet.trim() === "") {
      alert("Empty tweet");
      return;
    }
    try {
      const newTweet = await api.post('/tweets', { content: tweet });
      setTweets([newTweet, ...tweets]);
      setTweet("");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Error adding tweet.");
      }
    }
  }

  function handleInputBox(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setTweet(event.target.value);
  }

  return (
    <form onSubmit={handleAddTweet}>
      <div
        className="
                  flex items-center gap-0.5 "
      >
        <textarea
          id="inputField-input"
          className="
               resize-none bg-white m-[5px] w-[25%] "
          placeholder="Please enter your tweet"
          onChange={handleInputBox}
          value={tweet}
        />
        <button
          id="inputField-button"
          className="
                  bg-blue-600 text-white hover:bg-white hover:text-blue-600 px-1.5 "
        >
          Add tweet
        </button>
      </div>
    </form>
  );
}
