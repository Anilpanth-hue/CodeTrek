import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-4">
          <h2 className="text-xl text-red-500">
            Something went wrong with 3D rendering
          </h2>
          <p className="text-gray-400">Fallback 2D content is displayed</p>
        </div>
      );
    }

    return this.props.children;
  }
}
