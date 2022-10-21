class UserDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserDataError';
  }
}

module.exports = UserDataError;
