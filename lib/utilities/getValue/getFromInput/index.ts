import { none, some } from "../../../fp/option"
import { IO } from "fp-ts/IO"

type GetFromInputF = (input: HTMLInputElement) => IO<Option<string>>

const getFromInput: GetFromInputF = input => () =>
	input.value ? some(input.value) : none

export default getFromInput
