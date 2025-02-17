import React, { useState } from "react";

const initialFruits = ["Sweet lime I", "Sweet lime II", "Sweet lime III", "Pomegranate", "Grapes", "Pineapple", "Apple", "Sapota", "Watermelon", "Kiran", "Musk", "Athi", "Butter", "Papali"];
const initialShops = ["Shop A", "Shop B", "Shop C"];

const BillingTable = () => {
  const [fruits, setFruits] = useState(initialFruits);
  const [fruitPrices, setFruitPrices] = useState(
    initialFruits.reduce((acc, fruit) => ({ ...acc, [fruit]: { perKg: 0, perPiece: 0 } }), {})
  );
  const [data, setData] = useState(
    initialShops.map((shop) => ({
      name: shop,
      orders: initialFruits.reduce((acc, fruit) => ({ ...acc, [fruit]: { perKg: "", perPiece: "" } }), {}),
    }))
  );
  const [selectedShop, setSelectedShop] = useState(null);

  const handleInputChange = (shopIndex, fruit, type, value) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[shopIndex] = {
        ...newData[shopIndex],
        orders: {
          ...newData[shopIndex].orders,
          [fruit]: {
            ...newData[shopIndex].orders[fruit],
            [type]: value,
          },
        },
      };
      return newData;
    });
  };

  const handleFruitPriceChange = (fruit) => {
    const perKg = prompt(`Enter price per kg for ${fruit}:`);
    const perPiece = prompt(`Enter price per piece for ${fruit}:`);
    if (!isNaN(perKg) && !isNaN(perPiece) && perKg !== null && perPiece !== null) {
      setFruitPrices((prevPrices) => ({
        ...prevPrices,
        [fruit]: { perKg: parseFloat(perKg), perPiece: parseFloat(perPiece) },
      }));
    }
  };

  const calculateTotal = (orders) => {
    return Object.entries(orders).reduce((sum, [fruit, quantity]) => {
      return sum + (fruitPrices[fruit].perKg * (parseFloat(quantity.perKg) || 0)) +
        (fruitPrices[fruit].perPiece * (parseInt(quantity.perPiece) || 0));
    }, 0);
  };

  const addRow = () => {
    setData((prevData) => [
      ...prevData,
      { name: "New Shop", orders: fruits.reduce((acc, fruit) => ({ ...acc, [fruit]: "" }), {}) },
    ]);
  };

  const addColumn = () => {
    const newFruit = prompt("Enter fruit name:");
    if (newFruit) {
      setFruits((prevFruits) => [...prevFruits, newFruit]);
      setFruitPrices((prevPrices) => ({ ...prevPrices, [newFruit]: 0 }));
      setData((prevData) =>
        prevData.map((shop) => ({
          ...shop,
          orders: { ...shop.orders, [newFruit]: "" },
        }))
      );
    }
  };

  const generateBill = (shop) => {
    setSelectedShop(shop);
  };

  return (
    <div className="p-4">
      <button onClick={addRow} className="mb-2 p-2 bg-blue-500 text-white rounded">Add Shop</button>
      <button onClick={addColumn} className="mb-2 ml-2 p-2 bg-green-500 text-white rounded">Add Fruit</button>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">Shop Name</th>
            {fruits.map((fruit) => (
              <th key={fruit} className="border border-gray-400 p-2 cursor-pointer" onClick={() => handleFruitPriceChange(fruit)}>
                {fruit} (Kg: ${fruitPrices[fruit].perKg}, Piece: ${fruitPrices[fruit].perPiece})
              </th>
            ))}
            <th className="border border-gray-400 p-2">Total</th>
            <th className="border border-gray-400 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((shop, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-400 p-2">{shop.name}</td>
              {fruits.map((fruit) => (
                <td key={fruit} className="border border-gray-400 p-2">
                  <input
                    type="number"
                    placeholder="Kg"
                    value={shop.orders[fruit].perKg}
                    onChange={(e) => handleInputChange(index, fruit, "perKg", e.target.value)}
                    className="w-16 p-1 border border-gray-300 text-center"
                  />
                  <input
                    type="number"
                    placeholder="Piece"
                    value={shop.orders[fruit].perPiece}
                    onChange={(e) => handleInputChange(index, fruit, "perPiece", e.target.value)}
                    className="w-16 p-1 border border-gray-300 text-center"
                  />
                </td>
              ))}
              <td className="border border-gray-400 p-2 font-bold">${calculateTotal(shop.orders).toFixed(2)}</td>
              <td className="border border-gray-400 p-2">
                <button onClick={() => generateBill(shop)} className="p-2 bg-blue-500 text-white rounded">Generate Bill</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedShop && (
        <div className="mt-4 p-4 border border-gray-400">
          <h2 className="text-xl font-bold">Bill for {selectedShop.name}</h2>
          <table className="w-full border-collapse border border-gray-400 mt-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 p-2">Fruit</th>
                <th className="border border-gray-400 p-2">Price per Kg</th>
                <th className="border border-gray-400 p-2">Kg</th>
                <th className="border border-gray-400 p-2">Price per Piece</th>
                <th className="border border-gray-400 p-2">Piece</th>
                <th className="border border-gray-400 p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {fruits.map((fruit) => {
                const quantity = selectedShop.orders[fruit];
                const total = (fruitPrices[fruit].perKg * (parseFloat(quantity.perKg) || 0)) +
                              (fruitPrices[fruit].perPiece * (parseInt(quantity.perPiece) || 0));
                return (quantity.perKg || quantity.perPiece) ? (
                  <tr key={fruit} className="text-center">
                    <td className="border border-gray-400 p-2">{fruit}</td>
                    <td className="border border-gray-400 p-2">${fruitPrices[fruit].perKg}</td>
                    <td className="border border-gray-400 p-2">{quantity.perKg}</td>
                    <td className="border border-gray-400 p-2">${fruitPrices[fruit].perPiece}</td>
                    <td className="border border-gray-400 p-2">{quantity.perPiece}</td>
                    <td className="border border-gray-400 p-2">${total.toFixed(2)}</td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
           {/* Total Sum of Fruits */}
          <div className="text-right font-bold">
            <p>Total Sum of Fruits: ${calculateTotal(selectedShop.orders).toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingTable;
