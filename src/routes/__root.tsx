import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { Layout } from '@/components/layout'
import { NotFound } from '@/components/not-found'
import { ThemeProvider } from '@/components/theme-provider'

export const Route = createRootRoute({
	notFoundComponent: NotFound,
	component: () => (
		<ThemeProvider>
			<Layout>
				<Outlet />
				<TanStackDevtools
					config={{
						position: 'bottom-right',
					}}
					plugins={[
						{
							name: 'Tanstack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
			</Layout>
		</ThemeProvider>
	),
})
