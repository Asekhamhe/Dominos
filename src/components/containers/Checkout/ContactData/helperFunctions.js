export const formConfig = (type = "input", placeholder) => {
  return {
    elementType: "input",
    elementConfig: {
      type,
      placeholder,
    },
    value: "",
  };
};
