import React, { ReactElement, ReactNode } from 'react'

interface Props {
  children: ReactNode
  leftIcon?: ReactElement,
  rightIcon?: ReactElement,
  onClick?: () => void,
  className?: string
}

function Button(props: Props) {
  return (
    <button onClick={props.onClick || undefined} className={`flex items-center z-10 shadow-lg bg-customBtn-100 ${props.leftIcon || props.rightIcon ? 'rounded-md': 'rounded-lg md:rounded-xl'} px-4 md:px-8 py-1 md:py-2 md:text-xl font-medium text-white ${props.className}`}>
      {props.leftIcon && 
        <span className='pr-2'>{props.leftIcon}</span>
      }
      <span className={`${props.leftIcon || props.rightIcon && 'hidden sm:block' }`}>
        {props.children}
      </span>
      {props.rightIcon && 
        <span className='pl-2'>{props.rightIcon}</span>
      }
    </button>
  )
}

export default Button