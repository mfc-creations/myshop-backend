const db = require("../models");
const Razorpay = require("razorpay");

module.exports = {
  checkout: async (data, userId, t) => {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
    const amount = data.items.reduce(
      (amt, item) => (amt += item.quantity * item.price),
      0
    );

    const order = await db.Order.create(
      {
        ...data,
        amount,
        userId,
      },
      { transaction: t }
    );
    const newItems = data.items.map((item) => ({
      ...item,
      orderId: order.id,
    }));
    const orderItems = await db.OrderItem.bulkCreate(newItems, {
      transaction: t,
    });

    const payment_capture = 1;
    const currency = "INR";
    const options = {
      amount: amount * 100,
      currency,
      receipt: order.id,
      payment_capture,
    };

    const response = await razorpay.orders.create(options);

    t.commit();
    return {
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    };
  },
};
