import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import EditItem from "./EditItem";

configure({ adapter: new Adapter() });

describe("Testing Edit Item page", () => {
  it("matches snapshot", () => {
    const paramsMock = jest.fn();
    const itemMock = jest.fn();
    const fetchSingleItemMock = jest.fn();
    const pushMock = jest.fn();
    const updateItemMock = jest.fn();
    const removeSingleItemMock = jest.fn();
    const wrapper = shallow(
      <EditItem
        singleItem={itemMock}
        fetchSingleItem={fetchSingleItemMock}
        updateItem={updateItemMock}
        history={{ push: pushMock }}
        removeSingleItem={removeSingleItemMock}
        match={{ params: paramsMock }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
