type IsNullishF = (i: unknown) => boolean
const isNullish: IsNullishF = item => item == null

export default isNullish
