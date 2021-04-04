/**
 * Handles user input collection in a form, and updates the react state accordingly
 * @param {SyntheticEvent} e event triggered by JS
 * @param {Function} updateState the function updating the state provided by React useState hook
 */
const handleInputChange = (e, updateState) => {
  const userInput = e.target.value;
  const name = e.target.name;

  updateState(prevData => {
    // make a copy of prevData, change field, and merge objects
    let newData = { ...prevData };
    newData[name] = userInput;
    return { ...prevData, ...newData };
  });
}

export default handleInputChange;