import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Package, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import AddUpdateProduct from "./AddUpdateProduct";

export default function SellerPanel() {
  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Seller Dashboard
        </h1>
        <p className="text-gray-600 text-sm">
          Manage your products, sales, and earnings all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Add New Product */}
        <Card className="hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6 flex flex-col items-start gap-4">
            <PlusCircle className="w-8 h-8 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Add Product</h2>
            <p className="text-gray-600 text-sm">
              Quickly list a new item for sale on the platform.
            </p>
            <AddUpdateProduct />
          </CardContent>
        </Card>

        {/* Manage Products */}
        <Card className="hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6 flex flex-col items-start gap-4">
            <Package className="w-8 h-8 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">My Products</h2>
            <p className="text-gray-600 text-sm">
              Edit, remove, or update the items you are selling.
            </p>
            <Link to="/seller/products">
              <Button variant="default">Manage</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Earnings */}
        <Card className="hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6 flex flex-col items-start gap-4">
            <DollarSign className="w-8 h-8 text-yellow-600" />
            <h2 className="text-xl font-semibold text-gray-800">Earnings</h2>
            <p className="text-gray-600 text-sm">
              Track your sales and withdraw your balance.
            </p>
            <Link to="/seller/earnings">
              <Button variant="default">View</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
