'use client'

import { useActionState } from 'react'
import * as Molecule from '@/components/molecules'
import * as Atom from '@/components/atoms'
import * as hook from '@/hooks'
import * as type from '@/types'

// T: FormStateのkey
// U: InputFieldのvalueに使うkey
const Form = <P extends string, E extends string>({
	formAction,
	initialState,
	inputFields,
}: {
	formAction: (
		state: type.FormState<P, E>,
		formData: FormData,
	) => Promise<type.FormState<P, E>>

	// Awaitedの必要性は、初期値が非同期に決定されるケースも想定するため
	initialState: Awaited<type.PrimaryFormState<P>>
	inputFields: Array<type.FormInput<P>>
}) => {
	const [formState, dispatch] = useActionState<type.FormState<P, E>, FormData>(
		formAction,
		initialState,
	)
	const { changedValues, onChangeInputText } =
		hook.useInputTextChange<type.PrimaryFormState<P>>(initialState)

	return (
		<form action={dispatch} noValidate>
			{inputFields.map(({ name, type, label, placeholder }) => (
				<Molecule.InputField
					key={name}
					label={label}
					type={type}
					name={name}
					placeholder={placeholder}
					value={changedValues[name]}
					errors={formState?.errors?.[name]}
					onChange={onChangeInputText}
				/>
			))}

			<Atom.Button text={'送信'} type={'submit'} />
		</form>
	)
}

export default Form
