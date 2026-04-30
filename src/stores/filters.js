import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { getSavedFilters, getSavedRegexFilter, saveFilters, saveRegexFilter } from '../services/filters-local-storage';

const [filters, setStoreFilters] = createStore(getSavedFilters());
const [AIRegexFilter, setAIRegexFilter] = createSignal(getSavedRegexFilter('AI-Filter'))
const [filteredItems, setFilteredItems] = createSignal([]);

const setFilters = (filters) => {
    saveFilters(filters);
    setStoreFilters(filters);
};

const toggleAIRegexFilter = () => {
    const nextValue = !AIRegexFilter();
    setAIRegexFilter(nextValue);
    saveRegexFilter('AI-Filter', nextValue);
};

// TODO make this a context/provider so it's more clear that this is used as a global store
export { filters, setFilters, filteredItems, setFilteredItems, AIRegexFilter, toggleAIRegexFilter };
