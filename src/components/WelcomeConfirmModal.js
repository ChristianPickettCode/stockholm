import React from 'react';
import {  Modal, List, Button } from 'antd-mobile';

const WelcomeConfirmModal = ({ 
    confirmModalVisible, 
    fullSend, welcomeRequest, app, sendData, 
    setConfirmModalVisible, welcomeResponse}) => {

    return (
        <Modal
            popup
            visible={confirmModalVisible}
            onClose={() => setConfirmModalVisible(false)}
            animationType="slide-up"
            afterClose={() => { console.log("done."); fullSend(); }}
            >
                {welcomeRequest && 
                    <List renderHeader={() => <div>Atlis Connect - {welcomeRequest.appName}</div>} className="popup-list">
                        <List.Item key="prompt">
                            <div><p>Hi {sendData.name} would you like to sign in to <b>{app.appName}</b> with <u>{sendData.email}</u> ?</p></div>
                        </List.Item>
                        <List.Item key="button">
                            <Button type="primary" onClick={() => { setConfirmModalVisible(false); console.log(welcomeResponse); }}>Full Send</Button>
                        </List.Item>
                    </List>
                }
            
        </Modal>
    )
}

export default WelcomeConfirmModal
