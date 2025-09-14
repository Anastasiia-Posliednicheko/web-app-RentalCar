import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "./BrandFilter.module.css";

export default function PriceFilter({ value, onChange, label = "Price / 1 hour" }) {
  const PRICE_MIN = 30;
  const PRICE_MAX = 200;
  const PRICE_STEP = 10;
  const INITIAL_MAX = 80;

  const rootRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMax, setVisibleMax] = useState(INITIAL_MAX);

  const allOptions = useMemo(() => {
    const arr = [];
    for (let p = PRICE_MIN; p <= PRICE_MAX; p += PRICE_STEP) arr.push(String(p));
    return arr;
  }, []);

  const visibleOptions = useMemo(
    () => allOptions.filter((s) => Number(s) <= visibleMax),
    [allOptions, visibleMax]
  );

  function toggle() {
    setIsOpen(prev => {
      const willOpen = !prev;
      if (willOpen) {
        setVisibleMax(INITIAL_MAX);
      }
      return willOpen;
    });
  }

  function onListScroll(e) {
    const el = e.currentTarget;
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
    if (nearBottom) {
      setVisibleMax(prev => Math.min(PRICE_MAX, prev + PRICE_STEP * 5)); 
    }
  }

  function choosePrice(val) {
    onChange?.(val);
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
      <span id="priceLabel" className={css.nameBrand}>{label}</span>

      <div ref={rootRef} className={css.select} >
        <button
          type="button"
          onClick={toggle}
          aria-labelledby="priceLabel"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={css.buttonPrice}
        >
          {value ? `${value}` : "Choose a price"}
          <span
            aria-hidden="true"
            className={css.span}
            style={{ transform: `translateY(-50%) rotate(${isOpen ? 180 : 0}deg)` }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div className={`${css.drop} ${css.dropPrice}`}>
            <div
              role="listbox"
              aria-labelledby="priceLabel"
              onScroll={onListScroll}
              className={`${css.list} ${css.listPrice}`}
            >
              {visibleOptions.map(opt => {
                const selected = value === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => choosePrice(opt)}
                    className={`${css.itemBtn} ${css.itemBtnPrice}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
