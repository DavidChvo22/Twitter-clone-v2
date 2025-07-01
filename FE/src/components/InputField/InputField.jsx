import "./InputField.css";

export default function InputField({ tweet, setTweet, tweets, setTweets }) {
  async function handleAddTweet(event) {
    event.preventDefault();
    if (tweet.trim() === "") {
      alert("Empty tweet");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: tweet }),
      });
      if (!response.ok) throw new Error("Failed to add tweet");
      const newTweet = await response.json();

      setTweets([newTweet, ...tweets]);
      setTweet("");
    } catch (error) {
      alert("Error adding tweet.");
    }
  }

  function handleInputBox(event) {
    setTweet(event.target.value);
  }

  return (
    <form id="inputField-form" onSubmit={handleAddTweet}>
      <textarea
        id="inputField-input"
        placeholder="Please enter your tweet"
        onChange={handleInputBox}
        value={tweet}
      />
      <br />
      <button id="inputField-button">Add tweet</button>
    </form>
  );
}
