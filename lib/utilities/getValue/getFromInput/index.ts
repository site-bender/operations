import { Lazy } from "../../../fp/lazy"
import { none, some } from "../../../fp/option"

type GetFromInputF = (input: HTMLInputElement) => Lazy<Option<string>>

const getFromInput: GetFromInputF = input => () =>
	input.value ? some(input.value) : none

export default getFromInput
