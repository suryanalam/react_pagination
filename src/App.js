// Logic if limit, skip and total properties are "not present" in the given API

import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [totalPagesCount, setTotalPagesCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {

    let fetchProducts = async () => {
      let resp = await fetch("https://dummyjson.com/products?limit=0");
      let data = await resp.json();
      console.log("resp from api: ", data);
  
      if (data?.products) {
        setProducts(data.products);
        setTotalPagesCount(Math.ceil(products.length / 15))
      }
    };

    fetchProducts();
  }, [page, products.length]);

  return (
    <main>
      <header>Pagination</header>
      {products.length > 0 && (
        <div className="products-div">
          {products.slice(page * 15 - 15, page * 15).map((product) => {
            return (
              <section key={product.id} className="product-bg">
                <img src={product.thumbnail} alt={product.title} />
                <p>{product.title}</p>
              </section>
            );
          })}
        </div>
      )}

      {products.length > 0 && (
        <section className="pagination-div">
          {page !== 1 && (
            <span className="prev" onClick={() => setPage(page - 1)}>
              previous
            </span>
          )}
          {[...Array(totalPagesCount)].map((_, i) => {
            return (
              <span
                key={i}
                onClick={() => setPage(i + 1)}
                className={page === i + 1 ? "selected" : ""}
              >
                {i + 1}
              </span>
            );
          })}
          {page !== totalPagesCount && (
            <span className="next" onClick={() => setPage(page + 1)}>
              next
            </span>
          )}
        </section>
      )}
    </main>
  );
}

export default App;
