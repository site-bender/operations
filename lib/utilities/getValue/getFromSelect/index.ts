import { Lazy } from "@sitebender/fp/lib/lazy"
import { Option, none, some } from "@sitebender/fp/lib/option"

type GetFromSelectF = (input: HTMLSelectElement) => Lazy<Option<string>>

const getFromSelect: GetFromSelectF = select => () =>
	select.value ? some(select.value) : none

export default getFromSelect
