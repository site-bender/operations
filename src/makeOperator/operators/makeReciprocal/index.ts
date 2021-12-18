import makeOperator from '..'
import {
	Injector,
	Operation,
	ReciprocalOperation,
} from '../../types/operations'
import { NumberValue } from '../../types/values'
import getReciprocal from './getReciprocal'

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
