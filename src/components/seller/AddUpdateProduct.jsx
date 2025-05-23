import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  fetchCategories,
  updateProduct,
  updateProductImage,
} from "@/store/actions";
import Loader from "@/components/shared/Loader";
import toast from "react-hot-toast";

export default function AddProduct({ type = "add", product }) {
  const { isLoading } = useSelector((state) => state.errors);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    productName: "",
    description: "",
    category: "",
    quantity: 0,
    price: 0,
    discount: 0,
    image: null,
  });
  const { categories } = useSelector((state) => state.products);

  useEffect(() => {
    if (type === "edit" && product) {
      setForm({
        productName: product.productName || "",
        description: product.description || "",
        category: product.categoryId || "",
        quantity: product.quantity || 0,
        price: product.price || 0,
        discount: product.discount || 0,
        image: null,
      });
    }
  }, [type, product]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formProduct = {
      productName: form.productName,
      description: form.description,
      quantity: form.quantity,
      price: form.price,
      discount: form.discount,
    };

    let response;
    if (type === "add") {
      response = await dispatch(
        addNewProduct(formProduct, form.category, toast)
      );
    } else {
      response = await dispatch(
        updateProduct(formProduct, product.productId, toast)
      );
    }

    if (response?.data?.productId) {
      if (form.image) {
        dispatch(
          updateProductImage(response.data.productId, form.image, toast)
        );
      }
      setOpen(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
    }
  };

  return (
    <>
      <div>
        <Button onClick={() => setOpen(true)}>
          {type === "add" ? "Add Product" : "Edit"}
        </Button>
      </div>
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            // description="Product Modal"
            className="sm:max-w-[600px]"
          >
            <DialogHeader>
              <DialogTitle>
                {type === "add"
                  ? "Add New Product"
                  : `Edit ${product?.productName}`}
              </DialogTitle>
              <DialogDescription>
                Please fill out the form to{" "}
                {type === "add" ? "add a new" : "edit"} product.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="productName" className="text-right">
                  Name
                </Label>
                <Input
                  id="productName"
                  name="productName"
                  value={form.productName}
                  onChange={handleChange}
                  className="col-span-3"
                  placeholder="Adjustable dumbbell set for home workouts"
                />
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                  Description
                </Label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="col-span-3 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Adjustable dumbbell set for home workouts, can be used indoors, outdoors, at your personal gym..."
                />
              </div>

              {type === "add" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  {isLoading ? (
                    <Loader text="Fetching categories..." />
                  ) : (
                    <select
                      id="category"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="col-span-3 p-2 border rounded"
                    >
                      <option value="" disabled key="default">
                        Select category
                      </option>
                      {categories &&
                        categories?.map((cat) => (
                          <option key={cat.categoryId} value={cat.categoryId}>
                            {cat.categoryName}
                          </option>
                        ))}
                    </select>
                  )}
                </div>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price ($)
                </Label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="discount" className="text-right">
                  Discount (%)
                </Label>
                <Input
                  type="number"
                  id="discount"
                  name="discount"
                  value={form.discount}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Product Image
                </Label>
                <Input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="col-span-3 p-2 border rounded file:mr-4 file:py-1 file:px-2 file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
