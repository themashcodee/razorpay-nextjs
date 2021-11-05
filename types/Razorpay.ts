export type RazorpayCallback = {
	razorpay_payment_id: string;
	razorpay_order_id: string;
	razorpay_signature: string;
};
export type PaymentDB = {
	payment_id: string;
	order_id: string;
	signature: string;
};
export type Payment = {
	id: string;
	amount: number;
	status: string;
	method: string;
	description: string;
	email: string;
	created_at: number;
	fee: number;
};

export interface GetRazorpayOptionsParams {
	amount: number;
	currency: string;
	order_id: string;
	callback: (response: RazorpayCallback) => void;
}
