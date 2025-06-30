import "./InputField.css";
export default function InputField({ tweet, setTweet, tweets, setTweets }) {
  function handleAddTweet() {
    if (tweet.trim() !== "") {
      const newTweets = [tweet, ...tweets];
      localStorage.setItem("tweets", JSON.stringify(newTweets));
      setTweets(newTweets);
      setTweet("");
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
