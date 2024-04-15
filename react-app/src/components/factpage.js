import React, { useEffect, useState } from 'react';
import api from '../api';

export function Factpage() {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([])
    const fetchUsers = async () => {
        const response = await api.get('/user');
        setUsers(response.data)
    };

    const addUser = async () => {
        const userToAdd = { username }; // Example new user data
        try {
            const response = await api.post('/user', userToAdd);
            if (response.status === 200 || response.status === 201) {
                setUsers(prevUsers => [...prevUsers, response.data]); // Add the new user to the state
            } else {
                console.error('Failed to add user:', response.status);
            }
        } catch (error) {
            if (error.response) {
                // Handle the error response here, e.g., error.response.status, error.response.data
                console.error('Error response:', error.response);
            }
        }
    };

    useEffect(() => {
        fetchUsers();
    },  []);

    return (
        <div className='fact-page'>
            <h1 className="fact-page-heading">Why Second Hand?</h1>
            <p className="fact-page-text">
                Shopping second hand aligns with the United Nations' Sustainable Development Goal on Responsible Consumption and Production. 
                By opting for second-hand goods, individuals contribute to reducing waste and the demand for new products, 
                which in turn lessens the environmental impact of manufacturing processes. Additionally, purchasing second-hand items often supports charitable causes, 
                promotes recycling, and fosters a circular economy. Embracing second-hand shopping is a practical way for individuals to make a positive impact on the 
                planet by reducing their carbon footprint and conserving resources.
            </p>
            <h2 className="fact-page-heading2">Fun Facts:</h2>
            <ul className="fact-page-text">
                <li>Second-hand shopping offers the thrill of a treasure hunt, 
                    with the possibility of discovering unique vintage items that 
                    tell stories from the past.</li>
                <li>Many celebrities are avid second-hand shoppers, demonstrating 
                    that fashion and style can be sustainable and budget-friendly.</li>
                <li>Buying one used item instead of new can save an average of 1,400 gallons of water, 
                    highlighting the significant environmental benefits of second-hand shopping.</li>
                <li>Thrift store chains like Goodwill and Salvation Army have become international phenomena, 
                    with locations across the globe offering diverse selections of pre-loved goods.</li>
                <li>The rise of online platforms like Depop, ThredUp, and Poshmark has revolutionized second-hand shopping, 
                    making it easier than ever to find unique items and reduce waste from the comfort of home.</li>
            </ul>

            <div>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button onClick={addUser}>Add User</button>
                <button onClick={fetchUsers}>Get Users</button>
            </div>
            <div>
                <h1>Users List</h1>
                {users.map(user => (
                    <div key={user[0]}>
                        <p>Username: {user[1]}</p>
                        <p>ID: {user[0]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}