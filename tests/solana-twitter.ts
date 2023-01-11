import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert, expect } from "chai";
import { SolanaTwitter } from "../target/types/solana_twitter";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

describe("solana-twitter", () => {
  const maxTopicLength = 50;
  const maxContentLength = 280;

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaTwitter as Program<SolanaTwitter>;
  const createTweetAccount = async (
    topic: string | null,
    content: string,
    author?: anchor.web3.Keypair
  ): Promise<anchor.web3.Keypair> => {
    const tweet = anchor.web3.Keypair.generate();
    const authorPubKey = author?.publicKey ?? program.provider.publicKey;

    await program.methods
      .sendTweet(topic, content)
      .accounts({
        tweet: tweet.publicKey,
        author: authorPubKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers(author ? [tweet, author] : [tweet])
      .rpc();

    return tweet;
  };

  it("can send a new tweet", async () => {
    const topic = "TOPIC HERE";
    const content = "CONTENT HERE";
    const tweet = await createTweetAccount(topic, content);

    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

    // author is correct
    expect(tweetAccount.author.toBase58()).to.equal(
      program.provider.publicKey.toBase58()
    );

    // content is correct
    expect(tweetAccount.content).to.equal(content);

    // topic is correct
    expect(tweetAccount.topic).to.equal(topic);

    // timestamp is valid
    expect(tweetAccount.timestamp.toNumber()).to.be.above(0);
  });

  it("can send a tweet from another author", async () => {
    const topic = "TOPIC HERE";
    const content = "CONTENT HERE";
    const authorKeyPair = anchor.web3.Keypair.generate();

    const signature = await program.provider.connection.requestAirdrop(authorKeyPair.publicKey, 1_000_000_000);
    const { blockhash, lastValidBlockHeight } = await program.provider.connection.getLatestBlockhash();
    await program.provider.connection.confirmTransaction({
      signature,
      blockhash,
      lastValidBlockHeight
    });
    const tweet = await createTweetAccount(topic, content, authorKeyPair);

    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

    // author is correct
    expect(tweetAccount.author.toBase58()).to.equal(
      authorKeyPair.publicKey.toBase58()
    );

    // content is correct
    expect(tweetAccount.content).to.equal(content);

    // topic is correct
    expect(tweetAccount.topic).to.equal(topic);

    // timestamp is valid
    expect(tweetAccount.timestamp.toNumber()).to.be.above(0);
  });

  it("can send a new tweet without topic", async () => {
    const topic = null;
    const content = "CONTENT HERE";
    const tweet = await createTweetAccount(topic, content);

    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

    // author is correct
    expect(tweetAccount.author.toBase58()).to.equal(
      program.provider.publicKey.toBase58()
    );

    // content is correct
    expect(tweetAccount.content).to.equal(content);

    // no topic
    expect(tweetAccount.topic).to.be.null;

    // timestamp is valid
    expect(tweetAccount.timestamp.toNumber()).to.be.above(0);
  });

  it("doesn't send a tweet with long topic", async () => {
    const topic = "Very long topic".padEnd(maxTopicLength + 1);
    const content = "CONTENT HERE";
    const errorMessageRegex = `.*topic.*${maxTopicLength} characters.*`;
    try {
      await createTweetAccount(topic, content);
      assert.fail("No exception thrown");
    } catch (e) {
      expect(e.message).to.match(RegExp(errorMessageRegex));
    }
  });

  it("doesn't send a tweet with long content", async () => {
    const topic = "topic";
    const content = "Very long content".padEnd(maxContentLength + 1);
    const errorMessageRegex = `.*content.*${maxContentLength} characters.*`;
    try {
      await createTweetAccount(topic, content);
      assert.fail("No exception thrown");
    } catch (e) {
      expect(e.message).to.match(RegExp(errorMessageRegex));
    }
  });

  it("can fetch all tweets",async () => {
    const tweets = await program.account.tweet.all()
    expect(tweets.length).to.equal(3);
  });

  it("can fetch all tweets by author",async () => {
    const author = program.provider.publicKey.toBase58();
    const tweets = await program.account.tweet.all([{
      memcmp: {
        offset: 8, // discriminator
        bytes: author
      }
    }])
    // two entries from previous tests
    expect(tweets.length).to.equal(2);

    tweets.forEach((tweet) => {
      expect(tweet.account.author.toBase58()).to.equal(author);
    });
  });

  it("can fetch all tweets by topic",async () => {
    const topic = 'TOPIC HERE';
    const topicEncoded = bs58.encode(Buffer.from(topic));
    const tweets = await program.account.tweet.all([{
      memcmp: {
        offset: 8 // discriminator
                + 32 // author
                + 8 // timestamp
                + 1 // Some/None flag
                + 4, // topic metadata
        bytes: topicEncoded
      }
    }])
    // two entries from previous tests
    expect(tweets.length).to.equal(2);

    tweets.forEach((tweet) => {
      expect(tweet.account.topic).to.equal(topic);
    });
  });
});
