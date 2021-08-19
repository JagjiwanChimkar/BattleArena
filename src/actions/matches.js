import { db } from "../firebase";

export const getMatches = () => async (dispatch) => {
  try {
    console.log('getmatches called')
    var data = {
      mode: {
        War: {
          solo: [],
          duo: [],
          squad: [],
        },
        TDM: {
          solo: [],
          duo: [],
          squad: [],
        },
      },
    };
    
    let categories = ["solo", "duo", "squad"];

    await db
      .collection("modes")
      .get()
      .then((snap1) => {
        snap1.forEach((doc1) => {
          categories.map(async(category) =>
            await db.collection(`/modes/${doc1.id}/${category}`)
              .get()
              .then((snap2) => {
                snap2.forEach((doc2) => {
                  data.mode[doc1.id][category].push({
                    id: doc2.id,
                    data: doc2.data(),
                  });
                });
              })
          );
        });
      });

     

  
    dispatch({
      type: "FETCH_ALL",
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
