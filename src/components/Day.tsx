import { FC } from 'react'
import { Card } from '@mui/material'
import { dayBoxStyle } from './Styles'

interface IDayProps {
  emoji: string
  temp: string
  curDay: string
}

export const Day: FC<IDayProps> = ({ emoji, temp, curDay }) => {
  return (
    <Card sx={dayBoxStyle}>
      <span className="emoji">{emoji}</span>
      <span>{curDay}</span>
      <span>{temp}</span>
    </Card>
  )
}
