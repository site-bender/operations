import makeOperator from '../../mod.js'
import {
	Injector,
	IsOddOperation,
	Operation,
} from '../../../types/operations.js'
import { IntegerValue } from '../../../types/values.js'
import checkIsOdd from './checkIsOdd/mod.js'

export default function makeIsOdd(operation: IsOddOperation): Injector {
	const { operand } = operation as IsOddOperation

	const value = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function isOdd() {
		return checkIsOdd(value() as IntegerValue | number)
	}
}
