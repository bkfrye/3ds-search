import React, { useEffect, useState } from 'react';

const Image = ({ src, href }) => {
  const fallbackPath = `//www.3dsystems.com/sites/default/files/styles/thumbnail_onethird_size/public/default_images/default-thumbnail.jpg`;

  const [ img, setImg ] = useState(null);

  /* Replaces public:// path with correct URI path */
  const filterImage = (path) => {
    const str = path.replace(`public://`, `https://www.3dsystems.com/cdn-cgi/image/width=372,height=229,fit=crop/https://www.3dsystems.com/sites/default/files/`);

    return str.replace(/[ ]+/g, '%20');
  }

  useEffect(() => {
    setImg(filterImage(src))
  }, [src, setImg])

  /* TODO: figure out why image path below doesnt want to load
  // original: public://2021-02/MasterGraphics_Fig4_Webinar_Q12021_LP (1).jpg
  // converted: https://www.3dsystems.com/sites/default/files/2021-02/MasterGraphics_Fig4_Webinar_Q12021_LP%20(1).jpg"
  */

  return (
    <a
      className="results-list-item-image"
      href={href}
      target="_blank"
      rel="noreferrer"
    >

      <div className="results-list-item-image-bg">
        <img src={img} alt="" />
      </div>
    </a>

  )
}


export default Image;
