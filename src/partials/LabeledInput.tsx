
import React, { useMemo, useRef, useState } from 'react'
import { SingleFormInput } from '../contexts/FormInputContext';


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  inputData: SingleFormInput
}

export default function LabeledInput(props: Props) {
  let formEntry = props.inputData.getOrInitEntry(props.id)
  
  const inputRef = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = useState(
    formEntry.entry?
      formEntry.isValid
    :
      true
  )

  const errorMessage = useMemo(() => {
    const input = inputRef.current;
    if (input == null) return;
    if (props.required && (input.value === "")) {
      return "This field is required"
    }
    return "Invalid value entered"
  }, [isValid])

  const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    setIsValid(input.checkValidity())
  }

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    formEntry.entry = target.value
    formEntry.isValid = isValid
  }

  const onChange = () => {
    setIsValid(true)
  }

  return (
    <label htmlFor={props.id} className='block space-y-1'>
      <div className='flex justify-between'>
        {/* Label */}
        <div className='text-sm'>{props.label}</div>

        {/* Error Message */}
        {
          !isValid &&
          <div className="text-sm col-start-3 text-error font-bold">{errorMessage}</div>
        }
      </div>

      <input
        className={`labeled-input w-full ${!isValid && "error"}`}
        defaultValue={formEntry.entry}
        ref={inputRef}
        onBlur={onBlur}
        {...props}
        onInput={onInput}
        onChange={onChange}
      />
    </label>
  )
}