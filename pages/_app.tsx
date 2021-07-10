import 'styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container mx-auto min-h-screen">
      <Component {...pageProps} />
    </div>
  )
}
export default MyApp
