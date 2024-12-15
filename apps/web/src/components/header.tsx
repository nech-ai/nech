"use client";

import Image from "next/image";
import Link from "next/link";
import { SubscribeForm } from "./subscribe-form";

export function Header() {
	return (
		<header className="absolute top-0 z-10 flex w-full items-center justify-between p-4">
			<span className="hidden font-medium text-sm md:block">v1.run</span>

			<Link href="/">
				<Image
					src="/logo.png"
					alt="V1 logo"
					width={60}
					quality={100}
					height={60}
					className="md:-translate-x-1/2 md:absolute md:top-5 md:left-1/2"
				/>
			</Link>

			<nav className="md:mt-2">
				<ul className="flex items-center gap-4">
					<li>
						<a
							href="https://github.com/midday-ai/v1"
							className="rounded-full bg-primary px-4 py-2 font-medium text-secondary text-sm"
						>
							Github
						</a>
					</li>
					<li>
						<SubscribeForm group="v1-newsletter" placeholder="Email address" />
					</li>
				</ul>
			</nav>
		</header>
	);
}
