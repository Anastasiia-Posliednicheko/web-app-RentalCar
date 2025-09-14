import { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enUS } from "date-fns/locale";
import css from "./RentForm.module.css"

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

  function handleSubmit(e) {
    e.preventDefault();
    if (!date) {
      alert("Please choose a booking date.");
      return;
    }

    const carLabel = car ? `${car.brand} ${car.model}` : "";
    alert(
      `Успішно орендовано: ${carLabel}\nІм’я: ${name}\nEmail: ${email}\nДата: ${date}${
        comment ? `\nКоментар: ${comment}` : ""
      }`
    );

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
            required
            placeholder="Name*"
            className={css.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            onSelect={() => setTimeout(() => setIsPickerOpen(false), 0)}  
            onInputClick={() => setIsPickerOpen(true)}                    
            onCalendarOpen={() => setIsPickerOpen(true)}                 
            onCalendarClose={() => setIsPickerOpen(false)}
            onClickOutside={() => setIsPickerOpen(false)}
            open={isPickerOpen}                                          
            shouldCloseOnSelect                                           
            minDate={todayObj}
            placeholderText="Booking date"
            locale={enUS}
            dateFormat="MMM d, yyyy"
            popperPlacement="bottom-start"
            popperModifiers={[
               { name: "offset", options: { offset: [4, 8] } },
               { name: "preventOverflow", options: { boundary: "viewport", padding: 8 } },
               { name: "flip", options: { fallbackPlacements: ["top"] } },
               ]}
            className={css.input}             
            wrapperClassName={css.dateWrapper}
            calendarClassName={css.calendar}
            popperClassName={css.popper}
            onKeyDown={(e) => { if (e.key === "Escape") setIsPickerOpen(false); }}
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
