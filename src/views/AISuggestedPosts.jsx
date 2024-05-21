import { For } from 'solid-js';
import { suggestedPosts } from '../stores/AISuggestedPosts';
import { TransitionGroup } from 'solid-transition-group';
import Post from '../components/Post';

export default function AISuggestedPosts() {
    return (
        <main>
            <TransitionGroup name="slide-fade" appear>
                <For each={suggestedPosts()}>
                    {(item) => {
                        return <Post post={item.post} />
                    }}
                </For>
            </TransitionGroup>
        </main>
    );
}
