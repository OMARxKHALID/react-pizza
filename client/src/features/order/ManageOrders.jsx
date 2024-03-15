import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../../services/apiRestaurant';

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const allOrders = await getAllOrders();
        setOrders(allOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        // Handle error if needed
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h3>Manage Orders</h3>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Customer:</strong> {order.customer}
            </p>
            <p>
              <strong>Phone:</strong> {order.phone}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Estimated Delivery:</strong> {order.estimatedDelivery}
            </p>
            <p>
              <strong>Total Price:</strong> {order.orderPrice}
            </p>
            <p>
              <strong>Priority Price:</strong> {order.priorityPrice}
            </p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageOrders;
