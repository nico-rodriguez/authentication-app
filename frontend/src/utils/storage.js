const storage = {
  getToken(key) {
    return JSON.parse(window.sessionStorage.getItem(key));
  },
  setToken(key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  },
  removeToken(key) {
    window.sessionStorage.removeItem(key);
  },
  clear() {
    window.sessionStorage.clear();
  },
};

export default storage;
