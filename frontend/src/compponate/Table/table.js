import React, { useState } from 'react';

function Table({ column, data, dltClick, viewClick, hidebtn }) {

  // nested key handler
  const getNestedValue = (obj, path) => {
    const keys = path.split('.');
    let value = obj;
    for (const key of keys) {
      value = value ? value[key] : undefined;
    }
    return value;
  };
  const renderCellValue = (row, column) => {
    const value = getNestedValue(row, column.dataField);
    if (typeof value === 'boolean') {
      return value ? 'Publish' : 'UnPublish';
    }
    // date formating 
    if (value instanceof Date) {
      return value.toISOString().substr(0, 10);
    }
    if (typeof value === 'string' && value.includes('T')) {
      const dateValue = new Date(value);
      if (!isNaN(dateValue)) {
        return dateValue.toISOString().substr(0, 10);
      }
    }
    // Check if the dataField contains nested keys using dot notation
    if (column.dataField.includes('.')) {
      getNestedValue(row, column.dataField);
    }
    return value;
  };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const openModel = (id) => {
    const foundTeam = data.find(team => team.members.some(user => user._id === id));
    if (foundTeam) {
      const foundUser = foundTeam.members.find(user => user._id === id);
      setSelectedUser(foundUser);
      setIsOpen(true);
    }
  };
  
  
  console.log(selectedUser)
  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover ">
          {/* Your table header */}
          <thead className="border border-secondary border-2 ms-1 me-1 fw-bolder ">
            <tr>
              {column.map((column, index) => (
                <th className=" text-sm" key={index}>
                  {column.text}
                </th>
              ))}
              {hidebtn && <th className=" text-sm " style={{ width: '10%' }}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {/* Your table body */}
            {Array.isArray(data) && data.length >= 1 ?
              data.map((row, rowIndex) => (
                <tr className="border border-secondary border-1" key={rowIndex}>
                  {column.map((column, columnIndex) => {
                    return (
                      <td className="border border-secondary border-1 " key={columnIndex}>
                        {column.dataField === 'id' ? (
                          rowIndex + 1
                        ) :
                          column.dataField === 'Teams' ? (
                            <div className="d-flex">
                              {row.members.map((member, index) => (
                                <div onClick={(() => openModel(member?._id))} className='avatar-group mr-3  m-0' key={index}>
                                  <img className="avatar" src={member?.avatar.url} alt="Avatar Preview" />
                                </div>
                              ))}
                            </div>


                          ) : (
                            renderCellValue(row, column)
                          )}
                      </td>
                    );
                  })}
                  {hidebtn &&
                    <td >
                      <div className="d-flex">
                        <button type="button" onClick={() => dltClick(row._id)} className="btn btn-sm btn-outline-danger btn-icon">
                          <i className="fas fa-trash"></i>
                        </button>
                        <button onClick={() => viewClick(row._id)} type="button" className="btn btn-sm btn-outline-warning  btn-icon ml-2">
                          <i className=" fas fa-eye"></i>
                        </button>

                      </div>
                    </td>
                  }
                </tr>
              ))
              :
              <td colSpan="6" className='text-secondery  text-center p-2 '>No data available in table</td>
            }
          </tbody>
        </table>
        <div id="deleteEmployeeModal" className={isOpen ? "modal show d-block fade" : "modal fade"}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">User Details</h4>
                <button onClick={() => setIsOpen(false)} type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <div className='row'>
                  <div className='col-3'>
                    <div className='avatar-group mr-3  m-0' >
                      <img className="avatar" src={selectedUser?.avatar.url} alt="Avatar Preview" />
                    </div>
                  </div>
                  <div className='col-9'>
                    <p>{selectedUser?.name}</p>
                    <p >{selectedUser?.email}</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Table;
