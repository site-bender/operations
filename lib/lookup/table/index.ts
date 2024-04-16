import { e, o } from "@sitebender/fp"
import { pipe } from "@sitebender/fp/lib/functions"
import { TableLookupOperation } from "../../types"
import { Either } from "@sitebender/fp/lib/either"
import getComparator from "../../logical/compareNumbers/getComparator"
import liftNumeric from "../../operations/liftNumerical"
import evaluateInjectableOperation from "../../operations/compose/evaluateInjectableOperation"

type TableLookup = (op: TableLookupOperation) => () => Either<string[], number>

const tableLookup: TableLookup = op => {
	//TODO this needs to go into @sitebender/fp
	const toEither = pipe(
		e.right<number>,
		o.match(() => e.left(["missing test parameter"])),
	)

	return pipe(
		evaluateInjectableOperation(op.operand)(),
		e.flatMap(arg =>
			pipe(
				op.test.find(t =>
					pipe(
						liftNumeric(t.operands.test),
						e.flatMap(toEither),
						e.flatMap(test =>
							pipe(
								getComparator(t.operands.operation),
								e.map(comparator => comparator(test)(Number(arg))),
							),
						),
					),
				),
				o.fromNullable,
				o.map(_ => e.right(_.value)),
				o.getOrElse(() => e.left([`All lookup tests failed for value ${arg}`])),
			),
		),
		result => () => result,
	)
}

export default tableLookup
