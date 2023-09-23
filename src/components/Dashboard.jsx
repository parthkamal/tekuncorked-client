import React, { useEffect, useState } from 'react';
import WebSocketService from '../WebSocketService';

const Dashboard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {

        const websocket = WebSocketService;
        websocket.connect();

        websocket.subscribe('data', (data) => {
            setData(data);
        })

        websocket.subscribe('data-created', (data) => {
            setData(data);
        })

        websocket.subscribe('data-updated', (data) => {
            setData(data);
        })

        return () => {
            websocket.disconnect();
        };

    }, []);

    return (
        <div>
            <p>Hello, this is your dashboard!</p>
            {data && (
                <div>
                    <p>Data from the server:</p>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
