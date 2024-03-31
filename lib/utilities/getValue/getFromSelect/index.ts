import { none, some } from "../../../fp/option"
import { IO } from "fp-ts/IO"

type GetFromSelectF = (input: HTMLSelectElement) => IO<Option<string>>

const getFromSelect: GetFromSelectF = select => () =>
	select.value ? some(select.value) : none

export default getFromSelect
