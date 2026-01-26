import { LoaderCircle } from 'lucide-react'

export function Loader() {
	return (
		<div className="absolute inset-0 bg-background opacity-60 grid place-content-center">
			<LoaderCircle size={128} className="animate-spin text-primary" />
		</div>
	)
}
