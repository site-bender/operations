import {
	MemberTypeConstraint,
	Validation,
} from "../../../../types/constraints.js"
import { TypeOfConstraint } from "../../../../types/enums.js"
import makeIsMember from "./mod.js"

const constraint: MemberTypeConstraint = {
	constraintType: TypeOfConstraint.IS_MEMBER,
}

test("[makeIsMember] returns correct validation when value is a potential member", () => {
	const validation: Validation = {
		datatype: "member",
		value: true,
	}

	expect(makeIsMember(constraint)(validation)).toEqual(validation)
})

test("[makeIsMember] returns error when value is not a potential member (undefined)", () => {
	const validation: Validation = {
		datatype: "member",
		value: undefined,
	}

	expect(makeIsMember(constraint)(validation)).toEqual({
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_MEMBER,
				constraint,
			},
		],
	})
})
