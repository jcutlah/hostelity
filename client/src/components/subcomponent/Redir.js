import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
