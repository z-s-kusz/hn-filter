import { Show } from 'solid-js';
import { suggestedPosts } from '../stores/AISuggestedPosts';
import ExtraLinks from './ExtraLinks';

export default function Header() {
    return (
        <header>
            <h1>Dev News + Filters</h1>
            <nav>
                <a href="/">Hacker News</a>
                <a href="/manage-filters">Filters</a>
                <a href="/about">About</a>

                <Show when={suggestedPosts().length}>
                    <a href="/posts-for-haters">Hater Posts</a>
                </Show>

                <ExtraLinks />
            </nav>
        </header>
    );
}
