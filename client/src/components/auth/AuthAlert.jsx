import Alert from '@mui/material/Alert'

export default function AuthAlert({ severity = 'error', children }) {
  if (!children) return null
  return (
    <Alert
      severity={severity}
      variant="outlined"
      sx={{
        borderRadius: '16px',
        color: '#fff',
        borderColor: severity === 'error' ? '#ff9aa0' : '#86efac',
        bgcolor: severity === 'error' ? 'rgba(229,56,61,0.18)' : 'rgba(34,197,94,0.18)',
        '& .MuiAlert-icon': { color: severity === 'error' ? '#ff9aa0' : '#86efac' },
      }}
    >
      {children}
    </Alert>
  )
}
