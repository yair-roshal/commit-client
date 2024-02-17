import Head from "next/head"
import "styles/App.scss"
import { MenuBar } from "components/MenuBar"
import { Provider } from "react-redux"
import store from "redux/store"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>FS Form</title>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>

        <div>
          <MenuBar />
          <div>
            <Component {...pageProps} />
          </div>
        </div>
      </Provider>
    </>
  )
}
