import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

const base = { whiteSpace: 'nowrap', height: 46, borderRadius: '9999px', textTransform: 'none', fontWeight: 600, fontSize: '1rem', boxShadow: 'none' }

/** White primary button (as in the reference): label first, icon after it. */
export function PrimaryButton({ icon, children, ...props }) {
  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={icon}
      sx={{
        ...base,
        height: 40,
        fontSize: '0.9rem',
        bgcolor: 'transparent',
        color: '#000000',
        border: '2px solid rgba(0,0,0,0.35)',
        boxShadow: 'none',

        '&:hover': {
  bgcolor: 'rgba(0,0,0,0.05)',
  borderColor: 'rgba(0,0,0,0.65)',
  borderWidth: '2px',
  boxShadow: 'none',
},
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export function DangerButton({ icon, children, ...props }) {
  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={icon}
      sx={{
        ...base,
        height: 44,
        fontSize: '0.9rem',
        bgcolor: 'transparent',
        color: '#000000',
        border: '2px solid rgba(0,0,0,0.35)',
        boxShadow: 'none',

        '&:hover': {
  bgcolor: 'rgba(0,0,0,0.05)',
  borderColor: 'rgba(0,0,0,0.65)',
  borderWidth: '2px',
  boxShadow: 'none',
},
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export function GlassButton({ icon, children, ...props }) {
  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={icon}
      sx={{
        ...base,
        height: 44,
        fontSize: '0.9rem',
        color: '#fff',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.4)',
        '&:hover': { borderWidth: 2, borderColor: 'rgba(255,255,255,0.75)', bgcolor: 'rgba(255,255,255,0.1)' },
      }}
      {...props}
    >
      {children}
    </Button>
  )
}
