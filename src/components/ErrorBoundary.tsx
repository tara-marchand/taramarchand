import * as React from 'react';

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren<unknown>,
  State
> {
  constructor(props: Record<string, never>) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
