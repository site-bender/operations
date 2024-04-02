import { none, some } from "../../../fp/option"
import { IO } from "fp-ts/IO"

type GetFromCheckboxF = (input: HTMLInputElement) => IO<Option<string>>

const getFromCheckbox: GetFromCheckboxF = input => {
	return () => (input.checked && input.value ? some(input.value) : none)
}

export default getFromCheckbox
