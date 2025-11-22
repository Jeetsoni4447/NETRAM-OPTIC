import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="w-full">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-300 p-3 sm:p-4 flex flex-col justify-between h-full">
        
        {/* Image */}
        <Link
          to={`/product/${product.pro_id}`}
          state={{ product }}
          className="block aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-2 group"
        >
          <img
            src={product.pro_image}
            alt={product.pro_name}
            className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </Link>

        {/* Title */}
        <h2 className="text-center text-sm sm:text-base font-semibold text-gray-800 mb-1 line-clamp-2">
          {product.pro_name}
        </h2>

        {/* Price + Rating + Buy */}
        <div className="mt-auto flex justify-between items-center text-xs sm:text-sm">
          <p className="text-indigo-700 font-bold text-base sm:text-lg">₹{product.pro_price}</p>

          <div className="flex items-center text-yellow-500 gap-1">
            <i className="fa fa-star" />
            <span>{product.pro_rating || "4.2"}</span>
          </div>

          <Link
            to={`/product/${product.pro_id}`}
            state={{ product }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-medium hover:bg-indigo-700 transition">
              Buy
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
