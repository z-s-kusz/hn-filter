export const getLoggingPreference = () => {
    const logPreference = localStorage.getItem('logs');

    if (logPreference) {
        return logPreference == true;
    }
    return false;
};

export const saveLoggingPreference = (preference) => {
    localStorage.setItem('logs', preference.toString());
};
