import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Login from "./Login";

configure({ adapter: new Adapter() });

describe("Testing Login page", () => {
  it("matches snapshot", () => {
    const login = jest.fn();
    const wrapper = shallow(<Login login={login} />);
    expect(wrapper).toMatchSnapshot();
  });
});
