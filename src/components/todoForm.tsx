import React,{useState} from 'react'




export const TodoForm:React.FC<{addTodo:Function}> = (props)=>{
    const [description,setDescription] = useState('') 
    const [assigned,setAssigned] = useState('') 
    
   /* const descriptionChange = (event) =>{
        setDescription(event.target.value)
    }
 */   /*const assignChange = (event) =>{
        setAssigned(event.target.value)
 */   
    const submitTodo = () =>{
        if(description !=='' && assigned !== ''){
           // const row={description:description,author:assigned}

           props.addTodo(description,assigned)
           setDescription('')
           setAssigned('')
        }
    } 

    return (
        <div className='mt-5'>
            <form>
                <div className='mb-3'>
                <label className="form-label">Assigned</label>
                <input type="text" className="form-control" onChange={e=> setAssigned(e.target.value)} value={assigned} required></input>
                </div>
                <div className='mb-3'>
                <label className="form-label">Description</label>
                <textarea  rows={3} className="form-control" onChange={e=> setDescription(e.target.value)} 
                value={description}
                
                required></textarea>
                </div>
          
            </form>
            <div className="mt-3">
                    <button className="btn btn-primary" onClick={submitTodo}>add Todo</button>
                </div>
        </div>
    )

}








