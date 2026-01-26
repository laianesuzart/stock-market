import type { ErrorComponentProps } from '@tanstack/react-router'
import { Button } from '../ui/button'

export function ErrorFallback({ reset }: ErrorComponentProps) {
	return (
		<div className="absolute inset-0 bottom-1/4 px-4 grid gap-6 place-content-center text-center text-balance">
			<h2 className="text-xl font-bold">Não foi possível carregar os dados</h2>
			<p className="text-sm">
				Verifique sua conexão ou tente novamente mais tarde.
			</p>

			<Button onClick={reset} className="w-fit mx-auto">
				Tentar novamente
			</Button>
		</div>
	)
}
