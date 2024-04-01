import { none, some } from ".."

type FromNullableF = <T>(x: T | null | undefined) => Option<T>
const fromNullable: FromNullableF = x => (x == null ? none : some(x))

export default fromNullable
