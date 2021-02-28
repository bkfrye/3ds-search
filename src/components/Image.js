import React, { useEffect, useState } from 'react';

const Image = ({ src, href }) => {
  const fallbackImg = `//www.3dsystems.com/sites/default/files/styles/thumbnail_onethird_size/public/default_images/default-thumbnail.jpg`;
  const cropImagePath = `https://www.3dsystems.com/cdn-cgi/image/width=372,height=229,fit=crop/https://www.3dsystems.com/sites/default/files/`;

  const [ img, setImg ] = useState(null);

  /* Replaces public:// path with correct URI path */
  const filterImage = (path) => {
    const str = path.replace(`public://`, cropImagePath);

    return str.replace(/[ ]+/g, '%20');
  }

  useEffect(() => {
    setImg(filterImage(src))
  }, [src, setImg])

  return (
    <a
      className="results-list-item-image"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <div className="results-list-item-image-bg">
        <img src={ (img) ? img : fallbackImg } alt="" />
      </div>
    </a>

  )
}

export default Image;
