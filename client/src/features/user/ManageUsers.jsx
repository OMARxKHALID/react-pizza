import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/apiRestaurant';

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h3>Manage Users</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p>User ID: {user.id}</p>
            {/* Display other user details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageUsers;
