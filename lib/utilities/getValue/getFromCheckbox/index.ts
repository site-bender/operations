import { Lazy } from "@sitebender/fp/lib/lazy"
import { Option, none, some } from "@sitebender/fp/lib/option"

type GetFromCheckboxF = (input: HTMLInputElement) => Lazy<Option<string>>

const getFromCheckbox: GetFromCheckboxF = input => {
	return () => (input.checked && input.value ? some(input.value) : none)
}

export default getFromCheckbox
