export * from "./resend";
import { type Config, config } from "@config";
import type { MailProvider } from "../types";
export async function getProvider() {
	const providerResolvers = {
		// @ts-expect-error
		console: () => import("./console"),
		// @ts-expect-error
		resend: () => import("./resend"),
	} satisfies Record<
		Config["mailing"]["provider"],
		() => Promise<MailProvider>
	>;
	return await providerResolvers[config.mailing.provider]();
}
