import not from "../utilities/not/mod.ts"
import pipe from "../utilities/pipe/mod.ts"
import makeAsCurrency from "./formatters/makeAsCurrency/mod.ts"
import makeAsPercent from "./formatters/makeAsPercent/mod.ts"
import makeInsert from "./formatters/makeInsert/mod.ts"
import makeMaskValue from "./formatters/makeMaskValue/mod.ts"
import makeReplace from "./formatters/makeReplace/mod.ts"

import type { Formatter, MakeFormatterParameters } from "./types.ts"

enum TypeOfFormatter {
	AS_CURRENCY = "AS_CURRENCY",
	AS_PERCENT = "AS_PERCENT",
	INSERT = "INSERT",
	MASK_VALUE = "MASK_VALUE",
	REPLACE = "REPLACE",
}

const formatterMakers = {
	[TypeOfFormatter.AS_CURRENCY]: makeAsCurrency,
	[TypeOfFormatter.AS_PERCENT]: makeAsPercent,
	[TypeOfFormatter.INSERT]: makeInsert,
	[TypeOfFormatter.MASK_VALUE]: makeMaskValue,
	[TypeOfFormatter.REPLACE]: makeReplace,
}

export default function makeFormatter(
	config: MakeFormatterParameters | Array<MakeFormatterParameters>,
): Formatter {
	if (not(config)) {
		return (value: string) => value
	}

	const params: Array<MakeFormatterParameters> = Array.isArray(config)
		? config
		: [config]

	const formatters = params.map((format: MakeFormatterParameters) => {
		const formatMaker = formatterMakers[
			format.formatType as TypeOfFormatter
		] as (format: MakeFormatterParameters) => Formatter

		return formatMaker(format)
	})

	return pipe(formatters)
}
