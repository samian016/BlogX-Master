import { Button, Container, FormLabel, Input, TextField } from '@mui/material';
import './SignIn.css'
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const location = useLocation();
    
    const url = location.state?.from || '/';
    return (
        <div>
            <Container className='fullWidth' style={{ marginTop: '5%', marginBottom: '5%', border: '5px solid #40bf46', borderRadius: 10 }} >
                <div>
                    <h1 style={{ textAlign: 'left', color: '#40bf46', marginBottom: 0 }}> Sign In</h1>
                    <form style={{ textAlign: 'left' }} autoComplete="off"> <br />
                        <TextField style={{ width: '100%', marginTop: 10, marginBottom: 10 }} id='name1' required type='email' label="Email Address" /> <br />
                        <TextField style={{ width: '100%', marginTop: 10 }} id='pass2' required type='password' label="Password" /> <br />
                        <Link style={{ textDecoration: 'none', color: '#40bf46' }} to='/signup'>not registered ?</Link> <br />
                        <Button id='signIn' style={{ marginTop: 10, marginBottom: 10, border: '2px solid #fbc02d', color: 'white', background: '#fbc02d', borderRadius: 10 }} type='submit'> Sign In </Button>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default SignIn;