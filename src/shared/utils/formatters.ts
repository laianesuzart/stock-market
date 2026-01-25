export function addDecimalPadding(value: number) {
	const formatter = new Intl.NumberFormat('pt-BR', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
	return formatter.format(value)
}
