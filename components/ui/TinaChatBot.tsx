import Script from 'next/script'

const chatBaseBotId = 'mJl22IM4pXzWC60JoM5Fj'

const ChatBaseBot = () => {
    return (
        chatBaseBotId &&
        <Script
            src="https://www.chatbase.co/embed.min.js"
            id={chatBaseBotId}
            defer
            strategy="lazyOnload"
        />
    );
};
export default ChatBaseBot;

    