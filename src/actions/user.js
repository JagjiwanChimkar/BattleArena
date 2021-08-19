
export const setUser = (user) => async (dispatch) => {
    try {
      dispatch({
        type: "SET_USER",
        payload: user,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  