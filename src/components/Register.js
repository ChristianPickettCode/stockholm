import React, { useState } from 'react';
import { InputItem, WingBlank, Button, WhiteSpace, Toast } from 'antd-mobile';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState();
    // const [fullName, setFullName] = useState();

    const signUp = async () => {
        if (email) {
            const params = {
                username: email.toLowerCase(),
                password: getRandomString(30),
                // attributes: {
                //     name: fullName
                // }
            };
            await Auth.signUp(params).then(res => {
                console.log(res);
                Toast.success("Successfully signed up...redirect to sign in");
                window.location = "/signin";
            }).catch(err => {
                Toast.success(err.message, 2);
                console.log(err);
            })

        } else {
            Toast.fail("No email set", 1);
        }
        
    }

    const getRandomString = (bytes) => {
        const randomValues = new Uint8Array(bytes);
        window.crypto.getRandomValues(randomValues);
        return Array.from(randomValues).map(intToHex).join('');
    }
    
    const intToHex = (nr) => {
        return nr.toString(16).padStart(2, '0');
    }

    return (
        <div style={{position: 'fixed', height: '100%', width: '100%', top: 0 }}>
            <WingBlank >
                <h1>Atlis</h1>
                <p>Welcome to atlis. Enter your email to create an account.</p>
                {/* <WhiteSpace />
                <InputItem placeholder="enter full name..." onChange={e => setFullName(e)}/> */}

                <WhiteSpace />
                <InputItem placeholder="enter email..." onChange={e => setEmail(e)}/>

                <WhiteSpace size="xl" />
                <Button type="primary" onClick={signUp}>Sign Up</Button>
                <h3>or</h3>
                <Link to="/signin" style={{color:"white"}}><Button type="primary">Sign In</Button></Link>
            </WingBlank>
        </div>
    )
}

export default Register
