import { For, Show, createSignal } from 'solid-js';
import { TransitionGroup } from 'solid-transition-group';
import { filters, setFilters } from '../stores/filters';
import LogOptIn from '../components/LogOptIn';

export default function ManageFilters() {
    const [newFilterName, setNewFilterName] = createSignal('');
    const [newFilterType, setNewFilterType] = createSignal('keyword'); // keyword | username | domain
    const [newFilterExpires, setNewFilterExpires] = createSignal(false);

    const addFilter = (event) => {
        event.preventDefault();
        if (!newFilterName()) return;

        let expirationDate = '';
        if (newFilterExpires()) {
            // dates are fun :) ... waiting for temporal
            expirationDate = new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleString();
        }
        const newFilter = {
            id: self.crypto.randomUUID(),
            value: newFilterName(),
            type: newFilterType(),
            expires: expirationDate,
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
                <label for="new-filter">Filter &nbsp;
                <input name="new-filter" autoComplete='off'
                    placeholder="add new filter"
                    value={newFilterName()} onInput={(e) => setNewFilterName(e.target.value)}
                />
                </label>
                <div class="hint">* usernames and domains are case sensitive, keywords are not</div>

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

                <label for="expires">Auto Delete 7 Days From Now &nbsp;
                    <input name="expires" type="checkbox"
                        onInput={() => setNewFilterExpires((prev) => !prev)}
                        checked={newFilterExpires()}
                    />
                </label>

                <button type="submit">Submit</button>
            </form>
            <hr />

            <h3>Filters:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Value</th>
                        <th>Type</th>
                        <th>Expires</th>
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
                                    <td>{filter.expires || 'n/a'}</td>
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

            <hr />

            <LogOptIn />
        </TransitionGroup>
    );
};
