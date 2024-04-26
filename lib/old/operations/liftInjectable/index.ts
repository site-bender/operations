import {
	CastableValue,
	CastableValues,
	InjectFromArgumentOperation,
	InjectableOperation,
	Reify,
} from "../../../types"

import { right } from "@sitebender/fp/lib/either"
import { Option, none, some } from "@sitebender/fp/lib/option"
import isInjectFromArgumentOperation from "../../utilities/isInjectFromArgumentOperation"
import evaluateInjectableOperation from "../compose/evaluateInjectableOperation"
import { OperationResult } from "../operationResult/types"

export type LiftInjectableF = (
	input?: Option<Reify<CastableValue>>,
) => (
	operand:
		| Reify<CastableValue>
		| InjectFromArgumentOperation
		| InjectableOperation,
) => OperationResult<Reify<CastableValue>>

const isCastableValue = (a: any): a is Reify<CastableValue> =>
	CastableValues.includes(typeof a as any)

const liftInjectable: LiftInjectableF =
	(input = none) =>
	action => {
		return isCastableValue(action)
			? right(some(action))
			: isInjectFromArgumentOperation(action)
				? right(input)
				: evaluateInjectableOperation(action)(input)
	}

export default liftInjectable
