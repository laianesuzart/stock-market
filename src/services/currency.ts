import type { Currency } from '@/shared/types/currency'
import { api } from './api'

const mockData: Currency[] = [
	{
		code: 'USD',
		name: 'Dólar',
		rate: '5.29',
		pctChange: '0.087',
	},
	{
		code: 'EUR',
		name: 'Euro',
		rate: '6.20',
		pctChange: '0.000',
	},
	{
		code: 'JPY',
		name: 'Iene',
		rate: '0.03',
		pctChange: '0.072',
	},
	{
		code: 'GBP',
		name: 'Libra Esterlina',
		rate: '7.22',
		pctChange: '-0.000',
	},
]

export async function getMajorCurrencies(): Promise<
	[Currency[], string | null]
> {
	try {
		const res = await api.get('currency/majors').json<{
			currencies: Currency[]
		}>()

		return [res.currencies, null]
	} catch {
		return [mockData, 'Dados de 25/01/2026.']
	}
}
