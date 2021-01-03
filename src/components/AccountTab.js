import React from 'react';
import { Auth } from 'aws-amplify';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';

const AccountTab = () => {
    const signOut = async() => {
        await Auth.signOut().then(res => window.location = "/" ).catch(err => console.log(err));
    }
    return (
        <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
            <WingBlank>
                <div style={{ paddingTop: 60 }}>Clicked “Account” tab， show “Account” information</div>
                <WhiteSpace size="xl" />
                <Button type="primary" onClick={signOut}>Sign Out</Button>
            </WingBlank>
        </div>
    )
}

export default AccountTab
