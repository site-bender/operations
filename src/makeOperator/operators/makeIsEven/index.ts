import makeOperator from '..'
import { Injector, IsEvenOperation, Operation } from '../../types/operations'
import { IntegerValue } from '../../types/values'
import checkIsEven from './checkIsEven'

export default function makeIsEven(operation: IsEvenOperation): Injector {
	const { operand } = operation as IsEvenOperation

	const value = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function isEven() {
		return checkIsEven(value() as IntegerValue | number)
	}
}
