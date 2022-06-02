import { Box, makeStyles, Typography } from "@material-ui/core";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { BASE_API, BASE_FILE } from "../../Services/Constants";
import ItemSlider from "../HomePage/Slider/ItemSlider";
import Loading from "../Loading";
import { axiosGet } from "../../Services/Ultils/axiosUtils";
import Banner from "./Banner";
import BookListGrid from "./BookListGrid";
import useBookSearch from "./useBookSearch";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(15),
    backgroundColor: '#f5f5f5',
    width: '100%',
    alignItems: 'center'
  }
}))

const BookPage = () => {
  const classes = useStyles()
  const [banner, setBanner] = useState({ img_url: '', link: '', show_start: '', show_end: '', _id: '' })
  const [offset, setOffset] = useState(0)

  let { cateIdV2 } = useParams()
  let [searchParams] = useSearchParams()
  let cateIdV3 = searchParams.get('cateIdV3')
  let cateId = cateIdV3 || cateIdV2

  useEffect(() => {
    setOffset(0)
  }, [cateId])

  useEffect(() => {
    const getBanner = async () => {
      const response = await axiosGet(`${BASE_API}/pages/category/bads/filter?status=active`)
      setBanner(response.data[0])
    }
    getBanner()
  }, [])

  const { loading, error, lineData, gridData, hasMore, gridLabel } = useBookSearch(offset)

  const observer = useRef()

  const lastElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setOffset(prev => prev + 1)
        console.log('visible')
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  return (
    <div className={classes.root}>
      <Banner
        img_url={banner.img_url}
        link={banner.link}
        show_start={banner.show_start}
        show_end={banner.show_end}
        _id={banner._id}
      />

      {lineData.map((row, index) => {
        return (
          <Fragment key={index}>
            <Box marginTop={2} />
            <ItemSlider
              key={index}
              items={row.items}
              label={row.label}
              link={row.link}
            />
          </Fragment>
        )
      })}

      <BookListGrid
        listname={gridLabel}
        namePosition='center'
        items={gridData}
      />

      <div ref={lastElementRef} style={{ height: '1px', width: '1px' }} />
      {loading && <Loading />}
      {error && <Typography color="secondary">Lỗi khi tải trang</Typography>}
    </div>
  )

}

export default BookPage




// const getData = async () => {
//   // console.log(`${BASE_API}/pages/category/${cateIdV2}/blocks?offset=0&limit=2`)
//   const response = await axiosGet(`${BASE_API}/pages/category/${cateId}/blocks?offset=0&limit=2`)

//   let allblocks = response.data
//   // console.log(allblocks)
//   let lineResult = []
//   let gridResult = []
//   // console.log(allblocks.blocks)
//   allblocks.blocks.map(block => {
//     if (block.btype === 'LINE_BLOCK') {
//       let lineRow = new LineRow(block.label, block.link)
//       block.items.map(item => {
//         let lineitem = new LineItem(
//           item.itype,
//           item.img_url,
//           item.link,
//           item.oprice,
//           item.sprice,
//           item.sale_end,
//           item.sale_start,
//           item.label,
//           item.rating
//         )
//         lineRow.addItem(lineitem.getObject())
//       })
//       lineResult.push(lineRow.getObject())
//     } else if (block.btype === 'PAGE_BLOCK') {
//       block.items.map(item => {
//         let gridItem = new GridItem(
//           item.id,
//           item.link,
//           item.label,
//           item.sprice,
//           item.oprice,
//           item.img_url,
//           item.author,
//           item.rating,
//           item.votes,
//           item.sale_start,
//           item.sale_end,
//         )

//         gridResult.push(gridItem.getObject())
//       })
//     }
//   })
//   setLineData(lineResult)
//   setGridData(gridResult)
//   // console.log(gridResult)
// }

// getData()
