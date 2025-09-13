export const formatMileage = (n) =>
  String(new Intl.NumberFormat("en-US").format(Number(n || 0))).replace(/,/g, " ") + " km";

export const formatPrice = (v) => {
  const s = String(v ?? "").trim();
  if (!s) return "—";
  return s.startsWith("$") ? s : `$${s}`; 
};

export const formatAddressShort=(address) => {
  if (!address || typeof address !== "string") {
    return { country: "", city: "" };
  }

  const parts = address.split(",").map(p => p.trim());
 
  const country = parts[parts.length - 1] || "";
  const city = parts[parts.length - 2] || "";

  return { country, city };
}


