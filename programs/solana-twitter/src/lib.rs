use anchor_lang::prelude::*;

declare_id!("C31hQ3iWGT8btkTFSwKCSnjSqwzz9GStV3YEGq9fQQ4T");

#[program]
pub mod solana_twitter {
    use super::*;

    pub fn send_tweet(
        ctx: Context<SendTweet>,
        topic: Option<String>,
        content: String,
    ) -> Result<()> {
        if let Some(topic) = &topic{
            if topic.chars().count() > MAX_TOPIC_LENGTH {
                return err!(ErrorCode::TopicTooLong);
            }
        }
        if content.chars().count() > MAX_CONTENT_LENGTH {
            return err!(ErrorCode::ContentTooLong);
        }
        let tweet = &mut ctx.accounts.tweet;
        let author = &mut ctx.accounts.author;
        let clock = Clock::get()?;
        tweet.author = *author.key;
        tweet.content = content;
        tweet.topic = topic;
        tweet.timestamp = clock.unix_timestamp;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct SendTweet<'info> {
    #[account(init, payer = author, space = Tweet::LEN)]
    pub tweet: Account<'info, Tweet>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Tweet {
    pub author: Pubkey,
    pub timestamp: i64,
    pub topic: Option<String>,
    pub content: String,
}

const MAX_TOPIC_LENGTH: usize = 50;
const MAX_CONTENT_LENGTH: usize = 280;
const DISCRIMINATOR_LENGTH: usize = 8;
const TIMESTAMP_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_TOPIC_LENGTH_BYTES: usize = 1 + MAX_TOPIC_LENGTH * 4; // + 1 because of option, using 4 byte chars
const MAX_CONTENT_LENGTH_BYTES: usize = MAX_CONTENT_LENGTH * 4; // 4 byte chars

impl Tweet {
    const LEN: usize = DISCRIMINATOR_LENGTH
    + TIMESTAMP_LENGTH
    + PUBLIC_KEY_LENGTH // Author
    + STRING_LENGTH_PREFIX + MAX_TOPIC_LENGTH_BYTES // Topic
    + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH_BYTES; // Content
}

#[error_code]
pub enum ErrorCode {
    #[msg(format!("The provided topic should be {MAX_TOPIC_LENGTH} characters long maximum."))]
    TopicTooLong,
    #[msg(format!("The provided content should be {MAX_CONTENT_LENGTH} characters long maximum."))]
    ContentTooLong,
}
