import React from 'react'

export default function Container({ title }) {
  return (
    <div className='grow-1 rounded-sm px-2 py-6 bg-gray-200'>
      <h4 className='font-bold'>{title}</h4>
    </div>
  )
}
