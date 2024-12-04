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
                        <p class="sub-header">Newsletters</p>
                        <a href="/frontend-focus">FE Focus</a>
                        <a href="/js-weekly">JS Weekly</a>

                        <p class="sub-header">Other Links</p>
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
