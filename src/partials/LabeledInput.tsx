import React, { useMemo, useRef, useState } from 'react'


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
}

export default function LabeledInput(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = useState(true);

  const errorMessage = useMemo(() => {
    const input = inputRef.current;
    if (input == null) return;
    if (props.required && (input.value === "")) {
      return "This field is required"
    }
    return "Invalid value entered"
  }, [isValid])

  const onBlur = () => {
    const input = inputRef.current;
    if (input == null) return;
    setIsValid(input.checkValidity())
  }
  
  const onChange = () => {
    setIsValid(true)
  }

  return (
    <label htmlFor={props.id} className='my-2 grid grid-cols-2'>
      <div className='text-sm'>{props.label}</div>
      {
        !isValid &&
        <div className="text-sm text-right text-error font-bold">{errorMessage}</div>
      }
      
      <input
        className={`labeled-input ${!isValid && "error"}`}
        ref={inputRef}
        onBlur={onBlur}
        onChange={onChange}
        {...props}
      />
    </label>
  )
}