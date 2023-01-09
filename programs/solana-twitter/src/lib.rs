use anchor_lang::prelude::*;

declare_id!("C31hQ3iWGT8btkTFSwKCSnjSqwzz9GStV3YEGq9fQQ4T");

#[program]
pub mod solana_twitter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[account]
pub struct Tweet {
    pub author: Pubkey,
    pub timestamp: i64,
    pub topic: Option<String>,
    pub content: String
}

const DISCRIMINATOR_LENGTH: usize = 8;
const TIMESTAMP_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_TOPIC_LENGTH: usize = 1 + 50 * 4; // 50 chars max, + 1 because of option
const MAX_CONTENT_LENGTH: usize = 280 * 4; // 280 chars max.

impl Tweet {
    const LEN: usize = DISCRIMINATOR_LENGTH
    + TIMESTAMP_LENGTH
    + PUBLIC_KEY_LENGTH // Author
    + STRING_LENGTH_PREFIX + MAX_TOPIC_LENGTH // Topic
    + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH; // Content
}