import Order from "../models/orderModel.js";

const createOrder = async (req, res) => {
  const { customerId, customer, phone, address, priority, cart, position } =
    req.body;

  let totalEstimatedTime =
    15 * cart.reduce((total, item) => total + item.quantity, 0);

  if (priority) {
    totalEstimatedTime -= 5 * cart.length;
  }

  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + totalEstimatedTime);

  const totalPriorityPrice =
    10 * cart.reduce((total, item) => total + item.quantity, 0);

  const estimatedDelivery = currentDate.toISOString();
  const priorityPrice = priority ? totalPriorityPrice * 0.2 : 0;

  const orderPrice = cart.reduce((total, item) => total + item.totalPrice, 0);

  try {
    const order = new Order({
      customerId,
      customer,
      phone,
      address,
      priority,
      cart,
      position,
      estimatedDelivery,
      orderPrice,
      priorityPrice,
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Could not create order" });
  }
};

const getOrder = async (req, res) => {
  const { _id } = req.params;

  try {
    const order = await Order.findById(_id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Could not fetch order" });
  }
};

const updateOrder = async (req, res) => {
  const { _id } = req.params;
  const { priority } = req.body;

  try {
    const order = await Order.findById(_id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const totalPriorityPrice =
      10 * order.cart.reduce((total, item) => total + item.quantity, 0);

    const newPriorityPrice = priority ? totalPriorityPrice * 0.2 : 0;

    let totalEstimatedTime =
      15 * order.cart.reduce((total, item) => total + item.quantity, 0);
    if (priority) {
      totalEstimatedTime -= 5 * order.cart.length;
    }

    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + totalEstimatedTime);

    order.priority = priority;
    order.priorityPrice = newPriorityPrice;
    order.estimatedDelivery = currentDate.toISOString(); 

    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Could not update order" });
  }
};

export { createOrder, getOrder, updateOrder };
