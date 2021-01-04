import React, { useEffect, useState, useContext } from 'react';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { useHistory } from "react-router-dom";

import { w3cwebsocket as W3CWebSocket } from "websocket";
import crypto from "crypto-js";
import { v4 as uuidv4 } from "uuid";

import WelcomeModal from './WelcomeModal';
import WelcomeConfirmModal from './WelcomeConfirmModal';

import { UserContext } from '../context/UserContext';
import { KContext } from '../context/KContext';

import { createUserKey, createUser, deleteUser, deleteUserKey } from '../graphql/mutations';
import jwt from "jsonwebtoken";
import { Toast } from 'antd-mobile';

const Welcome = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);

    const [welcomeRequest, setWelcomeRequest] = useState();
    const [welcomeResponse, setWelcomeResponse] = useState();

    const [ws, setWs] = useState();
    const [app, setApp] = useState({});
    const [saved, setSaved] = useState(false);
    const [userAppId, setUserAppID] = useState();

    const user = useContext(UserContext);
    const k = useContext(KContext);
    const history = useHistory();

    const fullSend = () => {
        if (!saved) {
            if(welcomeResponse) {
                // console.log(welcomeRequest.requestID);
                editData()
                    .then(res => {
                        // console.log("success", res);
                        ws.send(JSON.stringify({
                            message: "send",
                            to: welcomeRequest.requestID,
                            appID: app.appID,
                            data: crypto.AES.encrypt(JSON.stringify({ ...welcomeResponse, userAppID: userAppId }), welcomeRequest.requestID).toString(),
                            action: "message"
                        }));
                        history.push("/")
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        } else {
            let responseData = {};
            welcomeRequest.request.forEach((i) => { 
                responseData[i] = user.apps[app.appID][i]  
            });
            responseData["userAppID"] = user.apps[app.appID].userAppID;

            ws.send(JSON.stringify({
                message: "send",
                to: welcomeRequest.requestID,
                appID: app.appID,
                data: crypto.AES.encrypt(JSON.stringify(responseData), welcomeRequest.requestID).toString(),
                action: "message"
            }));
            history.push("/")
        }
        
        
    }  
    const editData = async () => {
        if (user) {
            Toast.loading("Saving.....", 2);
            await API
                .graphql(graphqlOperation(createUserKey, { input : { userID: user.id }}))
                .then(async (res) => {
                    const userAppID = uuidv4();
                    setUserAppID(userAppID);
                    const d = jwt.sign({ ...user, apps: { ...user.apps, [app.appID]: {...welcomeResponse, userAppID, appName: app.appName } } }, res.data.createUserKey.id);
                    await API
                        .graphql(graphqlOperation(createUser, { input : { data: d } }))
                        .then( async(res) => {
                            await API
                                .graphql(graphqlOperation(deleteUser, {input : { id : k.uID} }))
                                .then(async(res) => {
                                    await API
                                        .graphql(graphqlOperation(deleteUserKey, {input: {id: k.ukID}} ))
                                        .then(res => {
                                            Toast.success("Saved App Data.")
                                            window.location = "/";
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

    const getAppData = (appID) => {
        if (user.apps[appID]) {
            setSaved(true);
            setConfirmModalVisible(true);
        } else {
            setModalVisible(true);
        }
    }

    useEffect(() => {
        if (user) {
            let request = {};
            window.location.search.replace("?", "").split("&").forEach(i => {
                const r = i.split(/=(.+)/);
                request[r[0]] = r[1];
            });

            let d = jwt.verify(request.data, request.requestID);
            request = { ...request, ...d };

            setWelcomeRequest(request);

            const appName = request.appName;
            const appID = request.appID;

            setApp({ appName, appID });

            getAppData(appID);

            const ws = new W3CWebSocket(`wss://u9j9kermu5.execute-api.us-east-1.amazonaws.com/dev`);
            setWs(ws);
            ws.onopen = () =>  {
                console.log("connected.");
                ws.send(JSON.stringify({
                    message: "connect",
                    action: "message"
                }));
            };

            ws.onclose = () => {
                console.log("disconnected.");
            };

            ws.onmessage = (msg) =>  {
                if (msg.type === "message") {
                    const data = JSON.parse(msg.data);
                    if (data.status === "connect") {
                        console.log(data.id);
                    }
                    if (data.status === "send") {
                        console.log("SEND: ", data);
                    }
                }
            };

        } else {
            Auth.signOut();
            window.location = "/"
        }
        
    }, [user]);
    return (
        <div>
            <WelcomeModal 
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible} 
                fullSend={fullSend} 
                welcomeRequest={welcomeRequest} 
                setWelcomeResponse={setWelcomeResponse} />
            <WelcomeConfirmModal 
                confirmModalVisible={confirmModalVisible} 
                fullSend={fullSend} 
                app={app}
                setConfirmModalVisible={setConfirmModalVisible} />
        </div>
    )
}

export default Welcome
