import ky from 'ky'

export const api = ky.create({
	prefixUrl: import.meta.env.VITE_STOCK_API_BASE_URL,
	retry: 1,
})
