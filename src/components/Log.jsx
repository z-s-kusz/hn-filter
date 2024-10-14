import { For } from 'solid-js';

export default function Log(props) {
    return (
        <details>
            <summary>{props.log.text}</summary>
            <ol>
                <For each={props.log.analysis}>
                    {(analysis) => {
                        return <li>{analysis}</li>
                    }}
                </For>
            </ol>
        </details>
    );
}
