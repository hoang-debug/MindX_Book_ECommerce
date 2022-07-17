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
import { BASE_API, HEROKU_API } from "./Services/Constants"
import { axiosGet } from "./Services/Ultils/axiosUtils"
import { common_variable } from "./Pages/common"
import Login from "./Pages/Signin/CustomSignIn"
import HomePage from './Pages/HomePage/HomePage'
import DangVanChuyen from "./Pages/CheckOut/DangVanChuyen"
import ForgetPassword from "./Pages/Signin/ForgetPassword/ForgetPassword"
const useStyles = makeStyles((theme) => ({
  app: {
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
    position: 'relative',
    backgroundColor: theme.palette.grey[100],
    // paddingBottom: theme.spacing(4)
  },
}))


const App = () => {
  const classes = useStyles()
  const [userInfo, setUserInfo] = useState(null)
  const [signedIn, setSignedIn] = useState(false)

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     let url = `${BASE_API}/users`
  //     let response = await axiosGet(url, null, true)
  //     console.log('check login', response)
  //     if (response !== null) {
  //       setSignedIn(true)
  //       setUserInfo(response.data)
  //     }
  //   }
  //   // checkLogin()
  // }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify([]))
  }, [])

  const _setUserInfo = async (info) => {
    console.log('data', info)
    setSignedIn(true)
    setUserInfo(info)
    // let response = await axiosGet(`${HEROKU_API}/cart`, null, true)
    // let cart = response.data.sellProducts.map((item) => {
    //   return {
    //     book: item.book,
    //     qualityBook: item.qualityBook
    //   }
    // }) || []
    // localStorage.setItem('cart', JSON.stringify([]))
  }

  useEffect(() => {
    common_variable.signedIn = signedIn
  }, [signedIn])

  const [refreshNavbar, setRefreshNavbar] = useState(false)
  

  return (
    <div className={classes.app}>
      <Navbar signedIn={signedIn} refresh={refreshNavbar}/>
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/book-page/:idCategory" element={<BookPage />} />
        <Route path="/cart" element={<CartPage setRefreshNavbar={setRefreshNavbar}/>} />
        <Route path="/product/:id" element={<ProductPage setRefreshNavbar={setRefreshNavbar} userInfo={userInfo}/>} />
        <Route path="/search/:keyword" element={<SearchResult />} />
        <Route path="/chon-dia-chi" element={<ChooseAddress />} />
        <Route path="/thanh-toan" element={<ThanhToan />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dang-van-chuyen" element={<DangVanChuyen />} />
        {/* <Route path="/signin" element={<Signin _setUserInfo={_setUserInfo} signedIn={signedIn} />} /> */}
        <Route path="/signin" element={<Signin _setUserInfo={_setUserInfo} />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/forget-password/:step" element={<ForgetPassword/>}/>
      </Routes>
    </div>

  )
}

export default App