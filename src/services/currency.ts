import type { Currency } from '@/shared/types/currency'

const mockData: Currency[] = [
	{
		code: 'USD',
		name: 'Dólar',
		rate: '5.28',
		pctChange: '-0.172',
		referenceDatetime: '2026-01-26 19:11:49',
	},
	{
		code: 'EUR',
		name: 'Euro',
		rate: '6.27',
		pctChange: '0.987',
		referenceDatetime: '2026-01-26 19:07:43',
	},
	{
		code: 'JPY',
		name: 'Iene',
		rate: '0.034',
		pctChange: '0.798',
		referenceDatetime: '2026-01-26 19:11:49',
	},
	{
		code: 'GBP',
		name: 'Libra Esterlina',
		rate: '7.23',
		pctChange: '-0.040',
		referenceDatetime: '2026-01-26 19:12:06',
	},
]

export async function getMajorCurrencies() {
	return mockData
}
