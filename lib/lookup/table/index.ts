import { e, o } from "@sitebender/fp"
import { pipe } from "@sitebender/fp/lib/functions"
import { lessThan } from "../../logical"
import { TableLookupOperation } from "../../types"
import { Either } from "@sitebender/fp/lib/either"

type TableLookup = (
	op: TableLookupOperation,
) => (arg: number) => Either<string[], number>

const tableLookup: TableLookup = op => arg =>
	pipe(
		op.test.find(t => lessThan(arg)(t.operands.operand)),
		o.fromNullable,
		o.map(_ => e.right(_.value)),
		o.getOrElse(() => e.left([`All lookup tests failed for value ${arg}`])),
	)

export default tableLookup
