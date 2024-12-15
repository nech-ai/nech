export function Stats() {
	return (
		<div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
			<div className="space-y-2">
				<div className="font-bold font-mono text-2xl">10,500+</div>
				<div className="text-gray-400 text-sm">Organizations</div>
			</div>
			<div className="space-y-2">
				<div className="font-bold font-mono text-2xl">50M+</div>
				<div className="text-gray-400 text-sm">API Requests</div>
			</div>
			<div className="space-y-2">
				<div className="font-bold font-mono text-2xl">15+</div>
				<div className="text-gray-400 text-sm">LLM Models</div>
			</div>
			<div className="space-y-2">
				<div className="font-bold font-mono text-2xl">99.9%</div>
				<div className="text-gray-400 text-sm">Uptime</div>
			</div>
		</div>
	);
}
