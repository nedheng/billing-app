import React, { useState } from "react";

const initialFruits = ["Apples", "Bananas", "Oranges", "Grapes"];
const initialShops = ["Shop A", "Shop B", "Shop C"];

const BillingTable = () => {
  const [fruits, setFruits] = useState(initialFruits);
  const [fruitPrices, setFruitPrices] = useState(
    initialFruits.reduce((acc, fruit) => ({ ...acc, [fruit]: 0 }), {})
  );
  const [data, setData] = useState(
    initialShops.map((shop) => ({
      name: shop,
      orders: initialFruits.reduce((acc, fruit) => ({ ...acc, [fruit]: "" }), {}),
    }))
  );

  const handleInputChange = (shopIndex, fruit, value) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[shopIndex] = {
        ...newData[shopIndex],
        orders: {
          ...newData[shopIndex].orders,
          [fruit]: value,
        },
      };
      return newData;
    });
  };

  const handleShopNameChange = (shopIndex, value) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[shopIndex] = {
        ...newData[shopIndex],
        name: value,
      };
      return newData;
    });
  };

  const handleFruitPriceChange = (fruit) => {
    const price = prompt(`Enter price for ₹{fruit}:`);
    if (!isNaN(price) && price !== null) {
      setFruitPrices((prevPrices) => ({ ...prevPrices, [fruit]: parseFloat(price) }));
    }
  };

  const calculateTotal = (orders) => {
    return Object.entries(orders).reduce((sum, [fruit, quantity]) => {
      return sum + (fruitPrices[fruit] * (parseInt(quantity) || 0));
    }, 0);
  };

  const calculateTotalQuantity = (fruit) => {
    return data.reduce((sum, shop) => sum + (parseInt(shop.orders[fruit]) || 0), 0);
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
                {fruit} (₹{fruitPrices[fruit]})
              </th>
            ))}
            <th className="border border-gray-400 p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((shop, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-400 p-2">
                <input
                  type="text"
                  value={shop.name}
                  onChange={(e) => handleShopNameChange(index, e.target.value)}
                  className="w-full p-1 border border-gray-300 text-center"
                />
              </td>
              {fruits.map((fruit) => (
                <td key={fruit} className="border border-gray-400 p-2">
                  <input
                    type="number"
                    value={shop.orders[fruit]}
                    onChange={(e) => handleInputChange(index, fruit, e.target.value)}
                    className="w-16 p-1 border border-gray-300 text-center"
                  />
                </td>
              ))}
              <td className="border border-gray-400 p-2 font-bold">₹{calculateTotal(shop.orders).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100 font-bold">
            <td className="border border-gray-400 p-2">Total Quantity</td>
            {fruits.map((fruit) => (
              <td key={fruit} className="border border-gray-400 p-2">{calculateTotalQuantity(fruit)}</td>
            ))}
            <td className="border border-gray-400 p-2">-</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default BillingTable;
