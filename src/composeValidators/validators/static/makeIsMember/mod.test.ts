import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import {
	MemberTypeConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import makeIsMember from "./mod.ts"

const constraint: MemberTypeConstraint = {
	constraintType: TypeOfConstraint.IS_MEMBER,
}

Deno.test(
	"[makeIsMember] returns correct validation when value is a potential member",
	() => {
		const validation: Validation = {
			datatype: "member",
			value: true,
		}

		assertEquals(makeIsMember(constraint)(validation), validation)
	},
)

Deno.test(
	"[makeIsMember] returns error when value is not a potential member (undefined)",
	() => {
		const validation: Validation = {
			datatype: "member",
			value: undefined,
		}

		assertEquals(makeIsMember(constraint)(validation), {
			...validation,
			isInvalid: true,
			errors: [
				{
					error: TypeOfConstraint.IS_MEMBER,
					constraint,
				},
			],
		})
	},
)
