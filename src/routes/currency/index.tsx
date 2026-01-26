import { createFileRoute } from '@tanstack/react-router'
import { CurrencyCard } from '@/components/currency-card'
import { ErrorFallback } from '@/components/error-fallback'
import { Loader } from '@/components/loader'
import { getMajorCurrencies } from '@/services/currency'

export const Route = createFileRoute('/currency/')({
	component: CurrencyComponent,
	loader: () => getMajorCurrencies(),
	staleTime: 1 * 60 * 60,
	pendingComponent: Loader,
	pendingMs: 300,
	errorComponent: ErrorFallback,
})

function CurrencyComponent() {
	const [currencies, error] = Route.useLoaderData()
	return (
		<div className="grid gap-6 md:gap-12 max-w-3xl mx-auto">
			<h2 className="text-center text-lg md:text-2xl font-bold">Moedas</h2>
			<div className="grid gap-8 md:grid-cols-2 place-items-center">
				{currencies.map((currency) => (
					<CurrencyCard key={currency.code} {...currency} />
				))}
			</div>
			{error ? (
				<p className="text-muted-foreground text-sm text-right">{error}</p>
			) : null}
		</div>
	)
}
