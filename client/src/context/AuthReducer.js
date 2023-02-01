const AuthReducer=(state,action)=>{
  console.log("from authreducer",state,action);
  return{
    data:action.data,
    data1:action.data
  }
}
export default AuthReducer

// const AuthReducer=(state,action)=>{
//     console.log(state,action);
//      switch (action.type) {
//      case "newData":
//      return{
//          data:action.data,
 
//      }
            
    
//      default:
//          return state;
//     }
  
//  }
//  export default AuthReducer