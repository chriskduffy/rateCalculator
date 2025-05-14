"use client";
import { useEffect, useState } from "react";

// Define types for SKU
type SKUType = {
  sku: string;
  description: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  volWeight: number;
  rateZoneAB: number;
  rateZoneC: number;
  rateZoneD: number;
};

// Mock data based on the Excel spreadsheet
const SKU_LIST: SKUType[] = [
  {
    sku: "76-431",
    description: "Gallery Natural Wood Veneer and Black Metal 5 Shelf Unit",
    length: 186,
    width: 32,
    height: 92,
    weight: 33,
    volWeight: 136.896,
    rateZoneAB: 48.56,
    rateZoneC: 65.96,
    rateZoneD: 71.75,
  },
  {
    sku: "15-313-BI",
    description: "Lucca Biscuit Velvet and Metal Sofa",
    length: 144,
    width: 72,
    height: 49,
    weight: 21,
    volWeight: 127.008,
    rateZoneAB: 14.49,
    rateZoneC: 30.84,
    rateZoneD: 40.92,
  },
  {
    sku: "15-313-BK",
    description: "Lucca Black Velvet and Metal Sofa",
    length: 144,
    width: 72,
    height: 49,
    weight: 21,
    volWeight: 127.008,
    rateZoneAB: 14.49,
    rateZoneC: 30.84,
    rateZoneD: 40.92,
  },
  {
    sku: "15-313-DG",
    description: "Lucca Dove Grey Velvet and Metal Sofa",
    length: 144,
    width: 72,
    height: 49,
    weight: 21,
    volWeight: 127.008,
    rateZoneAB: 14.49,
    rateZoneC: 30.84,
    rateZoneD: 40.92,
  },
  {
    sku: "02-507-NT",
    description: "Charlie 2 Door 2 Drawer Wardrobe",
    length: 94,
    width: 53,
    height: 193,
    weight: 73,
    volWeight: 191.829,
    rateZoneAB: 36.26,
    rateZoneC: 72.08,
    rateZoneD: 84.18,
  },
];

const PacificRateCalculator = () => {
  const [activeTab, setActiveTab] = useState("single");
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="flex min-h-screen flex-col text-gray-800">
      {/* Header */}
      <header className="bg-blue-700 p-4 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <h1 className="mb-2 text-2xl font-bold md:mb-0">
              Pacific Rate Calculator
            </h1>
            <nav className="flex items-center space-x-4">
              <button
                className={`rounded px-3 py-1 ${activeTab === "single" ? "bg-white text-blue-700" : "hover:bg-blue-600"}`}
                onClick={() => setActiveTab("single")}
              >
                Single SKU
              </button>
              <button
                className={`rounded px-3 py-1 ${activeTab === "multiple" ? "bg-white text-blue-700" : "hover:bg-blue-600"}`}
                onClick={() => setActiveTab("multiple")}
              >
                Multiple SKUs
              </button>
              <button
                className={`rounded px-3 py-1 ${activeTab === "admin" ? "bg-white text-blue-700" : "hover:bg-blue-600"}`}
                onClick={() => setActiveTab("admin")}
              >
                Admin
              </button>
              <button
                className="rounded bg-blue-600 px-3 py-1 hover:bg-blue-500"
                onClick={() => setIsAdmin(!isAdmin)}
              >
                {isAdmin ? "User Mode" : "Admin Mode"}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-4">
        <div className="container mx-auto my-4 max-w-5xl rounded-lg bg-white p-6 shadow-md">
          {activeTab === "single" && <SingleCalculator />}
          {activeTab === "multiple" && <MultipleCalculator />}
          {activeTab === "admin" && <AdminPanel isAdmin={isAdmin} />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 p-4 text-center text-white">
        <div className="container mx-auto">
          <p>© 2025 Pacific Rate Calculator | DHL eCommerce Rates</p>
        </div>
      </footer>
    </div>
  );
};

