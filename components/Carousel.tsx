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
    <div className='relative'>
      <Image
        src={media[currentImage].url}
        width={media[currentImage].width}
        height={media[currentImage].height}
        alt=''
      />
      <div className='absolute top-1/2 right-0 text-white' onClick={nextImage}>
        NEXT
      </div>
      <div className='absolute top-1/2 left-0 text-white' onClick={prevImage}>
        PREV
      </div>
    </div>
  );
}
