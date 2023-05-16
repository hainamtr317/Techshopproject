import React from "react";
import { Carousel } from "flowbite-react";
function CarouselStore() {
  return (
    <Carousel>
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
        src="https://images.unsplash.com/photo-1516315720917-231ef9acce48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1767&q=80"
        alt="..."
        className="object-fill max-w-fit h-[500px] md:h-fit"
      />
      <img
        src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
        alt="..."
      />
      <img
        src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        className=""
        alt="..."
      />
    </Carousel>
  );
}

export default CarouselStore;
