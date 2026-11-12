import Checkbox from '@mui/material/Checkbox'
import { UserRound } from 'lucide-react'

/** Button-style checkbox: checkbox on the left, label in the middle, user icon on the right. */
export default function RememberButton({ checked, onChange }) {
  return (
    <label className="flex h-11 w-full cursor-pointer select-none items-center justify-between gap-1 rounded-full border-2 border-black/40 pl-1 pr-4 text-sm font-medium text-black transition-colors hover:border-black hover:bg-black/5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-black">
      <Checkbox
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        size="small"
        sx={{ color: '#000000', padding: '8px', '&.Mui-checked': { color: '#000000' } }}
      />
      <span className="flex-1 whitespace-nowrap text-center">Remember me</span>
      <UserRound className="h-5 w-5 shrink-0" aria-hidden="true" />
    </label>
  )
}
