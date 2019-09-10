import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import randomImage from './subcomponent/randomImages';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://switchbak.herokuapp.com/">
                Switchbak &nbsp;
            {new Date().getFullYear()}
            </Link>
        </Typography >
    );
}

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundImage: `url(${randomImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            margin: '0 auto'
        },
    },
    container: {
        fontFamily: 'Amatic SC, cursive',
        margin: '5% auto 0 auto !important',
        width: '100%',
        fontSize: '2em',
        overflowX: 'wrap',
        maxWidth: '1299px',
    },
    paper: {
        marginTop: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
    formErrorMessage: {
        display: 'block',
        color: 'red',
        fontWeight: 'bold',
        fontSize: '32px',
        textAlign: 'center'
    },
    formNonErrorMessage: {
        display: 'none'
    },
    signupContainer: {
        padding: '1vh !important',
        position: 'relative !important',
        margin: '0 auto !important',
        top: '10vh',
        backgroundColor: 'rgba(220,220,220,.9)',
        borderRadius: '15px',
        boxShadow: '0px 1px 1px rgba(20, 100, 30, 0.8)',
        border: '1px solid grey'
    },
}));


export default function Signup(props) {
    const classes = useStyles();
    
    const [firstName, updateFirstName] = useState('');
    const [lastName, updateLastName] = useState('');
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');
    const [repassword, updateRepassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [validSubmission, setValidSubmission] = useState(true);
    const [missingCreds, setMissingCreds] = useState(false);
    const [loginError, updateLoginError] = useState({
        emailFormat: false,
        passwordMatch: false,
        missingFirstName: false,
        missingLastName: false,
        missingEmail: false,
        missingPassword: false,

    });

    const handleInputChange = event => {
        const { name, value } = event.target;
        setErrorMessage('');
        document.getElementById('error-message').innerText = "";
        switch (name) {
            case 'firstname': 
            updateLoginError({
                ...loginError,
                missingFirstName: false,
            })
            updateFirstName(value);
            // setValidSubmission(true);
            break;
            case 'lastname': 
            updateLoginError({
                ...loginError,
                missingLastName: false
            })
            updateLastName(value);
            // setValidSubmission(true);
            break;
            case 'email': 
            updateLoginError({
                ...loginError,
                missingEmail: false,
                emailFormat: false
            })
            updateEmail(value);
            // setValidSubmission(true);
            break;
            case 'password': 
            updateLoginError({
                ...loginError,
                missingPassword: false,
                passwordMatch: false
            })
            updatePassword(value);
            // setValidSubmission(true);
            break;
            case 'repassword': 
            updateLoginError({
                ...loginError,
                passwordMatch: false
            })
            updateRepassword(value);
            // setValidSubmission(true);
            default: return;
        }
      };
    const isMissingCreds = (user) => {
        // console.log(missingCreds);
        let missingCred = false;
        let errors = {}
        for (let key in user) {
            // console.log(user[key]);
            // console.log(key)
            // console.log(typeof key)
            if (!user[key].length){
                // console.log('zero length, setting missing creds to true')
                // setMissingCreds(true);
                missingCred = true;
                switch(key) {
                    case 'email':
                        // console.log('email missing');
                        errors.missingEmail = true
                        setValidSubmission(false);
                        break;
                    case 'firstName':
                            // console.log('fn missing');
                        errors.missingFirstName = true;
                        setValidSubmission(false);
                        break;
                    case 'lastName':
                            // console.log('ln missing');
                        errors.missingLastName = true;
                        setValidSubmission(false);
                        break;
                    case 'password':
                        // console.log('pw missing');
                        errors.missingPassword = true;
                        setValidSubmission(false);
                        break;
                    default:
                        break;
                }
                // console.log(errors);
                updateLoginError({
                    ...loginError,
                    ...errors
                })
            } else {
                setValidSubmission(true);
            }
        }
        // console.log(missingCred)
        if (missingCred) {
            setErrorMessage("You are missing required fields")
        }
        return missingCred;
    }
    const passwordsMatch = (p1, p2) => {
        if (p1 !== p2) {
            updateLoginError({
                ...loginError,
                passwordMatch: true
            });
            setErrorMessage("Passwords do not match");
            setValidSubmission(false);
            return false;
        } else {
            return true;
        }
        
    }
    const isEmailFormat = (email) => {
        const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (emailValid) {
            // console.log(emailValid);
            return true;
        } else {
            updateLoginError({
                ...loginError,
                emailFormat: true
            })
            setErrorMessage('Incorrectly formatted email')
            // setEmailFormat(false);
            setValidSubmission(false);
            return false;
        }
    }


    const handleFormSubmit = event => {
        event.preventDefault();
        //// console.log(event);
        const user = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            password: password.trim()
        }
        // console.log(user);
        if (isMissingCreds(user)){
            return;
        };
        if (!isEmailFormat(user.email)) {
            return
        }
        if (!passwordsMatch(user.password, repassword)){
            return;
        }
        // // console.log("let 'em through, boys");
        // return

        Axios.post("/auth/users/signup", user)
        .then(function(res){
            //// console.log(res.data.errors);
            if (res.data.errors) {
                let errorText;
                // console.log(res.data.errors);
                // for (let key in res.data.errors){
                //     //// console.log(typeof key)
                //     switch (key) {
                //         case 'firstName':
                //             // //// console.log('first name required')
                //             errorText = "You are missing required fields"
                //             updateLoginError({
                //                 ...loginError,
                //                 missingCred: true
                //             });
                //             break;
                //         case 'lastName':
                //             // //// console.log('last name required')
                //             errorText = "You are missing required fields"
                //             break;
                //         case 'email':
                //             // //// console.log('email required')
                //             errorText = "You are missing required fields"
                //             break;
                //         case 'password':
                //             // //// console.log('password required')
                //             errorText = "You are missing required fields"
                //             break;
                //         default:
                //             errorText = "An unknown error occurred. Please refresh the page and try again."
                //             break;
                //     }
                // }
            } else {
                window.location = '/login';
            }
        }).catch(function(err){
            // console.log(err);
        })
    }

    return (
        <Grid container direction="row" justify="center" alignItems="center" spacing={5} className={classes.container}>
        <Container component="main" maxWidth="xs" className={classes.signupContainer}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create New Account
        </Typography>
                <form onSubmit={handleFormSubmit} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstname"
                        label="First Name"
                        name="firstname"
                        autoComplete="firstname"
                        onChange={handleInputChange}
                        error={loginError.missingFirstName}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lastname"
                        label="Last Name"
                        name="lastname"
                        autoComplete="lastname"
                        onChange={handleInputChange}
                        error={loginError.missingLastName}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleInputChange}
                        error={loginError.emailFormat || loginError.missingEmail}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleInputChange}
                        error={loginError.missingPassword || loginError.passwordMatch}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="repassword"
                        label="Re-Enter Password"
                        type="password"
                        id="repassword"
                        autoComplete="current-password"
                        onChange={handleInputChange}
                        error={loginError.missingPassword || loginError.passwordMatch}
                    />
                    <div id="error-message" 
                        className={
                            !validSubmission ? 
                            classes.formErrorMessage :
                            classes.formNonErrorMessage
                        }>
                        {errorMessage}
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create Account
                    </Button>
                    <Grid container align='right'>
                        <Grid item xs>
                            <Link href="/login" variant="body2">
                                {"Back to login page"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={2}>
                <Copyright />
            </Box>
        </Container>
        </Grid>
    );
}