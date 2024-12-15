export default async function Page() {
	return (
		<div className="bg-background">
			<div className="container mx-auto p-4 sm:p-8">
				<header className="">
					<h1 className="font-bold text-3xl tracking-tight sm:text-4xl">
						Chats
					</h1>
				</header>

				<main>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<h2 className="font-bold text-2xl tracking-tight sm:text-3xl">
								Chats
							</h2>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
