'use client';
import Script from 'next/script';

const chatBaseBotId = process.env.NEXT_PUBLIC_CHATBASE_BOT_ID;

export default function TinaChatBot() {
  return chatBaseBotId ? (
    <Script
      src="https://www.chatbase.co/embed.min.js"
      id={chatBaseBotId}
      defer
      strategy="lazyOnload"
    />
  ) : null;
}
