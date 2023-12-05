import React from 'react'

function dropdownSearch({ name,  value, onChange, options }) {
  return (

    <div className='d-flex align-items-center '>
      <p className='m-0'>Show</p>
      <select className="form-select  mx-2  shadow-none" aria-label=".form-select-lg example" name={name}
        onChange={onChange}
        value={value}
        id={name}>
        <option value='' selected>{value} </option>
        {options && options.map((option ,index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p className='m-0'>entrire</p>
    </div>
  )
}

export default dropdownSearch