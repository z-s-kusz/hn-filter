import { createSignal, Match, Switch } from 'solid-js';
import { getJSWeekly } from '../services/newsletters';
import Story from '../components/Story';
import ScrollToTop from '../components/ScrollToTop';
import { TransitionGroup } from 'solid-transition-group';

export default function JSWeekly() {
    const [stories, setStories] = createSignal([]);
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal(false);

    async function getStories() {
        setLoading(true);
        try {
            const storiesResponse = await getJSWeekly();
            setStories(storiesResponse);
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
