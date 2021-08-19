const initialState={
  mode:{
    War:{
      solo:[],
      duo:[],
      squad:[]
    },
    TDM:{
      solo:[],
      duo:[],
      squad:[]
    }
  }
}

const reducer= (matches=initialState,action)=>{
    switch (action.type) {
        case 'FETCH_ALL':
          return action.payload;
        default:
          return matches;
  } 
}

export default reducer;