import React, { useEffect, useState } from 'react';
import { connectHits } from 'react-instantsearch-dom';
import Hit from './Hit';
import FeaturedHit from './FeaturedHit';

const Hits = ({ hits }) => {

  const [ featuredItem, setFeaturedItem ] = useState(0);

  useEffect(() => {
    setFeaturedItem(0)
    const featured = hits.find( el => (el.featured_eligible === true) );
    if (featured) {
      setFeaturedItem(featured.nid)
    }
  }, [hits])

  return (
    <div className="ais-Hits">
      <ul className="ais-Hits-list">
        {hits.map(hit => {
          if ( hit.featured_eligible === true && hit.nid === featuredItem ) {
            return (
              <li
                key={hit.objectID}
                className="ais-Hits-item featured"
              >
                <FeaturedHit hit={hit} />
              </li>
            )
          } else {
            return (
              <li
                key={hit.objectID}
                className="ais-Hits-item"
              >
                <Hit hit={hit}/>
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}

const CustomHits = connectHits(Hits);
export default CustomHits;
