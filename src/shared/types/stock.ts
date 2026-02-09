export type Stock = {
	symbol: string
	name: string
	logo: string
	history: number[]
}

export type TickerType = 'bdr' | 'fund' | 'stock'
