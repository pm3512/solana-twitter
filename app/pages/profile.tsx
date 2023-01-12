import { useEffect, useState } from "react";
import Tweet from "../types/tweet";
import TweetForm from "../components/tweetForm";
import TweetList from "../components/tweetList";

export default function Profile() {
  // TODO: Update tweets
  const [tweets, setTweets] = useState<Array<Tweet>>([]);

  useEffect(() => {
    // TODO: remove placeholder
    setTweets([
      {
        author_display: "author1",
        topic: "topic1",
        content: "content1",
        created_ago: "2 minutes ago",
        created_at: "some time",
        timestamp: 0,
      },
    ]);
  }, []);

  const addTweet = (newTweet: Tweet) => {
    setTweets([...tweets, newTweet]);
  };

  // TODO: check wallet
  const wallet = "C31hQ3iWGT8btkTFSwKCSnjSqwzz9GStV3YEGq9fQQ4T";

  return (
    <>
      <div className="border-b px-8 py-4 bg-gray-50">{wallet}</div>
      <TweetForm callback={addTweet} />
      <TweetList tweets={tweets} />
    </>
  );
}
