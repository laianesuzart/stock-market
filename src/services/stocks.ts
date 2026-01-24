import { api } from './api'

export async function getStockAssets() {
	const res = await api.get('quote/tickers').json<{ tickers: string[] }>()
	return res.tickers
}
