import makeOperator from '../../mod.js'
import type {
	Injector,
	NegateOperation,
	Operation,
} from '../../../types/operations.js'
import type { NumberValue } from '../../../types/values.js'
import doNegation from './doNegation/mod.js'

export default function makeNegate(operation: NegateOperation): Injector {
	const { operand } = operation as NegateOperation

	const injector = (
		(operand as Operation).operatorType
			? makeOperator(operand as Operation)
			: () => operand
	) as Injector

	return function negate() {
		return doNegation(injector() as NumberValue | number)
	}
}
