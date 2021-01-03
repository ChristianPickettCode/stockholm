import React, { useState } from 'react';
import { InputItem, WingBlank, Button, WhiteSpace, Toast, ActivityIndicator } from 'antd-mobile';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { listUserKeys } from '../graphql/queries';
import { createUser, createUserKey } from '../graphql/mutations';
import { Link } from 'react-router-dom';
import jwt from "jsonwebtoken";

const SignIn = () => {
    const [email, setEmail] = useState();
    const [tempPass, setTempPass] = useState();
    const [cognitoUser, setCognitoUser] = useState();
    const [confirmState, setConfirmState] = useState(false);
    const [success, setSuccess] = useState(false);

    const signIn = async () => {
        if (email) {
            await Auth.signIn(email.toLowerCase()).then(res => {
                setCognitoUser(res);
                setConfirmState(true);
                Toast.success("Check your email", 4);
            }).catch(err => {
                console.log(err);
            })
        } else {
            Toast.fail("No email set", 1);
        }
    }

    const answerCustomChallenge = async () => {
        if (tempPass) {
            Toast.loading("Signing in...", 7);
            await Auth.sendCustomChallengeAnswer(cognitoUser, tempPass).then(async (res) => {
                console.log(res);
                await Auth.currentSession().then(async (res) => {
                    setSuccess(true);
                    Toast.success("Successfully signed in...redirecting", 2);
                    const sub = res.getIdToken().payload.sub ;
                    const email = res.getIdToken().payload.email;
                    await API   
                        .graphql(graphqlOperation(listUserKeys, { input: { filter: { userID : { eq : sub } } } } ))
                        .then( async (res) => {
                            if (res.data.listUserKeys.items.length === 0) {
                                await API
                                    .graphql(graphqlOperation(createUserKey, { input : { userID: sub }}))
                                    .then(async (res) => {
                                        console.log(res.data.createUserKey);
                                        const d = jwt.sign({ id: sub, primaryEmail: email, apps: {} }, res.data.createUserKey.id);
                                        await API
                                            .graphql(graphqlOperation(createUser, { input : { data: d } }))
                                            .then(res => {
                                                console.log(res);
                                                window.location = "/";
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                Toast.fail("Error creating user", 3);
                                            })
                                    })
                                    .catch( async(err) => {
                                        console.log(err);
                                        Toast.fail("An error occured signing in.", 3);
                                        await Auth.signOut().then(res => window.location = "/").catch(err => Toast.fail("Issue sigining out"));
                                    })
                            } else {
                                console.log(res.data.listUserKeys.items);
                                window.location = "/";
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })                    
                }).catch(err => {
                    console.log(err);
                    Toast.fail("Incorrect code, try again.", 1);
                })
            }).catch(err => {
                console.log(err)
                Toast.fail("Entered code incorrect 3 times...sign in again", 2);
                window.location = "/signin";
            });
        
        } else {
            Toast.fail("No code set.")
        }

    }
        

    return (
        <div style={{position: 'fixed', height: '100%', width: '100%', top: 0 }}>
            <WingBlank >
                { success ? 
                    <ActivityIndicator />
                : 
                    <>
                        <h1>Atlis</h1>
                        <p>Welcome to atlis. Enter your email to sign in.</p>
                        <WhiteSpace />
                        <InputItem placeholder="enter email..." onChange={e => setEmail(e)}/>
                        { confirmState ? 
                            <> 
                                <WhiteSpace />
                                <p style={{textAlign:"left"}}>Check your email, we sent you a sign in code.</p>
                                <InputItem placeholder="enter sign in code..." onChange={e => setTempPass(e)}/>

                                <WhiteSpace size="xl" />
                                <Button type="primary" onClick={answerCustomChallenge}>Send Code</Button>
                            </>
                        : 
                            <> 
                                <WhiteSpace size="xl" />
                                <Button type="primary" onClick={signIn}>Sign In</Button>
                            </>
                        }

                        <h3>or</h3>
                        <Link to="/" style={{color:"white"}}><Button type="primary">Register</Button></Link>
                    </>
                
                }

                
            </WingBlank>
        </div>
    )
}

export default SignIn
