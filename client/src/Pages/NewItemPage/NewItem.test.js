import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import NewItem from "./NewItem";

configure({ adapter: new Adapter() });

let wrapper;

beforeAll(() => {
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem(key) {
        return store[key];
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      },
      removeItem(key) {
        delete store[key];
      },
    };
  })();
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
});

afterAll(() => {
  window.localStorage.clear();
  delete window.localStorage;
});

beforeEach(() => {
  const insertItemMock = jest.fn();
  const logoutMock = jest.fn();
  const pushMock = jest.fn();
  wrapper = shallow(
    <NewItem
      insertItem={insertItemMock}
      logout={logoutMock}
      history={{ push: pushMock }}
    />
  );
});

describe("Testing New Item page", () => {
  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("check State", () => {
    expect(wrapper.state("name")).toEqual("");
  });

  it("check for name field", () => {
    wrapper.setState({ name: "Mouse" });
    expect(wrapper.state("name")).toEqual("Mouse");
  });

  it("check for companyName field", () => {
    wrapper.setState({ companyName: "Razer" });
    expect(wrapper.state("companyName")).toEqual("Razer");
  });

  it("check for stock field", () => {
    wrapper.setState({ stock: 100 });
    expect(wrapper.state("stock")).toEqual(100);
  });

  it("check for username field", () => {
    wrapper.setState({ username: "Lakshya" });
    expect(wrapper.state("username")).toEqual("Lakshya");
  });

  it("Button not works when any field is empty", () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, "handleSubmit");
    wrapper.setState({ name: "Shoes", stock: 100, companyName: "" });
    wrapper.find("#btn1").simulate("click");
    expect(instance.handleSubmit).toHaveBeenCalledTimes(0);
  });

  it("Button works when every input field is valid", () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, "handleSubmit");
    wrapper.setState({ name: "Shoes", stock: 100, companyName: "Nike" });
    wrapper.find("#btn1").simulate("click", {
      preventDefault: () => {},
    });
    expect(instance.handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("Checks for token in localStorage", () => {
    window.localStorage.setItem(
      "jwt",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    );
    expect(window.localStorage.getItem("jwt")).toEqual(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    );
  });
});
