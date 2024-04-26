import type { AddOperation as AO } from "../../../types"

import { Option, none, some } from "@sitebender/fp/lib/option"

export type AddOperationF = (config: Partial<AO>) => Option<AO>

const AddOperation: AddOperationF = config => {
	const { addends = [], ...rest } = config

	return addends.length
		? some({
				...rest,
				addends,
				operation: "add",
				returns: "number",
			})
		: none
}

export default AddOperation
