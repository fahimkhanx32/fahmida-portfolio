import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { fieldSx } from './authTheme'

/** MUI outlined field with a floating (notched) label and a leading icon + divider. */
export default function AuthField({ icon: Icon, endAdornment, sx, ...props }) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      sx={{ ...fieldSx, ...sx }}
      slotProps={{
        // Label stays on the border so it never collides with the icon.
        inputLabel: { shrink: true },
        input: {
          startAdornment: Icon && (
            <InputAdornment position="start" sx={{ marginRight: 1.5 }}>
              <Icon size={18} color="#000000" aria-hidden="true" />
              <span aria-hidden="true" className="ml-3 h-5 w-px bg-black/40" />
            </InputAdornment>
          ),
          endAdornment,
        },
      }}
      {...props}
    />
  )
}
