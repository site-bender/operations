import { Option, none, some } from "@sitebender/fp/lib/option"

export type GetFromInnerHtmlF = (element: HTMLElement) => () => Option<string>

const getFromInnerHtml: GetFromInnerHtmlF = element => () =>
	element.innerHTML ? some(element.innerHTML.trim()) : none

export default getFromInnerHtml
