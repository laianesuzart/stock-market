type StockInfoProps = {
	logo: string
	symbol: string
	name: string
}

export function StockInfo({ logo, symbol, name }: StockInfoProps) {
	return (
		<div className="flex gap-2">
			<img
				src={logo}
				alt={`Logo da empresa ${name}`}
				className="size-12 rounded-sm"
			/>
			<div className="flex flex-col">
				<span>{name}</span>
				<span className="text-muted-foreground text-xs">{symbol}</span>
			</div>
		</div>
	)
}
