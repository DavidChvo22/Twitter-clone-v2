import { useCallback } from "react";
import { api } from "../utils/api";
import { useTweetStore } from "./tweetStore";
import type { Tweet } from "../utils/tweet";

export function useTweetAdd() {
  const addTweet = useTweetStore((state) => state.addTweet);
  return async (content: string) => {
    const newTweet: Tweet = await api.post("/tweets", { content });
    addTweet(newTweet);
  };
}

export function useTweetDelete() {
  const removeTweet = useTweetStore((state) => state.removeTweet);
  return async (id: string) => {
    await api.delete(`/tweets/${id}`);
    removeTweet(id);
  };
}

export function useTweetFetch() {
  const setTweets = useTweetStore((state) => state.setTweets);
  return useCallback(async () => {
    const data: Tweet[] = await api.get("/tweets");
    setTweets(data);
  }, [setTweets]);
}