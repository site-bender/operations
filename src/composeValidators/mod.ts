import type { Constraint, Validation } from '../types/constraints.ts'
import { TypeOfConstraint } from '../types/enums.ts'
import not from '../utilities/not/mod.ts'
import makeAfterAlphabetically from './validators/alphabetical/makeAfterAlphabetically/mod.ts'
import makeBeforeAlphabetically from './validators/alphabetical/makeBeforeAlphabetically/mod.ts'
import makeNotAfterAlphabetically from './validators/alphabetical/makeNotAfterAlphabetically/mod.ts'
import makeNotBeforeAlphabetically from './validators/alphabetical/makeNotBeforeAlphabetically/mod.ts'
import makeAnd from './validators/composers/makeAnd/mod.ts'
import makeOr from './validators/composers/makeOr/mod.ts'
import makeXor from './validators/composers/makeXor/mod.ts'
import makeAfterDate from './validators/date/makeAfterDate/mod.ts'
import makeBeforeDate from './validators/date/makeBeforeDate/mod.ts'
import makeOnOrAfterDate from './validators/date/makeOnOrAfterDate/mod.ts'
import makeOnOrBeforeDate from './validators/date/makeOnOrBeforeDate/mod.ts'
import makeAfterDateTime from './validators/datetime/makeAfterDateTime/mod.ts'
import makeBeforeDateTime from './validators/datetime/makeBeforeDateTime/mod.ts'
import makeAtLeastNCharacters from './validators/length/makeAtLeastNCharacters/mod.ts'
import makeAtMostNCharacters from './validators/length/makeAtMostNCharacters/mod.ts'
import makeExactlyNCharacters from './validators/length/makeExactlyNCharacters/mod.ts'
import makeFewerThanNCharacters from './validators/length/makeFewerThanNCharacters/mod.ts'
import makeMoreThanNCharacters from './validators/length/makeMoreThanNCharacters/mod.ts'
import makeAtLeastN from './validators/number/makeAtLeastN/mod.ts'
import makeAtMostN from './validators/number/makeAtMostN/mod.ts'
import makeEqualToN from './validators/number/makeEqualToN/mod.ts'
import makeLessThanN from './validators/number/makeLessThanN/mod.ts'
import makeMoreThanN from './validators/number/makeMoreThanN/mod.ts'
import makeNotEqualToN from './validators/number/makeNotEqualToN/mod.ts'
import makeConfirmation from './validators/other/makeConfirmation/mod.ts'
import makeMatch from './validators/other/makeMatch/mod.ts'
import makeIsOrderedList from './validators/sequence/makeIsOrderedList/mod.ts'
import makeIsReversedList from './validators/sequence/makeIsReversedList/mod.ts'
import makeDisjointSet from './validators/set/makeDisjointSet/mod.ts'
import makeMember from './validators/set/makeMember/mod.ts'
import makeOverlappingSet from './validators/set/makeOverlappingSet/mod.ts'
import makeSubset from './validators/set/makeSubset/mod.ts'
import makeSuperset from './validators/set/makeSuperset/mod.ts'
import makeIsArray from './validators/static/makeIsArray/mod.ts'
import makeIsBoolean from './validators/static/makeIsBoolean/mod.ts'
import makeIsDate from './validators/static/makeIsDate/mod.ts'
import makeIsDateTime from './validators/static/makeIsDateTime/mod.ts'
import makeIsDuration from './validators/static/makeIsDuration/mod.ts'
import makeIsFraction from './validators/static/makeIsFraction/mod.ts'
import makeIsInstant from './validators/static/makeIsInstant/mod.ts'
import makeIsInteger from './validators/static/makeIsInteger/mod.ts'
import makeIsList from './validators/static/makeIsList/mod.ts'
import makeIsMap from './validators/static/makeIsMap/mod.ts'
import makeIsMember from './validators/static/makeIsMember/mod.ts'
import makeIsMonthDay from './validators/static/makeIsMonthDay/mod.ts'
import makeIsPrecision from './validators/static/makeIsPrecision/mod.ts'
import makeIsReal from './validators/static/makeIsReal/mod.ts'
import makeIsSet from './validators/static/makeIsSet/mod.ts'
import makeIsString from './validators/static/makeIsString/mod.ts'
import makeIsTimeZone from './validators/static/makeIsTimeZone/mod.ts'
import makeIsYearMonth from './validators/static/makeIsYearMonth/mod.ts'
import makeIsZonedDateTime from './validators/static/makeIsZonedDateTime/mod.ts'

