import { Link } from "react-router-dom";
import { 
  Package, 
  Croissant, 
  Cheese, 
  Calendar,
  Coffee,
  UtensilsCrossed,
  Wheat,
  Droplet,
  Beef,
  Nut,
  Soup,
  Pizza,
  Cookie,
  Candy,
  CakeSlice,
  IceCream,
  Snowflake,
  ShoppingCart,
  ChefHat,
  Sparkles,
  Cherry,
  Milk,
  Flower2,
  FlaskConical,
  CoffeeIcon
} from "lucide-react";

const shopCategories = [
  { name: "All Products", icon: Package, color: "bg-blue-100 hover:bg-blue-200 text-blue-700" },
  { name: "Bakery", icon: Croissant, color: "bg-amber-100 hover:bg-amber-200 text-amber-700" },
  { name: "Cheeses", icon: Cheese, color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-700" },
  { name: "Dates", icon: Calendar, color: "bg-orange-100 hover:bg-orange-200 text-orange-700" },
  { name: "Drinks", icon: Coffee, color: "bg-cyan-100 hover:bg-cyan-200 text-cyan-700" },
  { name: "Food Service", icon: UtensilsCrossed, color: "bg-red-100 hover:bg-red-200 text-red-700" },
  { name: "Grains", icon: Wheat, color: "bg-green-100 hover:bg-green-200 text-green-700" },
  { name: "Honey & Tahini", icon: Droplet, color: "bg-amber-100 hover:bg-amber-200 text-amber-700" },
  { name: "Meat Products", icon: Beef, color: "bg-red-100 hover:bg-red-200 text-red-700" },
  { name: "Nuts", icon: Nut, color: "bg-orange-100 hover:bg-orange-200 text-orange-700" },
  { name: "Pasta Products", icon: Soup, color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-700" },
  { name: "Ready To Eat Products", icon: Pizza, color: "bg-green-100 hover:bg-green-200 text-green-700" },
  { name: "Snacks", icon: Cookie, color: "bg-purple-100 hover:bg-purple-200 text-purple-700" },
  { name: "Sweets", icon: Candy, color: "bg-pink-100 hover:bg-pink-200 text-pink-700" },
  { name: "Candy", icon: Candy, color: "bg-pink-100 hover:bg-pink-200 text-pink-700" },
  { name: "Cookies", icon: Cookie, color: "bg-amber-100 hover:bg-amber-200 text-amber-700" },
  { name: "Dessert Mixes", icon: CakeSlice, color: "bg-purple-100 hover:bg-purple-200 text-purple-700" },
  { name: "Fillo Products", icon: Croissant, color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-700" },
  { name: "Frozen", icon: Snowflake, color: "bg-blue-100 hover:bg-blue-200 text-blue-700" },
  { name: "Grocery", icon: ShoppingCart, color: "bg-green-100 hover:bg-green-200 text-green-700" },
  { name: "Kitchen", icon: ChefHat, color: "bg-gray-100 hover:bg-gray-200 text-gray-700" },
  { name: "Misc Items", icon: Sparkles, color: "bg-indigo-100 hover:bg-indigo-200 text-indigo-700" },
  { name: "Olives & Olive Oils", icon: Cherry, color: "bg-green-100 hover:bg-green-200 text-green-700" },
  { name: "Pickles", icon: FlaskConical, color: "bg-lime-100 hover:bg-lime-200 text-lime-700" },
  { name: "Sauces", icon: Droplet, color: "bg-red-100 hover:bg-red-200 text-red-700" },
  { name: "Spices", icon: Flower2, color: "bg-orange-100 hover:bg-orange-200 text-orange-700" },
  { name: "Tea & Coffee", icon: CoffeeIcon, color: "bg-brown-100 hover:bg-brown-200 text-brown-700" },
  { name: "Yogurt Products", icon: Milk, color: "bg-blue-100 hover:bg-blue-200 text-blue-700" }
];

export function Shop() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primaryBlue to-blue-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shop Our Categories
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Explore our wide selection of authentic Mediterranean and Middle Eastern products
          </p>
        </div>
        <div className="absolute inset-0 bg-black opacity-10"></div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {shopCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                to={`/shop/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`
                  group relative overflow-hidden rounded-xl p-6 
                  transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                  ${category.color}
                  flex flex-col items-center justify-center text-center
                  min-h-[140px] cursor-pointer
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Icon className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm leading-tight">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Featured Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Products?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center">
                <div className="bg-primaryBlue/10 p-4 rounded-full mb-4">
                  <Package className="w-8 h-8 text-primaryBlue" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
                <p className="text-gray-600 text-center">Carefully selected products from trusted suppliers</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primaryBlue/10 p-4 rounded-full mb-4">
                  <UtensilsCrossed className="w-8 h-8 text-primaryBlue" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Authentic Taste</h3>
                <p className="text-gray-600 text-center">Traditional recipes and genuine flavors</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primaryBlue/10 p-4 rounded-full mb-4">
                  <ShoppingCart className="w-8 h-8 text-primaryBlue" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Wide Selection</h3>
                <p className="text-gray-600 text-center">Everything you need in one place</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}