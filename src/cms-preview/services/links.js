export function getWhatsAppUrl(clinic, message = "Hola Dental Cabanillas, quiero solicitar una cita.") {
  const phone = String(clinic.whatsappNumber || "").replace(/\D/g, "");
  const query = new URLSearchParams({ phone, text: message });
  return `https://api.whatsapp.com/send/?${query.toString()}&type=phone_number&app_absent=0`;
}
