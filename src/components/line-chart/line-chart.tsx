import type { EChartsOption } from 'echarts'
import { LineChart as EchartLineChart } from 'echarts/charts'
import {
	GridComponent,
	LegendComponent,
	LegendPlainComponent,
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import ReactEChartsCore from 'echarts-for-react/lib/core'

echarts.use([
	TitleComponent,
	TooltipComponent,
	LegendPlainComponent,
	LegendComponent,
	GridComponent,
	ToolboxComponent,
	EchartLineChart,
	CanvasRenderer,
])

type LineChartProps = {
	options: EChartsOption
}

echarts.registerTheme('light_theme', {
	backgroundColor: '#fefefe',
})

export function LineChart({ options }: LineChartProps) {
	return (
		<ReactEChartsCore
			echarts={echarts}
			option={options}
			notMerge={true}
			lazyUpdate={true}
			theme="light_theme"
			style={{ width: '100%', minHeight: 400 }}
		/>
	)
}
