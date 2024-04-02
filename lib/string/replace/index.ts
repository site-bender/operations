type ReplaceF = (
	re: RegExp | string,
) => (substitute: string) => (str: string) => string

const replace: ReplaceF = re => substitute => str => str.replace(re, substitute)

export default replace
