import React from 'react'

function Heading({title, btnTitle, isShowBtn,click}) {
  return (
    <div className="card shadow border-0">
    <div className="card-body">
        <div className='d-flex justify-content-between align-items-center px-3'>
            <div className=''>
                <h3>{title}</h3>
            </div>
            <div className=''> 
               {isShowBtn && <button onClick={click} className='btn btn-dark py-2 px-3 '>{btnTitle}</button>}
            </div>
        </div>
    </div>
</div>
  )
}

export default Heading