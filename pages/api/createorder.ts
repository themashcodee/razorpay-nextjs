import type { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";
import uniqid from "uniqid";

const razorpayClient = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
});

type Data = {
	success: boolean;
	order: {};
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method === "POST") {
		const { amount } = req.body;
		try {
			const order = await razorpayClient.orders.create({
				amount: amount * 100,
				currency: "INR",
				receipt: uniqid(),
			});
			res.status(200).json({ success: true, order });
		} catch (err) {
			console.log("ERROR", err);
			res.status(500).json({ success: false, order: {} });
		}
	} else {
		res.status(400).json({ success: false, order: {} });
	}
}
