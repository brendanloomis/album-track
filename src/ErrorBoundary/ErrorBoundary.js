import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
    state = {
        hasError: false
    };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2 className='error-boundary'>An error occurred. Cannot display content.</h2>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;