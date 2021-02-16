import React from 'react';
import PropTypes from 'prop-types';

class ValidationError extends React.Component {
    render() {
        if (this.props.message) {
            return (
                <div className='error'>{this.props.message}</div>
            );
        }
        return <></>;
    }
}

ValidationError.propTypes = {
    message: PropTypes.string
};

export default ValidationError;