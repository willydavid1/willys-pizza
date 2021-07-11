import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

type CounterProps = {
  value: number,
  maximumSubtractionValue: number,
  onChangeValue: (operation: string, newValue: number) => void
};

const Counter = ({
  value,
  maximumSubtractionValue,
  onChangeValue
}: CounterProps) => {

  const changeValue = (operation: string) => {
    const newValue = operation === 'add' ? value + 1 : value - 1
    if (newValue < maximumSubtractionValue) return

    onChangeValue && onChangeValue(operation, newValue)
  }

  return (
    <div className={`flex p-1 rounded-full ${value > 0 ? 'bg-gray-50 shadow-md' : ''}`}>
      {
        value > 0 && (
          <>
            <button className="px-2 focus:outline-none text-2xl" onClick={() => changeValue('subtract')}>
              <IoRemoveCircleOutline />
            </button>
            <span className="text-gray-700">
              {value}
            </span> 
          </>
        )
      }

      <button className="px-2 focus:outline-none text-2xl" onClick={() => changeValue('add')}>
        <IoAddCircleOutline />
      </button>
    </div>
  )
}

Counter.defaultProps = {
  value: 0,
  maximumSubtractionValue: 0,
  onChangeValue: null
}

export default Counter