const reducer= (user=null,action)=>{
    switch (action.type) {
        case 'SET_USER':
          return action.payload;
        default:
          return user;
  } 
}

export default reducer;