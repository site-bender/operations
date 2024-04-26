import { isLeft, left, right, isRight } from "@sitebender/fp/lib/either"
import { some, none, Option } from "@sitebender/fp/lib/option"
type Unique = <T>(arr: Array<T>) => Array<T>

const unique: Unique = arr =>
	arr.filter((value, index, self) => self.indexOf(value) === index)

const and = op => n => {
	const ops = op.operands.map(operand =>
		typeof operand === "object" ? composeOperations(operand)(n) : operand,
	)

	const lefts = ops.filter(r => isLeft(r))

	if (lefts.length) {
		return left(unique(lefts.reduce((a, l) => a.concat(l.left), [])))
	}

	return ops[0]
}

const or = op => n => {
	const ops = op.operands.map(operand =>
		typeof operand === "object" ? composeOperations(operand)(n) : operand,
	)

	const lefts = ops.filter(r => isLeft(r))

	if (lefts.length === ops.length) {
		return left(unique(lefts.reduce((a, l) => a.concat(l.left), [])))
	}

	return ops.find(r => !isLeft(r))
}

const lessThan = op => n => {
	const { operand, test } = op

	const o =
		typeof operand === "object"
			? operand.operation === "injectFromArgument"
				? n
				: composeOperations(operand)(n)
			: operand
	const t = typeof test === "number" ? test : composeOperations(test)(n)

	const out = o < t ? right(some(o)) : left(["well, shit"])

	return out
}

const moreThan = op => n => {
	const { operand, test } = op

	const o =
		typeof operand === "object"
			? operand.operation === "injectFromArgument"
				? n
				: composeOperations(operand)(n)
			: operand
	const t = typeof test === "number" ? test : composeOperations(test)(n)

	const out = o > t ? right(some(o)) : left(["well, golly"])

	return out
}

const composeOperations = op => {
	switch (op.operation) {
		case "and":
			return and(op)
		case "or":
			return or(op)
		case "lessThan":
			return lessThan(op)
		case "moreThan":
			return moreThan(op)
		default:
			return () => left(["Ouch"])
	}
}
