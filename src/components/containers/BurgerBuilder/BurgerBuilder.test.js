import React from "react";

import { BurgerBuilder } from "./BurgerBuilder";
import { shallow, configure } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import BuildControl from "../../Burger/BuildControls/BuildControl/BuildControl";

configure({
  adapter: new ReactSixteenAdapter(),
});

describe("<BurgerBuilder/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  });

  it("should render <BuildControls/> when receiving ingredients", () => {
    wrapper.setProps({
      ings: {
        salad: 1,
      },
    });
    expect(wrapper.find(BuildControl)).toHaveLength(0);
  });
});
