import React from 'react';
import { Modal, List, Button, InputItem } from 'antd-mobile';

const WelcomeModal = ({ modalVisible, setModalVisible, fullSend, welcomeRequest, setWelcomeResponse , welcomeResponse }) => {
    return (
        <Modal
            popup
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            animationType="slide-up"
            afterClose={() => { console.log("done."); fullSend(); }}
            >
                {welcomeRequest && 
                    <List renderHeader={() => <div>Atlis Connect - {welcomeRequest.appName}</div>} className="popup-list">
                        {welcomeRequest.data.map((i, index) => (
                            <InputItem
                                key={index}
                                clear
                                placeholder={`Click to enter ${i}`}
                                onChange={el => setWelcomeResponse(prev => ({...prev, [i]: el}))}
                            >{i.charAt(0).toUpperCase() + i.slice(1)}</InputItem>
                        ))}
                        <List.Item>
                            <Button type="primary" onClick={() => { setModalVisible(false); console.log(welcomeResponse); }}>Full Send</Button>
                        </List.Item>
                    </List>
                }
            
        </Modal>
    )
}

export default WelcomeModal
