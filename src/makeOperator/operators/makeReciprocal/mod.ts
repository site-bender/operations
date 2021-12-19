import makeOperator from '../../mod.ts'
import {
	Injector,
	Operation,
	ReciprocalOperation,
} from '../../../types/operations.ts'
import type { NumberValue } from '../../../types/values.ts'
import getReciprocal from './getReciprocal/mod.ts'

export default function makeReciprocal(
	operation: ReciprocalOperation,
): Injector {
	const { operand } = operation as ReciprocalOperation

	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function reciprocal() {
		return getReciprocal(injector() as NumberValue | number)
	}
}
