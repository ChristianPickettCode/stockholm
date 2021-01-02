import React from 'react';
import { WingBlank, WhiteSpace, List, Accordion } from 'antd-mobile';

const HomeTab = ({ currentUser }) => {
    return (
        <WingBlank size="lg">
            <WhiteSpace size="lg" />
            { currentUser ? Object.entries(currentUser.apps).map(([key, value]) => (
                <div key={key}>
                    <Accordion>
                        <Accordion.Panel header={value.appName}>
                            <List>
                                <List.Item key={key}>
                                    <div style={{textAlign:"left"}}>
                                        {Object.entries(value).map(([k,v]) => (
                                            <p key={k}>{k} : {v}</p>
                                        ))}
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
