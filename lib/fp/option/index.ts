import map from "./map"
import flatMap from "./flatMap"
import match from "./match"
import fromNullable from "./fromNullable"

const none: Option<never> = { _tag: "None" }

type SomeF = <T>(x: T) => Option<T>
const some: SomeF = x => ({ _tag: "Some", value: x })

type IsNoneF = <T>(x: Option<T>) => x is None
const isNone: IsNoneF = (x): x is None => x._tag === "None"

export { none, some, isNone, fromNullable, match, map, flatMap }
