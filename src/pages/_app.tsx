import type { AppProps } from "next/app"
import { Provider } from "next-auth/client"

import Header from "@/components/header"
import Footer from "@/components/footer"

// import "tailwindcss/tailwind.css"
// import "remixicon/fonts/remixicon.css"
// import "@gouvfr/dsfr/dist/css/dsfr.min.css"
// import "../styles/index.css"

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider
      session={pageProps.session}
      options={{ clientMaxAge: 0, keepAlive: 0 }}
    >
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  )
}

export default App
