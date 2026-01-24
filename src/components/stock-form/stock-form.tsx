import { useForm } from '@tanstack/react-form'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
	useComboboxAnchor,
} from '@/components/ui/combobox'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const MAX_ASSETS = 6
const formSchema = z.object({
	assets: z
		.array(z.string())
		.min(1, 'Selecione pelo menos 1 ativo.')
		.max(MAX_ASSETS),
	dateRange: z.object({
		from: z.date(),
		to: z.date(),
	}),
})

const formateDate = (date: Date) =>
	format(date, 'dd/MM/y', {
		locale: ptBR,
	})

type StockFormProps = {
	assets: string[]
}
export function StockForm({ assets }: StockFormProps) {
	const anchor = useComboboxAnchor()

	const form = useForm({
		defaultValues: {
			assets: [] as string[],
			dateRange: { from: undefined, to: undefined } as DateRange | undefined,
		},
		validators: {
			onChange: formSchema,
		},
		onSubmit: async ({ value }) => {
			await new Promise((res) =>
				setTimeout(() => {
					res(console.log('Formulário Válido:', value))
				}, 1000),
			)
		},
	})

	return (
		<div className="max-w-md w-full p-6 space-y-4 border rounded-lg shadow-sm">
			<h3 className="font-semibold ">Informações para consulta</h3>

			<form
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					form.handleSubmit()
				}}
				className="space-y-6"
			>
				<form.Field name="assets">
					{(field) => {
						const currentValues = field.state.value
						const isMaxReached = currentValues.length >= MAX_ASSETS
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>
									Ativos (entre 1 e 6 ativos)
								</FieldLabel>
								<Combobox
									multiple
									autoHighlight
									items={assets}
									value={field.state.value}
									onValueChange={(val) => field.handleChange(val)}
									aria-invalid={isInvalid}
								>
									<ComboboxChips
										ref={anchor}
										className={cn(
											isInvalid &&
												'border-destructive focus-within:ring-destructive',
										)}
									>
										<ComboboxValue>
											{(values) => (
												<React.Fragment>
													{values.map((value: string) => (
														<ComboboxChip key={value}>{value}</ComboboxChip>
													))}
													<ComboboxChipsInput
														placeholder={
															values.length > 0 ? '' : 'Selecione...'
														}
													/>
												</React.Fragment>
											)}
										</ComboboxValue>
									</ComboboxChips>

									<ComboboxContent anchor={anchor}>
										<ComboboxEmpty>Nenhum ativo encontrado.</ComboboxEmpty>
										<ComboboxList>
											{(item) => {
												const isSelected = currentValues.includes(item)
												const isDisabled = !isSelected && isMaxReached
												return (
													<ComboboxItem
														key={item}
														value={item}
														disabled={isDisabled}
														className={cn(
															'cursor-pointer',
															isDisabled &&
																'opacity-50 cursor-not-allowed text-muted-foreground',
														)}
													>
														{item}
														{isDisabled && (
															<span className="text-[10px] ml-2">(Max)</span>
														)}
													</ComboboxItem>
												)
											}}
										</ComboboxList>
									</ComboboxContent>
								</Combobox>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						)
					}}
				</form.Field>

				<form.Field name="dateRange">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.value?.from
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Período de análise</FieldLabel>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className={cn(
												'w-full justify-start font-normal text-sm',
												!field.state.value?.from && 'text-muted-foreground',
												isInvalid && 'text-destructive border-destructive',
											)}
										>
											<CalendarIcon />
											{field.state.value?.from ? (
												field.state.value.to ? (
													<>
														{formateDate(field.state.value.from)} -{' '}
														{formateDate(field.state.value.to)}
													</>
												) : (
													formateDate(field.state.value.from)
												)
											) : (
												<span>Selecione uma data</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="range"
											defaultMonth={field.state.value?.from}
											selected={field.state.value}
											onSelect={(range) => field.handleChange(range)}
											numberOfMonths={1}
											locale={ptBR}
											disabled={(date) =>
												date > new Date() || date < new Date('2000-01-01')
											}
											captionLayout="dropdown"
											aria-invalid={isInvalid}
										/>
									</PopoverContent>
								</Popover>
								{isInvalid && (
									<FieldError errors={[{ message: 'Campo obrigatório.' }]} />
								)}
							</Field>
						)
					}}
				</form.Field>

				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button type="submit" className="w-full" disabled={!canSubmit}>
							{isSubmitting ? 'Enviando...' : 'Consultar'}
						</Button>
					)}
				</form.Subscribe>
			</form>
		</div>
	)
}
