import { Match, Show, Switch, createSignal } from 'solid-js';
import { TransitionGroup } from 'solid-transition-group';
import { getLogs } from '../services/analysis-results-logs';
import Log from '../components/Log';

export default function Logs() {
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal(false);
    const [logs, setLogs] = createSignal([]);

    const loadLogs = async () => {
        setLoading(true);

        try {
            const response = await getLogs();
            setLogs(response);
            setError('');
        } catch (err) {
            console.error(err);
            setError('Error loading logs, see console for more details');
        } finally {
            setLoading(false)
;        }
    };

    loadLogs();

    return (
        <>
            <h3>Analysis Posts and Results</h3>
            <main>
                <Switch>
                    <Match when={!loading() && !error()}>
                        <Show when={logs().length === 0}>
                            <div>0 logs found.</div>
                        </Show>
                        <TransitionGroup name="slide-fade" appear>
                            <For each={logs()}>
                                {(log) => {
                                    return <Log log={log} />
                                }}
                            </For>
                        </TransitionGroup>
                    </Match>

                    <Match when={loading()}>
                        <span class="main-loading">loading...</span>
                    </Match>

                    <Match when={error()}>
                        <div>{error()}</div>
                    </Match>
                </Switch>
            </main>
        </>
    );
}
