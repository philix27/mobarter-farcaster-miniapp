import { Analytics } from '@vercel/analytics/react'
import { AppProps } from 'next/app'
import { PropsWithChildren } from 'react'
import { ErrorBoundary } from '@/components/Errors'
import { useIsSsr } from 'src/lib/utils/ssr'
import 'src/styles/globals.css'

import { Root } from '@/src/root'
import { PreventZoom } from '../root/DissableZoom'

function SafeHydrate({ children }: PropsWithChildren<any>) {
  const isSsr = useIsSsr()
  if (isSsr) {
    return <div></div>
  } else {
    return children
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <SafeHydrate>
        <Root>
          <PreventZoom>
            <Component {...pageProps} />
          </PreventZoom>
        </Root>
        {process.env.NODE_ENV !== 'development' && <Analytics />}
      </SafeHydrate>
    </ErrorBoundary>
  )
}
