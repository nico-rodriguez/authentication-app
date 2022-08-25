function errorHandler(err, req, res, next) {
  console.log(err);
  if (err.name === 'IncorrectPasswordError') {
    res.status(400);
    res.json({ error: 'Incorrect password.' });
  } else if (err.name === 'IncorrectUsernameError') {
    res.status(400);
    res.json({ error: 'Incorrect username.' });
  } else if (err.name === 'MissingUsernameError') {
    res.status(400);
    res.json({ error: 'Missing username.' });
  } else if (err.name === 'MissingPasswordError') {
    res.status(400);
    res.json({ error: 'Missing password.' });
  } else if (err.name === 'UserExistsError') {
    res.status(403);
    res.json({ error: 'Username already exists.' });
  } else if (err.name === 'TooManyAttemptsError') {
    res.status(403);
    res.json({ error: 'Too many attempts. Try again later.' });
  } else if (err.name === 'AttemptTooSoonError') {
    res.status(403);
    res.json({ error: 'Too many attempts. Try again later.' });
  } else {
    res.status(500);
    res.json({ error: 'Unknown error.' });
  }
}

module.exports = errorHandler;
