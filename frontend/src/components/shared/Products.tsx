import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { HiShoppingCart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart, addToFavorite } from "../../redux/slices/appSlice";
import { ProductProps, StateProps, StoreProduct } from "../../types";
import FormattedPrice from "../FormattedPrice";

interface ProductsProps {
  productData: StoreProduct[];
}

const Products = ({ productData }: ProductsProps) => {
  const dispatch = useDispatch();

  const { favoriteData } = useSelector(
    (state: StateProps) => state.app
  );

  return (
    // Grid layout for the products
    <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {productData?.map(
        ({
          id,
          name,
          brand,
          category,
          description,
          main_image,
          is_new,
          old_price,
          price,
        }: ProductProps) => (
          <div
            key={id}
            className="w-full bg-white text-black p-4 border border-gray-300 rounded-lg group overflow-hidden"
          >
            <div className="w-full h-[260px] relative">
              <Link
                to={`/${id}`}
              >
                <img
                  className="w-full h-full object-contain scale-90 hover:scale-100 transition-transform duration-300"
                  width={300}
                  height={300}
                  src={main_image}
                  alt="productImage"
                />
              </Link>
              {/* Icons for adding to cart and adding to favorites */}
              <div className="w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 transition-transform duration-300">
              <span
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: id,
                      brand: brand,
                      category: category,
                      description: description,
                      main_image: main_image,
                      is_new: is_new,
                      old_price: old_price,
                      price: price,
                      name: name,
                      quantity: 1,
                    })
                  )
                }
                className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
                >
                  <HiShoppingCart />
                </span>
                <span
                  onClick={() => {
                      dispatch(
                        addToFavorite({
                          id: id,
                          brand: brand,
                          category: category,
                          description: description,
                          main_image: main_image,
                          is_new: is_new,
                          old_price: old_price,
                          price: price,
                          name: name,
                        })
                      )
                    }
                  }
                  className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
                >
                  {favoriteData.find((item: StoreProduct) => item.id === id) ? <FaHeart /> : <FaRegHeart />}
                </span>
              </div>
              {/* Display a save tag if the product is new */}
              {is_new && (
                <p className="absolute top-0 right-0 text-amazon_blue font-medium text-xs tracking-wide animate-bounce">
                  !save <FormattedPrice amount={old_price - price} />
                </p>
              )}
            </div>
            <hr />
            <div className="px-4 py-3 flex flex-col gap-1">
              <p className="text-xs text-gray-500 tracking-wide">{category.name}</p>
              <p className="text-base font-medium">{name}</p>
              <p className="flex items-center gap-2">
                <span className="text-sm line-through">
                  <FormattedPrice amount={old_price} />
                </span>
                <span className="text-amazon_blue font-semibold">
                  <FormattedPrice amount={price} />
                </span>
              </p>
              <p className="text-xs text-gray-600 text-justify">
                {description.substring(0, 120)}
              </p>
              <button
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: id,
                      name: name,
                      brand: brand,
                      category: category,
                      description: description,
                      main_image: main_image,
                      is_new: is_new,
                      old_price: old_price,
                      price: price,
                      quantity: 1,
                    })
                  )
                  toast.success("Item added to cart!");
                }}
                className="h-10 font-medium bg-amazon_blue text-white rounded-md hover:bg-amazon_yellow hover:text-black duration-300 mt-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Products;
