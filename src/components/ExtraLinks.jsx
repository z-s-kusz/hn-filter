import { createSignal, Show } from 'solid-js';
import { Transition } from 'solid-transition-group';

export default function ExtraLinks() {
    const [open, setOpen] = createSignal(false);

    function toggleOpen() {
        setOpen(!open());
    }

    return (
        <>
            <button class="extras-button" type="button" onClick={toggleOpen}>Extras</button>
            <Transition name="drawer">
                <Show when={open()}>
                    <div class="drawer" onClick={toggleOpen}>
                        <h5 class="sub-header">Newsletters</h5>
                        <a href="/frontend-focus">Frontend Focus</a>
                        <a href="/js-weekly">JS Weekly</a>

                        <h5 class="sub-header">Other Links</h5>
                        <a href="/logs">Logs</a>
                        <Show when={import.meta.env.DEV}>
                            <a href="/llm-test">LLM Test</a>
                        </Show>
                    </div>
                </Show>
            </Transition>
        </>
    );
}
