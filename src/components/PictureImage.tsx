import type { ImgHTMLAttributes } from 'react';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string;
};

const PictureImage = ({ src, alt = '', loading = 'lazy', decoding = 'async', ...rest }: Props) => {
  const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');
  const hasWebpVariant = webpSrc !== src;
  const isAlreadyWebp = /\.webp$/i.test(src);

  return (
    <picture>
      {hasWebpVariant && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        {...(isAlreadyWebp ? {} : {})}
        {...rest}
      />
    </picture>
  );
};

export default PictureImage;
