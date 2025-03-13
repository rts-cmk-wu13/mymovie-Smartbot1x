/**
 * 
 * @param {string} key - key to be used in local storage
 * @param {string | number | boolean | object | any [] } value - value to be saved in local storage
 * @returns  {string} - a message that the data was saved with the key
 */
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return "data was saved with key " + key;
}

/**
 *  Read data from Local Storage
 * @param {string} key -  key to be used in local storage
 * @returns {string | number | boolean | object | any[]} - the value saved in local storage
 */
function readFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function deleteFromLocalStorage(key) {
    localStorage.removeItem(key);
    return "The element with key " + key + " was deleted";
}