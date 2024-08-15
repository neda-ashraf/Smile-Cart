import { useState, useEffect } from "react";

import productsApi from "apis/products";
import { Header, PageLoader } from "components/commons";
import AddToCart from "components/commons/AddToCart";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";

import ProductListItem from "./ProductListItem";

const ProductList = ({ slug }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const debouncedSearchKey = useDebounce(searchKey);

  // const [cartItems, setCartItems] = useState([]);

  const fetchProducts = async () => {
    try {
      // const data = await productsApi.fetch({ searchTerm: searchKey });
      // setProducts(data.products);
      const data = await productsApi.fetch({
        searchTerm: debouncedSearchKey,
      });
      setProducts(data.products);
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearchKey]);

  if (isLoading) {
    return <PageLoader />;
  }

  // const toggleIsInCart = slug =>
  //   setCartItems(prevCartItems =>
  //     prevCartItems.includes(slug)
  //       ? without([slug], cartItems)
  //       : [slug, ...cartItems]
  //   );

  return (
    <div className="flex h-screen flex-col">
      <div className="m-2">
        <Header
          cartItemsCount
          shouldShowBackButton={false}
          title="Smile Cart"
          actionBlock={
            <Input
              placeholder="Search products"
              prefix={<Search />}
              type="search"
              value={searchKey}
              onChange={event => setSearchKey(event.target.value)}
            />
          }
        />
      </div>
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <>
              <ProductListItem
                key={product.slug}
                {...product}
                // isInCart={cartItems.includes(product.slug)}
                // toggleIsInCart={() => toggleIsInCart(product.slug)}
              />
              <AddToCart {...{ slug }} />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

// const Home = () => (
//   <div className="flex flex-col">
//     <div className="m-2">
//       <Typography className="mx-6 mb-2 mt-6" style="h1" weight="semibold">
//         Smile Cart
//       </Typography>
//       <hr className="neeto-ui-bg-black h-1" />
//     </div>
//     <Typography className="mx-auto" style="h2">
//       Home
//     </Typography>
//   </div>
// );

// export default Home;
