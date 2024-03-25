import { Value } from "../../_old/types"

export type ObjType = { [k: string]: Value }

export default function FromPath(obj: ObjType, path = ""): Value {
	const keys = path.split(".")

	return keys.reduce((out, key) => out?.[key] as ObjType, obj)
}
