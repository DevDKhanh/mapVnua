import React from 'react'

function PanelHeadTable({dataHead}) {
  return (
    <thead>
      <tr>
        {dataHead.map((item, index) => (
          <th key={index}>{item}</th>
        ))}
        <th>Hành động</th>
      </tr>
    </thead>
  )
}

export default PanelHeadTable
