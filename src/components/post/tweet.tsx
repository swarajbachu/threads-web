import React from "react";
import SingleTweet from "./singleTweet";
import { Button, Card } from "@material-tailwind/react";
import { useStore } from "@/store/post-store";
import { shallow } from "zustand/shallow";

type Tweet = {
  id: number;
  text: string;
};

const TweetPost: React.FC = () => {


  const { tweets, setTweets } = useStore(
    (state) => ({
      tweets: state.tweets,
      setTweets: state.setTweets,
    }),
    shallow
  );

  const handleAddTweet = (id: number) => {
    const index = tweets.findIndex((tweet) => tweet.id === id);

    // Increment ids of all tweets after the current one
    const updatedTweets = tweets.map((tweet) => {
      if (tweet.id > id) {
        return { ...tweet, id: tweet.id + 1 };
      }
      return tweet;
    });

    // Create new tweet with id incremented by 1 and an empty text field
    const newTweet = { id: id + 1, text: "" };

    // Insert the new tweet after the current one
    updatedTweets.splice(index + 1, 0, newTweet);

    setTweets(updatedTweets);
  };
  const handleRemoveTweet = (id: number) => {
    if (id == 0) return;
    const updatedTweets = tweets.filter((tweet) => tweet.id !== id);
    setTweets(updatedTweets);
  };

  const handleTweetChange = (id: number, newText: string) => {
    const updatedTweets = tweets.map((tweet) =>
      tweet.id === id ? { ...tweet, text: newText } : tweet
    );
    setTweets(updatedTweets);
  };

  const handlePost = () => {
    console.log(tweets);
  };

  return (
    <Card className="p-4">
      <div>
        {tweets.map((tweet) => (
          <SingleTweet
            key={tweet.id}
            id={tweet.id}
            text={tweet.text}
            onChange={handleTweetChange}
            onRemove={handleRemoveTweet}
            onAdd={handleAddTweet}
          />
        ))}
        {/* <button
          className="rounded-full bg-accent px-4 py-2 text-white"
          onClick={handleAddTweet}
        >
          +
        </button> */}
      </div>
      <Button
      className="my-2  w-52 self-end" size="md" color="blue" 
      >Publish</Button>
    </Card>
  );
};

export default TweetPost;
