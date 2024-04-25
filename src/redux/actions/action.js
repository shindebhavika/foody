export const Add=(item)=>{
return{
  type:"ADD-TO-CART",
  payload:item
}
}

export const Delete=(item)=>{
  return{
    type:"DELETE-FROM-CART",
    payload:item
  }
  }