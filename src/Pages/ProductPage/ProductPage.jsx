import { Box, Button, Divider, makeStyles } from "@material-ui/core";
import '../HomePage/Slider/ItemSlider.css'
import BookImage from "./BookImage";
import BookDetails from "./BookDetails";
import PriceBox from "./PriceBox";
import BoughtTogether from "./BoughtTogether";
import ItemSlider from "../HomePage/Slider/ItemSlider";
import CustomerReviews from "./CustomerRatings";
import Review from "./Review";
import CustomerRatings from "./CustomerRatings";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { axiosGet } from '../../Services/Ultils/axiosUtils'
import { BASE_API, HEROKU_API } from "../../Services/Constants";
import { convertBlockToLineRow } from "../BookPage/useBookSearch";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white
  },
}))

let slider_item = {
  newprice: '$10.00',
  oldprice: '$12.00',
  src: 'https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg',
  details: [
    '10 days left'
  ]
}

class Specs {
  name
  code
  value
  constructor(name, code, value) {
    this.name = name
    this.code = code
    this.value = value
  }
  getObject() {
    return ({
      name: this.name,
      code: this.code,
      value: this.value
    })
  }
}

let slider_items = new Array(10).fill(slider_item)

const ProductPage = () => {
  const classes = useStyles()
  const [data, setData] = useState(null)
  const [details, setDetails] = useState(null)
  const [buyOptionIndex, setBuyOptionIndex] = useState(0)
  const [similarBuy, setSimilarBuy] = useState(null)
  const [similarView, setSimilarView] = useState(null)

  let { id } = useParams()

  let [searchParams] = useSearchParams()
  let buy_option = searchParams.get('buy_option')

  // console.log('render')

  useEffect(() => {
    if (!buy_option) return
    console.log('buy option', buy_option)
    setBuyOptionIndex(parseInt(buy_option))
  }, [buy_option])

  useEffect(() => {
    const getBookDetails = async (id) => {
      console.log('book id:', id)
      let response = await axiosGet(`${HEROKU_API}/books/${id}`)
      let data = response.data
      let details = {
        images: data.imageURL,
        authors: [data.author],
        desc: data.description,
        quantity_sold: null,
        rating: data.stars.averageStars,
        review_count: data.stars.totalAmountVotes,
        title: data.name,
        specs: [{
          attributes: [
            new Specs('Nhà xuất bản', 'publisher', data.publishers).getObject(),
            new Specs('Ngày xuất bản', 'publication_date', null).getObject(),
            new Specs('Số trang', 'number_of_page', null).getObject(),
            new Specs('Nhà sách', 'manufacturer', null).getObject(),
          ]
        }],
        price: data.price
      }
      console.log('book data:', response.data)
      setData(response.data)
      setDetails(details)
      // setSimilarBuy(convertBlockToLineRow(response.data.similar_buy_block).getObject())
      // setSimilarView(convertBlockToLineRow(response.data.similar_view_block).getObject())
    }
    getBookDetails(id)
  }, [id])

  const clickBuyOption = (index) => () => {
    setBuyOptionIndex(index)
  }

  return (
    <Box
      className={classes.root}
      width='100%'
      height='fit-content'
      boxSizing='border-box'
      paddingX={2}
      paddingTop={11}
    >
      {!!details &&
        <Box
          id="firstpart"
          width='100%'
          height='fit-content'
          display='flex'
          justifyContent='space-between'
          boxSizing='border-box'
        >
          <BookImage
            smallImages={details.images}
          />
          <Box marginLeft={2} />
          <BookDetails
            authors={details.authors}
            desc={details.desc}
            // list_price={details.list_price}
            // price={details.price}
            quantity_sold={details.quantity_sold}
            rating={details.rating}
            review_count={details.review_count}
            title={details.title}
            specs={details.specs}
            buyOptionIndex={buyOptionIndex}
            clickBuyOption={clickBuyOption}
            // buyOptions={data.buy_options}
          //.filter(option => option.price)
          />
          <Box marginLeft={2} />
          <PriceBox
            price={details.price}
            smallImages={details.images}
          />

        </Box>
      }

      <Box marginY={2}><Divider /></Box>

      <BoughtTogether />

      <Box marginTop={2}><Divider /></Box>
      {!!similarView &&
        <Box width='100%'>
          <ItemSlider
            items={similarView.items}
            label={similarView.label}
            link={similarView.link}
            maxWidth='none'
          />
          <Box><Divider /></Box>
        </Box>
      }

      {!!similarBuy &&
        <>
          <ItemSlider
            items={similarBuy.items}
            label={similarBuy.label}
            link={similarBuy.link}
            maxWidth='none'
          />
          <Box><Divider /></Box>
        </>
      }

      <Box
        display='flex'
        marginTop={2}
      >
        <CustomerRatings stars='4.8' votes='211,678' ratings={[86, 10, 3, 1, 1]} />
        <Box width='75%' marginLeft={4}>
          <Review />
          <Review />
          <Review />

          <Divider />
          <Box marginTop={1} />
          <Button color="primary" size='small'>Xem tất cả đánh giá &nbsp;{'>'}</Button>
          <Box marginTop={3} />

        </Box>
      </Box>

    </Box>
  )
}

export default ProductPage