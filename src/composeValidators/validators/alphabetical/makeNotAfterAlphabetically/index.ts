import makeOperator from '../../../../makeOperator'
import type {
	NotAfterAlphabeticallyConstraint,
	Validation,
} from '../../../../types/constraints'
import { Operation } from '../../../../types/operations'
import type { StringValue } from '../../../../types/values'
import localeCompareSupportsLocales from '../../../utilities/localCompareSupportsLocales'
import makeError from '../../../utilities/makeError'

export default function makeNotAfterAlphabetically(
	constraint: NotAfterAlphabeticallyConstraint,
): (validation: Validation) => Validation {
	const { operand } = constraint
	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function notAfterAlphabetically(validation: Validation): Validation {
		const { language = 'en', options } = constraint

		const injected = injector()
		const testValue =
			typeof injected === 'string' ? injected : (injected as StringValue).value

		/* istanbul ignore next */
		const order = localeCompareSupportsLocales()
			? ((testValue as string) || '').localeCompare(
					validation.value as string,
					language,
					options,
			  )
			: ((testValue as string) || '').localeCompare(validation.value as string)

		return order >= 0 ? validation : makeError(validation, constraint)
	}
}
