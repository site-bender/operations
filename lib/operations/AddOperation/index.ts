import { none, some } from "../../fp/option"

type AddOperationF = (config: Partial<AddOperation>) => Option<AddOperation>

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
