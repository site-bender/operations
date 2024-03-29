export const none: Option<never> = { _tag: "None" }

type SomeF = <T>(x: T) => Option<T>
export const some: SomeF = x => ({ _tag: "Some", value: x })

type IsNoneF = <T>(x: Option<T>) => boolean
export const isNone: IsNoneF = (x): x is None => x._tag === "None"

type FromNullableF = <T>(x?: T) => Option<T>
export const fromNullable: FromNullableF = x => (x == null ? none : some(x))
