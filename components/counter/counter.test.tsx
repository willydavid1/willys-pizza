import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Counter from '../counter'

describe('<Counter />', () => {
  it('should render', () => {
    const { queryByTestId } = render(<Counter />);
    expect(queryByTestId('Counter-Wrapper')).toBeInTheDocument()
  });

  it('should call the callback', () => {
    const cbMock = jest.fn()
    const { queryByTestId, rerender } = render(<Counter onChangeValue={cbMock} value={0} />);

    fireEvent.click(queryByTestId('Counter-Add'))
    expect(cbMock).toBeCalledTimes(1)

    rerender(<Counter onChangeValue={cbMock} value={1} />)
    expect(queryByTestId('Counter-Subtract')).toBeInTheDocument()
  });
})
