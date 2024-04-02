import { none, some } from "../../../fp/option"
import { IO } from "fp-ts/IO"

type GetFromTextAreaF = (textarea: HTMLTextAreaElement) => IO<Option<string>>

const getFromTextArea: GetFromTextAreaF = textarea => () =>
	textarea.value ? some(textarea.value) : none

export default getFromTextArea
