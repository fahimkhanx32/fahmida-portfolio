import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { Eye, EyeOff, KeyRound } from 'lucide-react'
import AuthField from './AuthField'

export default function PasswordField({ label = 'Password', ...props }) {
  const [show, setShow] = useState(false)
  return (
    <AuthField label={label} placeholder="Enter your password" type={show ? 'text' : 'password'} icon={KeyRound} endAdornment={ <InputAdornment position="end"> <IconButton edge="end" onClick={() => setShow((v) => !v)} aria-label={show ? 'Hide password' : 'Show password'} sx={{ color: '#000', marginRight: '2px' }} > {show ? <Eye size={20} /> : <EyeOff size={20} />} </IconButton> </InputAdornment> } {...props} />
  )
}
