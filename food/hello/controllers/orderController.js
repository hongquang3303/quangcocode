
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Đơn hàng cho người dùng từ frontend
const placeOrder = async (req, res) => {
  const DEMO1_url = "http://localhost:5174";

  try {
    // 1. Tạo đơn hàng mới trong cơ sở dữ liệu
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    // 2. Xóa giỏ hàng của người dùng sau khi đặt hàng
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // 3. Tạo danh sách line_items cho Stripe Checkout
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "vnd", // Đơn vị tiền tệ
        product_data: {
          name: item.name, // Tên sản phẩm
        },
        unit_amount: item.price * 1, // Stripe yêu cầu giá tiền ở đơn vị xu
      },
      quantity: item.quantity, // Số lượng sản phẩm
    }));

    // Thêm phí giao hàng cố định vào đơn hàng
    line_items.push({
      price_data: {
        currency: "vnd",
        product_data: {
          name: "Phí Giao Hàng", // Tên phí giao hàng
        },
        unit_amount: 20000, // Phí giao hàng cố định (ví dụ: 200 INR)
      },
      quantity: 1,
    });

    // 4. Tạo phiên thanh toán với Stripe
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment", // Chế độ thanh toán
      success_url: `${DEMO1_url}/verify?success=true&orderId=${newOrder._id}`, // URL khi thanh toán thành công
      cancel_url: `${DEMO1_url}/verify?success=false&orderId=${newOrder._id}`, // URL khi thanh toán bị hủy
    });

    // 5. Trả về URL của phiên thanh toán cho frontend
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

// Xác minh đơn hàng sau thanh toán
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      // Cập nhật đơn hàng thành đã thanh toán
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Thanh Toán Thành Công" });
    } else {
      // Xóa đơn hàng nếu thanh toán thất bại
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Thanh Toán Không Thành Công" });
    }
  } catch (error) {
    console.error("Lỗi Xác Minh Đơn Hàng:", error.message);
    res.status(500).json({ success: false, message: "Lỗi Xác Minh Đơn Hàng" });
  }
};

//Đơn đặt hàng của người dùng
const userOrders = async (req,res) =>{
  try {
    const orders = await orderModel.find({userId:req.body.userId});
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.jon({success:false,message:"Error"})
    
  }

}

//Liệt kê đơn hàng cho trang quản trị
const listOrders = async (req,res) =>{
  try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.jon({success:false,message:"Error"})
    
  }
}
//api để cập nhập trạng thái đơn hàng
const updateStatus = async (req,res) =>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true,message:"Cập Nhập Trạng Thái"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
  }
}

export { placeOrder, verifyOrder, userOrders, listOrders,updateStatus };
