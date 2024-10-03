import React from "react";
import { Error } from "@myCash/common";

interface IErrorBoundaryProps {
  readonly children: React.ReactNode;
}

interface IErrorBoundaryState {
  readonly error: unknown;
  readonly errorInfo: unknown;
}

export class ErrorBoundaryRoute extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  readonly state: IErrorBoundaryState = {
    error: undefined,
    errorInfo: undefined,
  };

  componentDidCatch(error: unknown, errorInfo: unknown) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { errorInfo } = this.state;
    if (errorInfo) {
      return <Error />;
    }
    return this.props.children;
  }
}

// export default ErrorBoundary;
