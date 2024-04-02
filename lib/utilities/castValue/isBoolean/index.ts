import { left, right } from "../../../fp/either"

const isTrue = /^(t|true)$/i
const isFalse = /^(f|false)$/i

export type IsBooleanF = (value: string) => Either<Array<string>, boolean>

const isBoolean: IsBooleanF = value =>
	isTrue.test(value)
		? right(true)
		: isFalse.test(value)
			? right(false)
			: left(["Value is not a boolean"])

export default isBoolean
