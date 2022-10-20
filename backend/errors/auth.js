class CookieError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CookieError';
  }
}

module.exports = CookieError;