// Single SKU Calculator Component
const SingleCalculator = () => {
  const [selectedSku, setSelectedSku] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [product, setProduct] = useState<SKUType | null>(null);

  useEffect(() => {
    if (selectedSku) {
      const found = SKU_LIST.find((item) => item.sku === selectedSku);
      setProduct(found ?? null);
    } else {
      setProduct(null);
    }
  }, [selectedSku]);

  const calculateRate = () => {
    if (!product || !selectedZone) return null;

    let rate = 0;
    switch (selectedZone) {
      case "A":
      case "B":
        rate = product.rateZoneAB;
        break;
      case "C":
        rate = product.rateZoneC;
        break;
      case "D":
        rate = product.rateZoneD;
        break;
      default:
        rate = 0;
    }

    return {
      unitRate: rate,
      total: rate * quantity,
    };
  };

  const rate = calculateRate();

  return (
    <div>
      <h2 className="mb-6 text-center text-2xl font-bold">
        DHL eCommerce Rate Calculator - Single SKU
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-lg font-semibold">Product Selection</h3>
          <div className="mb-4">
            <label className="mb-1 block font-medium">SKU Number</label>
            <select
              className="w-full rounded border border-gray-300 p-2"
              value={selectedSku}
              onChange={(e) => setSelectedSku(e.target.value)}
            >
              <option value="">Select a SKU</option>
              {SKU_LIST.map((item) => (
                <option key={item.sku} value={item.sku}>
                  {item.sku} - {item.description}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="mb-1 block font-medium">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-medium">Shipping Zone</label>
            <div className="flex flex-wrap gap-2">
              {["A", "B", "C", "D"].map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`rounded-md px-4 py-2 ${
                    selectedZone === zone
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  Zone {zone}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          {product ? (
            <div>
              <h3 className="mb-3 text-lg font-semibold">Product Details</h3>
              <div className="mb-4 rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 text-lg font-medium">
                  {product.description}
                </h4>
                <p>
                  <span className="font-medium">SKU:</span> {product.sku}
                </p>
                <p>
                  <span className="font-medium">Weight:</span> {product.weight}{" "}
                  kg
                </p>
                <p>
                  <span className="font-medium">Dimensions:</span>{" "}
                  {product.length} × {product.width} × {product.height} cm
                </p>
                <p>
                  <span className="font-medium">Volumetric Weight:</span>{" "}
                  {product.volWeight.toFixed(2)} kg
                </p>
              </div>

              {selectedZone && rate && (
                <div className="rounded-md bg-blue-50 p-4">
                  <h3 className="mb-2 text-lg font-semibold">
                    Rate Calculation
                  </h3>
                  <p>
                    <span className="font-medium">Zone:</span> {selectedZone}
                  </p>
                  <p>
                    <span className="font-medium">Unit Rate:</span> £
                    {rate.unitRate.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-medium">Quantity:</span> {quantity}
                  </p>
                  <div className="mt-4 rounded-md bg-blue-600 p-3 text-center text-white">
                    <p className="font-semibold">Total Cost</p>
                    <p className="text-2xl font-bold">
                      £{rate.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">
                Select a SKU to see product details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Define cart item type
type CartItemType = SKUType & {
  quantity: number;
  rate: number;
};

// Multiple SKU Calculator Component
const MultipleCalculator = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [selectedSku, setSelectedSku] = useState("");
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    if (!selectedSku || !selectedZone) return;

    const product = SKU_LIST.find((item) => item.sku === selectedSku);
    if (!product) return;

    let rate = 0;
    switch (selectedZone) {
      case "A":
      case "B":
        rate = product.rateZoneAB;
        break;
      case "C":
        rate = product.rateZoneC;
        break;
      case "D":
        rate = product.rateZoneD;
        break;
      default:
        rate = 0;
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(
      (item) => item.sku === product.sku,
    );

    if (existingItemIndex >= 0) {
      // Update quantity
      const newCart = [...cart];
      if (newCart[existingItemIndex]) {
        newCart[existingItemIndex].quantity += quantity;
      }
      setCart(newCart);
    } else {
      // Add new item
      setCart([
        ...cart,
        {
          ...product,
          quantity,
          rate,
        },
      ]);
    }

    setSelectedSku("");
    setQuantity(1);
  };

  const removeFromCart = (sku: string) => {
    setCart(cart.filter((item) => item.sku !== sku));
  };

  const updateQuantity = (sku: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCart(
      cart.map((item) =>
        item.sku === sku ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.rate * item.quantity, 0);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWeight = cart.reduce(
    (sum, item) => sum + item.weight * item.quantity,
    0,
  );

  return (
    <div>
      <h2 className="mb-6 text-center text-2xl font-bold">
        DHL eCommerce Rate Calculator - Multiple SKUs
      </h2>

      <div className="mb-6">
        <h3 className="mb-3 text-lg font-semibold">1. Select Shipping Zone</h3>
        <div className="flex flex-wrap gap-2">
          {["A", "B", "C", "D"].map((zone) => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`rounded-md px-6 py-3 ${
                selectedZone === zone
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Zone {zone}
            </button>
          ))}
        </div>
      </div>

      {selectedZone && (
        <>
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-semibold">2. Add Products</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block font-medium">Select SKU</label>
                <select
                  className="w-full rounded border border-gray-300 p-2"
                  value={selectedSku}
                  onChange={(e) => setSelectedSku(e.target.value)}
                >
                  <option value="">Select a SKU</option>
                  {SKU_LIST.map((item) => (
                    <option key={item.sku} value={item.sku}>
                      {item.sku} - {item.description}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block font-medium">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full rounded border border-gray-300 p-2"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={addToCart}
                  disabled={!selectedSku}
                  className="w-full rounded-md bg-blue-600 py-2 text-white disabled:bg-blue-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">
              3. Cart & Rate Calculation
            </h3>

            {cart.length === 0 ? (
              <p className="text-gray-500">
                No items in cart. Add some products above.
              </p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="mb-4 w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 text-left">SKU</th>
                        <th className="p-2 text-left">Description</th>
                        <th className="p-2 text-right">Unit Price</th>
                        <th className="p-2 text-right">Quantity</th>
                        <th className="p-2 text-right">Total</th>
                        <th className="p-2 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.sku} className="border-b">
                          <td className="p-2">{item.sku}</td>
                          <td className="p-2">{item.description}</td>
                          <td className="p-2 text-right">
                            £{item.rate.toFixed(2)}
                          </td>
                          <td className="p-2 text-right">
                            <div className="flex items-center justify-end">
                              <button
                                onClick={() =>
                                  updateQuantity(item.sku, item.quantity - 1)
                                }
                                className="rounded bg-gray-200 px-2"
                              >
                                -
                              </button>
                              <span className="mx-2">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.sku, item.quantity + 1)
                                }
                                className="rounded bg-gray-200 px-2"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="p-2 text-right">
                            £{(item.rate * item.quantity).toFixed(2)}
                          </td>
                          <td className="p-2 text-center">
                            <button
                              onClick={() => removeFromCart(item.sku)}
                              className="rounded bg-red-500 px-2 py-1 text-white"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-md bg-blue-50 p-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="font-medium">Total Items</p>
                      <p className="text-xl">{totalItems}</p>
                    </div>
                    <div>
                      <p className="font-medium">Total Weight</p>
                      <p className="text-xl">{totalWeight.toFixed(2)} kg</p>
                    </div>
                    <div className="rounded-md bg-blue-600 p-3 text-center text-white">
                      <p className="font-medium">Total Cost</p>
                      <p className="text-2xl font-bold">
                        £{calculateTotal().toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// Admin Panel Component
const AdminPanel = ({ isAdmin }: { isAdmin: boolean }) => {
  if (!isAdmin) {
    return (
      <div className="py-8 text-center">
        <h3 className="mb-2 text-xl font-bold">Unauthorized Access</h3>
        <p className="text-gray-600">
          You must be an admin to access this section.
        </p>
        <p className="mt-4">
          Toggle Admin Mode in the top navigation to access admin features.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8 text-center">
      <h3 className="mb-2 text-xl font-bold">Admin Section</h3>
      <p className="text-gray-600">
        In the full application, this area would allow:
      </p>
      <ul className="mx-auto mt-4 max-w-md text-left">
        <li className="mb-2">• Managing the SKU database</li>
        <li className="mb-2">• Updating shipping rates</li>
        <li className="mb-2">• Viewing calculation history</li>
        <li className="mb-2">• User account management</li>
      </ul>
      <p className="mt-6 text-blue-600">
        You are in admin mode. This is a simplified demo.
      </p>
    </div>
  );
};

export default PacificRateCalculator;
