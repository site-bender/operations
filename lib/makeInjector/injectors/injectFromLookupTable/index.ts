import * as e from "@sitebender/fp/lib/either"
import * as o from "@sitebender/fp/lib/option"
import { pipe } from "@sitebender/fp/lib/functions"
import { InjectFromLookupTableOperation } from "../../../types"
import { Option, none, some } from "@sitebender/fp/lib/option"
import getComparator from "../../../old/logical/compareNumbers/getComparator"
import liftNumeric from "../../../old/operations/liftNumerical"
import { OperationResult } from "../../../old/operations/operationResult/types"
import * as OpResult from "../../../old/operations/operationResult"
import liftInjectable from "../../../old/operations/liftInjectable"

type TableLookup = (
	op: InjectFromLookupTableOperation,
) => (input?: Option<number>) => OperationResult<number>

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
