import { createFileRoute } from '@tanstack/react-router'
import type { EChartsOption } from 'echarts'
import { SquareArrowLeft } from 'lucide-react'
import { Activity, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { ErrorFallback } from '@/components/error-fallback'
import { LineChart } from '@/components/line-chart'
import { Loader } from '@/components/loader'
import { type FormValues, StockForm } from '@/components/stock-form'
import { StockInfo } from '@/components/stock-info'
import { Button } from '@/components/ui/button'
import { getStockAssets, getStockHistory } from '@/services/stocks'
import type { Stock } from '@/shared/types/stock'
import { addDecimalPadding } from '@/shared/utils/formatters'

export const Route = createFileRoute('/')({
	component: App,
	loader: () => getStockAssets(),
	staleTime: 30 * 60,
	pendingComponent: Loader,
	pendingMs: 300,
	errorComponent: ErrorFallback,
})
const baseOptions: EChartsOption = {
	title: {
		text: 'Histórico de fechamento',
		textStyle: {
			fontSize: 14,
		},
	},
	tooltip: {
		trigger: 'axis',
		confine: true,
		valueFormatter: (value) => {
			return value ? addDecimalPadding(Number(value)) : '-'
		},
	},

	toolbox: {
		feature: {
			saveAsImage: {
				title: 'Salvar como imagem',
			},
		},
	},
	yAxis: {
		type: 'value',
	},
}

function App() {
	const [chartOptions, setChartOptions] = useState<EChartsOption>({})
	const [isChartVisible, setIsChartVisible] = useState(false)
	const [stocks, setStocks] = useState<Stock[] | []>([])
	const [period, setPeriod] = useState<DateRange | null>(null)
	const assets = Route.useLoaderData()

	const handleFormSubmit = async (values: FormValues) => {
		const res = await getStockHistory(values.assets, values.dateRange)
		const options: EChartsOption = {
			legend: {
				data: res.symbols,
			},
			xAxis: {
				type: 'category',
				data: res.stockQueryPeriod,
			},
			series: res.results.map((item) => ({
				name: item.symbol,
				type: 'line',
				data: item.history,
			})),
		}

		setChartOptions({ ...baseOptions, ...options })
		setIsChartVisible(true)
		setStocks(res.results)
		setPeriod(values.dateRange)
	}

	const displayForm = () => {
		setIsChartVisible(false)
		setChartOptions({})
		setStocks([])
		setPeriod(null)
	}

	return (
		<div className="grid gap-6 md:gap-12">
			<div>
				<h2 className="text-center text-lg md:text-2xl font-bold text-balance">
					Consulta ao preço de fechamento das ações
				</h2>
				<Activity mode={period ? 'visible' : 'hidden'}>
					<p className="text-center text-sm font-light py-2">
						{period?.from?.toLocaleDateString('pt-BR')} -{' '}
						{period?.to?.toLocaleDateString('pt-BR')}
					</p>
				</Activity>
			</div>

			{isChartVisible ? (
				<div className="min-w-0 w-full lg:mx-auto  max-w-5xl animate-in motion-safe:fade-in duration-300 overflow-hidden">
					<LineChart options={chartOptions} />
					<div className="flex justify-end pt-8">
						<Button variant="outline" onClick={displayForm}>
							<SquareArrowLeft /> Nova consulta
						</Button>
					</div>
					<div className="flex flex-col gap-2 py-8">
						{stocks.map((stock) => (
							<StockInfo key={stock.symbol} {...stock} />
						))}
					</div>
				</div>
			) : (
				<StockForm assets={assets} onSubmit={handleFormSubmit} />
			)}
		</div>
	)
}
