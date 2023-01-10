import logo from './logo.svg';
import React,{useState} from 'react'
import './App.css';
import {TodoTable} from './components/todoTable';
import {TodoForm} from './components/todoForm'
export const App = ()=> {

  const [todos,setTodos] = useState([
    {rowNumber: 3,rowDescription:'Test',rowAuthor:'Wool'},
    {rowNumber: 4,rowDescription:'Test',rowAuthor:'Wool'},
    {rowNumber: 5,rowDescription:'Test',rowAuthor:'Wool'},
  ])

  const [showForm,setShowForm] = useState(false)
  const addTodo = (rowdescription:string,rowAuthor:string) =>{
    let rownumber = 0
    if(todos.length > 0){
      rownumber = todos[todos.length-1].rowNumber + 1
    }else{
      rownumber = 1
    }
    const newTodo = {rowNumber: rownumber,rowDescription:rowdescription,rowAuthor:rowAuthor}

    setTodos(todos =>[...todos,newTodo])
  }

  const deleteTodo = (index:number) =>{
    let filtered = todos.filter(function(v){
      return v.rowNumber !==index
    })
    setTodos(filtered)
  } 


  
  return (
    <div className="mt-5 container">
    <div className="card ">
        <div className='card-header'>
          Your Todo's
      </div>
      <div className="card-body">
         <TodoTable
         props = {todos}
         deleteTodo={deleteTodo}
         />
             <button className='btn btn-primary' onClick={() => setShowForm(!showForm)}>{showForm ? 'Close New Todo' : 'New Todo'}</button>
        {showForm && <TodoForm addTodo={addTodo}
         />}
         
        </div>
   
        </div>
        </div>
  );
}

