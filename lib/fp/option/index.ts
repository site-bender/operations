import map from "./map"
import match from "./match"

const none: Option<never> = { _tag: "None" }

type SomeF = <T>(x: T) => Option<T>
const some: SomeF = x => ({ _tag: "Some", value: x })

type IsNoneF = <T>(x: Option<T>) => x is None
const isNone: IsNoneF = (x): x is None => x._tag === "None"

type FromNullableF = <T>(x?: T) => Option<T>
const fromNullable: FromNullableF = x => (x == null ? none : some(x))

export { none, some, isNone, fromNullable, match, map }
