import { useEffect, useRef } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { BASE_API } from "../../Services/Constants"
import { axiosPost } from "../../Services/Ultils/axiosUtils"

const Signin = ({_setUserInfo, signedIn}) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { state } = useLocation()
  let prev = state && state.prev //prev lay tu page truoc
  let ticket = searchParams.get('ticket')
  console.log('prev', prev)
  useEffect(() => {
    if (signedIn) return
    const getUserInfo = async (ticket) => {
      let response = await axiosPost(`${BASE_API}/signin`, { ticket: ticket })
      console.log('ticket', ticket)
      console.log('access_token', response.data.access_token)
      localStorage.setItem('access_token', response.data.access_token)

      _setUserInfo(response.data)

      let prevlogin = localStorage.getItem('prevlogin')
      console.log('prevlogin', prevlogin)
      if (prevlogin) navigate(prevlogin)
      else navigate('/home')

    }
    const signIn = async () => {
      // let login_url = `http://localhost:2222/signin`
      let login_url = `https://accounts.monsters.vn/signin`
      let continue_url = `${window.location.protocol}//${window.location.host}`
      let full_url = `${login_url}?continue=${continue_url}`
      console.log(full_url)
      localStorage.setItem('prevlogin', prev)
      window.open(full_url, '_self')
    }

    if (ticket) {
      getUserInfo(ticket)
    } else {
      signIn()
    }
  }, [ticket, navigate, _setUserInfo, signedIn, prev, searchParams])


  return (
    <></>
  )
}

export default Signin