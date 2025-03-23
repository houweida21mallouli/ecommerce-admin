import React, { useEffect, useState } from 'react';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const response = await fetch('http://localhost:4000/allorders');
        const data = await response.json();
        setOrders(data);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className='orders'>
            <h1>All Orders</h1>
            <div className="orders-list">
                {orders.map(order => (
                    <div key={order.orderId} className="order-item">
                        <p>Order ID: {order.orderId}</p>
                        <p>User: {order.userId.name} ({order.userId.email})</p>
                        <p>Total: {order.total} DT</p>
                        <p>Status: {order.status}</p>
                        <p>Tél: {order.phone}</p>
                        <div>
                            <h3>Products:</h3>
                            <ul>
                                {order.products.map((product, index) => (
                                    <li key={index}>
                                        {product.name} - {product.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
