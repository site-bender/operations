type SplitAtF = (i: number) => (s: string) => [string, string]
const splitAt: SplitAtF = i => s => [s.slice(0, i), s.slice(i)]

export default splitAt
