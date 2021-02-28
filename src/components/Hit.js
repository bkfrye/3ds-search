import React, { useState } from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import Image from './Image';


const Hit = ({ hit }) => {
  const [currentUnixDate] = useState(moment().unix());

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
    <>
      <Image
        src={hit.thumbnail}
        href={hit.url}
      />
      <div className="results-list-item-content">
        <div className="item-content-main">
          <h3>
            <a
              href={hit.url}
              target="_blank"
              rel="noreferrer"
            >{hit.title}</a></h3>
          { (hit.resource_type === `Webinar`) && (
            <>
              {(hit.date_end < currentUnixDate) && (
                <span style={{
                  color: `#4088CC`,
                  fontWeight: `bold`
                }}>Recorded on </span>
              )}
              <Moment
                format="MMMM DD, YYYY"
                date={hit.date_end}
                unix
                style={{
                  color: `#4088CC`,
                  fontWeight: `bold`
                }}
              />
            </>
          )}
          { (hit.resource_type === `Trade Show`) &&
            <div
              style={{
                color: `#4088CC`,
                fontWeight: `bold`
              }}>
              <Moment
                format="MMMM DD"
                date={hit.date_start}
                unix
              />
              <span>-</span>
              <Moment
                format="DD, YYYY"
                date={hit.date_end}
                style={{
                  color: `#4088CC`,
                  fontWeight: `bold`
                }}
                unix
              />
            </div>
          }
          { hit.sub_title &&
            <p
              dangerouslySetInnerHTML={{
                __html: hit.sub_title
              }}
            />
          }
        </div>
        <ul className="list-item-industry-list">
          {industryMap(hit.industry)}
          { (hit.resource_type !== undefined) &&
            <li className="resource-type">{hit.resource_type}</li>
          }
        </ul>
      </div>
    </>
  )
};

export default Hit;
