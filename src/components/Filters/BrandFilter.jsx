import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "./BrandFilter.module.css";



export default function BrandFilter({ brands = [], value, onChange, label = "Car brand" }) {
  const rootRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const INITIAL_VISIBLE = 10;  
  const STEP = 20;    
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  
  const allBrands = useMemo(() => {
    const unique = Array.from(
      new Set((Array.isArray(brands) ? brands : []).filter(Boolean))
    );
    return unique;
  }, [brands]);

  const visibleBrands = useMemo(
    () => allBrands.slice(0, visibleCount),
    [allBrands, visibleCount]
  );

  function toggle() {
    setIsOpen((prev) => {
      const willOpen = !prev;
      if (willOpen) setVisibleCount(INITIAL_VISIBLE); 
      return willOpen;
    });
  }

  function onListScroll(e) {
    const el = e.currentTarget;
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
    if (nearBottom) {
      setVisibleCount((prev) => Math.min(allBrands.length, prev + STEP));
    }
  }

  function chooseBrand(brand) {
    onChange?.(brand);
    setIsOpen(false);
  }

  useEffect(() => {
    function onDocClick(ev) {
      if (rootRef.current && !rootRef.current.contains(ev.target)) setIsOpen(false);
    }
    function onEsc(ev) {
      if (ev.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div className={css.brand}>
      <span id="brandLabel" className={css.nameBrand}>
        {label}
      </span>

      <div ref={rootRef} className={css.select}>
        <button
          type="button"
          onClick={toggle}
          aria-labelledby="brandLabel"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={css.button}
        >
          {value || "Choose a brand"}
          <span
            aria-hidden="true"
            className={css.span}
             style={{
             transform: `translateY(-50%) rotate(${isOpen ? 180 : 0}deg)`}}
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                d="M6 9l6 6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

       {isOpen && (
        <div className={css.drop}>
         <div
          role="listbox"
          aria-labelledby="brandLabel"
          onScroll={onListScroll}
          className={css.list}
         >
       {visibleBrands.map((brand) => {
         const selected = value === brand;
          return (
            <button
               key={brand}
               type="button"
               role="option"
               aria-selected={selected}
               onClick={() => chooseBrand(brand)}
               className={css.itemBtn}
              >
              {brand}
            </button>
                   );
        })}
     </div>
   </div>
   )}
  </div>
</div>);
}
