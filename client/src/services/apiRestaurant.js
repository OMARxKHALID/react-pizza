export async function getMenu() {
  try {
    const res = await fetch(`/api/menu`);
    if (!res.ok) throw Error('Failed getting menu');

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching menu:', error.message);
    return [];
  }
}

export async function getOrder(_id) {
  try {
    const res = await fetch(
      `/api/order/${_id}` ,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
    );
    if (!res.ok) throw Error(`Couldn't find order #${_id}`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching order #${_id}:`, error.message);
    return null;
  }
}

export async function createOrder({
  customerId,
  customer,
  phone,
  address,
  priority,
  cart,
  postion,
}) {
  try {
    const res = await fetch(`/api/order/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        customer,
        phone,
        address,
        priority,
        cart,
        postion,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to create order');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Failed creating your order:', error.message);
  }
}


export async function updateOrder(_id, priority) {
  try {
    const res = await fetch(`/api/order/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify(priority),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
  } catch (error) {
    console.error('Failed updating your order:', error.message);
  }
}

export async function setUser(username) {
  try {
    const res = await fetch(`/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }), 
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error.message);
  }
}

export async function getUser() {
  try {
    const res = await fetch(`/api/users/:${_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error.message);
  }
}