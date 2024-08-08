import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductData } from "../../Actions/productActions";
import AddProduct from "./AddProduct";
import Product from "./Product";
import ProductView from "./ProductView";
import { getBrandProductData } from "../../Actions/brandProductActions";
import AddImage from "./AddImage";
import AddBrandProduct from "./AddBrandProduct";
import AddBrandSupplier from "./AddBrandSupplier";
import { getCategoryData } from "../../Actions/categoryActions";
import { getBrandData } from "../../Actions/brandActions";

const ProductComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { prodId, brProdId } = useParams();
  const [currPage, setCurrPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const isProductRoute = location.pathname === "/product";
  const isAddBrandProductRoute =
    location.pathname === "/product/add-brand-product";
  const isAddProductRoute = location.pathname.startsWith(
    "/product/add-product/"
  );

  const isEditBrandProductRoute = location.pathname.startsWith(
    "/product/edit-brand-product/"
  );
  const isEditProductRoute = location.pathname.startsWith(
    "/product/edit-product/"
  );
  const isViewProductRoute = location.pathname.startsWith(
    "/product/view-product/"
  );
  const isImageEditRoute = location.pathname.startsWith(
    "/product/edit-product-image/"
  );
  const isImageAddRoute = location.pathname.startsWith(
    "/product/add-product-image/"
  );
  const isSupplierAddRoute = location.pathname.startsWith(
    "/product/add-brand-supplier/"
  );

  const data = useSelector((state) => state);
  const product = useSelector((state) => state.product);
  const brandProduct = useSelector((state) => state.brandProduct);
  const category = useSelector((state) => state.category);
  const brand = useSelector((state) => state.brand);

  const {
    productData,
    productSuccess,
    productError,
    productLoading,
    singleProductData,
    productIsActive,
    prodImageSuccess,
  } = product;
  const {
    brandProductData,
    brandProductLoading,
    brandProductSuccess,
    brandProductError,
    brandProductIsActive,
  } = brandProduct;
  const { categoryData } = category;
  const { brandData } = brand;
  useEffect(() => {
    if (isProductRoute) dispatch(getProductData("fetch", limit, currPage));
    dispatch(getBrandProductData("fetch"));
    dispatch(getCategoryData("fetch"));
    dispatch(getBrandData("fetch"));
    if (prodId || brProdId) {
      dispatch(getProductData("single", prodId ?? brProdId));
    }
  }, [
    dispatch,
    isProductRoute,
    prodId,
    productIsActive,
    limit,
    currPage,
    isViewProductRoute,
    brProdId,
  ]);
  const currentPageChange = (currPage) => {
    setCurrPage(currPage);
  };
  const limitChange = (limit) => {
    setLimit(limit);
  };
    useEffect(() => {
      setCurrPage(1);
    }, [limit]);
  // const brandProdData = brandProductData.map((product) => {
  //   return {
  //     id: product.id,
  //     brand_id: product.brand_id,
  //     description: product.description,
  //     is_active: product.is_active,
  //     product_name: product.product_name,
  //     subcategory_id: product.subcategory_id,
  //   };
  // });
  const records = productData.records ?? [];
  const currentPage = productData.current_page;
  const totalPages = productData.total_pages;
  const records1 = productData.records?.map((product) => {
    return {
      id: product.id,
      is_active: product.is_active,
      min_purchase_quantity: product.min_purchase_quantity,
      supplier_id: product.supplier_id,
      weight_description: product.weight_description,
      weight_unit: product.weight_unit,
      weight_value: product.weight_value,
      brand_product_id: product.brand_product_id,
      price: product.price,
    };
  });
  const propEditData = singleProductData;
  const brandProdData = singleProductData?.brand_product;
  const propImageData = singleProductData?.product_images;
  return (
    <>
      {isAddProductRoute || isEditProductRoute ? (
        <AddProduct
          Data={propEditData}
          Success={productSuccess}
          Error={productError}
          Loading={productLoading}
        />
      ) : isProductRoute ? (
        <>
          <Product
            Data={records ?? []}
            Success={productSuccess}
            Error={productError}
            Loading={productLoading}
            isActiveData={productIsActive}
            propTotalPages={totalPages}
            propCurrentPage={currentPage}
            currentPageChange={currentPageChange}
            limitChange={limitChange}
          />
        </>
      ) : isViewProductRoute ? (
        <ProductView
          viewData={singleProductData}
          Success={productSuccess}
          Error={productError}
          Loading={productLoading}
          isActiveData={productIsActive}
        />
      ) : isImageEditRoute || isImageAddRoute ? (
        <AddImage
          Data={propImageData}
          Success={prodImageSuccess}
          Error={productError}
          Loading={productLoading}
        />
      ) : isAddBrandProductRoute || isEditBrandProductRoute ? (
        <AddBrandProduct
          Data={brandProdData}
          Success={brandProductSuccess}
          Error={brandProductError}
          Loading={brandProductLoading}
          categoryData={categoryData}
          BrandData={brandData}
        />
      ) : isSupplierAddRoute ? (
        <AddBrandSupplier
          Success={productSuccess}
          Error={productError}
          Loading={productLoading}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ProductComponent;
