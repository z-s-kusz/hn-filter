import { createSignal } from 'solid-js';
import { getFEFocus } from '../services/newsletters';

export default function FEFocus() {
    const [stories, setStories] = createSignal([]);
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal('');

    async function getStories() {
        const storiesResponse = await getFEFocus();
        // setStories(storiesResponse);
    }

    getStories();

    return (
        <main>
            <h1>FEFocus Newsletter</h1>
        </main>
    );
}
