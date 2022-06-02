import { Box, Divider, makeStyles, Typography } from "@material-ui/core";
import Result from "./Result";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100]
  },
}))

const SearchResult = () => {
  const classes = useStyles()

  return (
    <Box
      className={classes.root}
      width='100%'
      height='fit-content'
      boxSizing='border-box'
      paddingTop={14}
      display='flex'
    >
      <Box
        width='100%'
        height='100%'
        padding={3}
        boxSizing='border-box'
        style={{ backgroundColor: '#fff' }}
        marginLeft={2}
        marginTop={2}
        marginRight={3}
      >
        <Typography
          variant="h4"
          style={{ fontWeight: '500' }}
          gutterBottom
        >
          Kết quả
        </Typography>

        <Divider />

        {/*ket qua tim kiem */}
        <Box
          marginTop={1}
        >
          <Result/>
          <Result/>
          <Result/>

        </Box>

      </Box>
    </Box>
  )
}

export default SearchResult