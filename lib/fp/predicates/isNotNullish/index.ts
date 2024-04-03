const isNotNullish = <T>(item: T): item is Exclude<T, null | undefined> =>
	item != null

export default isNotNullish
