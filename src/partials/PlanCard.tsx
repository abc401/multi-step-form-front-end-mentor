import { useRef, useState } from 'react'

interface Props {
    title: string
    price: number
    yearly?: boolean
    selected?: boolean
    imgSrc: string
}

export default function PlanCardRadio(props: Props) {
  const radioRef = useRef<HTMLInputElement>(null)
  const [checked, setChecked] = useState(props.selected)

  const onChange = () => {
    const radioButton = radioRef.current
    if (radioButton == null) return
    setChecked(radioButton.checked)
    console.log("changed")
  }

  return (
    <label htmlFor={props.title.toLowerCase()}
      className={`
        flex
        rounded-md
        border 
        ${ checked? "border-accent-200" : "border-neutral-100/20" }
        p-4 space-x-4
      `}
    >
      <input
        ref={radioRef}
        {...onChange}
        type="radio"
        name="plan-selection"
        id={props.title.toLowerCase()}
        className=""
      />
      <img src={props.imgSrc} alt="" />
      <div>
        <h2 className="font-bold text-sm">{ props.title }</h2>
        <div className="text-xs text-neutral-100">${props.price}/{props.yearly? "yr" : "mo"}</div>
        {
          props.yearly &&
          <div className="text-xs">2 months free</div>
        }
      </div>
    </label>
  )
}
