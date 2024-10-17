const Label = ({ htmlFor, text }: { htmlFor: string; text: string }) => {
  return (
    <label htmlFor={htmlFor} className='block mb-1 font-bold'>
      {text}
    </label>
  )
}

export default Label
