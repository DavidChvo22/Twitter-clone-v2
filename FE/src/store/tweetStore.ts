import { create } from 'zustand';
import type { Tweet } from '../utils/tweet';

type TweetStore = { 
    tweets: Tweet[];
    setTweets: (tweets: Tweet[]) => void;
    addTweet: (tweet: Tweet) => void;
    removeTweet: (id: string) => void;
};

export const useTweetStore = create<TweetStore>((set) => ({
  tweets: [],
  setTweets: (tweets) => set({ tweets }),
  addTweet: (tweet) => set((state) => ({ tweets: [tweet, ...state.tweets] })),
  removeTweet: (id) =>
    set((state) => ({ tweets: state.tweets.filter((t) => t._id !== id) })),
}));