import ErrorFallback from 'components/ErrorFallback';

const { ErrorBoundary } = require('react-error-boundary');

const ErrorHandler = ({ children }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
);

export default ErrorHandler;
