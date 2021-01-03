import { Button, Toast, WhiteSpace, WingBlank } from 'antd-mobile';
import React, {useState} from 'react';
import QrReader from 'react-qr-reader'

const ScanTab = () => {
    const [result, setResult] = useState("");
    const [scanning, setScanning] = useState(false);
    const handleScan = (e) => {
        if (e) {
            // Toast.success(e);
            setResult(e)
            setScanning(false);
            Toast.loading("redirecting...", 1, () => {
                window.location = e;
            })
        }
        
    }

    return (
        <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
            <WingBlank>
                <div style={{ paddingTop: 60 }}>
                    <h3>Scan Code</h3>
                    <WhiteSpace />
                    { scanning ? 
                        <QrReader
                            delay={300}
                            onError={(e) => Toast.fail(e)}
                            onScan={handleScan}
                            style={{ width: '100%' }}
                        />
                    : <Button type="primary" onClick={() => setScanning(true)}>Scan</Button> }
                </div>
            </WingBlank>
        </div>
    )
}

export default ScanTab
