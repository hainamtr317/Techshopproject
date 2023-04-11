import React from "react";
import { Carousel } from "flowbite-react";
function CarouselStore() {
  return (
    <Carousel className="object-fill">
      <img
        src="https://images.wallpaperscraft.com/image/single/laptop_backlight_colorful_194324_1920x1080.jpg"
        alt="..."
        className="object-fill max-w-fit h-[500px] md:h-fit"
      />
      <img
        src="https://images.wallpaperscraft.com/image/single/laptop_notepad_cross_205899_1920x1080.jpg"
        alt="..."
        className="object-fill max-w-fit h-[500px] md:h-fit"
      />
      <img
        src="https://images.wallpaperscraft.com/image/single/laptop_code_programming_212332_1920x1080.jpg"
        alt="..."
        className="object-fill max-w-fit h-[500px] md:h-fit"
      />
      <img
        src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
        alt="..."
      />
      <img
        src="https://img.freepik.com/free-vector/banner-black-friday-super-sale-realistic-3d-black-shopping-basket_548887-26.jpg?w=1380&t=st=1662008789~exp=1662009389~hmac=54f5b69a242e586ad42c2dc7895ef29e5a40fb13fe59b3ed4c954e8964306a44"
        className="object-fill max-w-[500px]"
        alt="..."
      />
    </Carousel>
  );
}

export default CarouselStore;
