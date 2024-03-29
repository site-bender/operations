type JoinF = (conj: string) => (arr: Array<string>) => string
const join: JoinF = conj => arr => arr.join(conj)

export default join
