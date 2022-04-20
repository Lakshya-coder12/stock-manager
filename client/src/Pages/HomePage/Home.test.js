import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Home from "./Home";

configure({ adapter: new Adapter() });

describe("Testing Home page", () => {
  it("matches snapshot", () => {
    const itemsMock = jest.fn();
    const pushMock = jest.fn();
    const fetchAllItemsMock = jest.fn();
    const wrapper = shallow(
      <Home
        fetchAllItems={fetchAllItemsMock}
        history={{ push: pushMock }}
        allItems={itemsMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
