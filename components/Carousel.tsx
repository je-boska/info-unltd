import Image from 'next/image';
import { useState } from 'react';
import { Asset } from '../types/shared';

export default function Carousel({ media }: { media: Asset[] }) {
  const [currentImage, setCurrentImage] = useState<number>(0);

  function nextImage() {
    setCurrentImage(currentImage < media.length - 1 ? currentImage + 1 : 0);
  }

  function prevImage() {
    setCurrentImage(currentImage > 0 ? currentImage - 1 : media.length - 1);
  }

  return (
    <div className='carousel relative text-2xl md:text-4xl'>
      <div className='h-full w-full flex justify-center'>
        <Image
          className='object-contain'
          src={media[currentImage].url}
          width={media[currentImage].width}
          height={media[currentImage].height}
          alt=''
        />
      </div>
      <div
        className='absolute group top-0 right-0 h-full w-1/2 cursor-pointer'
        onClick={nextImage}
      >
        <div className='relative h-full w-full text-white opacity-0 group-hover:opacity-100 transition-opacity'>
          <div className='absolute top-1/2 right-8 xl:right-16 -translate-y-1/2'>
            ❯
          </div>
        </div>
      </div>
      <div
        className='absolute group top-0 left-0 h-full w-1/2 cursor-pointer'
        onClick={prevImage}
      >
        <div className='relative h-full w-full text-white opacity-0 group-hover:opacity-100 transition-opacity'>
          <div className='absolute top-1/2 left-8 xl:left-16 -translate-y-1/2'>
            ❮
          </div>
        </div>
      </div>
    </div>
  );
}
