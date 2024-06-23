import { FC } from 'react'
import { Box, Card } from '@mui/material'

interface IDayProps {
  emoji: string
  temp: string
  curDay: string
}

export const Day: FC<IDayProps> = ({ emoji, temp, curDay }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        flexWrap: 'wrap',
        width: '120px',
        gap: '10px',
        paddingBottom: '10px',
      }}
    >
      <span>{emoji}</span>
      <span>{curDay}</span>
      <span>{temp}</span>
    </Card>
  )
}
