const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const sendSms = require("./sendSms");

const app = express();
const PORT = process.env.PORT || 3001;
const ORDERS_FILE_PATH = "./data/orders.json";

app.use(bodyParser.json());
app.use(cors());

const logMiddleware = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};
app.use(logMiddleware);

let ordersData = loadOrdersFromFile();
const menuData = require("./data/menu.json");

function loadOrdersFromFile() {
  try {
    const ordersJson = fs.readFileSync(ORDERS_FILE_PATH, "utf8");
    return JSON.parse(ordersJson);
  } catch (error) {
    console.error("Error reading orders file:", error);
    return [];
  }
}

app.get("/menu", (req, res) => {
  res.json({ status: "success", data: menuData.data });
});

app.get("/order/:id", (req, res) => {
  const order = ordersData.find((order) => order.id === req.params.id);
  sendOrderResponse(res, order);
});

app.post("/order", (req, res) => {
  const newOrder = req.body;
  newOrder.id = generateRandomOrderId(6);
  setOrderDetails(newOrder);

  // Add category information to order items
  newOrder.cart.forEach((item) => {
    const menuItem = menuData.data.find(
      (menuItem) => menuItem.id === item.menuItemId
    );
    if (menuItem) {
      item.name = menuItem.name;
      item.unitPrice = menuItem.unitPrice;
      item.totalPrice = menuItem.unitPrice * item.quantity;
      item.category = menuItem.category;
    }
  });

  ordersData.push(newOrder);
  saveOrdersToFile();

  sendSmsNotification(newOrder)
    .then(() => res.json({ status: "success", data: newOrder }))
    .catch((error) => handleSmsError(res, error));
});

app.patch("/order/:id", (req, res) => {
  const orderIndex = ordersData.findIndex(
    (order) => order.id === req.params.id
  );
  if (orderIndex !== -1) {
    updateOrderDetails(ordersData[orderIndex], req.body);
    saveOrdersToFile();
    sendOrderResponse(res, ordersData[orderIndex]);
  } else {
    sendOrderNotFoundResponse(res);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: "error", message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function generateRandomOrderId(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomChars = Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  );
  return randomChars.join("");
}

function setOrderDetails(order) {
  const totalEstimatedTime =
    15 * order.cart.reduce((total, item) => total + item.quantity, 0);

  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + totalEstimatedTime);

  const totalPriorityPrice =
    10 * order.cart.reduce((total, item) => total + item.quantity, 0);

  order.estimatedDelivery = currentDate.toISOString();
  order.orderPrice = calculateOrderPrice(order);
  order.priorityPrice = order.priority ? totalPriorityPrice * 0.2 : 0;
}

function updateOrderDetails(order, updates) {
  Object.assign(order, updates);
  order.orderPrice = calculateOrderPrice(order);
}

function calculateOrderPrice(order) {
  return order.cart.reduce((total, item) => total + item.totalPrice, 0);
}

function saveOrdersToFile() {
  fs.writeFileSync(
    ORDERS_FILE_PATH,
    JSON.stringify(ordersData, null, 2),
    "utf8"
  );
}

function sendSmsNotification(order) {
  const messageBody = `New order created! Order ID: ${order.id}`;
  const customerPhoneNumber = order.phone;
  return sendSms.sendSms(messageBody, customerPhoneNumber);
}

function handleSmsError(res, error) {
  console.error("Error sending SMS:", error);
  res.status(500).json({ status: "error", message: "Failed to send SMS" });
}

function sendOrderResponse(res, order) {
  if (order) {
    res.json({ status: "success", data: order });
  } else {
    sendOrderNotFoundResponse(res);
  }
}

function sendOrderNotFoundResponse(res) {
  res.status(404).json({ status: "error", message: "Order not found" });
}
