import { GetRazorpayOptionsParams } from "types/Razorpay";

export function GetRazorpayOptions({
	amount,
	currency,
	order_id,
	callback,
}: GetRazorpayOptionsParams) {
	return {
		key: process.env.RAZORPAY_KEY_ID,
		amount,
		currency,
		name: "Mash Codee",
		description: "Mash Codee testing app",
		image: "/favicon.png",
		order_id,
		handler: callback,
		prefill: {
			name: "John Doe",
			email: "johndoe@gmail.com",
			contact: "9595959595",
		},
		notes: {
			address: "Galactic City, Mars",
		},
		theme: {
			color: "#000",
		},
	};
}
