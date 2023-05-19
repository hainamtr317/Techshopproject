import React, { useEffect, useState } from "react";
import { Breadcrumb, TextInput, Select, Button, Radio } from "flowbite-react";
import { HiHome, HiPhone, HiMail, HiOutlineArrowRight } from "react-icons/hi";
import { RiVisaFill } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import CheckoutCard from "../../components/Store/CheckoutCard";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../configs/axiosConfig";
// import { checkout } from "../../features/shop/orderSlice";
// import { clearCart, resetAmount } from "../../features/shop/cartSlice";
import ModalCheckout from "../../components/Store/CheckoutModal";
import { openModal } from "../../features/admin/adminModalSlide";

function CheckOut() {
  const { cart, totalAmount } = useSelector((state) => state.cart);
  // const {order} = useSelector((state) => state.order);

  const [order, setOrder] = useState({});
  const [cities, setCities] = useState("");
  const [districts, setDistricts] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [wards, setWards] = useState("");
  const dispatch = useDispatch();
  const [datamodal, setDatamodal] = useState({});
  const { open } = useSelector((state) => state.modal);
  const { loggedUser } = useSelector((state) => state.auth);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await Axios.get(`https://provinces.open-api.vn/api/p/`);

      if (response) {
        setCities(response.data);
      }
      if (city) {
        const response = await Axios.get(
          `https://provinces.open-api.vn/api/p/${city.split("-")[1]}/?depth=2`
        );
        if (response) {
          setDistricts(response.data.districts);
        }
      }
      if (district) {
        const response = await Axios.get(
          `https://provinces.open-api.vn/api/d/${
            district.split("-")[1]
          }?depth=2`
        );

        if (response) {
          setWards(response.data.wards);
        }
      }
    };
    fetchProvinces();
  }, [city, district, wards, order, ward]);
  const checkoutHandler = async (e) => {
    e.preventDefault();
    setDatamodal({
      order,
      user_id: loggedUser._id,
      products: cart.map((product) => {
        return {
          product_id: product._id,
          quantity: product.quantity,
          subTotal: product.quantity * product.price,
        };
      }),
    });

    dispatch(openModal());
  };

  return (
    <div className="mt-20 mx-3 md:mx-10 lg:mx-16 xl:mx-24">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="#" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Cart</Breadcrumb.Item>
        <Breadcrumb.Item>Checkout</Breadcrumb.Item>
      </Breadcrumb>
      {open && <ModalCheckout dataModal={datamodal} />}
      <div className="flex flex-col md:flex-row md:justify-center md:gap-x-10 lg:gap-x-20">
        <section className="mt-5 ">
          <form onSubmit={checkoutHandler}>
            <h1 className="font-semibold text-xl text-sky-600">Order Form</h1>
            <div className="grid grid-cols-3 gap-4 mt-3 w-full xl:max-w-[600px]">
              <div>
                <TextInput
                  type="text"
                  placeholder="First Name"
                  required={true}
                  name="firstName"
                  value={order.firstName}
                  onChange={handleOnChange}
                />
              </div>

              <div className="col-span-2">
                <TextInput
                  type="text"
                  placeholder="Last Name"
                  required={true}
                  value={order.lastName}
                  name="lastName"
                  onChange={handleOnChange}
                />
              </div>

              <div className="col-span-3">
                <TextInput
                  type="email"
                  name="email"
                  value={order.email}
                  placeholder="Email"
                  onChange={handleOnChange}
                  required={true}
                  addon={<HiMail />}
                />
              </div>
              <div className="col-span-3">
                <TextInput
                  type="text"
                  name="phone"
                  value={order.phone}
                  placeholder="Phone number"
                  onChange={handleOnChange}
                  required={true}
                  addon={<HiPhone />}
                />
              </div>

              <div className="col-span-3">
                <TextInput
                  type="text"
                  placeholder="Address"
                  value={order.address}
                  name="address"
                  required={true}
                  onChange={handleOnChange}
                />
              </div>

              <div>
                <Select
                  required={true}
                  name="city"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setCity(value);
                    setOrder((prevState) => ({
                      ...prevState,
                      [name]: value.split("-")[0],
                    }));
                  }}
                >
                  <option defaultValue={null}>Select city</option>
                  {cities &&
                    cities.map((city) => (
                      <option
                        key={city.code}
                        value={city.name + "-" + city.code}
                      >
                        {city.name}
                      </option>
                    ))}
                </Select>
              </div>
              <div>
                <Select
                  required={true}
                  name="district"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setDistrict(value);
                    setOrder((prevState) => ({
                      ...prevState,
                      [name]: value.split("-")[0],
                    }));
                  }}
                >
                  {city && <option defaultValue={null}>Select district</option>}
                  {districts &&
                    districts.map((district) => (
                      <option
                        key={district.code}
                        value={district.name + "-" + district.code}
                      >
                        {district.name}
                      </option>
                    ))}
                </Select>
              </div>
              <div>
                <Select
                  required={true}
                  name="ward"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setWard(value);
                    setOrder((prevState) => ({
                      ...prevState,
                      [name]: value.split("-")[0],
                    }));
                  }}
                >
                  {district && <option defaultValue={null}>Select ward</option>}
                  {wards &&
                    wards.map((ward) => (
                      <option
                        key={ward.code}
                        value={ward.name + "-" + ward.code}
                      >
                        {ward.name}
                      </option>
                    ))}
                </Select>
              </div>
            </div>

            <h1 className="font-semibold text-xl mt-2">Payment</h1>
            <div className="grid grid-cols-3 gap-4 w-full md:w-[300px] lg:w-[400px] xl:w-[800px]">
              <div className="flex gap-2 items-center">
                <Radio
                  id="united-state"
                  name="paymentType"
                  value="MasterCard"
                  onChange={handleOnChange}
                />
                <FaCcMastercard className="text-4xl text-slate-500" />
              </div>
              <div className="flex gap-2 items-center">
                <Radio
                  id="united-state"
                  name="paymentType"
                  onChange={handleOnChange}
                  value="Visa"
                />
                <RiVisaFill className="text-5xl text-slate-500" />
              </div>
              <div className="flex gap-2 items-center">
                <Radio
                  id="united-state"
                  name="paymentType"
                  onChange={handleOnChange}
                  value="COD"
                />
                <MdOutlinePayments className="text-5xl text-slate-500" />
              </div>
            </div>

            <div className="mt-4">
              <Button color="gray" type="submit">
                Checkout <HiOutlineArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </section>

        <section className="mt-5 border-[1px] border-gray-400 rounded-sm md:w-[450px] h-[550px]">
          <div className="text-center">
            <h1 className="font-semibold text-2xl my-4">Order Summary</h1>
          </div>
          <hr className="mx-4 border-t-[1px] border-gray-300" />
          <article className="h-[300px] overflow-auto mx-3 mt-4">
            {cart &&
              cart.map((product) => (
                <CheckoutCard key={product._id} data={product} />
              ))}
          </article>
          <hr className="mx-4 my-5 border-t-[1px] border-gray-300" />

          <div className="flex-col mx-4 text-xl font-semibold">
            <div className="flex justify-between mb-3">
              <p>Shipping: </p>
              <p>Free</p>
            </div>
            <p>Total: ${totalAmount}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CheckOut;
