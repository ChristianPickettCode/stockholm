import React, { useContext } from 'react';
import { Modal, List, Button, InputItem , Picker} from 'antd-mobile';
import { UserContext } from '../context/UserContext';

const WelcomeModal = ({ modalVisible, setModalVisible, fullSend, welcomeRequest, setWelcomeResponse  }) => {

    const user = useContext(UserContext);
    // console.log(user);
    return (
        user &&
        <Modal
            popup
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            animationType="slide-up"
            >
                {welcomeRequest && 
                    <List renderHeader={() => <div>Atlis Connect - {welcomeRequest.appName}</div>} className="popup-list">
                        {welcomeRequest.request.map((i, index) => (
                            <InputItem
                                key={index}
                                clear
                                placeholder={`Click to enter ${i}`}
                                onChange={el => setWelcomeResponse(prev => ({...prev, [i]: el}))}
                            >
                                {i.charAt(0).toUpperCase() + i.slice(1)}
                            </InputItem>
                            // <Picker 
                            //     cols={1} title={i.charAt(0).toUpperCase() + i.slice(1)} 
                            //     extra="extra" okText="ok" dismissText="dismiss"
                            //     // data={user.apps}
                            //     >
                            //     <List.Item arrow="horizontal">{i.charAt(0).toUpperCase() + i.slice(1)}</List.Item>
                            // </Picker>
                        ))}
                        <List.Item>
                            <Button type="primary" onClick={() => { setModalVisible(false); fullSend(); }}>Full Send</Button>
                        </List.Item>
                    </List>
                }
            
        </Modal>
    )
}

export default WelcomeModal
