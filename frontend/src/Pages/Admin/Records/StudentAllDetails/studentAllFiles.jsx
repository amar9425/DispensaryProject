import React from 'react'

const studentAllFiles = (props) => {
    console.log(props.studentAllDetails)
  return (
    <div className='record-modal'>
            <div className='student-modal-report'>
                <div>{props.studentAllDetails[0]?.student?.name}</div>
                <div>{props.studentAllDetails[0]?.student?.email}</div>
                <div>{props.studentAllDetails[0]?.roll}</div>
            </div>
              <div className='student-details-scroll'>
                {
                    props.studentAllDetails.map((item)=>{
                        return(
                            <div className='student-modal-detail'>
                    <div className='student-modal-header'>
                        {item?.createdAt.slice(0,10).split("-").reverse().join("-")}

                    </div>
                     <div className='student-modal-body-student'>
                        <div className='student-modal-body-header'>
                            <div>Medicine Name</div>
                            <div>Quantity</div>
                        
                        </div>
                        <div className='student-modal-body-item'>
                            {
                                item.medicines.map((item,index)=>{
                                    return(<div className='student-item-model'>
                                <div> {item?.name} </div>
                                <div> {item.requiredQuantity} </div>

                            </div>);
                                })
                            }
                        </div>
                       
                    </div>

                 </div>
                        );
                    })
                }
            </div> 
        </div>
  )
}

export default studentAllFiles