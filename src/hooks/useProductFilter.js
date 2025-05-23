import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, fetchSellerProducts } from "../store/actions";

export default function useProductFilter(isSeller = false, pageSize = 10) {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams();

    const currPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", currPage - 1);

    const sortOrder = searchParams.get("sortby") || "asc";
    const categoryParams = searchParams.get("category") || null;
    const keyword = searchParams.get("keyword") || null;
    params.set("sortBy", "price");
    params.set("sortOrder", sortOrder);
    params.set("pageSize", pageSize);

    if (categoryParams) {
      params.set("category", categoryParams);
    }
    if (keyword) {
      params.set("keyword", keyword);
    }

    const queryString = params.toString();

    if (isSeller) {
      dispatch(fetchSellerProducts(queryString));
    } else {
      dispatch(fetchProducts(queryString));
    }
  }, [dispatch, searchParams, isSeller, pageSize]);
}
