import React from 'react'

import Task from './Task.component'

export default ({
  selectedTasks,
  data,
  deleteTask
}) => {
  const hasTasks = (selectedTasks.length > 0)
  const taskList = selectedTasks.map((tas, i) => {
    return (
      <Task 
        id={i}
        key={i}
        info={data[tas]}
        handleTask={(id) => deleteTask(id)}
      />
    )
  })
  return (
    <div className="tasks">
      <h5>
        {hasTasks 
          ? 'Your Selected Tasks'
          : 'Click on a name to add to list...'
        }
      </h5>
      <ul>
        {taskList}
      </ul>
      {hasTasks && <hr/>}
    </div>
  )
}