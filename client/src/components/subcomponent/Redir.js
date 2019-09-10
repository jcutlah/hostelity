import React from 'react';

class Redir extends React.Component {
    
    componentDidMount() {
        window.location = '/map'
    }
    render () {
        return (
        <div>
            Redirecting you meow
        </div>
        )
    }
}

export default Redir;
