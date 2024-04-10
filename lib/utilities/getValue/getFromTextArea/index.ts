import { Lazy } from "../../../fp/lazy"
import { none, some } from "../../../fp/option"

type GetFromTextAreaF = (textarea: HTMLTextAreaElement) => Lazy<Option<string>>

const getFromTextArea: GetFromTextAreaF = textarea => () =>
	textarea.value ? some(textarea.value) : none

export default getFromTextArea
