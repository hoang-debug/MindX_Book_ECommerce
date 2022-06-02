import { AppBar, Avatar, Badge, Box, Button, IconButton, InputBase, makeStyles, Slide, Toolbar, Typography, useScrollTrigger, useTheme } from "@material-ui/core"
import { ArrowBack, Clear, ExpandMore, Search, ShoppingBasket } from "@material-ui/icons"
import React, { useState } from "react"
import LogoIcon from "../images/logo.png"
import MenuSach from "./Navbar_Menu/MenuSach"
// import MenuGioiThieu from "./Navbar_Menu/MenuGioiThieu"
import CategoryBar from "./Navbar_Menu/CategoryBar"
import { Link, NavLink, useNavigate } from "react-router-dom"
import './Navbar.css'

const useStyles = makeStyles((theme) => ({
  appBar: {
    // boxShadow: (props) => (props.navBarTransparent ? theme.shadows[0] : theme.shadows[4]),
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.common.white,

  },
  toolBar: {
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    // padding: theme.spacing(1),
    alignItems: 'center',
    height: "60px",
  },
  logoZone: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    display: 'flex'
    // display: (props) => (props.openSearch ? 'none' : 'flex'),
  },
  logoName: {
    display: 'block',
    fontWeight: theme.typography.fontWeightMedium,
    marginLeft: theme.spacing(1)
  },
  closeSearchButton: {
    display: (props) => (props.openSearch ? 'block' : 'none'),
    marginLeft: theme.spacing(2),
  },
  searchZone: {
    display: (props) => (props.openSearch ? 'flex' : 'none'),
    alignItems: 'center',
    backgroundColor: '#F1F3F4',
    borderRadius: theme.shape.borderRadius,
    width: '40%',
    paddingLeft: theme.spacing(1),
    // [MediaQuery.down('sm')]: {
    //     display: (props) => (props.openSearch ? 'flex' : 'none'),
    //     flexGrow: 1,
    //     marginRight: theme.spacing(5),
    // },
    position: 'relative',
    flexGrow: 1,
    marginRight: theme.spacing(2)
  },
  input: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    fontSize: 15,
  },
  cancel: {
    display: 'none'
  },
  iconZone: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // [MediaQuery.down('sm')]: {
    //     display: (props) => (props.openSearch ? 'none' : 'flex'),
    // },
    gap: theme.spacing(3),
    height: "100%",
  },
  searchIcon: {
    display: 'block',
    // [theme.breakpoints.up('sm')]: {
    //     display: 'none'
    // }
  },

  tabBox: {
    height: "100%",
    paddingTop: "3px",
    borderBottom: `3px solid ${theme.palette.common.white}`,
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    cursor: 'pointer'
  },

  sideBar: {
    width: theme.spacing(30),
  },
  sideItem: {
    display: 'flex',
    height: theme.spacing(7)
  },
  sideIcon: {
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(3.5),
  },
  sideText: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  menuBar: {
    display: (props) => (props.openSearch ? 'none' : 'flex'),
    flexGrow: 1,
    paddingLeft: theme.spacing(10),
    height: '100%',
    gap: theme.spacing(3)
  },
  menuBox: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    cursor: 'pointer',
    '&:hover': {
      color: '#3F51B5'
    }
  },
  expandIcon: {
    display: 'none',
    position: 'absolute',
    bottom: theme.spacing(1),
    transform: (props) => (props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'),
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    height: theme.spacing(2),
    width: theme.spacing(2)
  },
  linkActive: {
    color: 'black',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  linkInActive: {
    color: 'black',
    textDecoration: 'none',
    fontWeight: 'normal'
  }
}))

