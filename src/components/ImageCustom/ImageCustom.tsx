
import {useState} from 'react';
import { Image } from 'react-bootstrap';

type ImageCustomProps = {
    src: string;
    fallbackSrc: string;
    alt: string;
    [key: string]: any;
  };

const ImageCustom: React.FC<ImageCustomProps> = ({ src, fallbackSrc, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    if (imgSrc !== fallbackSrc && imgSrc != '') {
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
};

export default ImageCustom;