const validators = {
	[TypeOfConstraint.AFTER_ALPHABETICALLY]: makeAfterAlphabetically,
	[TypeOfConstraint.AFTER_DATE]: makeAfterDate,
	[TypeOfConstraint.AFTER_DATE_TIME]: makeAfterDateTime,
	[TypeOfConstraint.AND]: makeAnd,
	[TypeOfConstraint.AT_LEAST_N]: makeAtLeastN,
	[TypeOfConstraint.AT_LEAST_N_CHARACTERS]: makeAtLeastNCharacters,
	[TypeOfConstraint.AT_MOST_N]: makeAtMostN,
	[TypeOfConstraint.AT_MOST_N_CHARACTERS]: makeAtMostNCharacters,
	[TypeOfConstraint.BEFORE_ALPHABETICALLY]: makeBeforeAlphabetically,
	[TypeOfConstraint.BEFORE_DATE]: makeBeforeDate,
	[TypeOfConstraint.BEFORE_DATE_TIME]: makeBeforeDateTime,
	[TypeOfConstraint.CONFIRMED]: makeConfirmation,
	[TypeOfConstraint.DISJOINT_SET]: makeDisjointSet,
	[TypeOfConstraint.EQUAL_TO_N]: makeEqualToN,
	[TypeOfConstraint.EXACTLY_N_CHARACTERS]: makeExactlyNCharacters,
	[TypeOfConstraint.FEWER_THAN_N_CHARACTERS]: makeFewerThanNCharacters,
	[TypeOfConstraint.IS_ARRAY]: makeIsArray,
	[TypeOfConstraint.IS_BOOLEAN]: makeIsBoolean,
	[TypeOfConstraint.IS_DATE]: makeIsDate,
	[TypeOfConstraint.IS_DATE_TIME]: makeIsDateTime,
	[TypeOfConstraint.IS_DURATION]: makeIsDuration,
	[TypeOfConstraint.IS_FRACTION]: makeIsFraction,
	[TypeOfConstraint.IS_INSTANT]: makeIsInstant,
	[TypeOfConstraint.IS_INTEGER]: makeIsInteger,
	[TypeOfConstraint.IS_LIST]: makeIsList,
	[TypeOfConstraint.IS_MAP]: makeIsMap,
	[TypeOfConstraint.IS_MEMBER]: makeIsMember,
	[TypeOfConstraint.IS_MONTH_DAY]: makeIsMonthDay,
	[TypeOfConstraint.IS_PRECISION]: makeIsPrecision,
	[TypeOfConstraint.IS_REAL]: makeIsReal,
	[TypeOfConstraint.IS_SET]: makeIsSet,
	[TypeOfConstraint.IS_STRING]: makeIsString,
	[TypeOfConstraint.IS_TIME_ZONE]: makeIsTimeZone,
	[TypeOfConstraint.IS_YEAR_MONTH]: makeIsYearMonth,
	[TypeOfConstraint.IS_ZONED_DATE_TIME]: makeIsZonedDateTime,
	[TypeOfConstraint.LESS_THAN_N]: makeLessThanN,
	[TypeOfConstraint.MATCHING]: makeMatch,
	[TypeOfConstraint.MEMBER]: makeMember,
	[TypeOfConstraint.MORE_THAN_N]: makeMoreThanN,
	[TypeOfConstraint.MORE_THAN_N_CHARACTERS]: makeMoreThanNCharacters,
	[TypeOfConstraint.NOT_AFTER_ALPHABETICALLY]: makeNotAfterAlphabetically,
	[TypeOfConstraint.NOT_BEFORE_ALPHABETICALLY]: makeNotBeforeAlphabetically,
	[TypeOfConstraint.NOT_EQUAL_TO_N]: makeNotEqualToN,
	[TypeOfConstraint.ON_OR_AFTER_DATE]: makeOnOrAfterDate,
	[TypeOfConstraint.ON_OR_BEFORE_DATE]: makeOnOrBeforeDate,
	[TypeOfConstraint.OR]: makeOr,
	[TypeOfConstraint.ORDERED_LIST]: makeIsOrderedList,
	[TypeOfConstraint.OVERLAPPING_SET]: makeOverlappingSet,
	[TypeOfConstraint.REVERSED_LIST]: makeIsReversedList,
	[TypeOfConstraint.SUBSET]: makeSubset,
	[TypeOfConstraint.SUPERSET]: makeSuperset,
	[TypeOfConstraint.XOR]: makeXor,
}

function noOp(validation: Validation): Validation {
	return validation
}

export default function composeValidators(
	constraint: Constraint,
): (validation: Validation) => Validation {
	if (not(constraint)) {
		return noOp
	}

	const validator = validators[
		constraint.constraintType as TypeOfConstraint
	] as (constraint: Constraint) => (validation: Validation) => Validation

	return validator ? validator(constraint) : () => ({} as Validation)
}
