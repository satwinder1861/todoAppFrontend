// redux thunks for side effects
import {createTodo,removeTodo,markTodosAsCompleted, loadTodosInProgress,loadTodosSuccess,loadTodosFailure } from "./action";


export const loadTodos = () => async(dispatch,getState)=>{
try{
    dispatch(loadTodosInProgress());
const response  = await fetch ('https://satwindertodo.herokuapp.com/todos');
const todos = await response.json();
console.log(todos);
dispatch(loadTodosSuccess(todos));
} catch (e) {
    dispatch(loadTodosFailure());
    dispatch(displayAlert(e));
}
}
export const addTodoRequest = text => async dispatch => {
  try{
    const body = JSON.stringify({text});
  const response = await fetch('https://satwindertodo.herokuapp.com/todos',{
      headers:{
'Content-Type' : 'application/json',
  },
  method: 'post',
  body,
})
const todo = await response.json() ;
dispatch(createTodo(todo)); 
  }
  catch(e){
      dispatch(displayAlert(e));
  } 
}

export const removeTodoRequest = id => async dispatch => {
  try {
    const response = await fetch(`https://satwindertodo.herokuapp.com/todos/${id}`,{
  method:'delete',
  });

  const removedTodo = await response.json();
  dispatch(removeTodo(removedTodo));
  }catch (e) {
    dispatch(displayAlert(e))
  }
}

export const markTodosAsCompletedRequest = id => async dispatch =>{
try {
  const response = await fetch(`https://satwindertodo.herokuapp.com/todos/${id}/completed`,{
method:'post'
});
const updatedTodo = await response.json();
dispatch(markTodosAsCompleted(updatedTodo));
}catch (e) {
  dispatch(displayAlert(e))
}
}

export const displayAlert= text  => () =>{
    alert(text);
};
