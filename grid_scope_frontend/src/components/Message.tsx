import React, { ReactNode } from 'react'
import { Alert, AlertProps } from 'react-bootstrap'

type MessageProps = {
  variant: AlertProps['variant']
  children: ReactNode
}

function Message({ variant, children }: MessageProps) {
  return <Alert variant={variant}>{children}</Alert>
}

export default Message