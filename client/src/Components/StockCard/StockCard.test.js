import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import StockCard from "./StockCard";

configure({ adapter: new Adapter() });

describe("Testing StockCard component", () => {
  it("matches snapshot", () => {
    const wrapper = shallow(<StockCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
