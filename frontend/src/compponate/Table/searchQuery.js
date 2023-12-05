import React from 'react'

function searchQuery({value,onChange}) {
  return (
    <div className='d-flex align-items-center'>
    <label htmlFor="exampleInputEmail1">Serch:</label>
    <input value={value} onChange={onChange} type="text" className="form-control shadow-none ml-2 px-5 py-2" />
  </div>
  )
}

export default searchQuery