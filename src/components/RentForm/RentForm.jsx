import { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enUS } from "date-fns/locale";
import toast from 'react-hot-toast';
import css from "./RentForm.module.css"

const NAME_JS_RE = /^\p{L}[\p{L}\p{M}\s'’-]{1,39}$/u;

export default function RentForm({ car }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");          
  const [dateObj, setDateObj] = useState(null);  
  const [comment, setComment] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  

  const todayObj = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);


  function toISODateString(d) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  function formatPrettyDate(d) {
  if (!d) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

 function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity(); 
      return;
    }

    const nameTrim = name.trim();
    if (!NAME_JS_RE.test(nameTrim)) {
      toast.error("Name: 2–40 letters, spaces, hyphen, apostrophe.");
      return;
    }

    if (!date) {
      toast.error("Please choose a booking date.");
      return;
    }

    const carLabel = car ? `${car.brand} ${car.model}` : "car";
    const prettyDate = formatPrettyDate(dateObj) || date;
    toast.success(`Car booked successfully: ${carLabel} on ${prettyDate}`);

    setName("");
    setEmail("");
    setDate("");
    setDateObj(null);
    setComment("");
  }
  return (
    <div className={css.rent}>
      <div className={css.boxTitle}>
        <h3 className={css.title}>Book your car now</h3>
        <p className={css.subTitle}>Stay connected! We are always ready to help you.</p>
      </div>
      <form onSubmit={handleSubmit} className={css.form}>
        <label>
          <input
            type="text"
            required
            placeholder="Name*"
            className={css.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputMode="text"
            pattern="^[A-Za-zÀ-ÖØ-öø-ÿĀ-žА-Яа-яЁёІіЇїЄєҐґ'’\- ]{2,40}$"
          />
        </label>
        <label >
          <input
            type="email"
            required
            placeholder="Email*"
            className={css.input}
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            inputMode="email"
            pattern="^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$"
          />
        </label>
        <label>
          <div className={css.dateField}>
           <DatePicker
            selected={dateObj}
            onChange={(d) => {
            setDateObj(d);
            setDate(d ? toISODateString(d) : "");
            setTimeout(() => setIsPickerOpen(false), 0);
               }}
            open={isPickerOpen}
            onCalendarOpen={() => setIsPickerOpen(true)}
            onCalendarClose={() => setIsPickerOpen(false)}
            onClickOutside={() => setIsPickerOpen(false)}
            shouldCloseOnSelect
            minDate={todayObj}
            placeholderText="Booking date"
            locale={enUS}
            dateFormat="MMM d, yyyy"
            className={css.input}
            wrapperClassName={css.dateWrapper}
            calendarClassName={css.calendar}
            popperClassName={css.popper}
            />
           </div>
           <input
             type="text"
             value={date}
             onChange={() => {}}
             required
             tabIndex={-1}
             aria-hidden="true"
             className={css.required}
           />
        </label>
        <label >
          <textarea
            rows={3}
            placeholder="Comment"
            className={css.inputComment}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            
          />
        </label>
        <button
          type="submit"
          className={css.button}
        >
          Send
        </button>
      </form>
    </div>
  );
}
