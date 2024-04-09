import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {},
    orderItems: [
        {
            qty: {},
            product: {},
        },
    ],
    shippingAddress: {
        fullName: {},
        address: {},
        city: {},
        country: {},
        postalCode: {},
        
    },
    paymentMethod: {},
    totalPrice: {},
    isPaid: {},
    paidAt: {},
    isProcessing: {}
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;