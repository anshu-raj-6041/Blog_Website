import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Pagination = () => {

  const { page, handlePageChange, totalPages } = useContext(AppContext);
  return (
    <div className='w-full flex justify-center items-center border'>
      <div className='flex justify-between w-11/12 max-w-[670px] py-2'>
        <div>
          {page > 1 &&
            (<button
              className='rounded-sm border py-1 px-4'
              onClick={() => handlePageChange(page - 1)}>
              Previous
            </button>)
          }

          {page < totalPages &&
            (<button
              className='rounded-sm border py-1 px-4'
              onClick={() => handlePageChange(page + 1)}>
              Next
            </button>)
          }

          <p className='font-bold text-sm'>
            Page {page} of {totalPages}
          </p>
        </div>
      </div>

    </div>
  )
}

export default Pagination
