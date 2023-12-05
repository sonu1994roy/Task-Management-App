import React from 'react'
import { Link,  } from 'react-router-dom'

const Page404 = ()=> {

  return (
    <div className='bg-light  '>
        <div className='container'>
        <div className="d-flex align-items-center justify-content-center " style={{height:'100vh'}}>
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found</p>
                <p className="lead">
                    The page you’re looking for doesn’t exist.
                  </p>
               <Link to={'/'} className="btn d-inline btn-primary"> Go Home</Link>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Page404