import { Lazy } from "@sitebender/fp/lib/lazy"
import { Option, none, some } from "@sitebender/fp/lib/option"

type GetFromTextAreaF = (textarea: HTMLTextAreaElement) => Lazy<Option<string>>

const getFromTextArea: GetFromTextAreaF = textarea => () =>
	textarea.value ? some(textarea.value) : none

export default getFromTextArea
