import React from 'react';
import Image from './Image';


const FeaturedHit = ({ hit }) => {

  const nameToColor = (str) => {
    return str.replace(/[^A-Z0-9]+/ig, '-').toLowerCase();
  }

  /* Maps out industry tags into a list */
  const industryMap = ( val ) => {
    if (Array.isArray(val) === true) {
      return val.map( (item, idx) => <li key={idx} className={nameToColor(item)}>{item}</li> )
    } else if (val) {
      return <li className={nameToColor(val)}>{val}</li>
    } else {
      return
    }
  }

  return (

      <div className="content">
        <a
          href={hit.url}
          target="_blank"
          rel="noreferrer"
        >
          { !hit.banner_image ? (
            <img src="https://www.3dsystems.com/themes/custom/ddd/images/default-images/3d-systems-thumbnail.png" alt={hit.title}/>
          ) : (
            <Image src={hit.banner_image} />
          )}
          <footer>
            <p className="resource-type">{hit.resource_type}</p>
            <h3>{hit.title}</h3>
            { hit.sub_title &&
              <p dangerouslySetInnerHTML={{ __html: hit.sub_title }} />
            }
            <div className="featured-tags">
              <ul className="list-item-industry-list">
                {industryMap(hit.industry)}
              </ul>
            </div>
          </footer>
        </a>
      </div>

  )
};

export default FeaturedHit;
