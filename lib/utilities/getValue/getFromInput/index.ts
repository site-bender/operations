import { Lazy } from "@sitebender/fp/lib/lazy"
import { Option, none, some } from "@sitebender/fp/lib/option"

type GetFromInputF = (input: HTMLInputElement) => Lazy<Option<string>>

const getFromInput: GetFromInputF = input => () =>
	input.value ? some(input.value) : none

export default getFromInput
