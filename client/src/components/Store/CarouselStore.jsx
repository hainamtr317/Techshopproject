import React from "react";
import { Carousel } from "flowbite-react";
function CarouselStore() {
  return (
    <Carousel>
      <img
        src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/5/1/1187013/Anh-Man-Hinh-2023-05-01.jpg"
        alt="..."
        className="object-fill max-w-fit h-[500px] md:h-fit"
      />
      <img
        src="https://images.wallpaperscraft.com/image/single/laptop_notepad_cross_205899_1920x1080.jpg"
        alt="..."
        className="object-fill max-w-fit h-[500px] md:h-fit"
      />
      <img
        src="https://xgear.net/wp-content/uploads/2023/04/Hot-sale.jpg"
        alt="..."
        className="object-fill max-w-fit h-[500px] md:h-fit"
      />
      <img
        src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/5/16/638198443607174846_F-H1_800x300.png"
        alt="..."
        className="object-fill max-w-fit h-[500px] md:h-fit"
      />
      <img
        src="https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
        className="object-fill max-w-fit h-[500px] md:h-fit"
        alt="..."
      />
    </Carousel>
  );
}

export default CarouselStore;
