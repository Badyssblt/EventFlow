import React from 'react'

function ErrorNotification({title, subtitle = ""}) {

    
  return (
    <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4 fixed z-50 bottom-24 right-0">
        <div className="flex items-start gap-4">
            <span className="text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>

            </span>

            <div className="flex-1">
            <strong className="block font-medium text-gray-900"> {title} </strong>

            <p className="mt-1 text-sm text-gray-700">{subtitle}</p>
            </div>

            <button className="text-gray-500 transition hover:text-gray-600">
            <span className="sr-only">Dismiss popup</span>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
        </div>
    </div>
  )
}

export default ErrorNotification