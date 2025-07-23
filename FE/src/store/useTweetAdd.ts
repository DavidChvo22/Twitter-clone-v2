import { useTweetStore } from "./tweetStore";
import { api } from "../utils/api";
import type { Tweet } from "../utils/tweet";

export function useTweetAdd() {
  const addTweet = useTweetStore((state) => state.addTweet);
  return async (content: string) => {
    const result = await api.post("/tweets", { content });
    if (!result) {
      console.error("API returned undefined!");
      return;
    }

    const newTweet: Tweet = result.data || result;
    addTweet(newTweet);
  };
} 