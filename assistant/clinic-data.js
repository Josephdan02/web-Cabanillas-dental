/**
 * Datos verificados de Dental Cabanillas.
 *
 * IMPORTANTE:
 * - Este archivo es la unica fuente de informacion del Asistente Dental Cabanillas.
 * - Solo debe contener datos publicados actualmente en la web de la clinica.
 * - No agregar precios, promociones, seguros, disponibilidad de citas ni datos clinicos.
 * - Para actualizar el asistente, edita este archivo y publica de nuevo (es estatico).
 */

export const clinic = {
  name: "Dental Cabanillas",
  city: "Huánuco",
  country: "Perú",
  address: "Jr. Aguilar 339, Huánuco, Perú",
  phoneDisplay: "+51 988 129 696",
  phoneRaw: "+51988129696",
  whatsappNumber: "51988129696",
  mapsUrl: "https://maps.app.goo.gl/nDwvGHE5unogBmuo7",
  hours: {
    days: "Lunes a sábado",
    morning: "8:30 a. m. – 1:00 p. m.",
    afternoon: "3:00 p. m. – 7:30 p. m."
  },
  audience: "niños, jóvenes y adultos",
  social: {
    facebook: "https://www.facebook.com/Clinica.Cabanillas/",
    instagram: "https://www.instagram.com/dental.cabanillas/",
    tiktok: "https://www.tiktok.com/discover/clinica-dental-cabanillas-huanuco"
  }
};

/**
 * Construye un enlace de WhatsApp con el numero oficial de la clinica.
 * El texto siempre se codifica con encodeURIComponent.
 * Nunca debe incluir sintomas, diagnosticos ni informacion clinica del visitante.
 */
export function buildWhatsAppUrl(message) {
  const base = "https://api.whatsapp.com/send/?phone=" + clinic.whatsappNumber;
  const text = encodeURIComponent(message || "Hola Dental Cabanillas, tengo una consulta. Vengo del asistente virtual.");
  return base + "&text=" + text + "&type=phone_number&app_absent=0";
}

export const treatments = [
  {
    name: "Ortodoncia",
    description: "Alineación dental con tratamientos modernos para mejorar estética, mordida y función.",
    highlights: ["Alineación progresiva", "Mejor mordida", "Sonrisa armónica", "Plan personalizado"],
    specialist: "Dr. Enrique Cabanillas",
    keywords: ["ortodoncia", "brackets", "alineacion", "alinear", "ortodoncista"]
  },
  {
    name: "Limpieza dental profunda",
    description: "Profilaxis y cuidado preventivo para mantener encías sanas y una sonrisa más limpia.",
    highlights: ["Prevención de sarro", "Encías saludables", "Sensación de frescura", "Cuidado preventivo"],
    keywords: ["limpieza", "limpieza dental", "profilaxis", "sarro", "destartraje"]
  },
  {
    name: "Blanqueamiento dental",
    description: "Tratamiento estético para aclarar el tono dental y renovar la apariencia de tu sonrisa.",
    highlights: ["Tono más claro", "Resultado estético", "Procedimiento controlado", "Sonrisa renovada"],
    keywords: ["blanqueamiento", "blanquear", "aclarar dientes", "blanquear dientes"]
  },
  {
    name: "Carillas dentales",
    description: "Diseño estético para mejorar la armonía y función de los dientes.",
    highlights: ["Diseño de sonrisa", "Forma y color", "Acabado natural", "Alta estética"],
    keywords: ["carillas", "carilla", "carillas dentales"]
  },
  {
    name: "Endodoncia",
    description: "Tratamientos de conducto para aliviar dolor y conservar piezas dentales afectadas.",
    highlights: ["Alivio del dolor", "Conserva la pieza", "Sistema moderno", "Mayor precisión"],
    specialist: "Dr. Charles García Tafur",
    keywords: ["endodoncia", "conducto", "tratamiento de conducto", "nervio"]
  },
  {
    name: "Implantes dentales",
    description: "Soluciones modernas para reemplazar piezas perdidas con planificación profesional.",
    highlights: ["Evaluación profesional", "Tecnología moderna", "Trato personalizado", "Resultados naturales"],
    keywords: ["implante", "implantes", "implantes dentales", "reemplazar diente", "diente perdido"]
  },
  {
    name: "Odontopediatría",
    description: "Atención dental para niños, especializada y confiable.",
    highlights: ["Evaluación profesional", "Tecnología moderna", "Trato personalizado", "Resultados naturales"],
    keywords: ["odontopediatria", "odontopediatrica", "odontopediatra", "dentista para ninos", "dental para ninos"]
  },
  {
    name: "Prótesis dental",
    description: "Rehabilitación para recuperar función, estética y seguridad al sonreír.",
    highlights: ["Evaluación profesional", "Tecnología moderna", "Trato personalizado", "Resultados naturales"],
    keywords: ["protesis", "protesis dental", "corona", "puente dental", "dentadura"]
  },
  {
    name: "Diseño de sonrisa",
    description: "Diseño estético para mejorar la armonía, forma y apariencia natural de la sonrisa.",
    highlights: ["Alta estética", "Forma y color", "Acabado natural", "Plan personalizado"],
    keywords: ["diseno de sonrisa", "sonrisa", "estetica dental", "estetica"]
  },
  {
    name: "Cirugías dentales",
    description: "Procedimientos quirúrgicos realizados con evaluación previa y cuidado profesional.",
    highlights: ["Mayor precisión", "Evaluación profesional", "Tecnología moderna", "Trato personalizado"],
    specialist: "Dr. Kenyi Gonzales Takano",
    keywords: ["cirugia", "cirugias", "cirugia dental", "extraccion", "muela del juicio", "maxilofacial"]
  }
];

