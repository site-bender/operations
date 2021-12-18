import makeOperator from '../../../../makeOperator'
import type {
	FewerThanNCharactersConstraint,
	Validation,
} from '../../../../types/constraints'
import { Operation } from '../../../../types/operations'
import { IntegerValue } from '../../../../types/values'
import makeError from '../../../utilities/makeError'

export default function makeFewerThanNCharacters(
	constraint: FewerThanNCharactersConstraint,
): (validation: Validation) => Validation {
	const { match, operand } = constraint
	const matcher = typeof match === 'string' ? new RegExp(match) : match
	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function fewerThanNCharacters(validation: Validation): Validation {
		const injected = injector() as IntegerValue | number
		const testValue: number =
			typeof injected === 'object' && 'value' in injected
				? injected.value
				: injected

		const value: string | Array<string> =
			(matcher
				? (validation.value as string).match(matcher)
				: (validation.value as string)) || ''

		return value.length < testValue
			? validation
			: makeError(validation, constraint)
	}
}
