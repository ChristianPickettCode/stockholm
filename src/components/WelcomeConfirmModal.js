import React, { useContext } from 'react';
import {  Modal, List, Button } from 'antd-mobile';
import { UserContext } from '../context/UserContext';

const WelcomeConfirmModal = ({ confirmModalVisible, fullSend, app, setConfirmModalVisible}) => {

    const user = useContext(UserContext);

    return (
        <Modal
            popup
            visible={confirmModalVisible}
            onClose={() => setConfirmModalVisible(false)}
            animationType="slide-up"
            >
                { user && app && user.apps[app.appID] ? 
                    <List renderHeader={() => <div>Atlis Connect - {user.apps[app.appID].appName}</div>} className="popup-list">
                        <List.Item key="prompt">
                            <div><p>Hi {user.apps[app.appID].name} would you like to sign in to <b>{user.apps[app.appID].appName}</b> with <u>{user.apps[app.appID].email}</u> ?</p></div>
                        </List.Item>
                        <List.Item key="button">
                            <Button type="primary" onClick={() => { setConfirmModalVisible(false); fullSend(); }}>Full Send</Button>
                        </List.Item>
                    </List>
                : "" }
        </Modal>
    )
}

export default WelcomeConfirmModal
