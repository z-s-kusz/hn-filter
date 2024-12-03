import { Show } from 'solid-js';
import { suggestedPosts } from '../stores/AISuggestedPosts';
import ExtraLinks from './ExtraLinks';

export default function Header() {
    return (
        <header>
            <h1>Filtered HN Browser</h1>
            <nav>
                <a href="/">Home</a>
                <a href="manage-filters">Manage Filters</a>
                <a href="/about">About</a>
                <Show when={import.meta.env.DEV}>
                    <a href="/llm-test">LLM Test</a>
                </Show>
                <Show when={suggestedPosts().length}>
                    <a href="/posts-for-haters">Hater Posts!?!</a>
                </Show>
                <ExtraLinks />
            </nav>
        </header>
    );
}
