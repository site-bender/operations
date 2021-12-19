import makeOperator from '../../mod.ts'
import type {
	Injector,
	NegateOperation,
	Operation,
} from '../../../types/operations.ts'
import type { NumberValue } from '../../../types/values.ts'
import doNegation from './doNegation/mod.ts'

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
