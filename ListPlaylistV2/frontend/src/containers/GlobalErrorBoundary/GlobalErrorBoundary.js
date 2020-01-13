import React from 'react';
import "./GlobalErrorBoundary.css";

class GlobalErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
        // log here
    }

    render() {
        if (!this.state.hasError) {
            return (
                <div className="error-text-div">
                    <h1 className="error-text">Something went wrong :(</h1>
                </div>
            );
        }
        return this.props.children;
    }
}

export default GlobalErrorBoundary;
