import makeOperator from '..'
import { Injector, IsOddOperation, Operation } from '../../types/operations'
import { IntegerValue } from '../../types/values'
import checkIsOdd from './checkIsOdd'

export default function makeIsOdd(operation: IsOddOperation): Injector {
	const { operand } = operation as IsOddOperation

	const value = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function isOdd() {
		return checkIsOdd(value() as IntegerValue | number)
	}
}
