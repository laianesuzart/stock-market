import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowDown, ArrowUp } from 'lucide-react'
import euroflag from '@/assets/euro-flag.png'
import japanflag from '@/assets/japan-flag.png'
import ukflag from '@/assets/uk-flag.png'
import usaflag from '@/assets/usa-flag.png'
import { cn } from '@/lib/utils'
import type { Currency } from '@/shared/types/currency'
import { formatCurrency, formatDecimalString } from '@/shared/utils/formatters'

type CurrecyCardProps = {} & Currency

const currencyFlagMap = {
	JPY: japanflag,
	USD: usaflag,
	EUR: euroflag,
	GBP: ukflag,
}

export function CurrencyCard({
	code,
	name,
	rate,
	pctChange,
	referenceDatetime,
}: CurrecyCardProps) {
	const hasIncreasedRate = Number(pctChange) > 0

	return (
		<div className="w-full flex flex-col gap-8  max-w-96 lg:max-w-[unset] p-6 md:p-8 rounded-md shadow-md dark:border dark:shadow-2xl">
			<div className="flex justify-between">
				<div className="flex gap-2">
					<img
						src={currencyFlagMap[code]}
						alt={`Bandeira: ${name}`}
						className="size-12 object-cover rounded-full shadow-lg"
					/>
					<div className="flex flex-col">
						<span className="text-2xl font-bold">{code}</span>
						<span>{name}</span>
					</div>
				</div>
				<div>
					<span className="text-2xl font-medium leading-normal">
						{formatCurrency(rate)}
					</span>
					{Number(pctChange) !== 0 && (
						<div className="flex gap-1 items-center justify-end">
							<span
								className={cn(
									hasIncreasedRate ? 'text-green-600' : 'text-destructive',
								)}
							>
								{hasIncreasedRate ? (
									<ArrowUp size={16} />
								) : (
									<ArrowDown size={16} />
								)}
							</span>
							<span className="text-sm">{formatDecimalString(pctChange)}%</span>
						</div>
					)}
				</div>
			</div>
			<p className="text-xs text-muted-foreground text-right">
				<time dateTime={referenceDatetime}>
					{format(referenceDatetime, "dd 'de' MMM., HH:mm", {
						locale: ptBR,
					})}
				</time>
			</p>
		</div>
	)
}
