import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Signup from "./Signup";

configure({ adapter: new Adapter() });

describe("Testing Signup page", () => {
  it("matches snapshot", () => {
    const signup = jest.fn();
    const wrapper = shallow(<Signup signup={signup} />);
    expect(wrapper).toMatchSnapshot();
  });
});
