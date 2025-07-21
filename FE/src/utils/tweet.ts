export type Tweet = {
  _id: string;
  content: string;
  user: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
};