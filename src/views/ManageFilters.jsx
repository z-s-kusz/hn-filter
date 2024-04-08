import { For, Show, createSignal } from 'solid-js';
import { filters, setFilters } from '../stores/filters';

export default function ManageFilters() {
    const [newFilterName, setNewFilterName] = createSignal('');
    const [newFilterType, setNewFilterType] = createSignal('keyword'); // keyword | username

    // TODO handle empty name
    const addFilter = (event) => {
        event.preventDefault();

        const newFilter = {
            id: self.crypto.randomUUID(),
            value: newFilterName(),
            type: newFilterType(),
        };
        setFilters([...filters, newFilter]);
        setNewFilterName('');
    };

    const deleteFilter = (id) => {
        const nextFilters = filters.filter((filter) => {
            return filter.id !== id;
        });
        setFilters(nextFilters);
    };

    return (
        <>
            <h2>Manage Filters</h2>

            <form onSubmit={addFilter}>
                <label for="new-filter">Filter</label>
                <input name="new-filter" autoComplete='off'
                    value={newFilterName()} onInput={(e) => setNewFilterName(e.target.value)} />
                <span>* usernames are case sensitive, keywords are not</span>

                <fieldset>
                    <legend>Type</legend>
                    <label for="keyword">
                        Keyword
                        <input type="radio" name="keyword" value="keyword" id="keyword"
                            onInput={(e) => setNewFilterType(e.target.value)}
                            checked={newFilterType() === 'keyword'}
                        />
                    </label>

                    <label for="username">
                        Username
                        <input type="radio" name="username" value="username" id="username"
                            onInput={(e) => setNewFilterType(e.target.value)}
                            checked={newFilterType() === 'username'}
                        />
                    </label>
                </fieldset>

                <button type="submit">Submit</button>
            </form>
            <hr />

            <h3>Filters:</h3>
            <ul>
                <For each={filters}>
                    {(filter) => {
                        return (
                            <li>
                                {filter.value} | {filter.type}
                                <button type="button" onClick={[deleteFilter, filter.id]} class="filter-delete">Delete</button>
                            </li>
                        );
                    }}
                </For>
            </ul>
            <Show when={filters.length < 1}>
                <p>No active filters</p>
            </Show>
        </>
    );
};
