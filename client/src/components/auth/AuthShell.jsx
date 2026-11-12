import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { profile } from '../../data/profile'
import { authTheme } from './authTheme'

export default function AuthShell({ title, subtitle, children }) {
  const bg = profile.loginBackground || `${import.meta.env.BASE_URL}silverdoor.webp`
  return (
    <ThemeProvider theme={authTheme}>
      <CssBaseline enableColorScheme />
      <main
        className="flex min-h-dvh items-center justify-center bg-[#1b1a5c] bg-cover bg-center bg-no-repeat px-4 py-8 font-['Poppins',sans-serif] text-white sm:px-6"
        style={{ backgroundImage: `url(${bg})`, paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
      >
        <section className="w-full max-w-[30rem] px-5 py-7 sm:px-9 sm:py-8">
          
          {subtitle && <p className="mt-2 text-center text-sm text-white/80">{subtitle}</p>}
          <div className="mt-7">{children}</div>
        </section>
      </main>
    </ThemeProvider>
  )
}
