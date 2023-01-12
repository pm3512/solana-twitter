import Link from "next/link";
import Tweet from "../types/tweet";
import { timeDifference } from "../utils/datetime";

export default function TweetComponent(props: Tweet) {
  return (
    <div className="px-8 py-4">
      <div>
        <h3 className="inline font-semibold">
          {/*TODO: Link to author page or the profile page if it's our own tweet.*/}
          <Link href={'/'}>
            {props.author_display}
          </Link>
        </h3>
        <span className="text-gray-500"> • </span>
        <time className="text-gray-500 text-sm" title={props.created_at}>
          {/*TODO: Link to the tweet page.*/}
          <Link href={"/"} className="hover:underline">
            {timeDifference(Date.now(), props.timestamp)}
          </Link>
        </time>
      </div>
      <p className="whitespace-pre-wrap">{props.content}</p>
      {/*TODO: Link to the topic page.*/}
      {props.topic ? (
        <Link
          href={"/"}
          className="inline-block mt-2 text-pink-500 hover:underline"
        >
          #{props.topic}
        </Link>
      ) : null}
    </div>
  );
}