export const doctors = [
  {
    name: "Dr. Enrique Cabanillas",
    role: "Ortodoncia",
    registry: "COP. 45258",
    bio: "Especialista encargado del área de ortodoncia, con enfoque en tratamientos modernos para niños, jóvenes y adultos.",
    aliases: ["enrique cabanillas", "dr cabanillas", "dr enrique", "enrique", "ortodoncista"]
  },
  {
    name: "Dr. César Suárez",
    role: "Estética Dental",
    registry: "",
    bio: "Enfocado en tratamientos personalizados para lograr resultados armónicos, naturales y duraderos.",
    aliases: ["cesar suarez", "dr suarez", "dr cesar", "cesar"]
  },
  {
    name: "Dr. Charles García Tafur",
    role: "Endodoncia con sistema rotatorio",
    registry: "",
    bio: "Especialista en tratamientos de conducto modernos, precisos y orientados a conservar piezas dentales.",
    aliases: ["charles garcia", "dr charles", "dr garcia tafur", "dr garcia", "charles"]
  },
  {
    name: "Dra. Evelin Tarazona Figueroa",
    role: "Odontología General y Estética Dental",
    registry: "COP. 52362",
    bio: "Brinda tratamientos integrales enfocados en salud, estética y bienestar de la sonrisa.",
    aliases: ["evelin tarazona", "dra evelin", "dra tarazona", "evelin"]
  },
  {
    name: "Dra. Jhuliana Suárez",
    role: "Odontología Restauradora",
    registry: "",
    bio: "Especialista en recuperar funcionalidad y estética natural mediante tratamientos restauradores modernos.",
    aliases: ["jhuliana suarez", "dra jhuliana", "dra suarez", "jhuliana"]
  },
  {
    name: "Dra. Lilith Mendoza",
    role: "Estética Dental",
    registry: "",
    bio: "Combina precisión y atención personalizada para realzar la belleza natural de cada sonrisa.",
    aliases: ["lilith mendoza", "dra lilith", "dra mendoza", "lilith"]
  },
  {
    name: "Dr. Kenyi Gonzales Takano",
    role: "Cirujano Bucal y Maxilofacial",
    registry: "RNE. 6074",
    bio: "Especialista en cirugía bucal y maxilofacial, con enfoque en procedimientos quirúrgicos seguros, diagnóstico preciso y manejo de casos complejos de la región oral y maxilofacial.",
    aliases: ["kenyi gonzales", "dr kenyi", "dr gonzales takano", "dr gonzales", "kenyi", "cirujano maxilofacial"]
  },
  {
    name: "Dra. Tania Diaz Falcon",
    role: "Odontología Restauradora",
    registry: "COP. 62340",
    bio: "Odontóloga restauradora dedicada a preservar, rehabilitar y devolver la función y estética de la sonrisa con tratamientos personalizados y atención de excelencia.",
    aliases: ["tania diaz", "dra tania", "dra diaz falcon", "dra diaz", "tania"]
  }
];