const HideOnScroll = (props) => {
  const { children, window } = props
  const trigger = useScrollTrigger({ target: window ? window() : undefined })
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const categories = ['Tiểu thuyết', 'Truyện ngắn', 'Tác phẩm kinh điển']

const Navbar = (props) => {
  const theme = useTheme()
  // const [navBarTransparent, setNavBarTransparent] = useState(true)
  const [openSearch, setOpenSearch] = useState(false)
  const [expanded, setExpanded] = useState(false);
  const [anchor, setAnchor] = useState([null, null])
  const classes = useStyles({ openSearch, expanded })

  const handleExpandClick = (menu_name) => (event) => {
    setAnchor([menu_name, event.currentTarget])
    setExpanded(true)
  };
  const handleCloseMenu = () => {
    setAnchor([null, null])
    setExpanded(false)
  }

  // useEffect(() => {
  //     const handleScroll = () => {
  //         const isTransparent = window.scrollY === 0
  //         if (isTransparent) setNavBarTransparent(true)
  //         else setNavBarTransparent(false)
  //     }
  //     document.addEventListener('scroll', handleScroll)
  //     return () => { document.removeEventListener('scroll', handleScroll) }
  // }, [])

  const [searchValue, setSearchValue] = useState('')

  const deleteSearch = () => {
    setSearchValue('')
    document.getElementById('cancel').style.display = 'none'
  }

  const onInput = (event) => {
    let cancel_button = document.getElementById('cancel')
    if (event.target.value) cancel_button.style.display = 'block'
    else cancel_button.style.display = 'none'
    setSearchValue(event.target.value)
  }

  const navigate = useNavigate()
  const signIn = (event) => {
    navigate('/signin', { state: { prev: window.location.pathname } })
  }

  const [cateIdV2, setCateIdV2] = useState('')

  return (
    <div>
      <HideOnScroll {...props}>
        <AppBar color="default" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <div className={classes.logoZone}>
              <Link to='/'>
                <Box display='flex' alignItems='center'>
                  <Avatar src={LogoIcon} />
                  <Typography style={{ cursor: "pointer" }} variant="h5" className={classes.logoName}>
                    Books
                  </Typography>
                </Box>
              </Link>
            </div>
            <div className={classes.menuBar}>
              <div
                className={classes.menuBox}
                onClick={handleExpandClick('menu-sach')}
              >
                <Typography variant="body2">Sách</Typography>
                <ExpandMore
                  className={classes.expandIcon}
                  style={{ display: (anchor[0] === 'menu-sach') ? 'block' : 'none' }}
                />
              </div>
              {/* <div
                className={classes.menuBox}
                onClick={handleExpandClick('menu-nap-credit')}
              >
                <Typography variant="body2">Nạp credit</Typography>
                <ExpandMore
                  className={classes.expandIcon}
                  style={{ display: (anchor[0] === 'menu-nap-credit') ? 'block' : 'none' }}
                />
              </div> */}

              {/* <div
                className={classes.menuBox}
                onClick={handleExpandClick('menu-nap-credit')}
              >
                <Typography variant="body2">Quyên góp sách</Typography>
                <ExpandMore
                  className={classes.expandIcon}
                  style={{ display: (anchor[0] === 'menu-quyen-gop') ? 'block' : 'none' }}
                />
              </div> */}

              {/* <div
                className={classes.menuBox}
                onClick={handleExpandClick('menu-gioi-thieu')}
              >
                <Typography variant="body2">Khuyến mại</Typography>
                <ExpandMore
                  className={classes.expandIcon}
                  style={{ display: (anchor[0] === 'menu-gioi-thieu') ? 'block' : 'none' }}
                />
              </div> */}

              {/* <div
                className={classes.menuBox}
                onClick={handleExpandClick('menu-gioi-thieu')}
              >
                <Typography variant="body2">Giới thiệu</Typography>
                <ExpandMore
                  className={classes.expandIcon}
                  style={{ display: (anchor[0] === 'menu-gioi-thieu') ? 'block' : 'none' }}
                />
              </div> */}



            </div>
            <IconButton className={classes.closeSearchButton} onClick={() => setOpenSearch(false)}>
              <ArrowBack></ArrowBack>
            </IconButton>
            <div className={classes.searchZone}>
              <Link to={`/search?keyword=${searchValue}`}>
                <IconButton><Search fontSize="small" /></IconButton>
              </Link>
              <InputBase id="input" placeholder="Tìm kiếm..." onInput={onInput} className={classes.input} value={searchValue} />
              <IconButton id="cancel" onClick={deleteSearch} className={classes.cancel}><Clear fontSize="small" /></IconButton>
            </div>
            <div className={classes.iconZone}>
              <IconButton className={classes.searchIcon} onClick={() => setOpenSearch(true)}>
                <Search></Search>
              </IconButton>

              <Box className={classes.tabBox}>
                <NavLink to='/cart'>
                  {({ isActive }) => (
                    // <Typography variant="body2" className={isActive ? classes.linkActive : classes.linkInActive}>
                    //   Giỏ hàng
                    // </Typography>
                    <Badge badgeContent={4} color="secondary">
                      <ShoppingBasket />
                    </Badge>
                  )}
                </NavLink>
              </Box>
              {/* <Box className={classes.tabBox}>
                <Typography variant="body2">
                  5 stars
                </Typography>
              </Box> */}
              <Box className={classes.tabBox}>
                <Typography variant="body2">
                  10.000.000đ
                </Typography>
              </Box>

              <Box className={classes.tabBox}>
                {props.signedIn ? (
                  <Avatar src={props.avatar_url} />
                ) : (
                  <Typography variant="body2" color="primary" onClick={signIn} style={{ cursor: 'pointer' }}>
                    Sign in
                  </Typography>
                )}

              </Box>
            </div>
          </Toolbar>
          {/* <CategoryBar /> */}
          <MenuSach anchor={anchor} handleCloseMenu={handleCloseMenu}></MenuSach>
          {/* <MenuNapCredit anchor={anchor} handleCloseMenu={handleCloseMenu}></MenuNapCredit> */}
          {/* <MenuGioiThieu anchor={anchor} handleCloseMenu={handleCloseMenu}></MenuGioiThieu> */}
        </AppBar>
      </HideOnScroll>


    </div >
  )
}

Navbar.defaultProps = {
  signedIn: false,
  avatar_url: ''
}

export default Navbar