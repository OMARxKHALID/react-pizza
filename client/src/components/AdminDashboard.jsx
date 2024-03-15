import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ManageOrders from '../features/order/ManageOrders';
import ManageUsers from '../features/user/ManageUsers';

const  AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="manage/orders">Manage Orders</Link></li>
          <li><Link to="manage/users">Manage Users</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="manage/orders" element={<ManageOrders />} />
        <Route path="manage/users" element={<ManageUsers />} />
      </Routes>
    </div>
  );
}

export default AdminDashboard;
