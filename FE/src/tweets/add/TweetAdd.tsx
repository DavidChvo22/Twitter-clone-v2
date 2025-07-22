import { api } from "../../utils/api";
import { useTweetAdd } from "../../store/useTweetActions";
import { useState } from "react";

export default function TweetAdd() {
  const [tweet, setTweet] = useState("");
  const addTweet = useTweetAdd();

  async function handleAddTweet(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (tweet.trim() === "") {
      alert("Empty tweet");
      return;
    }
    try {
      const newTweet = await api.post("/tweets", { content: tweet });
      addTweet(newTweet);
      setTweet(""); // reset
    } catch (error) {
      alert("Error adding tweet.");
    }
  }

  function handleInputBox(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setTweet(event.target.value);
  }

  return (
    <form onSubmit={handleAddTweet}>
      <textarea value={tweet} onChange={handleInputBox} />
      <button>Add tweet</button>
    </form>
  );
}
