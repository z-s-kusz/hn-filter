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
        if (filter.expires === '') return true;
        return new Date(filter.expires) > new Date();
    });

    saveFilters(unexpiredFilters);
    return unexpiredFilters;
}

export { getSavedFilters, saveFilters };
