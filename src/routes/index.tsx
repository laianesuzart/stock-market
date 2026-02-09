import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { EChartsOption } from 'echarts'
import { SquareArrowLeft } from 'lucide-react'
import { Activity, useEffect, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { toast } from 'sonner'
import { ErrorFallback } from '@/components/error-fallback'
import { LineChart } from '@/components/line-chart'
import { Loader } from '@/components/loader'
import { type FormValues, StockForm } from '@/components/stock-form'
import { StockInfo } from '@/components/stock-info'
import { Button } from '@/components/ui/button'
import { FieldLegend, FieldSet } from '@/components/ui/field'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { getStockAssets, getStockHistory } from '@/services/stocks'
import type { Stock, TickerType } from '@/shared/types/stock'
import { addDecimalPadding } from '@/shared/utils/formatters'

export const Route = createFileRoute('/')({
	component: App,
	staleTime: 30 * 60,
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

const mapTickerType: Record<TickerType, string> = {
	stock: 'Ações',
	bdr: 'BDR',
	fund: 'Fundo de investimento',
}

function App() {
	const [chartOptions, setChartOptions] = useState<EChartsOption>({})
	const [isChartVisible, setIsChartVisible] = useState(false)
	const [stocks, setStocks] = useState<Stock[] | []>([])
	const [period, setPeriod] = useState<DateRange | null>(null)
	const [selectedTickerType, setSelectedTickerType] = useState('stock')

	const {
		data: assets = [],
		isLoading,
		isError,
		error,
	} = useQuery<string[]>({
		queryKey: ['posts', selectedTickerType],
		queryFn: async () => {
			const res = await getStockAssets(selectedTickerType)
			return res
		},
		staleTime: 60 * 60 * 60,
	})

	const handleFormSubmit = async (values: FormValues) => {
		const res = await getStockHistory(values.assets, values.dateRange)
		const options: EChartsOption = res.stockQueryPeriod.length
			? {
					legend: {
						data: res.symbols,
						type: 'scroll',
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
			: {
					title: {
						text: 'Não há dados de histórico.',
						left: 'center',
						top: 'center',
						textStyle: {
							color: '#ccc',
							fontSize: 20,
						},
					},
					xAxis: { show: false },
					yAxis: { show: false },
					series: [],
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

	useEffect(() => {
		if (isError) {
			toast.error('Erro ao buscar ativos', {
				description: error.message,
			})
		}
	}, [isError, error])

	if (isLoading) return <Loader />

	return (
		<div className="grid gap-6 md:gap-12">
			<div>
				<h2 className="text-center text-lg md:text-2xl font-bold text-balance">
					Consulta ao preço de fechamento de ativos
				</h2>
				<Activity mode={period ? 'visible' : 'hidden'}>
					<p className="text-center text-sm font-light py-2">
						{period?.from?.toLocaleDateString('pt-BR')} -{' '}
						{period?.to?.toLocaleDateString('pt-BR')}
					</p>
				</Activity>
				<div
					className={cn('max-w-md mx-auto pt-6', isChartVisible && 'hidden')}
				>
					<FieldSet>
						<FieldLegend>Tipo de ativo:</FieldLegend>
						<RadioGroup
							value={selectedTickerType}
							onValueChange={setSelectedTickerType}
							className="flex flex-col sm:flex-row sm:gap-6"
						>
							{Object.keys(mapTickerType).map((type) => (
								<div key={type} className="flex items-center gap-3">
									<RadioGroupItem value={type} id={type} />
									<Label htmlFor={type}>
										{mapTickerType[type as TickerType]}
									</Label>
								</div>
							))}
						</RadioGroup>
					</FieldSet>
				</div>
			</div>

			{isChartVisible ? (
				<div className="min-w-0 w-full lg:mx-auto max-w-5xl animate-in motion-safe:fade-in duration-300 overflow-hidden">
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
