import { Show } from 'solid-js';

export default function Story(props) {
    return (
        <div class="story">
            <div innerHTML={props.story.body}></div>
            <Show when={props.story.attribution}>
                <p> - {props.story.attribution}</p>
            </Show>
        </div>
    );
}
