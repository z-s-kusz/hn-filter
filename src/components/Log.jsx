export default function Log(props) {
    let positiveCount = () => getCountSummary(props.log, 'positive');
    let negativeCount = () => getCountSummary(props.log, 'negative');
    let neutralCount  = () => getCountSummary(props.log, 'neutral');

    const getCountSummary = (logObject, category) => {
        let count = 0;
        logObject.analysis.forEach((analysis) => {
            if (analysis === category) count++;
        });
        return count;
    };

    return (
        <details class="log-details">
            <summary>{props.log.text} ({props.log.postId})</summary>
            <p>Positive: {positiveCount()}</p>
            <p>Negative: {negativeCount()}</p>
            <p>Neutral: {neutralCount()}</p>
        </details>
    );
}
