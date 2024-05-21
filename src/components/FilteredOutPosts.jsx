import { For, Show, createSignal } from 'solid-js';
import { filteredItems } from '../stores/filters';
import Post from './Post';

export default function FilteredOutPosts() {
    const [hidePosts, setHidePosts] = createSignal(true);

    return (
        <>
            {hidePosts() ? (
                <>
                    <Show when={filteredItems().length}>
                        <p>{filteredItems().length} filtered post(s)</p>
                        <button type="button" onClick={[setHidePosts, false]}>
                            Become Sad/Mad and Look at Hidden Posts
                        </button>
                    </Show>
                </>
            ) : (
                <section class="sad-mad">
                    <hr />
                    <div class="sad-mad-content">
                        <h2>Filtered Posts</h2>
                        <button type="button" onClick={[setHidePosts, true]}>
                            Step Back Towards Sanity and Hide These Posts Again
                        </button>
                        <For each={filteredItems()}>
                            {(post) => {
                                return <Post post={post} />;
                            }}
                        </For>
                    </div>
                    <hr />
                </section>
            )}
        </>
    );
};
