"use server";

import { resend } from "@/utils/resend";
import { LogEvents } from "@nech/analytics/events";
import { setupAnalytics } from "@nech/analytics/server";

export async function subscribeAction(formData: FormData) {
	const email = formData.get("email") as string;

	const analytics = await setupAnalytics({
		userId: email,
		fullName: email,
	});

	analytics.track({
		event: LogEvents.GetStarted.name,
		channel: LogEvents.GetStarted.channel,
	});

	return resend.contacts.create({
		email,
		audienceId: process.env.RESEND_AUDIENCE_ID as string,
	});
}
