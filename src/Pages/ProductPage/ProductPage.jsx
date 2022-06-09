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
import { Fragment, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { axiosGet } from '../../Services/Ultils/axiosUtils'
import { BASE_API, HEROKU_API } from "../../Services/Constants";
import { convertBlockToLineRow, LineItem, LineRow } from "../BookPage/useBookSearch";
import { numberWithCommas } from "../../Services/Ultils/NumberUtils";
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
  const [sameBooks, setSameBooks] = useState(null)
  const [comments, setComments] = useState([])
  let { id } = useParams()

  // let [searchParams] = useSearchParams()
  // let buy_option = searchParams.get('buy_option')

  // console.log('render')

  // useEffect(() => {
  //   if (!buy_option) return
  //   // console.log('buy option', buy_option)
  //   setBuyOptionIndex(parseInt(buy_option))
  // }, [buy_option])

  useEffect(() => {
    const getSameBook = async (cate) => {
      let response = await axiosGet(`${HEROKU_API}/books?category=${cate}`)
      console.log('same cate', response.data)
      return response.data
    }
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
            new Specs('Nhà xuất bản', 'publisher', data.publisher).getObject(),
            new Specs('Ngày xuất bản', 'publication_date', data.publication_day).getObject(),
            new Specs('Số trang', 'number_of_page', null).getObject(),
            new Specs('Nhà sách', 'manufacturer', data.manufacturer).getObject(),
          ]
        }],
        price: data.price
      }
      console.log('book data:', data)

      const sameBooks = await getSameBook(data.category)
      let filtered_books = sameBooks.filter(book => book._id !== data._id)
      let lineRow = new LineRow('Sách cùng thể loại', `/book-page/${data.category}`)
      filtered_books.map(book => {
        let lineItem = new LineItem(
          null,
          book.imageURL[0],
          book._id,
          book.price,
          null,
          null,
          null,
          book.name,
          book.stars.averageStars
        )
        lineRow.addItem(lineItem.getObject())
      })
      if (lineRow.items.length > 0) setSameBooks(lineRow)
      setData(response.data)
      setDetails(details)
      // setSimilarBuy(convertBlockToLineRow(response.data.similar_buy_block).getObject())
      // setSimilarView(convertBlockToLineRow(response.data.similar_view_block).getObject())

    }
    getBookDetails(id)

    const getComments = async () => {
      let response = await axiosGet(`${HEROKU_API}/books/${id}/comments`)
      const comments = response.data
      setComments(comments)
    }
    getComments()
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

      {/* <Box marginY={2}><Divider /></Box> */}

      {/* <BoughtTogether /> */}

      <Box marginTop={2}><Divider /></Box>
      {sameBooks &&
        <Box width='100%'>
          <ItemSlider
            items={sameBooks.items}
            label={sameBooks.label}
            link={sameBooks.link}
            maxWidth='none'
          />
          <Box><Divider /></Box>
        </Box>
      }


      {!!details &&
        <Box
          display='flex'
          marginTop={2}
        >
          <CustomerRatings stars={details.rating} votes={numberWithCommas(details.review_count)} />
          <Box width='75%' marginLeft={4}>
            {/* <Review />
            <Review />
            <Review /> */}

            {comments.map((comment, key) => (
              <Fragment key={key}>
                <Review
                  username={comment.createdBy.username}
                  stars={0}
                  details={comment.content}
                />
              </Fragment>
            ))}

            <Divider />
            <Box marginTop={1} />
            {/* <Button color="primary" size='small'>Xem tất cả đánh giá &nbsp;{'>'}</Button> */}
            <Box marginTop={3} />

          </Box>
        </Box>
      }

    </Box>
  )
}

export default ProductPage