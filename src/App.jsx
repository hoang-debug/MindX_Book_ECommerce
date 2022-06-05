import { makeStyles } from "@material-ui/core"
import { Navigate, Route, Routes } from "react-router-dom"
import BookPage from "./Pages/BookPage/BookPage"
import CartPage from "./Pages/CartPage/CartPage"
import ChooseAddress from "./Pages/CheckOut/ChooseAddress/ChooseAddress"
import ThanhToan from "./Pages/CheckOut/ThanhToan"
import Navbar from "./Pages/Navbar/Navbar"
import ProductPage from "./Pages/ProductPage/ProductPage"
import ProfilePage from "./Pages/Profile/ProfilePage"
import SearchResult from "./Pages/SearchResult/SearchResult"
import Signin from "./Pages/Signin/Signin"
import { useEffect, useState } from "react"
import ConfirmPage from "./Pages/ConfirmPage/ConfirmPage"
import { BASE_API } from "./Services/Constants"
import { axiosGet } from "./Services/Ultils/axiosUtils"
import { common_variable } from "./Pages/common"

const useStyles = makeStyles((theme) => ({
  app: {
    width: '100%',
    height: 'fit-content',
    padding: 0,
    margin: 0,
    position: 'relative',
    backgroundColor: theme.palette.grey[100],
    paddingBottom: theme.spacing(4)
  },
}))


const App = () => {
  const classes = useStyles()
  const [userInfo, setUserInfo] = useState(null)
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    const checkLogin = async () => {
      let url = `${BASE_API}/users`
      let response = await axiosGet(url, null, true)
      console.log('check login', response)
      if (response !== null) {
        setSignedIn(true)
        setUserInfo(response.data)
      }
    }
    // checkLogin()
  }, [])

  const _setUserInfo = (info) => {
    setSignedIn(true)
    setUserInfo(info)
  }

  useEffect(() => {
    common_variable.signedIn = signedIn
  }, [signedIn])

  useEffect(() => {
    const getBooks = async () => {
      let response = await axiosGet('https://book-ecommerce-be.herokuapp.com/api/books', null, false)
      console.log('get books heroku', response)

    }
    getBooks()
  }, [])

  return (
    <div className={classes.app}>
      <Navbar signedIn={signedIn} />
      <Routes>
        <Route path="*" element={<Navigate to="/book-page/62822a57289eae04f259880e" replace />} />
        <Route path="/book-page/:cateIdV2" element={<BookPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/chon-dia-chi" element={<ChooseAddress />} />
        <Route path="/thanh-toan" element={<ThanhToan />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signin" element={<Signin _setUserInfo={_setUserInfo} signedIn={signedIn} />} />
        <Route path="/confirm" element={<ConfirmPage />} />
      </Routes>
    </div>

  )
}

export default App