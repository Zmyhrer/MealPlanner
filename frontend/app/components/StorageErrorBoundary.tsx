"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class StorageErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Only catch storage-related errors
    if (
      error.message.includes("localStorage") ||
      error.message.includes("Storage") ||
      error.name === "StorageError"
    ) {
      return { hasError: true, error };
    }
    // Re-throw non-storage errors
    throw error;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("Storage limitation detected:", error.message);
    // Don't log to error tracking services for storage issues
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-8 text-center bg-yellow-50 border border-yellow-100 rounded-lg m-4">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">
              Limited Storage Mode
            </h2>
            <p className="text-yellow-700 mb-3">
              Your data will be saved in this browser session only.
            </p>
            <p className="text-sm text-yellow-600 mb-4">
              To enable permanent storage, allow cookies/localStorage or exit
              private browsing.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Continue Anyway
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
