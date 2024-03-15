const API_URL = 'http://localhost:5000/api';

export async function getMenu() {
  try {
    const res = await fetch(`${API_URL}/menu`);
    if (!res.ok) throw Error('Failed getting menu');

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching menu:', error);
    return [];
  }
}

export async function getOrder(id) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`);
    if (!res.ok) throw Error(`Couldn't find order #${id}`);

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching order #${id}:`, error);
    return null;
  }
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Failed creating your order:', error);
    throw Error('Failed creating your order');
  }
}

export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
  } catch (error) {
    console.error('Failed updating your order:', error);
    throw Error('Failed updating your order');
  }
}
// export async function setUser() {
//   try {
//     const res = await fetch(`${API_URL}/users/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username }), 
//     });
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching user:', error);
//   }
// }