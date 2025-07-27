import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [task, setTask] = useState('')
  const [taskList,setTaskList]=useState([])
  useEffect(()=>{
    const savTodos= JSON.parse(localStorage.getItem("todos"))
    if(savTodos){
      setTaskList(savTodos)
    }

  },[])

  useEffect(()=>{
    if(taskList.length>=0){
      localStorage.setItem("todos",JSON.stringify(taskList))
    }

  },[taskList])
  
  const checkTask=(id)=>{
   const updatedList= taskList.map(t=>{
     return t.id===id?{...t,completed: !t.completed}:t
    })
    setTaskList(updatedList)
  }

  const deleteTask=(id)=>{
    
    const newList=taskList.filter(t=>id!==t.id)
    setTaskList(newList)
  }

  return (
    <>
      <div className='container'>
      <input type="text" value={task} onChange={(e)=>{
        setTask(e.target.value)
      }} />
      <button onClick={(e)=>{
        e.preventDefault();
        const newTask={
          id: Date.now(),
          taskName: task,
          completed: false
        }
        setTaskList([...taskList,newTask])
        setTask('')

      }}>Add Task</button>
      <ul className='list-container'>
        {
          taskList.map(todo=>(

            <li className='single-task' key={todo.id}>
              <input type="checkbox" checked={todo.completed} onChange={()=>checkTask(todo.id)}/>
              <span style={{textDecoration:todo.completed?"line-through":"none"}}>{todo.taskName}</span>
              <button style={{display:todo.completed?"block":"none"}} onClick={()=>deleteTask(todo.id)}>Delete</button>
            </li>
          ))
        }
      </ul>
      </div>
    </>
  );
}

export default App;
