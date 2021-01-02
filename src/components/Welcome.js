import React, { useEffect, useState } from 'react';

import { w3cwebsocket as W3CWebSocket } from "websocket";
import crypto from "crypto-js";
import { v4 as uuidv4 } from "uuid";

import WelcomeModal from './WelcomeModal';
import WelcomeConfirmModal from './WelcomeConfirmModal';

const Welcome = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);

    const [welcomeRequest, setWelcomeRequest] = useState();
    const [welcomeResponse, setWelcomeResponse] = useState();

    const [ws, setWs] = useState();
    const [app, setApp] = useState({});
    const [sendData, setSendData] = useState({});
    const [saved, setSaved] = useState(false);
    const [currentUser, setCurrentUser] = useState();

    const fullSend = () => {
        console.log(app);
        if (!saved) {
            currentUser.apps[app.appID] = welcomeResponse;
            currentUser.apps[app.appID].userAppID = uuidv4();
            currentUser.apps[app.appID].appName = app.appName;

            console.log(currentUser);
            console.log(welcomeRequest.requestID);

            localStorage.setItem("user", 
                JSON.stringify(currentUser)
            )
            ws.send(JSON.stringify({
                message: "send",
                to: welcomeRequest.requestID,
                appID: app.appID,
                data: crypto.AES.encrypt(JSON.stringify({ ...welcomeResponse, userAppID: sendData.userAppID }), welcomeRequest.requestID).toString(),
                action: "message"
            }));
        }
        
        window.location = "/";
    }   

    const getUser = (appName, appID) => {
        let user = localStorage.getItem("user");
        if (user) {
            let parsedUser = JSON.parse(user);
            console.log(parsedUser)
            if (!parsedUser.apps[appID]) {
                console.log("HAVEN'T SEEN THIS APP BEFORE");
                //const userAppID = uuidv4();
                parsedUser.apps[appID] = {};
                setModalVisible(true);
            } else {
                console.log("SAVED USER");
                console.log(parsedUser)
                setSaved(true);
                setConfirmModalVisible(true);
            }

            setCurrentUser(parsedUser);
            setSendData({ ...parsedUser.apps[appID]});

            localStorage.setItem("user", 
                JSON.stringify(parsedUser)
            );

        } else {
            const id = uuidv4();
            console.log("NEW USER")
            localStorage.setItem("user", 
                JSON.stringify({ id, apps: {} })
            );
            setCurrentUser({ id , apps: {}});
            setModalVisible(true);
        }
        
    };

    useEffect(() => {
        let request = {};
        window.location.search.replace("?", "").split("&").forEach(i => {
            const r = i.split(/=(.+)/);
            request[r[0]] = r[1];
        });
        request.data =  request.data.replace("[", "").replace("]","").split(",");
        setWelcomeRequest(request);
        
        const appName = request.appName;
        const appID = request.appID;

        setApp({ appName, appID });

        getUser(appName, appID);

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
                    // setId(data.id);
                }
                if (data.status === "send") {
                    console.log("SEND: ", data);
                }
            }
        };

        // return () => {
        //     ws.close();
        // }
        
        
    }, []);
    return (
        <div>
            <WelcomeModal 
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible} 
                fullSend={fullSend} 
                welcomeRequest={welcomeRequest} 
                setWelcomeResponse={setWelcomeResponse} 
                welcomeResponse={welcomeResponse}  />
            <WelcomeConfirmModal 
                confirmModalVisible={confirmModalVisible} 
                fullSend={fullSend} welcomeRequest={welcomeRequest} 
                app={app} sendData={sendData} 
                setConfirmModalVisible={setConfirmModalVisible} 
                welcomeResponse={welcomeResponse} />
        </div>
    )
}

export default Welcome
