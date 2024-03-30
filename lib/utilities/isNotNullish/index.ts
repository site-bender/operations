type IsNotNullishF = (i: unknown) => boolean
const isNotNullish: IsNotNullishF = item => item != null

export default isNotNullish
