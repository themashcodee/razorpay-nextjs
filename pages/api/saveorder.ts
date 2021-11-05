import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Data = {
	success: boolean;
	message: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method === "POST") {
		const { order_id, payment_id, signature } = req.body;
		try {
			const payment = await prisma.payment.create({
				data: { order_id, payment_id, signature },
			});
			res
				.status(200)
				.json({ success: true, message: "Payment Successfully Completed!" });
		} catch (err) {
			console.log("ERROR", err);
			res.status(500).json({
				success: false,
				message:
					"Payment Successfully Completed, but there is some server error while storing your data in our database",
			});
		}
	} else {
		res.status(400).json({ success: false, message: "Bad Request" });
	}
}
