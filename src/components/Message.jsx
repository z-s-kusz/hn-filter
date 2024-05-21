export default function Message(props) {
    return (
        <div>
            <h6>{props.message.text} - {props.message.subject}</h6>
            <p>Sentiment Analysis Result: {props.message.response}</p>
        </div>
    );
}
