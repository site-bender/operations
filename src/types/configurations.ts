import type { Constraint, ValidationError } from './constraints'
import type {
	ButtonLayout,
	DateFormat,
	DateTimeFormat,
	StringFormat,
	TabStyle,
	TruncationMethod,
	TypeOfBoolean,
	TypeOfButton,
	TypeOfChoice,
	TypeOfColor,
	TypeOfComponent,
	TypeOfIcon,
	TypeOfTrigger,
	TypeOfTruncation,
	TypeOfUpdate,
} from './enums'
import type { Action, EventProps } from './events'
import { Operation } from './operations'
import type {
	BooleanValue,
	IntegerValue,
	ListValue,
	MemberValue,
	NumberValue,
	PlainDateTimeValue,
	PlainDateValue,
	PrecisionNumberValue,
	RealNumberValue,
	SetValue,
	StringValue,
} from './values'

export type AriaAttributes = {
	ariaDescribedby?: string
	ariaDetails?: string
	ariaLabel?: string
	ariaLabelledby?: string
}

export type Update = {
	updateType: TypeOfUpdate
	path: Array<string>
	changes: (Interface & GeneratedProps) | Operation
}

export type Condition = {
	constraint: Constraint
	whenMet: Update
	whenUnmet: Update
}

export type IconStyleAttributes = {
	fill?: TypeOfColor
	height?: string | number
	stroke?: TypeOfColor
	width?: string | number
	margin?: string
}

export type StyleAttributes = {
	backgroundColor?: TypeOfColor
	color?: TypeOfColor
	fill?: TypeOfColor
	height?: string | number
	margin?: string | number
	maxHeight?: string | number
	maxLength?: number
	maxWidth?: string | number
	minHeight?: string | number
	minLength?: number
	minWidth?: string | number
	padding?: string | number
	stroke?: TypeOfColor
	width?: string | number
}

export type BranchProps = {
	children?: Array<Interface>
	readonly isBranch: true
}

export type ChoiceProps = {
	options: Array<Option> | Array<OptionGroup>
}

export type CommonProps = {
	actions?: Partial<Record<keyof typeof TypeOfTrigger, Action>>
	conditions?: Array<Condition>
	id: string
	isDisabled?: boolean
	isHidden?: boolean
	name?: string
	style?: StyleAttributes
}

export type DateProps = {
	noDayOfMonth?: boolean
	noMonth?: boolean
	noYear?: boolean
}

export type FieldProps = {
	autoFocus?: boolean
	defaultValue?: string
	label?: string
	name: string
	isReadOnly?: boolean
}

export type GeneratedProps = {
	disabled?: boolean
	form?: string
	handlers?: EventProps
	path?: Array<string>
}

export type MatchProps = {
	pattern?: string | RegExp
}

export type NumberProps = {
	max?: number
	min?: number
	step?: number
	truncationMethod?: TruncationMethod
}

export type TextProps = {
	maxLength?: number
	minLength?: number
	truncateAt?: number
	truncateType?: TypeOfTruncation
}

export type TimeProps = {
	noHours?: boolean
	noMinutes?: boolean
	noSeconds?: boolean
	includeMilliseconds?: boolean
}

export type ValidityProps = {
	constraint: Constraint
	errors: Array<ValidationError>
	help?: string
	placeholder?: string
	required?: boolean
	value?: string
}

// ===== Components =====

export type AddressFieldType = CommonProps &
	FieldProps &
	MatchProps &
	TextProps &
	ValidityProps & {
		readonly componentType: TypeOfComponent.ADDRESS_FIELD
		useLookup?: boolean
	} & StringValue

export type AutocompleteFieldType = CommonProps &
	FieldProps &
	MatchProps &
	TextProps &
	ValidityProps & {
		autoComplete?: boolean
		format?: StringFormat
		readonly componentType: TypeOfComponent.AUTOCOMPLETE_FIELD
	} & StringValue

export type ButtonType = CommonProps &
	FieldProps & {
		buttonLayout?: ButtonLayout
		buttonType: TypeOfButton
		icon?: TypeOfIcon
		iconStyle?: IconStyleAttributes
		readonly componentType: TypeOfComponent.BUTTON
	}

export type ButtonBarType = BranchProps &
	CommonProps & {
		buttonLayout?: ButtonLayout
		buttonType: TypeOfButton
		icon?: TypeOfIcon
		iconStyle?: IconStyleAttributes
		readonly componentType: TypeOfComponent.BUTTON_BAR
		title?: string
	}

