import ky from 'ky'
import { toast } from 'sonner'

export const api = ky.create({
	prefixUrl: import.meta.env.VITE_STOCK_API_BASE_URL,
	retry: 1,
	hooks: {
		afterResponse: [
			async (_request, _options, response) => {
				if (!response.ok) {
					toast.error('Erro na solicitação', {
						description: 'Tente novamente mais tarde.',
					})
				}
			},
		],
	},
})
