import { useEffect, useState } from "react";
import classes from "./FetchProducts.module.css";

export default function FetchProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  async function getProducts() {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    if (!response.ok) {
      throw new Error("could not fetch Data");
    }
    const resData = await response.json();
    if (resData?.products) {
      setProducts(resData.products);
      setTotalPages(resData.total / 10);
    }
  }

  function selectPageHandler(selectedPage) {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    )
      setPage(selectedPage);
  }

  useEffect(() => {
    getProducts();
  }, [page]);

  return (
    <div>
      {products.length > 0 && (
        <div className={classes.products}>
          {
            //Whereever we are using products.length change it to totalPages
            /* {products.slice(page * 10 - 10, page * 10).map((prod) => (
            <span className={classes.products__single} key={prod.id}>
              <img src={prod.thumbnail} alt={prod.title} />
              <span>{prod.title}</span>
            </span>
          ))} */
            products.map((prod) => (
              <span className={classes.products__single} key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            ))
          }
        </div>
      )}
      {products.length > 0 && (
        <div className={classes.pagination}>
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : classes.pagination__disable}
          >
            ◀
          </span>
          {[...Array(totalPages)].map((_, i) => (
            <span
              className={page === i + 1 ? classes.pageSelected : ""}
              key={i}
              onClick={() => selectPageHandler(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < totalPages ? "" : classes.pagination__disable}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}
