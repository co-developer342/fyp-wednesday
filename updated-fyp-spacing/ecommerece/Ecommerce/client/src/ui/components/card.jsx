import React from 'react';
import { Card, CardBody, CardFooter, ButtonGroup, Button, Divider, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/cart.js';
import { useToast } from '@chakra-ui/react';

function ProductCard({ product, selectedAttributes = {} }) {
  const [cart, setCart] = useCart();
  const toast = useToast();

  const handleAddToCart = () => {
    // Add the product to the cart with selectedAttributes
    const updatedCart = [...cart, { ...product, selectedAttributes }];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast({
      title: 'Product Added to Cart',
      description: "You've successfully added the product to your cart",
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <Card w={"400px"} maxW={{ base: '100%', md: '60%', lg: '30%' }} rounded={20} boxShadow={'0px 4px 10px rgba(0, 0, 0, 0.1)'}>
      <CardBody
        boxShadow={'sm'}
        display={'flex'}
        flexDir={'column'}
        align={'center'}
        justify={'center'}
        alignItems={'center'}
      >
        <Image
          w='full'
          src={`/api/v1/product/product-photo/${product._id}`} 
          objectFit='cover'
          alt={product.name}
          borderRadius="lg"
          h={{ base: '150px', md: '250px' }}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{product.name}</Heading>
          <Text>{product.description.split(' ').slice(0, 5).join(' ') + (product.description.split(' ').length > 15 ? '...' : '')}</Text>
          <Text color="red.500" fontWeight={"600"} fontSize="3xl">
            ${product.price}
          </Text>
        </Stack>
      </CardBody>
      <Divider color={"red.500"} />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Link to={`/product/${product.slug}`}>
            <Button variant="solid" colorScheme="red">
              Buy now
            </Button>
          </Link>
          <Button variant="ghost" colorScheme="red" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
