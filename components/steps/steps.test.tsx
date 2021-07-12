import { render, fireEvent, act } from "@testing-library/react";
import '@testing-library/jest-dom'
import Steps from '../steps'

const steps = [
  {
    value: 1,
    title: "Ingredients",
  },
  {
    value: 2,
    title: "Info",
  },
  {
    value: 3,
    title: "Delivery",
  },
];

describe('<Steps />', () => {
  it('should render', () => {
    const { queryByTestId } = render(<Steps steps={steps} />);
    expect(queryByTestId('Steps-Wrapper')).toBeInTheDocument()
  });

  it('they have to be in the document', () => {
    const { queryAllByTestId } = render(<Steps steps={steps} />);

    const sections = queryAllByTestId('Steps-Section')
    expect(steps.length).toBe(sections.length)
 
    steps.forEach((_, i) => {
      expect(sections[i]).toBeInTheDocument()
    })
  });

  it('should go to 2 then to 1', () => {
    let switchToNextMock: () => void
    let changeCurrentStepMock: (step: number) => void

    const { queryAllByTestId, debug } = render(<Steps steps={steps}>
      {({ switchToNext, changeCurrentStep }) => {
        switchToNextMock = switchToNext
        changeCurrentStepMock = changeCurrentStep
      }}
    </Steps>);

    const sections = queryAllByTestId('Steps-Section')
 
    // Use case #1
    expect(sections[0].firstChild).toHaveClass('bg-yellow-300') // circle
    expect(sections[0].lastChild).toHaveClass('bg-gray-300') // line
    expect(sections[1].firstChild).toHaveClass('bg-gray-300') // circle
    act(() => {
      switchToNextMock()
    });
    expect(sections[0].lastChild).toHaveClass('bg-yellow-200') // line
    expect(sections[1].firstChild).toHaveClass('bg-yellow-300') // circle

    // Use case #2
    act(() => {
      changeCurrentStepMock(1)
    });
    expect(sections[0].lastChild).not.toHaveClass('bg-yellow-200') // line
    expect(sections[1].firstChild).not.toHaveClass('bg-yellow-300') // circle
  });
})
