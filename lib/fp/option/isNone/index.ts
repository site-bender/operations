type IsNoneF = <T>(x: Option<T>) => x is None

const isNone: IsNoneF = (x): x is None => x._tag === "None"

export default isNone
