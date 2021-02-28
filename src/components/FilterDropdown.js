import React, { useEffect, useRef, useState } from 'react';
import CustomRefinementList from './CustomRefinementList';


// since there are multiple instances, combine them to manage
function useCombinedRefs(...refs) {
  const targetRef = useRef();

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        ref.current = targetRef.current
      }
    })
  }, [refs]);

  return targetRef;
}

// Forward the ref to entire document
const FilterDropdown = React.forwardRef((props, ref) => {
  const innerRef = React.useRef(null);
  const combinedRef = useCombinedRefs(ref, innerRef)

  const [isOpen, setIsOpen] = useState();
  const [active, setActive] = useState();

  const titleCase = (str) => {
    str = str.split('_');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }

  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (combinedRef.current && !combinedRef.current.contains(evt.target)) {
        setIsOpen(0)
      }
    }

    setIsOpen(props.open)
    setActive(props.active)
    document.addEventListener('mousedown', handleClickOutside)
  }, [ props.open, props.active, combinedRef ])

  return (
    <div
      ref={combinedRef}
      id={`${props.attribute}-filter`}
      className={`filter-menu ${isOpen ? "open" : ""} ${active ? "active" : ""}`}
    >
      <div
        className={`filter-menu-toggle`}
        onClick={props.toggle}
      >
        <p>{titleCase(props.attribute)}</p>
        <div className="dropdown-icon">
          <svg viewBox="0 0 32 32" height="20px" width="20px">
            <polygon style={{ fill: `#ffffff` }} points="16,22 6,12 7.4,10.6 16,19.2 24.6,10.6 26,12 "/>
            <rect style={{ fill: `none` }} width="32" height="32"/>
          </svg>
        </div>
      </div>
      <div className="filter-menu-items" hidden={!isOpen}>
        <CustomRefinementList
          attribute={props.attribute}
          transformItems={items =>
            items.sort((a, b) => (a.label > b.label) ? 1 : -1)
          }
        />
      </div>
    </div>
  )
})


export default FilterDropdown;
