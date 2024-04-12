import { Lazy } from "../../../fp/lazy"
import { none, some } from "../../../fp/option"

type GetFromCheckboxF = (input: HTMLInputElement) => Lazy<Option<string>>

const getFromCheckbox: GetFromCheckboxF = input => {
	return () => (input.checked && input.value ? some(input.value) : none)
}

export default getFromCheckbox
