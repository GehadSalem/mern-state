import React from 'react'
import './index.css'
export default function Loading() {
  return (
    <div className="text-center m-20">
      <div className="load-2">
        <div className="line inline-block h-4 bg-slate-700 rounded-lg"></div>
        <div className="line inline-block h-4 bg-slate-700 rounded-lg"></div>
        <div className="line inline-block h-4 bg-slate-700 rounded-lg"></div>
      </div>
    </div>
  )
}
