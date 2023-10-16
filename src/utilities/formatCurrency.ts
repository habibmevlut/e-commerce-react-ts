const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency",
})

export function formatCurrency(number: number) {
    if (number === null) {
        return 0
    }
    return CURRENCY_FORMATTER.format(number)
}
