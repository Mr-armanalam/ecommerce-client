import { Mail, Phone, MapPin } from "lucide-react";

const BrandCatgContact = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl mt-0 font-bold text-white">QuirkCart</h2>
          <p className="mt-4 text-sm">
            Your one-stop shop for modern electronics & accessories. Discover
            quality products with seamless shopping experience.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Electronics</li>
            <li className="hover:text-white cursor-pointer">Accessories</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Categories</li>
            <li className="hover:text-white cursor-pointer">Cart</li>
            <li className="hover:text-white cursor-pointer">Account</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} /> armanalam78578@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> 9117415820
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> India
            </li>
          </ul>
        </div>
      </div>
  )
}

export default BrandCatgContact