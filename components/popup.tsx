import React from "react"

interface DriverMessagePopupProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const DriverMessagePopup: React.FC<DriverMessagePopupProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm rounded-lg border-2 border-black bg-white p-4 shadow-lg">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-xl font-bold text-gray-600 hover:text-red-500 focus:outline-none"
          >
            &times;
          </button>
        </div>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  )
}

export default DriverMessagePopup
