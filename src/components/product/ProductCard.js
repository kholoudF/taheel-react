import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Divider,
  Typography
} from '@material-ui/core';

const ProductCard = ({ product, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Card
      {...rest}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: '-10px 10px 10px #3c808426',
        background: '#fff',
        borderRadius: '20px',
        minHeight: '450px'
      }}
      className={product.isActive ? '' : 'service-not-active'}
    >
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Box
          sx={{
            background: '#fff',
          }}
        >
          <CardContent
            className="service-content"
            sx={{
              height: '320px',
              width: '70%',
              margin: '0 auto',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                pb: 3,
              }}
            >
              <img
                alt="Product"
                src={product.media}
                width="120"

              />
            </Box>
            <Typography
              align="center"
              color="textPrimary"
              gutterBottom
              variant="h4"
              sx={{
                pb: 2,
                pt: 0,
                fontSize: '25px'
              }}
            >
              {product.title}
            </Typography>
            <Divider
              variant="middle"
              sx={{
                width: '70%',
                margin: '0 auto',
                borderWidth: '1px',
                borderColor: '#3c8084'
              }}
            />
            <Typography
              align="center"
              color="textPrimary"
              variant="body1"
              sx={{
                pb: 0,
                pt: 2,
              }}
            >
              {product.description}
            </Typography>
          </CardContent>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ pt: 8 }}>
            <Grid
              container
              spacing={2}
              className="service-content"
              sx={{ justifyContent: 'space-between' }}
            >
              <Button
                size="large"
                type="submit"
                variant="contained"
                onClick={() => navigate(product.url, { replace: true })}
                sx={{
                  borderRadius: '5em',
                  margin: '0 auto',
                  backgroundColor: '#3c8084',
                  fontSize: '16px',
                  fontWeight: '900',
                  pl: 4,
                  pr: 4
                }}
              >
                ذهاب للخدمة
              </Button>
            </Grid>
          </Box>
        </Box>
        {Boolean(!product.isActive) && (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              left: 0,
              top: 0,
              background: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              align="center"
              color="textPrimary"
              variant="body1"
              sx={{
                width: '160px',
                color: '#3a3939',
                fontSize: '25px',
                fontWeight: '900'
              }}
            >
              سيتم إطلاق الخدمة قريباً
            </Typography>
          </Box>
        )}
      </Box>

    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCard;
