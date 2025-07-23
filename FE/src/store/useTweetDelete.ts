import { useTweetStore } from "./tweetStore";
import { api } from "../utils/api";

export function useTweetDelete() {
  const removeTweet = useTweetStore((state) => state.removeTweet);
  return async (id: string) => {
    try {
      await api.delete(`/tweets/${id}`);
      removeTweet(id);
    } catch (error: any) {
      if (error.status === 403) {
        alert("Nemáte oprávnenie vymazať tento tweet.");
      } else {
        alert("Nastala chyba pri mazaní tweetu.");
      }
    }
  };
}
