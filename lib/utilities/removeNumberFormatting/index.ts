export default function reverseFormatNumber(
	value: number | string,
	locale = "en",
): number | string {
	const group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, "")
	const decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "")
	const reversedVal = value
		.toString()
		.replace(new RegExp("\\" + group, "g"), "")
		.replace(new RegExp("\\" + decimal, "g"), ".")

	return Number.isNaN(reversedVal) ? value : Number(reversedVal)
}
