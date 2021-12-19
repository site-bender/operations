import not from '../utilities/not/mod.js'
import pipe from '../utilities/pipe/mod.js'
import makeAsCurrency from './formatters/makeAsCurrency/mod.js'
import makeAsPercent from './formatters/makeAsPercent/mod.js'
import makeInsert from './formatters/makeInsert/mod.js'
import makeMaskValue from './formatters/makeMaskValue/mod.js'
import makeReplace from './formatters/makeReplace/mod.js'

import type { Formatter, MakeFormatterParameters } from './types.js'

enum TypeOfFormatter {
	AS_CURRENCY = 'AS_CURRENCY',
	AS_PERCENT = 'AS_PERCENT',
	INSERT = 'INSERT',
	MASK_VALUE = 'MASK_VALUE',
	REPLACE = 'REPLACE',
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
