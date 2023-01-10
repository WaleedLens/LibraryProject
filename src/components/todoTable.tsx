import React from "react"
import { TodoModule } from "../modules/todomodule"

import {TodoRowItem}  from "./todoRowItem"

export const TodoTable:React.FC<
{props:TodoModule[],deleteTodo:Function}
> = (props)=>{
    console.log()

    return (
        <table className="table table-hover">
        <thead>
          <tr>
          <th scope='col'>#</th>
          <th scope='col'>Description</th>
          <th scope='col'>Assigned</th>
          </tr>
        </thead>
        <tbody>
        
        {props.props.map(todo =>( 
        <TodoRowItem
            key =  {todo.rowNumber}
            rownumber = {todo.rowNumber}
            rowdescription = {todo.rowDescription}
            rowAuthor = {todo.rowAuthor}
            deleteTodo = {props.deleteTodo}
            />
        ))}
        
        </tbody>
      </table>
    )
}



