import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import type {
	MemberConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import member from "./mod.ts"

const constraint: MemberConstraint = {
	constraintType: TypeOfConstraint.MEMBER,
	operand: ["red", "green", "blue"],
}

Deno.test(
	"[member] returns correct validation when value is a member of constraint set",
	() => {
		const validation: Validation = {
			datatype: "member",
			value: "green",
		}

		assertEquals(member(constraint)(validation), validation)
	},
)

Deno.test("[member] works when constraint set is a string", () => {
	const validation: Validation = {
		datatype: "member",
		value: "green",
	}

	assertEquals(
		member({
			...constraint,
			operand: "red,green,blue",
		})(validation),
		validation,
	)
})

Deno.test("[member] works when constraint set is a Set", () => {
	const validation: Validation = {
		datatype: "member",
		value: "green",
	}

	assertEquals(
		member({
			...constraint,
			operand: new Set(["red", "green", "blue"]),
		})(validation),
		validation,
	)
})

Deno.test(
	"[disjointSet] returns error if value is not a member of the constraint set",
	() => {
		const validation: Validation = {
			datatype: "member",
			value: "orange",
		}

		assertEquals(member(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.MEMBER,
				},
			],
			isInvalid: true,
		})
	},
)
