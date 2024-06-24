import { SxProps, Theme } from '@mui/material'

const scrollStyle: SxProps<Theme> = {
  '&::-webkit-scrollbar': {
    width: '3px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#555',
    borderRadius: '5px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#f1f1f1',
    borderRadius: '5px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
}

export const weatherContainerStyle: SxProps<Theme> = {
  backgroundColor: 'pink',
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
}

export const errorBoxStyle: SxProps<Theme> = {
  color: 'red',
  display: 'flex',
  justifyContent: 'center',
  gap: 5,
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
}

export const cityNameBoxStyle: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  gap: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 0',
}

export const dayWeatherBoxStyle: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  flexWrap: 'wrap',
  overflow: 'auto',
  marginBottom: '10px',
  justifyContent: {
    xs: 'center',
    lg: 'stretch',
  },
  ...scrollStyle,
}

export const dayBoxStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'white',
  flexWrap: 'wrap',
  width: '120px',
  height: '130px',
  gap: '10px',
  paddingBottom: '10px',
  "& .emoji": {
    marginTop: "10px",
    fontSize: '40px'
  }
}

