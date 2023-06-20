type props = {
    label: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    bg?: string
    tailwind?: string
    buttonType?: 'button' | 'submit' | 'reset'
  }
  
  const PfsButtonTwo: React.FC<props> = ({
    label,
    bg = 'primary-100',
    tailwind,
    onClick,
    buttonType = 'button',
  }) => {
    return (
      <button
      onClick={onClick}
      type={buttonType}
      className={` ${tailwind} text-black bg-yellow-300 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 w-full `}
    >
      {label}
    </button>
    )
  }
  
  export default PfsButtonTwo
  