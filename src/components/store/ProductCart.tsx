// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useCart } from '../../context/CartContext'; // ✅ using Context API instead of Redux

// const ProductCart = (props) => {
//     const { id, name, image, quantity, meal, slug } = props.data;
//     const mealText = Array.isArray(meal) ? meal.join(', ') : meal;

//     const { addToCart, setStatusTab } = useCart(); // ✅ use context

//     const handleAddToCart = () => {
//         addToCart(id, 1);         // ✅ add item
//         setStatusTab(true);       // ✅ open cart tab
//     };

//     return (
//         <div className='bg-white p-4 rounded-lg shadow-2xl w-48 h-56 transform transition-transform duration-300 hover:scale-105 flex flex-col justify-between'>
//             <Link to={slug}>
//                 <div className='relative'>
//                     <img src={image} alt={name} className='w-full h-24 object-cover rounded-t-lg' />
//                     <div className='absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent'></div>
//                 </div>
//             </Link>
//             <div className='p-2 flex flex-col justify-between flex-grow'>
//                 <h3 className='text-sm font-bold text-left'>{name}</h3>
//                 <div className='flex justify-between items-center mt-2'>
//                     <p className='text-sm font-medium text-left'>
//                         <span className='text-[#747474]'> Available Quantity : {quantity}</span>
//                     </p>
                    
//                     <button 
//                         className='bg-[#ca0000] p-2 rounded-full text-xs flex items-center gap-2 hover:bg-[#FFC10C] shadow-lg' 
//                         onClick={handleAddToCart}
//                     >
//                         <span className='font-bold text-white w-12'>Add</span>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCart;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useCart } from '../../context/CartContext';

// export interface ProductData {
//   id: number;
//   name: string;
//   image: string;
//   quantity: number;
//   meal: string | string[];
//   slug: string;
//   reOrderLevel: number;           // MIN threshold
//   maximumReorderLevel: number;    // MAX threshold
// }

// interface ProductCartProps {
//   data: ProductData;
// }

// const ProductCart: React.FC<ProductCartProps> = ({ data }) => {
//   const {
//     id,
//     name,
//     image,
//     quantity,
//     itemCode,
//     meal,
//     slug,
//     reOrderLevel,
//     maximumReorderLevel,
//   } = data;

//   const { addToCart, setStatusTab } = useCart();

//   const handleAddToCart = () => {
//     addToCart(id, 1);
//     setStatusTab(true);
//   };

//   // decide quantity color: orange if above MIN, default gray otherwise
//   const qtyClass = quantity < reOrderLevel
//     ? 'text-orange-500'
//     : 'text-[#747474]';

//   const mealText = Array.isArray(meal) ? meal.join(', ') : meal;

//   return (
//     <div className='bg-white p-4 rounded-lg shadow-2xl w-48 h-56 transform transition-transform duration-300 hover:scale-105 flex flex-col justify-between'>
//       <Link to={slug}>
//         <div className='relative'>
//           <img
//             src={image}
//             alt={name}
//             className='w-full h-24 object-cover rounded-t-lg'
//           />
//           <div className='absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent'></div>
//         </div>
//       </Link>

//       <div className='p-2 flex flex-col justify-between flex-grow'>
//         <h3 className='text-sm font-bold text-left'>{name}</h3>
//         <h3 className='text-sm font-bold text-left'>{itemCode}</h3>
//         <div className='flex justify-between items-center mt-2'>
//           <p className={`text-sm font-medium text-left ${qtyClass}`}>
//              Quantity: {quantity}
//           </p>

//           <button
//             className='bg-[#ca0000] p-2 rounded-full text-xs flex items-center gap-2 hover:bg-[#FFC10C] shadow-lg'
//             onClick={handleAddToCart}
//           >
//             <span className='font-bold text-white w-12'>Add</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCart;


import React from 'react';
import { Link } from 'react-router-dom';
// ✅ Changed from useCart to useStore
import { useStore } from '../../context/StoreContext'; 

export interface ProductData {
  id: number;
  name: string;
  image: string;
  quantity: number;
  meal: string | string[];
  slug: string;
  reOrderLevel: number;
  maximumReorderLevel: number;
}

interface ProductCartProps {
  data: ProductData;
}

const ProductCart: React.FC<ProductCartProps> = ({ data }) => {
  const {
    id,
    name,
    image,
    quantity,
    itemCode,
    meal,
    slug,
    reOrderLevel,
    maximumReorderLevel,
  } = data;

  const { addToStore, setStoreStatusTab } = useStore(); // ✅ Updated functions

  const handleAddToCart = () => {
    addToStore(id, 1);
    setStoreStatusTab(true);
  };

  const qtyClass = quantity < reOrderLevel
    ? 'text-orange-500'
    : 'text-[#747474]';

  const mealText = Array.isArray(meal) ? meal.join(', ') : meal;

  return (
    <div className='bg-white p-4 rounded-lg shadow-2xl w-48 h-56 transform transition-transform duration-300 hover:scale-105 flex flex-col justify-between'>
      <Link to={slug}>
        <div className='relative'>
          <img
            src={image}
            alt={name}
            className='w-full h-24 object-cover rounded-t-lg'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent'></div>
        </div>
      </Link>

      <div className='p-2 flex flex-col justify-between flex-grow'>
        <h3 className='text-sm font-bold text-left'>{name}</h3>
        <h3 className='text-sm font-bold text-left'>{itemCode}</h3>
        <div className='flex justify-between items-center mt-2'>
          <p className={`text-sm font-medium text-left ${qtyClass}`}>
             Quantity: {quantity}
          </p>

          <button
            className='bg-[#ca0000] p-2 rounded-full text-xs flex items-center gap-2 hover:bg-[#FFC10C] shadow-lg'
            onClick={handleAddToCart}
          >
            <span className='font-bold text-white w-12'>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
