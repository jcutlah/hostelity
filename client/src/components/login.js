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
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
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
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();

    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');
    const [loginError, updateLoginError] = useState({
        username: false,
        password: false
    });

    const handleInputChange = event => {
        const { name, value } = event.target;
        console.log(name, value);
        switch (name) {
            case 'email': 
                updateEmail(value);
                updateLoginError({
                    ...loginError,
                    username: false
                })
                break;
            case 'password': 
                updatePassword(value);
                updateLoginError({
                    ...loginError,
                    password: false
                })
                break;
            default: return;
        }
      };

    const handleFormSubmit = event => {
        event.preventDefault();
        // console.log(event);
        const user = {
            email,
            password
        }
        Axios.post("/api/users/login", user)
        .then(function(res){
            // console.log('Not an error!!!!!')
            // console.log(res.data);
            if (res.data.passport.user){
                window.location = '/home';
            }
            if (res.data.flash){
                // console.log(res.data.flash);
                // console.log(typeof res.data.flash.error);
                const flash = [];
                for (let i of res.data.flash.error){
                    flash.push(i);
                }
                // console.log(res.data.flash.error);
                switch (flash[flash.length-1]){
                    case "Missing credentials":
                        updateLoginError({
                            username: true,
                            password: true
                        });
                        break;
                    case "Not a user":
                        updateLoginError({
                            username: true,
                            password: false
                        });
                        break;
                    case "Incorrect password":
                        updateLoginError({
                            username: false,
                            password: true
                        });
                        break;
                    default:
                        return false;
                }
            } else {
                window.location = '/home';
            }
        }).catch(function(err){
            console.log(err);
            updateLoginError({
                username: false,
                password: false
            });
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form onSubmit={handleFormSubmit} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleInputChange}
                        className={"browser-default"}
                        error={loginError.username}
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
                        error={loginError.password}
                        onChange={handleInputChange}
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/* <Link href="#" variant="body2">
                                Forgot password?
                            </Link> */}
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <div>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}