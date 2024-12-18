export const config = {
	i18n: {
		locales: {
			en: {
				currency: "GBP",
				label: "English",
			},
		},
		defaultLocale: "en",
		defaultCurrency: "GBP",
		localeCookieName: "NEXT_LOCALE",
	},
	auth: {
		redirectAfterLogout: "/",
	},
	teams: {
		avatarColors: [
			"#FFFFFF",
			"#D9D9D9",
			"#B3B3B3",
			"#8C8C8C",
			"#666666",
			"#404040",
			"#000000",
		],
	},
	mailing: {
		provider: "console",
		from: "hello@mail.nech.ai",
	},
	ui: {
		enabledThemes: ["light", "dark"],
		defaultTheme: "light",
	},
} as const satisfies Config;

export type Config = {
	i18n: {
		locales: { [locale: string]: { currency: string; label: string } };
		defaultLocale: string;
		defaultCurrency: string;
		localeCookieName: string;
	};
	auth: {
		redirectAfterLogout: string;
	};
	teams: { avatarColors: string[] };
	mailing: {
		provider: "console" | "resend";
		from: string;
	};
	ui: {
		enabledThemes: Array<"light" | "dark">;
		defaultTheme: Config["ui"]["enabledThemes"][number];
	};
};

export type Locale = keyof (typeof config)["i18n"]["locales"];
