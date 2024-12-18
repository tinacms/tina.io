import Script from 'next/script';

const chatBaseBotId = process.env.NEXT_PUBLIC_CHATBASE_BOT_ID;

const ChatBaseBot = () => {
    if (!chatBaseBotId) return null;

    return (
        <Script
            src="https://www.chatbase.co/embed.min.js"
            id={chatBaseBotId}
            defer
            async
            strategy="lazyOnload"
        />
    );
};

export default ChatBaseBot;
