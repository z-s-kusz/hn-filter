import { Show } from 'solid-js';
import { suggestedPosts } from '../stores/AISuggestedPosts';

export default function Header() {
    return (
        <header>
            <h1>Filtered HN Browser</h1>
            <nav>
                <a href="/">Home</a>
                <a href="/manage-filters">Filters</a>
                <a href="/logs">Logs</a>
                <a href="/about">About</a>
                <Show when={import.meta.env.DEV}>
                    <a href="/llm-test">LLM Test</a>
                </Show>
                <Show when={suggestedPosts().length}>
                    <a href="/posts-for-haters">Hater Posts!?!</a>
                </Show>
            </nav>
        </header>
    );
}