export type ChooseOneFieldType = ChoiceProps &
	CommonProps &
	FieldProps &
	ValidityProps & {
		autoComplete?: boolean
		choiceType: TypeOfChoice
		columns?: number
		readonly componentType: TypeOfComponent.CHOOSE_ONE_FIELD
		selected?: Option
	} & MemberValue

export type ChooseSomeFieldType = ChoiceProps &
	CommonProps &
	FieldProps &
	ValidityProps & {
		autoComplete?: boolean
		choiceType: TypeOfChoice
		columns?: number
		readonly componentType: TypeOfComponent.CHOOSE_SOME_FIELD
		selected?: Array<Option>
	} & SetValue

export type CompositeFieldType = BranchProps &
	CommonProps & {
		datatype: string
		readonly componentType: TypeOfComponent.COMPOSITE_FIELD
		title?: string
	}

export type DateFieldType = CommonProps &
	DateProps &
	FieldProps &
	ValidityProps & {
		format?: DateFormat
		readonly componentType: TypeOfComponent.DATE_FIELD
	} & PlainDateValue

export type DateRangeFieldType = CommonProps &
	DateProps &
	FieldProps &
	ValidityProps & {
		format?: DateFormat
		readonly componentType: TypeOfComponent.DATE_RANGE_FIELD
		readonly datatype: 'range'
		value: {
			end: PlainDateValue
			start: PlainDateValue
		}
	}

export type DateTimeFieldType = CommonProps &
	DateProps &
	FieldProps &
	TimeProps &
	ValidityProps & {
		format?: DateTimeFormat
		readonly componentType: TypeOfComponent.DATE_TIME_FIELD
	} & PlainDateTimeValue

export type DateTimeRangeFieldType = CommonProps &
	DateProps &
	FieldProps &
	TimeProps &
	ValidityProps & {
		format?: DateTimeFormat
		readonly componentType: TypeOfComponent.DATE_TIME_RANGE_FIELD
		readonly datatype: 'range'
		value: {
			end: PlainDateTimeValue
			start: PlainDateTimeValue
		}
	}

export type EmailFieldType = CommonProps &
	FieldProps &
	MatchProps &
	TextProps &
	ValidityProps & {
		readonly format: StringFormat.EMAIL_ADDRESS
		readonly componentType: TypeOfComponent.EMAIL_FIELD
		validate?: boolean
	} & StringValue

export type FieldsetType = BranchProps &
	CommonProps & {
		readonly componentType: TypeOfComponent.FIELDSET
		title?: string
	}

export type HiddenFieldType = CommonProps &
	FieldProps &
	ValidityProps & {
		autoGenerateId?: boolean
		readonly componentType: TypeOfComponent.HIDDEN_FIELD
	} & StringValue

export type IntegerFieldType = CommonProps &
	FieldProps &
	NumberProps &
	ValidityProps & {
		readonly componentType: TypeOfComponent.INTEGER_FIELD
	} & IntegerValue

export type MenuType = BranchProps &
	CommonProps & {
		children: Array<MenuItemType | MenuFlyoutType>
		readonly componentType: TypeOfComponent.MENU
	}

export type MenuFlyoutType = BranchProps &
	CommonProps & {
		children: Array<MenuItemType | MenuFlyoutType>
		readonly componentType: TypeOfComponent.MENU_FLYOUT
	}

export type MenuItemType = CommonProps & {
	autoGenerateId?: boolean
	icon?: TypeOfIcon
	label: string
	readonly componentType: TypeOfComponent.HIDDEN_FIELD
} & StringValue

export type MoneyFieldType = CommonProps &
	FieldProps &
	NumberProps &
	ValidityProps & {
		currency: Option
		readonly componentType: TypeOfComponent.MONEY_FIELD
	} & PrecisionNumberValue

export type NoteType = CommonProps &
	FieldProps &
	MatchProps &
	TextProps & {
		autoGenerateId?: boolean
		readonly componentType: TypeOfComponent.NOTE
	} & StringValue

export type NumberRangeFieldType = CommonProps &
	FieldProps &
	NumberProps &
	ValidityProps & {
		readonly componentType: TypeOfComponent.PRECISION_NUMBER_FIELD
		value?: {
			end: NumberValue
			start: NumberValue
		}
	} & PrecisionNumberValue

export type OrdinalFieldType = CommonProps &
	FieldProps &
	ValidityProps & {
		readonly componentType: TypeOfComponent.ORDINAL_FIELD
	} & ListValue

export type PageType = BranchProps &
	CommonProps & {
		readonly componentType: TypeOfComponent.PAGE
	}

export type PhoneFieldType = CommonProps &
	FieldProps &
	MatchProps &
	TextProps &
	ValidityProps & {
		readonly format: StringFormat.TELEPHONE_NUMBER
		readonly componentType: TypeOfComponent.PHONE_FIELD
		verify?: boolean
	} & StringValue

