import { Lazy } from "../../../fp/lazy"
import { none, some } from "../../../fp/option"

type GetFromSelectF = (input: HTMLSelectElement) => Lazy<Option<string>>

const getFromSelect: GetFromSelectF = select => () =>
	select.value ? some(select.value) : none

export default getFromSelect
