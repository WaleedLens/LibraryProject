import React from "react"

export const TodoRowItem:React.FC<
{rownumber:number,rowdescription:string,rowAuthor:string,deleteTodo:Function,key:number}
> = (props)=>{

console.log(props)
return (
<tr>
    <th scope='row'>{props.rownumber}</th>
        <td>{props.rowdescription}</td>
        <td>{props.rowAuthor}</td>
        <td onClick={()=>props.deleteTodo(props.rownumber)}>Delete</td>
    </tr>

)
}



