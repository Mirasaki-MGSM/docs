'use client'

import React from 'react'
import { CopyButton } from './copy-button'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'

const DiscordBotInvite = ({ className }: {
    className?: string
}) => {
    const [clientId, setClientId] = React.useState<null | string>(null)

    return (<div className={cn('debug flex items-center', className)}>
        <CopyButton
            className='rounded-r-none'
            text={`https://discord.com/api/oauth2/authorize?client_id=${clientId ?? '0'}&permissions=412585674816&scope=bot%20applications.commands`}
            disabled={!clientId}
        >
        </CopyButton>
        <Input
            name='clientId'
            placeholder='Application ID'
            value={clientId ?? ''}
            onChange={(e) => setClientId(e.target.value)}
            className={cn(
                buttonVariants({ variant: 'default' }),
                'rounded-l-none'
            )}
        />
    </div>)
}

export default DiscordBotInvite