export const technology = [
  {
    name: "Scanner Intraoral con IA",
    description: "Olvídate de los moldes convencionales. Nuestro escáner intraoral captura imágenes digitales de alta precisión de forma rápida, cómoda y segura. Combinado con inteligencia artificial e impresión 3D, permite planificar tratamientos personalizados con mayor precisión, eficiencia y comodidad para nuestros pacientes.",
    features: ["Sin moldes tradicionales", "Escaneo rápido y cómodo", "Mayor precisión digital", "Planificación con IA", "Compatible con impresión 3D"],
    keywords: ["scanner", "escaner", "intraoral", "escaneo", "moldes", "impresion 3d"]
  },
  {
    name: "Rayos X Digital con IA",
    description: "Nuestro sistema de Rayos X Digital Portátil permite obtener imágenes instantáneas con gran calidad diagnóstica. La integración de inteligencia artificial ayuda a mejorar la evaluación clínica, permitiendo diagnósticos más rápidos, precisos y cómodos para nuestros pacientes.",
    features: ["Imágenes instantáneas", "Menor tiempo de espera", "Diagnóstico más preciso", "Tecnología portátil", "Mayor comodidad para el paciente"],
    keywords: ["rayos x", "rayos", "radiografia", "radiografias", "rx"]
  },
  {
    name: "Área de Bioseguridad y Esterilización",
    description: "Disponemos de autoclave, selladora y protocolos estrictos de esterilización que garantizan instrumental completamente seguro para cada procedimiento. Nuestro compromiso con la bioseguridad brinda confianza, protección y tranquilidad a todos nuestros pacientes.",
    features: ["Esterilización certificada", "Instrumental seguro", "Protocolos estrictos", "Máxima protección", "Ambiente controlado"],
    keywords: ["bioseguridad", "esterilizacion", "esterilizar", "autoclave", "instrumental"]
  },
  {
    name: "Control de Aerosoles",
    description: "Contamos con una moderna unidad de succión extraoral que captura aerosoles, partículas y microorganismos generados durante los procedimientos odontológicos. Gracias a su sistema de filtración HEPA y esterilización UV, contribuye a mantener un ambiente más limpio, seguro y protegido para pacientes y profesionales.",
    features: ["Captura de aerosoles", "Filtración HEPA", "Esterilización UV", "Ambiente más limpio", "Mayor protección clínica"],
    keywords: ["aerosoles", "succion", "hepa", "uv", "filtracion"]
  }
];

export const facilities = [
  "Área de consultoría",
  "Sala de espera",
  "Área de niños",
  "Área de tratamiento",
  "Unidad dental moderna",
  "Ingreso de la clínica"
];

export const quickQuestions = [
  { label: "Horario", query: "¿Cuál es el horario de atención?" },
  { label: "Ubicación", query: "¿Dónde están ubicados?" },
  { label: "Tratamientos", query: "¿Qué tratamientos ofrecen?" },
  { label: "Pedir cita", query: "Quiero solicitar una cita" }
];

/**
 * Respuestas informativas generales.
 * Las respuestas dinamicas (tratamientos, doctores, tecnologia) se generan
 * en assistant.js a partir de las listas de arriba.
 */
