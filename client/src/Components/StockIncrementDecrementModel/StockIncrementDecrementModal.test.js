import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import StockIncrementDecrementModal from "./StockIncrementDecrementModal";

configure({ adapter: new Adapter() });

describe("Testing Edit Item page", () => {
  it("matches snapshot", () => {
    const incrementDecrementStockMock = jest.fn();
    const itemDetails = {
      stock: 100,
      id: "623321fafd332265f84c64cd",
      open: true,
      onClose: jest.fn(),
    };
    const wrapper = shallow(
      <StockIncrementDecrementModal
        stock={itemDetails.stock}
        id={itemDetails.id}
        open={itemDetails.open}
        onClose={itemDetails.onClose}
        incrementDecrementStock={incrementDecrementStockMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
