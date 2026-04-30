const getSavedFilters = () => {
    const localFilters = localStorage.getItem('filters');

    if (localFilters) {
        const filters = JSON.parse(localFilters);
        const unexpiredFilters = handleExpiredFilters(filters);
        return unexpiredFilters;
    }
    return [];
};

const saveFilters = (filters) => {
    const filtersJSON = JSON.stringify(filters);

    localStorage.setItem('filters', filtersJSON);
};

const handleExpiredFilters = (filters) => {
    const unexpiredFilters = filters.filter(filter => {
        if (!filter.expires) return true;
        return new Date(filter.expires) > new Date();
    });

    saveFilters(unexpiredFilters);
    return unexpiredFilters;
}

const getSavedRegexFilter = (filterName) => {
    if (!filterName) {
        console.error('No name provided to getSavedRegexFilter');
        return false;
    }

    const regexFilter = localStorage.getItem(filterName);
    if (regexFilter) {
        return regexFilter === 'true';
    }
    return false;
}

const saveRegexFilter = (name, value) => {
    const filterJSON = JSON.stringify(value);

    localStorage.setItem(name, filterJSON);
};

export { getSavedFilters, saveFilters, getSavedRegexFilter, saveRegexFilter };
