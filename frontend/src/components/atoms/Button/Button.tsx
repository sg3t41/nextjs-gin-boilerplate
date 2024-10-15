import React from 'react'

const Button = ({
	children,
	onClick,
	className,
}: {
	children: React.ReactNode
	onClick?: () => void
	className?: string
}) => {
	return (
		<button
			onClick={onClick}
			className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}>
			{children}
		</button>
	)
}

export default Button
