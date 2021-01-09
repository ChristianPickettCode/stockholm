import React, { useContext } from 'react';
import { WingBlank, WhiteSpace, List, Accordion } from 'antd-mobile';
import { UserContext } from '../context/UserContext';

const HomeTab = () => {

    const user = useContext(UserContext);

    return (
        <WingBlank size="lg">
            <WhiteSpace size="lg" />
            { user ? Object.entries(user.apps).map(([key, value]) => (
                <div key={key}>
                    <Accordion style={{textAlign:"left"}}>
                        <Accordion.Panel  header={value.appName}>
                            <List>
                                <List.Item key={key}>
                                    <div>
                                        {/* {Object.entries(value).map(([k,v]) => (
                                            <p key={k}>{k} : {v}</p>
                                        ))} */}
                                        <p>Email : {value.email}</p>
                                        <p>Name : {value.name}</p>
                                    </div>
                                </List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                    <WhiteSpace size="lg" />
                </div>
            )) : ""}
        </WingBlank>
    )
}

export default HomeTab
