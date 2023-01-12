import Head from 'next/head'
import TweetComponent from '../components/tweet';
import Tweet from '../types/tweet'

export default function Home() {
  //TODO: remove placeholder
  const tweets: Array<Tweet> = [ {
      author_display: 'author1',
      topic: 'topic1',
      content: 'content1',
      created_ago: "2 minutes ago",
      created_at: "some time",
      timestamp: 0
    }, {
      author_display: 'author2',
      content: 'content2',
      created_ago: "7 hours ago",
      created_at: "some time",
      timestamp: 7
    }
  ];

  const tweetList = tweets.map((tweet, i) => {
    return <TweetComponent {...tweet} key={i} />
  });

  return (
    <>
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto">
        <ul className="">
          {tweetList}
        </ul>
      </div>
      <Head>
        <title>Solana Twitter</title>
        <meta name="description" content="Simple twitter clone built with Solana" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}
