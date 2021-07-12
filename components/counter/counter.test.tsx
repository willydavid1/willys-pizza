import { render } from "@testing-library/react";
import Counter from '../counter'

describe('<Counter />', () => {
  it('should render', () => {
    const { getByTestId, debug } = render(<Counter />);
  });
})
