import React, { useEffect, useState } from 'react';

import { TabBar } from 'antd-mobile';
import { Link } from "react-router-dom"
import { HomeOutlined, HomeTwoTone, CameraOutlined, 
    CameraTwoTone, ContactsOutlined, ContactsTwoTone } from "@ant-design/icons";

import ScanTab from './ScanTab';
import AccountTab from './AccountTab';
import HomeTab from './HomeTab';
import Welcome from './Welcome';

const Home = () => {
    const [selectedTab, setSelectedTab] = useState();
    const [isWelcome, setIsWelcome] = useState(false);
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
        switch (window.location.pathname) {
            case "/":
                setSelectedTab("Home");
                break;
            case "/scan":
                setSelectedTab("Scan");
                break;
            case "/account":
                setSelectedTab("Account");
                break;
            case `/welcome`:
                setIsWelcome(true);
                setSelectedTab("Home");
                break;
            default:
                break
        }
    }, []);

    const renderContent = (tab) => {
        switch (tab) {
            case "Home":
                return(
                    <HomeTab currentUser={currentUser} />
                );
            case "Scan":
                return(
                    <ScanTab />
                );
            case "Account":
                return(
                    <AccountTab />
                );
            default:
                break;
        }

    }

    return (
        <div style={{position: 'fixed', height: '100%', width: '100%', top: 0 }}>
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
            >
                {[
                    { key: "Home", url:"/", icon: <HomeOutlined style={{fontSize:"1.5em", color: "#8c8c8c"}} />, selectedIcon:  <HomeTwoTone style={{fontSize:"1.5em"}} /> },
                    { key: "Scan", url:"/scan", icon: <CameraOutlined style={{fontSize:"1.5em", color:"#8c8c8c"}} />, selectedIcon:  <CameraTwoTone style={{fontSize:"1.5em"}} /> },
                    { key: "Account", url:"/account", icon: <ContactsOutlined style={{fontSize:"1.5em", color:"#8c8c8c"}} />, selectedIcon:  <ContactsTwoTone style={{fontSize:"1.5em"}} /> }].map((i, index) => (
                        <TabBar.Item
                            key={i.key}
                            icon={<Link to={i.url}>{i.icon}</Link>}
                            selectedIcon={i.selectedIcon}
                            selected={selectedTab === i.key}
                            onPress={() => {
                                setSelectedTab(i.key);
                                
                            }}
                        >
                            { renderContent(i.key) }
                        </TabBar.Item>
                    )) }
            </TabBar>

            { isWelcome && <Welcome /> }
            
        </div>
    );
}

export default Home
