import { useDispatch } from 'react-redux';
import { createOrder } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

const CartInfo = ({cart, close}) => {

   const subTotal = cart.reduce((total,item) => total + item.price * item.amount, 0);

   const shipping = subTotal > 100 ? 0 : 20;
   const total = shipping + subTotal;

   const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(createOrder());
        toast.success("Ürünler Hazırlanıyor");
        close();
    }

  return cart.length !== 0 && (
    <div className='fs-5 py-5 text-lg'>
        <p className='flex justify-between'>
            <span className='text-gray-500 font-semibold'>Ara Toplam:</span>
            <span data-testid="subtotal" className='text-xl font-semibold text-gray-700'>{subTotal}₺ </span>
        </p>
         <p className='flex justify-between py-2'>
            <span className='text-gray-500 font-semibold'>Kargo:</span>
            <span data-testid="shipping" className='font-semibold text-gray-500'>{shipping}₺</span>
        </p>
          <p className='flex justify-between py-2'>
            <span className='text-gray-500 font-semibold text-2xl'>Toplam:</span>
            <span data-testid="total" className='text-2xl font-semibold text-gray-700'>{total}₺ </span>
        </p>

        <button onClick={handleClick} className='bg-red-500 mt-4 w-full p-2 rounded-md text-white hover:bg-red-600 transition'>Sipariş Ver</button>
    </div>
  )
}

export default CartInfo;