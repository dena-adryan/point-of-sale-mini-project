/* eslint-disable react/prop-types */
const OrderDetailsCard = ({ product }) => {
    return (
        <div className=" m-4 bg-white flex justify-between p-8 rounded-3xl h-40">
            <div className="flex w-2/3 gap-4 items-center py-4">
                <img className=" w-40" src={product.image} alt="" />
                <div className=" flex flex-col">
                    <h2 className=" text-2xl font-semibold text-orange-950">
                        {product.title}
                    </h2>
                    <p>Rp.{product.price}</p>
                </div>
            </div>
            <div className="flex justify-between items-center w-1/3 py-2 px-4">
                <span className=" font-semibold text-orange-950">
                    {product.quantity}x
                </span>

                <p className=" text-xl text-orange-400 font-bold">
                    {product.price * product.quantity}
                </p>
            </div>
        </div>
    );
};

export default OrderDetailsCard;
