import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { getSavedFilters, saveFilters } from '../services/filters-local-storage';

const [filters, setStoreFilters] = createStore(getSavedFilters());
const [filteredItems, setFilteredItems] = createSignal([]);

const setFilters = (filters) => {
    saveFilters(filters);
    setStoreFilters(filters);
};
// TODO make this a context/provider so it's more clear that this is used as a global store
export { filters, setFilters, filteredItems, setFilteredItems };
