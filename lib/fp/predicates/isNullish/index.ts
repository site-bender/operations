type IsNullishF = (i: unknown) => i is null | undefined

const isNullish: IsNullishF = (item): item is null | undefined =>
	item == null || item == undefined

export default isNullish
