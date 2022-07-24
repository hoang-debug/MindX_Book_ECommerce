import { Box, Typography } from "@material-ui/core"
import OrderStatusBar from "./OrderStatusBar"

const BuyOrderPage = () => {


  return (
    <Box
      paddingTop={10}
      width='100%'
      display='flex'
      justifyContent='center'
      paddingBottom={2}
      position='relative'
    >
      <Box
        width='1158.5px'
      >
        <OrderStatusBar />
        <Box marginTop={2} />

        {/* {carts.map((order) =>
          <Fragment key={`${order._id}${order.status}`}>
            <BuyOrder
              _id={order._id}
              _status={order.status}
            />
            <Box marginTop={2} />
          </Fragment>
        )} */}
        {/* {carts.length === 0 && !loading &&
          <Box
            width='100%'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            paddingTop={20}
          >
            {error ?
              <>
                <Typography variant='h5' style={{ fontWeight: 500 }} color='secondary'>Lỗi khi tải dữ liệu</Typography>
              </>
              :
              <>
                <SentimentVeryDissatisfied style={{ fontSize: '50px' }} />
                <Box marginTop={2} />
                <Typography variant='h5' style={{ fontWeight: 500 }}>Không có đơn hàng nào</Typography>
              </>
            }

          </Box>
        } */}

        {/* {!error && hasMore &&
          <>
            <div ref={lastElementRef} />
            <OrderSkeleton />
            <Box marginTop={2} />
            <OrderSkeleton />

          </>
        } */}
      </Box>
    </Box>
  )
}

export default BuyOrderPage