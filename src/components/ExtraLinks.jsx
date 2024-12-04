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
                    <div class="drawer">
                        <p class="sub-header">Newsletters</p>
                        <a href="/frontend-focus" onClick={toggleOpen}>Frontend Focus</a>
                        <a href="/js-weekly" onClick={toggleOpen}>JS Weekly</a>
                    </div>
                </Show>
            </Transition>
        </>
    );
}
