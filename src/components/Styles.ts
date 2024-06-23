import { SxProps, Theme } from '@mui/material'

export const weatherContainerStyle:SxProps<Theme> = {
  backgroundColor: 'pink',
  width: '100%',
  height: 'calc(100vh - 16px)',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
}