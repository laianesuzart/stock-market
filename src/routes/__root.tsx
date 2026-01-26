import { TanStackDevtools } from '@tanstack/react-devtools'
import { CatchBoundary, createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { ErrorFallback } from '@/components/error-fallback'
import { Layout } from '@/components/layout'
import { ThemeProvider } from '@/components/theme-provider'

export const Route = createRootRoute({
	component: () => (
		<ThemeProvider>
			<CatchBoundary getResetKey={() => 'reset'} errorComponent={ErrorFallback}>
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
			</CatchBoundary>
		</ThemeProvider>
	),
})
