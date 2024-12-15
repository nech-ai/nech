"use client";

import { subscribeAction } from "@/actions/subscribe-action";
import { useState } from "react";
import { Check } from "lucide-react";

type Props = {
	group: string;
	placeholder: string;
	className?: string;
};

export function SubscribeForm({ group, placeholder, className }: Props) {
	const [isSubmitted, setSubmitted] = useState(false);

	return (
		<div>
			<div>
				{isSubmitted ? (
					<div className="flex h-9 w-[290px] items-center justify-between rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-0.5 text-emerald-500 text-sm">
						<p>Subscribed</p>
						<Check className="h-4 w-4" />
					</div>
				) : (
					<form
						className="flex flex-col gap-4"
						action={async (formData) => {
							setSubmitted(true);
							await subscribeAction(formData, group);

							setTimeout(() => {
								setSubmitted(false);
							}, 5000);
						}}
					>
						{/* <Input
							placeholder={placeholder}
							type="email"
							name="email"
							id="email"
							autoComplete="email"
							aria-label="Email address"
							required
							className={className}
						/>

						<SubmitButton /> */}
					</form>
				)}
			</div>
		</div>
	);
}
