export function validateProduct(product, category) {
  if (
    product.productName.trim().length > 60 ||
    product.productName.trim().length < 3
  ) {
    throw new Error("Product name must contain from 3 to 50 characters.");
  } else if (
    product.description.trim().length > 250 ||
    product.description.trim().length < 6
  ) {
    throw new Error(
      "Product description must contain from 6 to 250 characters."
    );
  } else if (category < 0 || !category || category === "") {
    throw new Error("Please provide a valid category.");
  } else if (product.quantity < 1) {
    throw new Error("Product quantity must be greater than 0.");
  } else if (product.price <= 0) {
    throw new Error("Product price must be a positive number.");
  } else if (product.discount >= 100 || product.discount < 0) {
    throw new Error(
      "Product discount must be greater than zero and lower than 100."
    );
  } else {
    return true;
  }
}
