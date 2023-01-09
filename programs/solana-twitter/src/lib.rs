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
