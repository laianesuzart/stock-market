import { Link } from '@tanstack/react-router'
import { Activity, Menu, X } from 'lucide-react'
import { type PropsWithChildren, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { ModeToggle } from './mode-toggle'

export function Layout({ children }: PropsWithChildren) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="min-h-dvh flex flex-col">
			<header className="p-4 flex items-center justify-between bg-sidebar shadow-md">
				<div className="flex items-center gap-4">
					<Button
						onClick={() => setIsOpen(true)}
						variant="ghost"
						size="icon"
						aria-label="Abrir menu"
					>
						<Menu className="size-6" />
					</Button>

					<h1 className="text-xl font-semibold">
						<Link to="/">Stock Market</Link>
					</h1>
				</div>
				<div>
					<ModeToggle />
				</div>
			</header>

			<aside
				className={cn(
					'fixed top-0 left-0 h-full w-80 bg-sidebar shadow-2xl z-50 transition-transform duration-300 ease-in-out flex flex-col',
					isOpen ? 'translate-x-0' : '-translate-x-full',
				)}
			>
				<div className="flex items-center justify-between p-4 border-b border-sidebar-border">
					<h2 className="text-xl font-bold">Stock Market</h2>
					<Button
						onClick={() => setIsOpen(false)}
						variant="ghost"
						size="icon"
						aria-label="Fechar menu"
					>
						<X className="size-6" />
					</Button>
				</div>

				<nav className="flex-1 p-4 overflow-y-auto">
					<Link
						to="/"
						onClick={() => setIsOpen(false)}
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent transition-colors mb-2"
						activeProps={{
							className:
								'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-primary!',
						}}
					>
						<Activity size={20} />
						<span className="font-medium">Ações</span>
					</Link>
				</nav>
			</aside>

			<main className="grow py-8 md:py-10 px-6 md:px-8 w-full max-w-7xl mx-auto">
				{children}
			</main>
		</div>
	)
}
