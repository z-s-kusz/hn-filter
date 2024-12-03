import { For } from 'solid-js';

export default function Story(props) {
    return (
        <div class="story">
            <For each={props.story.links}>
                {(link) => {
                    return <a class="story-link" href={link}>&gt;&gt;&gt; {link}</a>
                }}
            </For>
            <p class="story-body">{props.story.body}</p>
            <p> - {props.story.attribution || 'source not found'}</p>
        </div>
    );
}
