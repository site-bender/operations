type JoinF = (separator: string) => (arr: Array<string>) => string
const join: JoinF = separator => arr => arr.join(separator)

export default join
