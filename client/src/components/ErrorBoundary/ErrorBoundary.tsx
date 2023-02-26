import React, { ErrorInfo } from 'react';

export interface IErrorBoundaryProps {
  children?: any;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn({ error, info });
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <h3>Something went wrong</h3>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
