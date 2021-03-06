import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { GetRazorpayOptions } from "../helpers/GetRazorpayOptions";
import Link from "next/link";

const Home: NextPage = () => {
	const [amount, setAmount] = useState<number>(100);
	const [loading, setLoading] = useState(false);

	async function payMoney() {
		if (amount < 1)
			return alert("Are you kidding me? You can't hecking donate 0 bucks!");

		setLoading(true);
		try {
			const result = await fetch("/api/createorder", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ amount }),
			});
			const orderRes = await result.json();
			const { order, success } = orderRes;
			if (!success) return alert("There is some server error");

			const options = GetRazorpayOptions({
				amount: order.amount_due,
				currency: order.currency,
				order_id: order.id,
				callback: async (response) => {
					const res = await fetch("/api/saveorder", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							order_id: response.razorpay_order_id,
							payment_id: response.razorpay_payment_id,
							signature: response.razorpay_signature,
						}),
					});
					const result = await res.json();
					const { message } = result;
					alert(message);
				},
			});
			setLoading(false);
			setAmount(0);
			const paymentObject = new (window as any).Razorpay(options);
			paymentObject.open();
		} catch (err) {
			console.log(err);
			setAmount(0);
			setLoading(false);
		}
	}

	return (
		<>
			<Head>
				<title>Donate</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.png" />
			</Head>
			<main className="w-full min-h-screen flex justify-center items-center flex-col gap-2">
				<h1 className="text-4xl font-bold pb-4">Donate</h1>
				<label
					htmlFor="amount"
					className="relative w-[100%] max-w-[300px] h-14 bg-red-200 rounded-lg overflow-hidden"
				>
					<span className="absolute right-0 top-0 h-full bg-yellow-300 flex items-center px-3">
						INR
					</span>
					<input
						id="amount"
						type="text"
						value={amount}
						disabled={loading}
						onChange={(e) =>
							+e.target.value > -1 &&
							+e.target.value < 500001 &&
							setAmount(+e.target.value)
						}
						placeholder="amount"
						className="bg-[#eeeeee] px-3 w-full h-full text-xl disabled:cursor-not-allowed disabled:text-[#bbb]"
					/>
				</label>
				<button
					className="bg-blue-600 text-white font-medium w-[100%] max-w-[300px] rounded-lg h-10 text-lg disabled:cursor-not-allowed"
					onClick={payMoney}
					disabled={loading}
				>
					{loading ? "Processing..." : "Pay"}
				</button>

				<Link href="/payments" passHref>
					<span className="py-5 cursor-pointer flex gap-3">
						Check All Donations{" "}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</span>
				</Link>
			</main>
		</>
	);
};

export default Home;
