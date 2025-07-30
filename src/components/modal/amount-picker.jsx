import { useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

const AmountPicker = ({item}) => {

    const dispatch = useDispatch();
  return (
    <div className="flex border rounded-md">
        <button onClick={() => dispatch(deleteFromCart(item))} className=" px-3 w-8 text-center border-r py-1 hover:bg-zinc-300/30 transition">-</button>
        <span className="text-center py-1 w-8">{item.amount} </span>
        <button onClick={() => dispatch(addToCart({item, selectedType: item.type}))} className="px-3 py-1 border-l hover:bg-zinc-300/30 transition">+</button>
    </div>
  )
}

export default AmountPicker;