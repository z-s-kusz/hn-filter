import { For, Show, createSignal } from 'solid-js';
import { TransitionGroup } from 'solid-transition-group';
import { filters, setFilters } from '../stores/filters';

export default function ManageFilters() {
    const [newFilterName, setNewFilterName] = createSignal('');
    const [newFilterType, setNewFilterType] = createSignal('keyword'); // keyword | username | domain

    const addFilter = (event) => {
        event.preventDefault();
        if (!newFilterName()) return;

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
        <TransitionGroup name="slide-fade" appear>
            <h2>Manage Filters</h2>

            <form onSubmit={addFilter}>
                <label for="new-filter">Filter</label>
                <input name="new-filter" autoComplete='off'
                    placeholder="add new filter"
                    value={newFilterName()} onInput={(e) => setNewFilterName(e.target.value)} />
                <span class="hint">* usernames and domains are case sensitive, keywords are not</span>

                <fieldset>
                    <legend>Filter Type</legend>
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

                    <label for="domain">
                        Domain
                        <input type="radio" name="domain" value="domain" id="domain"
                            onInput={(e) => setNewFilterType(e.target.value)}
                            checked={newFilterType() === 'domain'}
                        />
                    </label>
                </fieldset>

                <button type="submit">Submit</button>
            </form>
            <hr />

            <h3>Filters:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Value</th>
                        <th>Type</th>
                        <th>Controls</th>
                    </tr>
                </thead>
                <tbody>
                    <For each={filters}>
                        {(filter) => {
                            return (
                                <tr>
                                    <td>{filter.value}</td>
                                    <td>{filter.type}</td>
                                    <td>
                                        <button type="button"
                                            onClick={[deleteFilter, filter.id]} class="filter-delete">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        }}
                    </For>
                </tbody>
            </table>
            <Show when={filters.length < 1}>
                <p>No active filters</p>
            </Show>
        </TransitionGroup>
    );
};