export type PrecisionNumberFieldType = CommonProps &
	FieldProps &
	NumberProps &
	ValidityProps & {
		readonly componentType: TypeOfComponent.PRECISION_NUMBER_FIELD
	} & PrecisionNumberValue

export type ReadOnlyFieldType = CommonProps &
	FieldProps &
	TextProps & {
		readonly componentType: TypeOfComponent.READ_ONLY_FIELD
	} & StringValue

export type RealNumberFieldType = CommonProps &
	FieldProps &
	NumberProps &
	ValidityProps & {
		readonly componentType: TypeOfComponent.REAL_NUMBER_FIELD
	} & RealNumberValue

export type SelectorFieldType = ChoiceProps &
	CommonProps &
	FieldProps &
	ValidityProps & {
		autoComplete?: boolean
		readonly componentType: TypeOfComponent.SELECTOR_FIELD
		selected?: Option
	} & MemberValue

export type SeparatorType = BranchProps &
	CommonProps & {
		readonly componentType: TypeOfComponent.SEPARATOR
	}

export type TabType = CommonProps & {
	description?: string
	icon?: TypeOfIcon
	iconStyle?: IconStyleAttributes
	readonly componentType: TypeOfComponent.TAB
	tabStyle: TabStyle
	title: string
}

export type TabSetType = BranchProps &
	CommonProps & {
		readonly componentType: TypeOfComponent.TAB_SET
		selected?: string
		tab: TabType
		tabName: string
	}

export type TabsType = BranchProps &
	CommonProps & {
		children?: Array<TabSetType>
		readonly componentType: TypeOfComponent.TABS
		selected?: string
	}

export type TextFieldType = CommonProps &
	FieldProps &
	MatchProps &
	TextProps &
	ValidityProps & {
		autoExpand?: boolean
		readonly format: StringFormat
		readonly componentType: TypeOfComponent.TEXT_FIELD
		rows?: number | string
	} & StringValue

export type ToolbarType = BranchProps &
	CommonProps & {
		buttonLayout?: ButtonLayout
		children?: Array<ToolbarButtonType | SeparatorType | ToolbarGroupType>
		readonly componentType: TypeOfComponent.TOOLBAR
	}

export type ToolbarGroupType = BranchProps &
	CommonProps & {
		buttonLayout?: ButtonLayout
		children?: Array<ToolbarButtonType | SeparatorType>
		title?: string
		readonly componentType: TypeOfComponent.TOOLBAR_GROUP
	}

export type ToolbarButtonType = CommonProps &
	FieldProps & {
		buttonLayout?: ButtonLayout
		buttonType: TypeOfButton
		icon?: TypeOfIcon
		iconStyle?: IconStyleAttributes
		readonly componentType: TypeOfComponent.TOOLBAR_BUTTON
	}

export type UrlFieldType = CommonProps &
	FieldProps &
	MatchProps &
	TextProps &
	ValidityProps & {
		readonly format: StringFormat.URL
		readonly componentType: TypeOfComponent.URL_FIELD
	} & StringValue

export type YesNoFieldType = CommonProps &
	FieldProps &
	ValidityProps & {
		booleanType?: TypeOfBoolean
		readonly componentType: TypeOfComponent.YES_NO_FIELD
	} & BooleanValue

export type BranchType =
	| ButtonBarType
	| CompositeFieldType
	| FieldsetType
	| MenuType
	| MenuFlyoutType
	| PageType
	| SeparatorType
	| TabSetType
	| TabsType
	| ToolbarType
	| ToolbarGroupType

export type InputFieldType =
	| AddressFieldType
	| AutocompleteFieldType
	| ChooseOneFieldType
	| ChooseSomeFieldType
	| CompositeFieldType
	| DateFieldType
	| DateRangeFieldType
	| DateTimeFieldType
	| DateTimeRangeFieldType
	| EmailFieldType
	| HiddenFieldType
	| IntegerFieldType
	| MoneyFieldType
	| NumberRangeFieldType
	| OrdinalFieldType
	| PhoneFieldType
	| PrecisionNumberFieldType
	| RealNumberFieldType
	| SelectorFieldType
	| TextFieldType
	| UrlFieldType
	| YesNoFieldType

export type Interface =
	| BranchType
	| InputFieldType
	| ButtonBarType
	| MenuItemType
	| NoteType
	| ReadOnlyFieldType
	| TabType
	| ToolbarButtonType

export type Configuration = {
	createdAt: string
	id: string
	name: string
	children: Array<Interface>
}
