import ContextProvider from "@/components/ContextProvider"
import "@/styles.css"

const App = ({ Component, pageProps }) => {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}
export default App
