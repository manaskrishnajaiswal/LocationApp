import { createContext, useReducer } from "react";

export const PlacesContext = createContext({
  places: [],
  setPlaces: (places) => {},
});

function placesReducer(state, action) {
  switch (action.type) {
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    default:
      return state;
  }
}

const PlacesContextProvider = ({ children }) => {
  const [placesState, dispatch] = useReducer(placesReducer, []);

  function setPlaces(places) {
    // console.log(places);
    dispatch({ type: "SET", payload: places });
  }

  const value = {
    places: placesState,
    setPlaces: setPlaces,
  };
  return (
    <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>
  );
};

export default PlacesContextProvider;
