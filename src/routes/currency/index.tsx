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
	const currencies = Route.useLoaderData()
	return (
		<div className="grid gap-6 md:gap-12 max-w-4xl mx-auto">
			<h2 className="text-center text-lg md:text-2xl font-bold">Moedas</h2>
			<div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] place-items-center">
				{currencies.map((currency) => (
					<CurrencyCard key={currency.code} {...currency} />
				))}
			</div>
		</div>
	)
}
