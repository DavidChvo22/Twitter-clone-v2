import { useCallback } from "react";
import { useTweetStore } from "./tweetStore";
import { api } from "../utils/api";
import type { Tweet } from "../utils/tweet";

export function useTweetFetch() {
  const setTweets = useTweetStore((state) => state.setTweets);
  return useCallback(async () => {
    const data: Tweet[] = await api.get("/tweets");
    setTweets(data);
  }, [setTweets]);
} 