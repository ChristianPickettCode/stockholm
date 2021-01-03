import React, { useContext, useState } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { Button, Flex, InputItem, Toast, WhiteSpace, WingBlank } from 'antd-mobile';
import { UserContext } from '../context/UserContext';
import { KContext } from '../context/KContext';
import { createUserKey, createUser, deleteUser, deleteUserKey } from '../graphql/mutations';
import jwt from "jsonwebtoken";

const AccountTab = () => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    const user = useContext(UserContext);
    const k = useContext(KContext);

    const edit = async () => {
        if (user) {
            Toast.loading("Saving.....", 2);
            await API
                .graphql(graphqlOperation(createUserKey, { input : { userID: user.id }}))
                .then(async (res) => {
                    const d = jwt.sign({ ...user, firstName, lastName }, res.data.createUserKey.id);
                    await API
                        .graphql(graphqlOperation(createUser, { input : { data: d } }))
                        .then( async(res) => {
                            await API
                                .graphql(graphqlOperation(deleteUser, {input : { id : k.uID} }))
                                .then(async(res) => {
                                    await API
                                        .graphql(graphqlOperation(deleteUserKey, {input: {id: k.ukID}} ))
                                        .then(res => {
                                            Toast.success("Saved.")
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        })
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        })
                        .catch(err => {
                            console.log(err);
                            Toast.fail("Error editing user account", 3);
                        })
                })
                .catch((err) => {
                    console.log(err);
                })

        }
        
    }

    const signOut = async() => {
        await Auth.signOut().then(res => window.location = "/" ).catch(err => console.log(err));
    }

    return (
        <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
            <WingBlank>
                <div style={{ paddingTop: 60 }}>
                    <h3>Account</h3>
                    <WhiteSpace size="xl" />
                    <Flex>
                        <Flex.Item>
                            { user && user.firstName ? 
                            <InputItem value={user.firstName} disabled />
                            : 
                            <InputItem placeholder="enter first name..." onChange={setFirstName}/>
                            }
                        </Flex.Item>
                        <Flex.Item>
                            { user && user.lastName ? 
                            <InputItem value={user.lastName} disabled/>
                            : 
                            <InputItem placeholder="enter first name..." onChange={setLastName} />
                            }
                        </Flex.Item>
                    </Flex>
                    
                    <InputItem value={user.primaryEmail} disabled/>

                    { user && user.firstName ? "" : <Button type="primary" onClick={edit}>Edit</Button>}
                    
                    <WhiteSpace size="xl" />
                    <WhiteSpace size="xl" />
                    <WhiteSpace size="xl" />
                    <Button type="primary" onClick={signOut}>Sign Out</Button>
                </div>
            </WingBlank>
        </div>
    )
}

export default AccountTab