export const faqs = [
  {
    id: "about",
    keywords: ["sobre la clinica", "quienes son", "que es dental cabanillas", "informacion de la clinica", "sobre ustedes", "nosotros", "dedican", "clinica dental"],
    answer:
      "Dental Cabanillas es una clínica dental en Huánuco. Su enfoque es la odontología moderna y profesional para toda la familia, combinando calidad profesional, tecnología moderna y atención humana."
  },
  {
    id: "hours",
    keywords: ["horario", "horarios", "hora", "horas", "atienden", "abren", "cierran", "abierto", "abiertos", "sabado", "sabados", "domingo", "dias", "horario de atencion"],
    answer:
      "Atendemos de lunes a sábado:\n• Mañana: 8:30 a. m. – 1:00 p. m.\n• Tarde: 3:00 p. m. – 7:30 p. m.\n\nSi deseas coordinar una atención, puedes escribirnos por WhatsApp."
  },
  {
    id: "location",
    keywords: ["ubicacion", "ubicados", "direccion", "donde", "llegar", "llego", "mapa", "local", "queda", "sede", "como llego"],
    answer:
      "Estamos en Jr. Aguilar 339, Huánuco, Perú. Puedes abrir la ruta en Google Maps o escribirnos por WhatsApp si necesitas orientación."
  },
  {
    id: "contact",
    keywords: ["contacto", "telefono", "numero", "whatsapp", "comunicarme", "escribir", "llamar", "celular", "correo"],
    answer:
      "Puedes contactar a Dental Cabanillas por WhatsApp al +51 988 129 696. También contamos con Facebook, Instagram y TikTok."
  },
  {
    id: "team",
    keywords: ["equipo", "doctores", "doctor", "dentistas", "dentista", "especialistas", "profesionales", "quien atiende", "staff"],
    answer:
      "El equipo de Dental Cabanillas está formado por profesionales en ortodoncia, estética dental, endodoncia, odontología general y restauradora, y cirugía bucal y maxilofacial. Puedo darte más detalle si me preguntas por un área o por el nombre de un profesional."
  },
  {
    id: "technology",
    keywords: ["tecnologia", "equipos", "equipo dental", "avances", "digital", "inteligencia artificial"],
    answer:
      "Dental Cabanillas utiliza scanner intraoral con IA, rayos X digital con IA, un área de bioseguridad y esterilización, y una unidad de control de aerosoles con filtración HEPA y esterilización UV. Puedo ampliarte la información de cualquiera de estos puntos."
  },
  {
    id: "facilities",
    keywords: ["ambientes", "instalaciones", "sala de espera", "area de ninos", "consultorio", "clinica por dentro", "espacios", "ambiente"],
    answer:
      "La clínica cuenta con estos ambientes:\n• Área de consultoría\n• Sala de espera\n• Área de niños\n• Área de tratamiento\n• Unidad dental moderna\n• Ingreso de la clínica"
  },
  {
    id: "children",
    keywords: ["ninos", "ninas", "menores", "infantil", "mi hijo", "mi hija", "odontopediatria", "edad"],
    answer:
      "Sí, Dental Cabanillas atiende a niños, jóvenes y adultos. La clínica cuenta con un área de niños y ofrece odontopediatría. Si quieres coordinar la atención de un menor, puedes escribirnos por WhatsApp."
  },
  {
    id: "social",
    keywords: ["facebook", "instagram", "tiktok", "redes", "redes sociales", "siguen"],
    answer:
      "Puedes encontrar a Dental Cabanillas en Facebook, Instagram y TikTok. Desde aquí puedo mostrarte los enlaces."
  },
  {
    id: "videos",
    keywords: ["videos", "video", "contenido", "galeria", "multimedia"],
    answer:
      "La web tiene videos de tratamientos, tecnología, ambientes y eventos de la clínica. Puedes verlos en la sección audiovisual del sitio."
  }
];
