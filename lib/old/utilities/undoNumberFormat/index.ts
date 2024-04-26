export type UndoNumberFormatF = (
	locale?: string,
) => (value: number | string) => number | string

const undoNumberFormat: UndoNumberFormatF =
	(locale = "en") =>
	value => {
		const group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, "")
		const decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "")

		const undoneValue = value
			.toString()
			.replace(new RegExp("\\" + group, "g"), "")
			.replace(new RegExp("\\" + decimal, "g"), ".")
		// Is there a way to do this with NumberFormat?

		return Number(undoneValue)
	}

export default undoNumberFormat
