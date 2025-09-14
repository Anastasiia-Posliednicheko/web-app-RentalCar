RentalCar — car rental web app
A small React SPA to browse a car catalog, filter by brand/price/mileage, add to Favorites, view car details, and submit a rental request.
Features
Catalog with pagination (“Load more”).
Filters:
Brand — custom dropdown with scroll + lazy loading of items.
Price / 1 hour — custom dropdown from 30…200 (step 10). Initially shows 30–80, then scroll to load more.
Mileage — paired inputs From / To with live thousands formatting while typing.
Favorites: heart icon on card (overlay on the photo). State persists in localStorage.
Car details page:
Photo, title Brand Model, Year, short ID (first 4 chars),
Address as City | Country,
Price, mileage, description,
Rental company, Rental conditions, Car specifications, Accessories & functionalities (with icons).
Rent form:
Fields: Name, Email, Booking date (English calendar popover near the input), Comment.
Validation for required date; success/error toast messages.
Toasts: success (booking), and common errors (e.g., “Car not found”).
Base styling close to the design (no CSS frameworks).

Stack
React 18 + Vite
React Router (/catalog, /catalog/:id)
Redux Toolkit (cars slice, favorites slice)
Axios (HTTP)
react-hot-toast (notifications)
react-datepicker (custom-styled calendar)
CSS Modules

Usage
Go to Catalog. Filters are on top.
Choose a brand (dropdown with scrolling), price (click to open, 30–80 initially; scroll for 90–200), and optionally set mileage in From/To fields (typing keeps only digits and formats 1,234).
Click Search to apply filters.
Cliсk Load more to fetch the next page.
Click the heart on a card to add/remove from Favorites (saved in localStorage).
On the car details page, fill the Rent form and pick a date from the English calendar. On submit you’ll see a toast confirmation.

Author

Name: Anastasiia Posliednichenko

Email: anastasiia.p.work@gmail.com

Built for learning purposes. Feedback and PRs are welcome.
