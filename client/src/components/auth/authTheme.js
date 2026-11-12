import { createTheme } from '@mui/material/styles'

export const authTheme = createTheme({
  palette: { mode: 'dark', primary: { main: '#ffffff' }, error: { main: '#e5383b' } },
  typography: { fontFamily: 'Poppins, system-ui, sans-serif' },
})

// Glass-style outlined field: white outline, label notched into the border, pill shape.

export const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '9999px',
    color: '#000000',
    paddingLeft: '18px',

    '& fieldset': {
      borderColor: 'rgba(0,0,0,0.35)',
      borderWidth: 2,
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0,0,0,0.65)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000000',
      borderWidth: 2,
    },
    '&.Mui-error fieldset': {
      borderColor: '#e5383b',
    },
  },

  '& .MuiInputLabel-root': {
    color: '#000000',
    marginLeft: '12px',
    '&.Mui-focused': {
      color: '#000000',
    },
    '&.Mui-error': {
      color: '#e5383b',
    },
  },

  '& .MuiOutlinedInput-notchedOutline legend': {
    marginLeft: '12px',
  },

  '& input': {
    color: '#000000',
    WebkitTextFillColor: '#000000',
    caretColor: '#000000',
    paddingTop: '15px',
    paddingBottom: '15px',

    '&::placeholder': {
      color: 'rgba(0,0,0,0.55)',
      opacity: 1,
    },

    '&:-webkit-autofill': {
      WebkitTextFillColor: '#000000',
      caretColor: '#000000',
      transition: 'background-color 99999s ease-out 0s',
    },
  },

  '& .MuiFormHelperText-root': {
    color: '#e5383b',
    marginLeft: '18px',
  },
}

