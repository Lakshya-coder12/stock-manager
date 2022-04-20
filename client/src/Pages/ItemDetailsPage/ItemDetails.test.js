import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ItemDetails from "./ItemDetails";

configure({ adapter: new Adapter() });

describe("Testing Item Details page", () => {
  it("matches snapshot", () => {
    const paramsMock = jest.fn();
    const pushMock = jest.fn();
    const itemObject = {
      item: {
        name: "Shoes",
        companyName: "Nike",
        stock: 100,
        dateCreated: 1647519150858.0,
      },
    };
    const fetchSingleItemMock = jest.fn();
    const deleteItemMock = jest.fn();
    const removeSingleItemMock = jest.fn();
    const wrapper = shallow(
      <ItemDetails
        item={itemObject}
        fetchSingleItem={fetchSingleItemMock}
        deleteItem={deleteItemMock}
        removeSingleItem={removeSingleItemMock}
        match={{ params: paramsMock }}
        history={{ push: pushMock }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
