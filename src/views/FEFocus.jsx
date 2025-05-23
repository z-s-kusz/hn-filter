import { createSignal, Match, Switch } from 'solid-js';
import { getFEFocus } from '../services/newsletters';
import Story from '../components/Story';
import ScrollToTop from '../components/ScrollToTop';
import { TransitionGroup } from 'solid-transition-group';

export default function FEFocus() {
    const [stories, setStories] = createSignal([]);
    const [publishedDate, setPublishedDate] = createSignal('');
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal(false);

    async function getStories() {
        setLoading(true);
        try {
            const response = await getFEFocus();
            setStories(response.stories);
            setPublishedDate(response.date);
            setError(false);
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    getStories();

    return (
        <main>
            <Switch>
                <Match when={!loading() && !error()}>
                    <TransitionGroup name="slide-fade" appear>
                        <h5>{publishedDate()}</h5>

                        <For each={stories()}>
                            {(story) => {
                                return <Story story={story} />
                            }}
                        </For>

                        <ScrollToTop />
                    </TransitionGroup>
                </Match>

                <Match when={loading()}>
                    <span class="main-loading">loading...</span>
                </Match>

                <Match when={error()}>
                    <div>
                        Error loading.
                        <button class="reload-btn" type="button" onClick={reload}>Reload</button>
                        or see console for more details.
                    </div>
                </Match>
            </Switch>
        </main>
    );
}
