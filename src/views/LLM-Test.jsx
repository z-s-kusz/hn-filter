import { For, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import Message from '../components/Message';
import { getSentimentAnalysis } from '../services/sentiment-analysis';

export default function LLMTest() {
    const [text, setText] = createSignal('');
    const [subject, setSubject] = createSignal('');
    const [messages, setMessages] = createStore([]);

    const onSubmit = (event) => {
        event.preventDefault();

        const newMessage = {
            id: self.crypto.randomUUID(),
            subject: subject(),
            text: text(),
            response: '',
        };
        setMessages([...messages, newMessage]);
        setText('');
        setSubject('');
        getResponse(newMessage);
    };

    const getResponse = async (message) => {
        let sentiment = '';
        try {
            const responseMessage = await getSentimentAnalysis(message);
            sentiment = responseMessage.response;
        } catch (error) {
            console.error(error);
        }

        setMessages(
            (item) => item.id === message.id, 
            'response',
            sentiment,
        );
    };

    return (
        <main>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Article title, sentance or message"
                    value={text()} onInput={(e) => setText(e.target.value)} />
                <input type="text" placeholder="Subject of sentiment analysis"
                    value={subject()} onInput={(e) => setSubject(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
            <For each={messages}>{(message) => <Message message={message} />}</For>
        </main>
    );
}
