import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Tweet from '../types/tweet'

export default function Home() {
  //TODO: remove placeholder
  const tweets: Array<Tweet> = [ {
      author: 'author1',
      topic: 'topic1',
      content: 'content1'
    }, {
      author: 'author2',
      content: 'content2'
    }
  ]
  return (
    <>
      <Head>
        <title>Solana Twitter</title>
        <meta name="description" content="Simple twitter clone built with Solana" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}
