import React, { useState } from "react";
import { Button, Modal, Label, Textarea, Select } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { writeReview } from "../../features/admin/productSlice";
const ReviewModal = ({ product_id }) => {
  const { loggedUser } = useSelector((state) => state.auth);
  const [review, setReview] = useState({ product_id, user_id: loggedUser._id });
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch({});
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setReview((prevState) => ({ ...prevState, [name]: value }));
  };
  const createComment = (e) => {
    e.preventDefault();
    dispatch(writeReview(review));
  };
  return (
    <React.Fragment>
      <Button onClick={openModal} color="dark">
        Write a review
      </Button>
      <Modal show={open} size="2xl" onClose={closeModal}>
        <Modal.Header />
        <Modal.Body>
          <form
            className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
            onSubmit={createComment}
          >
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Write a Review
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="rating" value="Rating:" />
              </div>
              <Select name="rating" onChange={onChangeHandler} required>
                <option className="p-2" value={5} selected>
                  5.0 ★★★★★
                </option>
                <option className="p-2" value={4}>
                  4.0 ★★★★
                </option>
                <option className="p-2" value={3}>
                  3.0 ★★★
                </option>
                <option className="p-2" value={2}>
                  2.0 ★★
                </option>
                <option className="p-2" value={1}>
                  1.0 ★
                </option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Review:" />
              </div>
              <Textarea
                rows={6}
                required={true}
                placeholder="Leave a comment..."
                name="text"
                onChange={onChangeHandler}
              />
            </div>
            <div className="flex">
              <span className="ml-auto">
                <Button color="dark" type="submit">
                  Submit
                </Button>
              </span>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ReviewModal;
