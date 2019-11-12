import React from 'react'

import Task from './Task.component'

export default ({ 
  data,  
  selectedTasks, 
  addTask 
}) => { 
  
  const tasks = data
    // filtering out the tasks that...
    .filter((task, i) => {
      return (
        // ...are already selected
        selectedTasks.indexOf(task.id) === -1
      )
    })
    // ...output a <Task /> component for each task
    .map((task, i) => {
    // only display tasks that match current input string
      return (
        <Task 
          id={task.id}
          key={i}
          info={task}
          handleTask={(id) => addTask(id)}
        />
      )
    })
  
  return ( 
    <ul> 
      {tasks}
    </ul>
  )
}