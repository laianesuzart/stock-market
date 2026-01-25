import { format } from 'date-fns'
import type { Stock } from '@/shared/types/stock'
import { api } from './api'

export async function getStockAssets() {
	const res = await api.get('quote/tickers').json<{ tickers: string[] }>()
	return res.tickers
}

export async function getStockHistory(
	assets: string[],
	range: { from: Date; to: Date },
) {
	const from = format(range.from, 'yyyy-MM-dd')
	const to = format(range.to, 'yyyy-MM-dd')
	const res = await api
		.get(`quote/${assets.join(',')}?from=${from}&to=${to}`)
		.json<{
			symbols: string[]
			stockQueryPeriod: string[]
			results: Stock[]
		}>()

	return res
}
