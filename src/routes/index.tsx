import { createFileRoute } from '@tanstack/react-router'
import { StockForm } from '@/components/stock-form'
import { getStockAssets } from '@/services/stocks'

export const Route = createFileRoute('/')({
	component: App,
	loader: () => getStockAssets(),
	staleTime: 30 * 60,
})

function App() {
	const assets = Route.useLoaderData()
	return (
		<div className="grid gap-6 md:gap-12 place-items-center">
			<h2 className="text-lg md:text-2xl font-bold">
				Histórico de fechamento diário
			</h2>
			<StockForm assets={assets} />
		</div>
	)
}
