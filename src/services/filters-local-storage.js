const getSavedFilters = () => {
    const localFilters = localStorage.getItem('filters');

    if (localFilters) {
        return JSON.parse(localFilters);
    }
    return [];
};

const saveFilters = (filters) => {
    const filtersJSON = JSON.stringify(filters);

    localStorage.setItem('filters', filtersJSON);
};

export { getSavedFilters, saveFilters };
