/**
 * v0 by Vercel.
 * @see https://v0.dev/t/dlL8HdBcQrJ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [cart, setCart] = useState([])
  const [customizations, setCustomizations] = useState({})
  const menu = [
    {
      id: 1,
      name: "Kung Pao Chicken",
      description: "Stir-fried chicken with peanuts, chili peppers, and vegetables",
      price: 12.99,
      image: "/kung-pao-chicken.jpg",
      options: [
        { name: "Spice Level", choices: ["Mild", "Medium", "Hot"] },
        { name: "Rice", choices: ["White", "Brown"] },
      ],
    },
    {
      id: 2,
      name: "Beef and Broccoli",
      description: "Tender beef and fresh broccoli in a savory sauce",
      price: 13.99,
      image: "/beef-broccoli.jpg",
      options: [{ name: "Noodles", choices: ["Udon", "Egg", "Rice"] }],
    },
    {
      id: 3,
      name: "Vegetable Lo Mein",
      description: "Stir-fried noodles with mixed vegetables",
      price: 10.99,
      image: "/vegetable-lo-mein.jpg",
      options: [{ name: "Noodle Thickness", choices: ["Thin", "Medium", "Thick"] }],
    },
    {
      id: 4,
      name: "Fried Rice",
      description: "Classic Chinese fried rice with eggs, peas, and carrots",
      price: 9.99,
      image: "/fried-rice.jpg",
      options: [{ name: "Protein", choices: ["Chicken", "Beef", "Shrimp", "Vegetarian"] }],
    },
  ]
  const handleAddToCart = (item, customizations) => {
    setCart([...cart, { ...item, customizations }])
  }
  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart]
    updatedCart.splice(index, 1)
    setCart(updatedCart)
  }
  const handleCustomization = (itemId, option, choice) => {
    setCustomizations({
      ...customizations,
      [itemId]: {
        ...customizations[itemId],
        [option]: choice,
      },
    })
  }
  const handleCheckout = () => {
    console.log("Checkout:", cart)
  }
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-2xl font-bold">Chinese Restaurant Kiosk</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menu.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img src="/placeholder.svg" alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="mb-4">
                  {item.options.map((option) => (
                    <div key={option.name} className="mb-2">
                      <label className="block font-medium mb-1">{option.name}</label>
                      <Select
                        value={customizations[item.id]?.[option.name] || option.choices[0]}
                        onValueChange={(choice) => handleCustomization(item.id, option.name, choice)}
                      >
                        {option.choices.map((choice) => (
                          <option key={choice} value={choice}>
                            {choice}
                          </option>
                        ))}
                      </Select>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                  <Button onClick={() => handleAddToCart(item, customizations[item.id])}>Add to Cart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-gray-200 py-4 px-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold mb-2">Cart</h2>
            <ul className="space-y-2">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">{Object.values(item.customizations).join(", ")}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold mr-4">${item.price.toFixed(2)}</span>
                    <Button size="icon" variant="ghost" onClick={() => handleRemoveFromCart(index)}>
                      <XIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Button size="lg" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}