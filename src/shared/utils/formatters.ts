export function addDecimalPadding(value: number) {
	const formatter = new Intl.NumberFormat('pt-BR', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
	return formatter.format(value)
}

export function formatCurrency(value: string | number) {
	const formatter = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		maximumFractionDigits: 3,
	})
	return formatter.format(Number(value))
}

export function formatDecimalString(value: string) {
	return value.replace('.', ',')
}
