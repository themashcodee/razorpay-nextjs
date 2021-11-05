import { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Payment, PaymentDB } from "types/Razorpay";

const razorpayClient = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
});

type Data = {
	success: boolean;
	orders: Payment[];
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	try {
		const orders = await prisma.payment.findMany();

		const mapped: Payment[] = await Promise.all(
			orders.map(async (order: PaymentDB) => {
				const payment = await razorpayClient.payments.fetch(order.payment_id);
				return payment;
			})
		);
		res.status(200).json({ success: true, orders: mapped });
	} catch (err) {
		console.log("ERROR", err);
		res.status(500).json({ success: false, orders: [] });
	}
}
