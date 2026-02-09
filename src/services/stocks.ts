import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import type { Stock } from '@/shared/types/stock'
import { api } from './api'

export async function getStockAssets(type = 'stock') {
	const res = await api
		.get(`quote/tickers?type=${type}`)
		.json<{ tickers: string[] }>()

	return res.tickers
}

export async function getStockHistory(assets: string[], range: DateRange) {
	const from = format(range.from as Date, 'yyyy-MM-dd')
	const to = format(range.to as Date, 'yyyy-MM-dd')
	const res = await api
		.get(`quote/${assets.join(',')}?from=${from}&to=${to}`)
		.json<{
			symbols: string[]
			stockQueryPeriod: string[]
			results: Stock[]
		}>()

	return res
}
