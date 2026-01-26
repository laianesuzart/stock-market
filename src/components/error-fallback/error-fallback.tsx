import { type ErrorComponentProps, useRouter } from '@tanstack/react-router'
import { Button } from '../ui/button'

export function ErrorFallback({ reset }: ErrorComponentProps) {
	const router = useRouter()
	const handleReset = () => {
		router.invalidate()
		reset()
	}
	return (
		<div className="min-h-[50vh] px-4 grid gap-6 place-content-center text-center text-balance">
			<h2 className="text-xl font-bold">Não foi possível carregar os dados</h2>
			<p className="text-sm">
				Verifique sua conexão ou tente novamente mais tarde.
			</p>

			<Button onClick={handleReset} className="w-fit mx-auto">
				Tentar novamente
			</Button>
		</div>
	)
}
