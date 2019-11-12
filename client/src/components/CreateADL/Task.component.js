import React from 'react'

export default ({ 
  id, 
  info, 
  handleTask 
}) => (
  <li
    className={[info.category, "list-group-item"].join(' ')}
    onClick={() => handleTask(id)}>
    {info.task}
  </li>
)