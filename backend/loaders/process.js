process.on('unhandledRejection', (error) => {
  // since we already have fallback handler for unhandled errors (see below),
  // let throw and let him handle that
  console.error('Unhandled Exception');
  throw error;
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception');
  console.error(error);
  process.exit(1);
});
