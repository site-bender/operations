import type { IO } from "fp-ts/lib/IO"
import { left, right } from "../../fp/either"

type NullableInput = { value: string } | null

type GetValue = (name: string) => IO<Either<Array<string>, string>>
export const getValue: GetValue = name => () => {
	const input = document.querySelector(`[name=${name}]`) as NullableInput
	const value = input?.value || ""

	return value == ""
		? left([`Form input \`${name}\` not found.`])
		: right(value)
}

export default getValue
