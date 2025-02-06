import Image, { ImageProps } from 'next/image'
import React from 'react'

const Logo = ({
  alt = 'Logo',
  width = 48,
  height = 32,
  displayText = 'MGSM',
  ...props
}: Omit<ImageProps, 'src' | 'alt'> & {
  alt?: string;
  displayText?: string;
}) => {
  return (
    <div className='flex items-center space-x-2'>
      <Image
        src="/logo.png"
        alt={alt}
        width={width}
        height={height}
        {...props}
      />
      {displayText && <span>{displayText}</span>}
    </div>
  )
}

export default Logo