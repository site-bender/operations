import { e, o } from "@sitebender/fp"
import { pipe } from "@sitebender/fp/lib/functions"
import { TableLookupOperation } from "../../types"
import { Option, none, some } from "@sitebender/fp/lib/option"
import getComparator from "../../logical/compareNumbers/getComparator"
import liftNumeric from "../../operations/liftNumerical"
import { OperationResult } from "../../operations/operationResult/types"
import * as OpResult from "../../operations/operationResult"
import liftInjectable from "../../operations/liftInjectable"

type TableLookup = (
	op: TableLookupOperation,
) => (input?: Option<number>) => OperationResult<number>

const tableLookup: TableLookup =
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

export default tableLookup
