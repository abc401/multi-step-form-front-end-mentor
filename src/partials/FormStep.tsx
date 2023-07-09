
interface Props {
    index: number
    title: string
    active?: boolean
    minimal?: boolean
}

export default function FormStep(props: Props) {
  return (
    <div
      className="
        flex
        gap-4
        text-white
        w-fit h-fit"
      >
      <div
        className={`
          place-self-center
          grid place-content-center
          w-9 aspect-square
          ${props.active? "bg-neutral-300 text-accent-200" : "border border-white"}
          rounded-full
          font-bold
        `}
      >
        <div>{ props.index }</div>
      </div>

      <div className="hidden sm:block">
        <div className="text-xs font-light text-neutral-200">STEP { props.index }</div>
        <div className="text-sm uppercase font-bold">{ props.title }</div>
      </div>
    </div>
  )
}
