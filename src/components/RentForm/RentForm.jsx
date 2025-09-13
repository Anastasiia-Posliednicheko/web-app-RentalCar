import { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enUS } from "date-fns/locale";
import css from "./RentForm.module.css"

export default function RentForm({ car }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");          // строка YYYY-MM-DD (для сабмита)
  const [dateObj, setDateObj] = useState(null);  // объект Date (для пикера)
  const [comment, setComment] = useState("");

  // today = полночь сегодня (чтобы можно было выбрать «сегодня»)
  const todayObj = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // форматируем Date в YYYY-MM-DD без часового пояса
  function toISODateString(d) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!date) {
      // на всякий случай, если обошли hidden required
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
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
      <label style={{ display: "grid", gap: 4 }}>
        <input
          required
          placeholder="Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label style={{ display: "grid", gap: 4 }}>
        <input
          type="email"
          required
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
      </label>

      <label style={{ display: "grid", gap: 4 }}>
  <div className={css.dateField}>
    <DatePicker
      selected={dateObj}
      onChange={(d) => { setDateObj(d); setDate(d ? toISODateString(d) : ""); }}
      minDate={todayObj}
      placeholderText="Booking date"
      locale={enUS}
      dateFormat="MMM d, yyyy"
      popperPlacement="bottom-start"
      popperModifiers={[
        { name: "offset", options: { offset: [0, 6] } },
        { name: "preventOverflow", options: { boundary: "viewport" } },
        { name: "flip", options: { fallbackPlacements: ["top-start","top-end","bottom-end"] } },
      ]}
      showPopperArrow
      customInput={
        <input
          aria-label="Booking date"
          className="date-input"
          style={{
            height: 36,
            padding: "6px 10px",
            border: "1px solid #ccc",
            borderRadius: 6,
            background: "#fff",
            width: "100%",
          }}
        />
      }
    />
  </div>

  {/* чтобы required отрабатывал */}
  <input type="text" value={date} onChange={()=>{}} required tabIndex={-1} aria-hidden="true"
         style={{ position:"absolute", opacity:0, width:0, height:0, pointerEvents:"none" }}/>
</label>


      <label style={{ display: "grid", gap: 4 }}>
        <textarea
          rows={3}
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            padding: "6px 10px",
            border: "1px solid #ccc",
            borderRadius: 6,
            background: "#fff",
          }}
        />
      </label>

      <button
        type="submit"
        style={{ padding: "8px 12px", border: "1px solid #333", borderRadius: 8 }}
      >
        Send
      </button>
    </form>
  );
}
