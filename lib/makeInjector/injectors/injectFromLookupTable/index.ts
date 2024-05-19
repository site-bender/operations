import type { OperationResult } from "../../../operations/operationResult/types"
import type {
	Reify,
	SbCastableValue,
	SbInjectFromLookupTable,
} from "../../../types"
import type { Option } from "@sitebender/fp/lib/option/types"

import * as OpResult from "../../../operations/operationResult"
import * as e from "@sitebender/fp/lib/either"
import * as o from "@sitebender/fp/lib/option"
import getComparator from "../../../old/logical/compareNumbers/getComparator"
import liftInjectable from "../../../old/operations/liftInjectable"
import liftNumeric from "../../../old/operations/liftNumerical"
import none from "@sitebender/fp/lib/option/none"
import pipe from "@sitebender/fp/lib/functions/pipe"
import some from "@sitebender/fp/lib/option/some"

type TableLookup = <T extends SbCastableValue>(
	op: SbInjectFromLookupTable<T>,
) => (input?: Option<number>) => OperationResult<Reify<T>>

const injectFromLookupTable: TableLookup =
	op =>
	(input = none) => {
		return pipe(
			liftInjectable(input)(op.operand),
			OpResult.flatMap(arg =>
				pipe(
					op.test.find(t =>
						pipe(
							liftNumeric(input)(t.operands.test),
							e.flatMap(o.toEither(() => ["missing test parameter"])),
							e.flatMap(test =>
								pipe(
									getComparator(t.operands.operation),
									e.map(comparator => comparator(Number(arg))(test)),
								),
							),
							e.getOrElse(() => false),
						),
					),
					o.fromNullable,
					o.map(_ => e.right(some(_.value))),
					o.getOrElse(() =>
						e.left([`All lookup tests failed for value ${arg}`]),
					),
				),
			),
		)
	}

export default injectFromLookupTable
