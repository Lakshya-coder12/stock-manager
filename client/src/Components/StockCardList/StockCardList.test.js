import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import StockCardList from "./StockCardList";

configure({ adapter: new Adapter() });

describe("Testing StockCardList component", () => {
  const items = [
    {
      name: "Shoes",
      companyName: "Nike",
      stock: "100",
      _id: 1,
    },
    {
      name: "Car",
      companyName: "Mahindra",
      stock: "10",
      _id: 2,
    },
  ];
  it("matches snapshot", () => {
    const wrapper = shallow(<StockCardList items={items} />);
    expect(wrapper).toMatchSnapshot();
  });
});
