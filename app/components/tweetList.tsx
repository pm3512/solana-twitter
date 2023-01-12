import Tweet from "../types/tweet";
import TweetComponent from "./tweet";

export default function TweetList(props: { tweets: Array<Tweet> }) {
  // sort by publication time
  const orderedTweets = props.tweets.sort((a, b) => b.timestamp - a.timestamp);
  const tweetList = orderedTweets.map((tweet, i) => {
    return <TweetComponent {...tweet} key={i} />;
  });
  return <div className="divide-y">{tweetList}</div>;
}
