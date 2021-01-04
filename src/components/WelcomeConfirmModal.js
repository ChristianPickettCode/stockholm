import React, { useContext } from 'react';
import {  Modal, List, Button, Flex } from 'antd-mobile';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

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
                            <p style={{whiteSpace:"pre-wrap"}}>Hi {user.apps[app.appID].name} would you like to sign in to <b>{user.apps[app.appID].appName}</b> with <u>{user.apps[app.appID].email}</u> ?</p>
                        </List.Item>
                        <List.Item key="button">
                            <Flex>
                                <Flex.Item>
                                    <Button type="primary" onClick={() => { setConfirmModalVisible(false); fullSend(); }}>Yes</Button>
                                </Flex.Item>
                                <Flex.Item>
                                    <Button type="warning" onClick={() => { setConfirmModalVisible(false);}}> <Link style={{color:"white"}} to="/">No</Link></Button>
                                </Flex.Item>
                            </Flex>
                        </List.Item>
                    </List>
                : "" }
        </Modal>
    )
}

export default WelcomeConfirmModal
