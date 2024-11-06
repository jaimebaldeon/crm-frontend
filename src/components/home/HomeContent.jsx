import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomeContent = () => {
    const [data, setData] = useState({
        clientCount: 0,
        upcomingMaintenance: [],
      });

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await axios.get('http://localhost:5000/api/dashboard');
        setData(response.data);
        } catch (error) {
        console.error('Error fetching dashboard data', error);
        }
    };
    fetchData();
    }, []);

    return (
        <>
        <div className="content-section">
            <h2>Client Overview</h2>
            <p>Total Active Clients: {data.clientCount}</p>
        </div>
        <div className="content-section">
            <h2>Upcoming Maintenance</h2>
            <ul>
            {data.upcomingMaintenance.map((maintenance, index) => (
                <li key={index}>
                {maintenance.id_cliente} - {maintenance.productos_servicios}
                </li>
            ))}
            </ul>
        </div>
        </>
    );
};

export default HomeContent;