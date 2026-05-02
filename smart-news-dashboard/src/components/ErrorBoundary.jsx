import { Component } from "react";
import ErrorMessage from "./ErrorMessage.jsx";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
          <ErrorMessage
            message="The dashboard hit an unexpected UI error."
            onRetry={() => window.location.reload()}
          />
        </main>
      );
    }
    return this.props.children;
  }
}
