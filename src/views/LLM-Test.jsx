import { For, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import Message from '../components/Message';
import { getSentimentAnalysis } from '../services/sentiment-analysis';
import { logAnalysisResults } from '../services/analysis-results-logs';

export default function LLMTest() {
    const [text, setText] = createSignal('');
    const [subject, setSubject] = createSignal('');
    const [logId, setLogId] = createSignal('');
    const [logAnalysis, setLogAnalysis] = createSignal('negative');
    const [messages, setMessages] = createStore([]);

    const onSubmit = (event) => {
        event.preventDefault();

        const newMessage = {
            id: self.crypto.randomUUID(),
            subject: subject(),
            text: text(),
            response: 'loading...',
        };
        setMessages([...messages, newMessage]);
        setText('');
        setSubject('');
        getResponse(newMessage);
    };

    const testLogging = async (event) => {
        event.preventDefault();

        try {
            const data = {
                id: 'test_' + logId(),
                subject: 'oranges',
                text: 'oranges are bad',
                analysis: logAnalysis(),
            };
            await logAnalysisResults(data);
        } catch(error) {
            console.error(error);
        }
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
            <form onSubmit={testLogging}>
                <h2>Logging Test</h2>
                <input type="text" placeholder="postId (will be prepended with 'test_'"
                    value={logId()} onInput={(e) => setLogId(e.target.value)} />
                <select value={logAnalysis()} onChange={(e) => setLogAnalysis(e.target.value)}>
                    <option>neutral</option>
                    <option>positive</option>
                    <option>negative</option>
                </select>
                <button type="submit">Submit</button>
            </form>

            <form onSubmit={onSubmit}>
                <h2>LLM Test</h2>
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
