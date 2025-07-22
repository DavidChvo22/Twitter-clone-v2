import { useTweetAdd } from "../../store/useTweetActions";
import { useState } from "react";

export default function TweetAdd() {
  const addTweet = useTweetAdd();

  const [tweet, setTweet] = useState("");

  async function handleAddTweet(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (tweet.trim() === "") {
      alert("Empty tweet");
      return;
    }
    try {
      await addTweet(tweet);
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
