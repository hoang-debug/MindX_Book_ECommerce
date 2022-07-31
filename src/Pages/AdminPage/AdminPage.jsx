import { Box } from "@material-ui/core"
import { Outlet, Route, Routes } from "react-router-dom"
import AddBookPage from "./AddBookPage/AddBookPage"
import SideBar from "./SideBar"

const AdminPage = () => {
  return (
    <Box
      width='100%'
      minHeight='100vh'
      height='fit-content'
      style={{ backgroundColor: '#f1f1f1' }}
      display='flex'
      position='relative'
      paddingBottom={2}
      boxSizing='border-box'
    >
      <SideBar />
      <Box minWidth='200px' width='200px'/>
      <Outlet/>
    </Box>
  )
}

export default AdminPage