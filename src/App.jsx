import React, { useState } from "react";
import {
  Home, Hotel, Compass, UtensilsCrossed, Info, Map as MapIcon,
  Landmark, ShoppingBag, Trees, Ticket, Car, Mountain,
  Soup, Sandwich, Fish, Coffee, ChefHat, PartyPopper,
  MapPin, Clock, DollarSign, Lightbulb, Plane, TrafficCone,
  CloudSun, ShieldCheck, Navigation, Star, Heart, X
} from "lucide-react";

/* ============================================================
   DATA
   ============================================================ */

const mapsLink = (name, address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((address || name) + (address ? "" : " Guadalajara, Jalisco"))}`;

const EVENTOS_BODA = [
  {
    nombre: "Capilla El Filamentario", emoji: "⛪", foto: "/images/Capilla.jpg",
    detalle: "Ceremonia religiosa",
    categoria: "Ceremonia",
    color: "anil",
    icon: Landmark,
    fecha: "Sábado 30 de enero de 2027",
    zona: "Santa Cruz de las Flores, Tlajomulco de Zúñiga",
    direccion: "Capilla Filamentario, Santa Cruz de las Flores, Tlajomulco de Zúñiga, Jalisco",
    nota: "Misa: 4:00 PM.",
  },
  {
    nombre: "La Dovena", emoji: "🥂", foto: "/images/ladovena.jpeg",
    detalle: "Recepción",
    categoria: "Recepción",
    color: "rosa",
    icon: PartyPopper,
    fecha: "Sábado 30 de enero de 2027",
    zona: "San Pedro Tlaquepaque",
    direccion: "La Dovena, Camino a la Presa, San Pedro Tlaquepaque, Jalisco",
    nota: "Recepcion: 5:30 PM.",
  },
  {
    nombre: "TornaBoda", emoji: "🍸", foto: "/images/tornaboda.jpeg",
    detalle: "Reunión casual. ",
    categoria: "TornaBoda",
    color: "dorado",
    icon: Coffee,
    fecha: "Domingo 31 de enero de 2027",
    zona: "Lugar por confirmar",
    direccion: null,
    nota: null,
  },
];

const ZONAS_HOSPEDAJE = [
  {
    nombre: "Punto Sur",
    resumen: "Zona más cercana a los eventos de la boda, moderna y tranquila.",
    pros: ["Cercanía directa a los eventos", "La plaza Punto Sur es moderna y muy completa", "Zona nueva con buena oferta de hospedaje", "Fácil acceso por Periférico"],
    contras: ["Menos vida de barrio caminable", "Más lejos del Centro Histórico y Chapultepec"],
    idealPara: "Quien prioriza minimizar traslados el día de la boda.",
    hotelSugerido: "Aloft Guadalajara",
    hotelDireccion: "Aloft Guadalajara, Puerta de Hierro, Zapopan, Jalisco",
    hotelFoto: "/images/aloftpuntosur.avif",
    x: 50, y: 78,
  },
  {
    nombre: "Minerva/Americana",
    resumen: "El corazón social de Guadalajara: restaurantes, cafés, galerías y vida de calle.",
    pros: ["Caminable, con muchísima oferta gastronómica", "Cerca del Centro Histórico y Chapultepec", "Ambiente icónico tapatío"],
    contras: ["Considerar mínimo 1 hora de traslado hacia los eventos de la boda", "Tráfico en horas pico"],
    idealPara: "Quien quiere aprovechar los días extra para explorar la ciudad a pie.",
    hotelSugerido: "Fiesta Americana Guadalajara",
    hotelDireccion: "Fiesta Americana Guadalajara, Av. Aurelio Aceves, Guadalajara, Jalisco",
    hotelFoto: "/images/fiestaamericanaminerva.jpg",
    x: 43, y: 35,
  },
];

const HOSPEDAJE_AVISO = "Todavía no tenemos un acuerdo cerrado con ningún hotel. La idea es ponernos de acuerdo entre todos para elegir uno y buscar una tarifa de reservación de grupo — les avisaremos en cuanto lo tengamos definido.";

const QUE_HACER = [
  {
    categoria: "Cultura e Historia",
    color: "anil",
    icon: Landmark,
    lugares: [
      {
        nombre: "Centro Histórico de Guadalajara", emoji: "🏛️", favorito: true,
        descripcion: "El casco antiguo de la ciudad: catedral, plazas, edificios coloniales y el histórico Mercado San Juan de Dios, todo conectado a pie a través del Paseo Alcalde, el corredor peatonal y ciclista que une el Centro con Zapopan.",
        porQue: "Es el punto de partida obligado para entender la ciudad.",
        tiempo: "3-4 horas", costo: "Gratis (caminando)", psur: "35-45 min", min: "15-20 min",
        tip: "Ve temprano para evitar calor y aprovechar mejor la luz para fotos.",
        dondeComer: ["Birriería Las 9 Esquinas"],
        foto: "/images/centrohistorico.jpg",
        x: 58, y: 44,
      },
      {
        nombre: "Hospicio Cabañas", emoji: "🎨", favorito: true,
        descripcion: "Patrimonio de la Humanidad por la UNESCO, famoso por los murales de José Clemente Orozco.",
        porQue: "Uno de los conjuntos de arte mural más importantes de México.",
        tiempo: "1-1.5 horas", costo: "~$25-50 MXN", psur: "35-45 min", min: "20-25 min",
        tip: "El mural del Hombre de Fuego en la cúpula es la razón principal de la visita.",
        foto: "/images/hospiciocabanas.jpeg",
        x: 60, y: 43,
      },
      {
        nombre: "Templo Expiatorio", emoji: "⛪",
        descripcion: "Iglesia neogótica con vitrales impresionantes, distinta a la arquitectura colonial del resto del Centro.",
        porQue: "Una de las construcciones más bellas y fotogénicas de la ciudad.",
        tiempo: "30-45 min", costo: "Gratis", psur: "25-35 min", min: "10 min",
        tip: "Está en Colonia Americana, se puede combinar con un café cerca.",
        foto: "/images/expiatorio.jpeg",
        x: 50, y: 40,
      },
      {
        nombre: "Plaza de los Mariachis", emoji: "🎻", foto: "/images/plaza de los mariachis.jpg",
        descripcion: "Plaza tradicional donde el mariachi tapatío nació como tradición callejera.",
        porQue: "Vivir el mariachi en su lugar de origen, no en una versión turística.",
        tiempo: "45 min - 1 hora", costo: "Gratis (música por contratación aparte)", psur: "35-45 min", min: "15-20 min",
        tip: "Mejor de noche, cuando la plaza cobra vida.",
        x: 61, y: 47,
      },
      {
        nombre: "Teatro Degollado", emoji: "🎭", favorito: true,
        descripcion: "Teatro histórico estilo neoclásico, sede de la Orquesta Filarmónica de Jalisco.",
        porQue: "Joya arquitectónica del siglo XIX en pleno Centro.",
        tiempo: "30-60 min (más si hay función)", costo: "Exterior gratis / función según boletos", psur: "35-45 min", min: "15-20 min",
        tip: "Revisa cartelera, una función aquí es una experiencia distinta a solo ver el edificio.",
        nota: "Forma parte del recorrido del Centro Histórico.",
        foto: "/images/degollado.jpeg",
        x: 57, y: 45,
      },
      {
        nombre: "MUSA (Museo de las Artes)", emoji: "🖼️", foto: "/images/MUSA.jpg",
        descripcion: "Museo de arte de la Universidad de Guadalajara, con exposiciones temporales de nivel internacional.",
        porQue: "Buena opción de arte contemporáneo si ya conocen el arte colonial del Centro.",
        tiempo: "1-1.5 horas", costo: "~$20-40 MXN", psur: "30-40 min", min: "10-15 min",
        tip: "Revisa qué exposición hay antes de ir, cambian con frecuencia.",
        x: 55, y: 42,
      },
      {
        nombre: "JAPI (Jalisco Paseo Interactivo)", emoji: "🕹️", foto: "/images/JAPI.png",
        descripcion: "Museo interactivo en Zapopan con más de 90 experiencias inmersivas sobre cultura, ciencia y naturaleza de Jalisco, incluido un teatro volador de 180°.",
        porQue: "Una experiencia moderna y familiar, muy distinta a los museos tradicionales del Centro.",
        tiempo: "2-3 horas", costo: "$150 MXN adultos / $75 MXN niños, INAPAM y personas con discapacidad", psur: "20-25 min", min: "15-20 min",
        tip: "Está a unos minutos de Andares y Bosque Los Colomos, se puede combinar con esas visitas.",
        direccion: "JAPI Jalisco Paseo Interactivo, Zapopan, Jalisco",
        x: 21, y: 18,
      },
    ],
  },
  {
    categoria: "Barrios y Centros Tradicionales",
    color: "terracota",
    icon: Home,
    lugares: [
      {
        nombre: "Colonia Americana", emoji: "🏘️", foto: "/images/coloniaamericana.jpeg", favorito: true,
        descripcion: "El barrio más de moda de Guadalajara: casonas antiguas, cafés de especialidad, bares y diseño.",
        porQue: "Mezcla de arquitectura histórica con la escena gastronómica más creativa de la ciudad.",
        tiempo: "Medio día", costo: "Gratis caminar", psur: "25-35 min", min: "5-10 min",
        tip: "Ideal para explorar a pie sin prisa, es la zona con más 'ambiente' de la ciudad.",
        dondeComer: ["Explorar la gran variedad gastronómica del barrio"],
        x: 43, y: 37,
      },
      {
        nombre: "Avenida Chapultepec", emoji: "🌳", foto: "/images/Chapultepec.jpg",
        descripcion: "Boulevard arbolado con camellón central, terrazas y vida nocturna.",
        porQue: "El punto de reunión social por excelencia en Guadalajara.",
        tiempo: "2-3 horas", costo: "Gratis caminar", psur: "25-35 min", min: "5-10 min",
        tip: "Muy activo los fines de semana por la tarde-noche.",
        x: 45, y: 39,
      },
      {
        nombre: "Centro de Zapopan", emoji: "🙏", foto: "/images/centrozapopan.jpeg",
        descripcion: "Centro histórico de Zapopan, con la Basílica de Nuestra Señora de Zapopan.",
        porQue: "Combina fe, historia y una plaza muy viva con cafés alrededor.",
        tiempo: "1.5-2 horas", costo: "Gratis", psur: "30-40 min", min: "15-20 min",
        tip: "La Basílica combina arquitectura barroca y neoclásica; vale la pena admirar la fachada con calma.",
        dondeComer: ["La Chata Terranova"],
        direccion: "Centro Histórico de Zapopan, Zapopan, Jalisco",
        x: 27, y: 22,
      },
      {
        nombre: "Centro de San Pedro Tlaquepaque", emoji: "🏺", favorito: true,
        descripcion: "Pueblo mágico dentro de la zona metropolitana, famoso por artesanías, arte y su Andador Independencia.",
        porQue: "El lugar favorito de la mayoría de visitantes: arte, cantinas con mariachi en vivo y talavera.",
        tiempo: "3-4 horas", costo: "Gratis caminar (artesanías aparte)", psur: "20-25 min", min: "25-35 min",
        tip: "El Parián es la plaza de cantinas con mariachi en vivo — tiene un ambiente inigualable, ideal para cenar en grupo.",
        dondeComer: ["Casa Luna (para cenar)"],
        foto: "/images/casaluna.jpg",
        direccion: "San Pedro Tlaquepaque, Jalisco",
        x: 73, y: 63,
      },
      {
        nombre: "Centro Artesanal de Tonalá", emoji: "🧵", foto: "/images/tonalacentro.webp",
        descripcion: "Pueblo conocido por su cerámica y artesanía; los jueves y domingos hay tianguis artesanal grande.",
        porQue: "La mejor opción para comprar artesanía directo del artesano.",
        tiempo: "2-3 horas", costo: "Gratis caminar", psur: "25-30 min", min: "30-35 min",
        tip: "Ve un jueves o domingo si quieren ver el tianguis completo, entre semana está mucho más tranquilo.",
        direccion: "Av. Tonaltecas Sur, Tonalá, Jalisco",
        x: 85, y: 58,
      },
      {
        nombre: "Santa Tere", emoji: "🎨", foto: "/images/santatere.png",
        descripcion: "Barrio tradicional y bohemio al norte del Centro, con murales callejeros, mercados de barrio y ambiente local auténtico.",
        porQue: "Una cara más local y menos turística de Guadalajara, con arte urbano por todos lados.",
        tiempo: "1.5-2 horas", costo: "Gratis caminar", psur: "35-40 min", min: "15-20 min",
        tip: "Bueno para combinar con una visita a Karne Garibaldi, que está justo en este barrio.",
        dondeComer: ["Tacos Juan", "Karne Garibaldi"],
        x: 57, y: 40,
      },
    ],
  },
  {
    categoria: "Compras",
    color: "dorado",
    icon: ShoppingBag,
    lugares: [
      {
        nombre: "Andares", emoji: "🛍️", foto: "/images/andares.jpg",
        descripcion: "Centro comercial de lujo ubicado en el centro financiero de Zapopan, el más exclusivo de la ciudad.",
        porQue: "Marcas internacionales de alto nivel y buena oferta de restaurantes.",
        tiempo: "2-3 horas", costo: "Entrada gratis", psur: "15-20 min", min: "10-15 min",
        tip: "Está muy cerca de Bosque Los Colomos y del Centro de Zapopan, se pueden combinar en la misma visita.",
        direccion: "Andares, Zapopan, Jalisco",
        x: 20, y: 15,
      },
      {
        nombre: "Midtown Jalisco", emoji: "🏙️", foto: "/images/midtown.jpeg",
        descripcion: "Desarrollo de uso mixto moderno con tiendas, oficinas y restaurantes.",
        porQue: "Ambiente moderno y buena zona para comer bien sin ir muy lejos.",
        tiempo: "1-2 horas", costo: "Entrada gratis", psur: "10-15 min", min: "20-25 min",
        tip: "Está cerca de la zona de Minerva/Americana, buena opción de paso.",
        x: 46, y: 64,
      },
      {
        nombre: "La Perla", emoji: "🛒", foto: "/images/laperla.jpg",
        descripcion: "Centro comercial con arquitectura distintiva, tiendas y entretenimiento.",
        porQue: "Otra opción moderna para compras y comida en un mismo lugar.",
        tiempo: "1-2 horas", costo: "Entrada gratis", psur: "20-25 min", min: "15-20 min",
        tip: "Buena opción si buscan cine o entretenimiento además de tiendas.",
        direccion: "Centro de Vida La Perla, Av. Mariano Otero 3000, Zapopan, Jalisco",
        x: 50, y: 60,
      },
      {
        nombre: "Punto Sur", emoji: "🏬", foto: "/images/puntosur.webp",
        descripcion: "Desarrollo comercial y de oficinas al sur de la ciudad, con tiendas, restaurantes y cines — cerca de la zona de la boda.",
        porQue: "Buena opción de compras y comida si se están quedando en esa zona.",
        tiempo: "1-2 horas", costo: "Entrada gratis", psur: "5-10 min", min: "20-25 min",
        tip: "Aquí se encuentra el hotel Aloft Guadalajara — ideal para resolver compras o comida sin alejarse de la zona de hospedaje.",
        x: 50, y: 76,
      },
    ],
  },
  {
    categoria: "Naturaleza",
    color: "verde",
    icon: Trees,
    lugares: [
      {
        nombre: "Bosque Los Colomos", emoji: "🌲", foto: "/images/COLOMOS.jpg", favorito: true,
        descripcion: "El pulmón verde de Guadalajara: bosque urbano con jardín japonés y senderos.",
        porQue: "Un respiro de naturaleza sin salir de la ciudad.",
        tiempo: "1.5-2 horas", costo: "Gratis", psur: "25-30 min", min: "10-15 min",
        tip: "El jardín japonés es la joya del parque, no se lo salten.",
        x: 42, y: 24,
      },
      {
        nombre: "Mirador Barranca de Huentitán", emoji: "🏞️", foto: "/images/barranca.jpg",
        descripcion: "Mirador con vista impresionante al cañón del Río Santiago.",
        porQue: "El paisaje natural más dramático dentro de la ciudad.",
        tiempo: "1-1.5 horas", costo: "Gratis", psur: "45-55 min", min: "30-40 min",
        tip: "Ideal para atardecer, lleven agua si van a caminar por el sendero.",
        x: 60, y: 12,
      },
    ],
  },
  {
    categoria: "Entretenimiento",
    color: "rosa",
    icon: Ticket,
    lugares: [
      {
        nombre: "Estadio Akron", emoji: "⚽", foto: "/images/estadioakron.jpg",
        descripcion: "Casa de las Chivas, uno de los estadios más modernos de México y sede de la Copa Mundial de la FIFA 2026.",
        porQue: "Vivir un partido de fútbol mexicano en un estadio de primer nivel.",
        tiempo: "3+ horas (día de partido)", costo: "Según boletaje", psur: "15-20 min", min: "25-30 min",
        tip: "Revisen el calendario de Liga MX (o del Mundial) antes de su viaje, solo aplica si hay partido.",
        x: 28, y: 50,
      },
      {
        nombre: "Estadio Jalisco", emoji: "🏟️", foto: "/images/estadiojalisco.jpg",
        descripcion: "Estadio histórico, sede de finales de Copa del Mundo y casa del Atlas.",
        porQue: "Historia futbolística mexicana en un recinto icónico.",
        tiempo: "3+ horas (día de partido)", costo: "Según boletaje", psur: "35-40 min", min: "15-20 min",
        tip: "También aplica solo si coincide con un partido durante su estancia.",
        x: 52, y: 52,
      },
      {
        nombre: "Zoológico Guadalajara", emoji: "🦁", foto: "/images/zoologico.jpg",
        descripcion: "Uno de los zoológicos más grandes de México, con áreas de safari.",
        porQue: "Muy buena opción si viajan con niños.",
        tiempo: "3-4 horas", costo: "~$150-250 MXN", psur: "35-45 min", min: "20-25 min",
        tip: "Lleguen temprano, es grande y se disfruta más con calma.",
        x: 66, y: 20,
      },
      {
        nombre: "Acuario Michin", emoji: "🐠", foto: "/images/acuariomichin.jpg", favorito: true,
        descripcion: "Acuario moderno con especies de todo el mundo, junto al Zoológico.",
        porQue: "Se puede combinar con la visita al zoológico el mismo día.",
        tiempo: "1.5-2 horas", costo: "~$200-280 MXN", psur: "35-45 min", min: "20-25 min",
        tip: "Compren boleto combinado con el zoológico si van a hacer ambos.",
        x: 67, y: 21,
      },
      {
        nombre: "Lucha Libre — Martes de Glamour", emoji: "🤼", foto: "/images/luchalibre.jpg", favorito: true,
        descripcion: "Función semanal de lucha libre tradicional en la Arena Coliseo, solo los martes, con el ambiente clásico tapatío de arena de barrio.",
        porQue: "Una experiencia muy mexicana y llena de color, ideal para una noche distinta.",
        tiempo: "2-3 horas (solo martes por la noche)", costo: "Boletos desde ~$150-400 MXN aprox.", psur: "20-30 min", min: "15-20 min",
        tip: "Compren los boletos con anticipación, se llena rápido — es tradición desde hace décadas en Guadalajara.",
        direccion: "Arena Coliseo, Guadalajara, Jalisco",
        x: 55, y: 46,
      },
    ],
  },
  {
    categoria: "Excursiones (1 día)",
    color: "dorado",
    icon: Car,
    esEdge: true,
    lugares: [
      { nombre: "Cantaritos El Güero (Amatitán)", emoji: "🍹", foto: "/images/cantaritos.jpg", favorito: true, descripcion: "Parada clásica en el trayecto a Tequila, famosa por su cantarito tradicional.", porQue: "Una parada icónica que complementa perfecto la ruta del tequila — queda de camino en coche.", tiempo: "45 min - 1 hora", costo: "~$100-150 MXN por cantarito", psur: "1h - 1h 15min", min: "50 min - 1h 10min", tip: "Solo aplica si van manejando: el José Cuervo Express no hace parada aquí.", direccion: "Amatitán, Jalisco", edgeSide: "left", edgeY: 28 },
      { nombre: "Centro de Tequila", emoji: "🥃", foto: "/images/centrotequila.jpeg", descripcion: "Pueblo mágico cuna del tequila, rodeado de agavales Patrimonio de la Humanidad.", porQue: "La excursión imperdible: recorrido del pueblo, fábrica, campos de agave y cata.", tiempo: "Día completo", costo: "Tour desde ~$800-1,500 MXN por persona", psur: "1h 15min - 1h 30min", min: "1h - 1h 15min", tip: "Recomendado ir manejando o en tren. Los tours (fábrica, campos de agave, cata, Tour José Cuervo) se pueden tomar ya en Tequila o reservar previamente.", direccion: "Centro, Tequila, Jalisco", edgeSide: "left", edgeY: 38 },
      { nombre: "José Cuervo Express", emoji: "🚂", foto: "/images/josecuervoexpress.jpg", descripcion: "Tren turístico que viaja de Guadalajara a Tequila con shows, catas y mariachi a bordo.", porQue: "Una forma distinta y muy divertida de llegar a Tequila, ideal para ir en grupo sin manejar.", tiempo: "Día completo (tour de todo el día)", costo: "Desde ~$3,000-4,500 MXN por persona (paquete todo incluido)", psur: "20-25 min a la estación", min: "15-20 min a la estación", tip: "Reserven con anticipación, es una experiencia muy popular y se agota rápido. No hace parada en Amatitán.", direccion: "Estación José Cuervo Express, Guadalajara, Jalisco", edgeSide: "left", edgeY: 48 },
      { nombre: "Lago de Chapala", emoji: "🚤", foto: "/images/lagochapala.jpg", descripcion: "El lago más grande de México, con pueblos ribereños tranquilos.", porQue: "Paisaje distinto: lago, malecón y ambiente relajado fuera de la ciudad.", tiempo: "Medio día - día completo", costo: "Gratis el paseo (comidas aparte)", psur: "45-55 min", min: "1h - 1h 10min", tip: "Se puede combinar con Ajijic el mismo día.", dondeComer: ["La Paceña"], direccion: "Centro, Chapala, Jalisco", edgeSide: "bottom", edgeY: 65 },
      { nombre: "Ajijic", emoji: "🎨", foto: "/images/ajijic.jpg", favorito: true, descripcion: "Pueblo con encanto a orillas de Chapala, calles empedradas y galerías de arte.", porQue: "Uno de los pueblos con más carácter cerca de Guadalajara.", tiempo: "3-4 horas", costo: "Gratis caminar", psur: "50 min - 1h", min: "1h - 1h 15min", tip: "Combínenlo con Chapala, están a 10-15 minutos uno del otro.", dondeComer: ["La Paceña"], direccion: "Ajijic, Jalisco", edgeSide: "bottom", edgeY: 80 },
    ],
  },
  {
    categoria: "Escapadas",
    color: "anil",
    icon: Mountain,
    esEdge: true,
    lugares: [
      { nombre: "Tapalpa", emoji: "🌲", foto: "/images/tapalpa.jpeg", favorito: true, descripcion: "Pueblo mágico de montaña, con clima fresco, arquitectura de teja y adobe, y las famosas Piedrotas a las afueras del centro.", porQue: "Cambio de paisaje total: bosques de pino, ambiente de pueblo serrano y paisajes únicos como Las Piedrotas.", tiempo: "1-2 días (o día completo apretado)", costo: "Variable según hospedaje/actividades", psur: "2h - 2h 15min", min: "2h 15min - 2h 30min", tip: "Mejor hospedarse en cabañas para disfrutar el ambiente boscoso y hacer fogata en la noche.", dondeComer: ["Tamales de acelga (puestos locales del centro)"], direccion: "Tapalpa, Jalisco", edgeSide: "bottom", edgeY: 40 },
      { nombre: "Mazamitla", emoji: "🏔️", foto: "/images/mazamitla.jpg", descripcion: "Pueblo mágico de montaña con estilo alpino, cabañas y clima frío.", porQue: "Ambiente de 'pueblo de nieve' sin nieve, muy fotogénico.", tiempo: "1-2 días (o día completo apretado)", costo: "Variable según hospedaje/actividades", psur: "2h - 2h 20min", min: "2h 15min - 2h 35min", tip: "Lleven ropa abrigadora, las noches son frías incluso en temporadas templadas.", direccion: "Mazamitla, Jalisco", edgeSide: "bottom", edgeY: 52 },
      { nombre: "San Miguel el Alto", emoji: "🌾", foto: "/images/sanmiguelelalto.jpeg", descripcion: "Pueblo de Los Altos de Jalisco, con arquitectura característica y ambiente ranchero.", porQue: "Una cara distinta de Jalisco, menos turística y muy auténtica.", tiempo: "Día completo", costo: "Gratis caminar", psur: "1h 45min - 2h", min: "1h 40min - 1h 55min", tip: "Buena opción si ya conocen Tequila y Tlaquepaque y quieren algo menos común.", direccion: "San Miguel el Alto, Jalisco", edgeSide: "right", edgeY: 35 },
      { nombre: "Puerto Vallarta", emoji: "🏖️", foto: "/images/puertovallarta.jpg", favorito: true, descripcion: "Ciudad de playa en la costa del Pacífico, con malecón, Zona Romántica y mar abierto — justo al lado de Nuevo Vallarta (ya en Nayarit), que es más de resorts todo incluido y ambiente familiar, mientras que Puerto Vallarta tiene más vida de pueblo y vida nocturna.", porQue: "El cambio de paisaje más grande: playa y mar en vez de montaña o pueblo, con muy buena oferta de hoteles.", tiempo: "2-3 días (fin de semana largo)", costo: "Variable según hospedaje/actividades", psur: "3h 30min - 4h por autopista (o ~45 min en vuelo)", min: "3h 30min - 4h por autopista (o ~45 min en vuelo)", tip: "Hay vuelos directos y muy cortos desde Guadalajara si no quieren manejar; no se pierdan la Zona Romántica.", dondeComer: ["Tacón de Marlín (cerca del aeropuerto)"], direccion: "Puerto Vallarta, Jalisco", edgeSide: "right", edgeY: 55 },
    ],
  },
];

const GASTRONOMIA = [
  {
    categoria: "Cocina tradicional tapatía",
    color: "terracota",
    icon: ChefHat,
    lugares: [
      { nombre: "Karne Garibaldi", emoji: "🍲", foto: "/images/karnegaribaldi.jpg", favorito: true, sucursal: "Sucursal Mariano Otero o Garibaldi (Santa Tere)", direccion: "Karne Garibaldi, Av. Mariano Otero 3019, Zapopan, Jalisco", tipo: "Carne en su jugo", precio: "$$", porQue: "Guinness World Record al servicio más rápido; un clásico absoluto de Guadalajara.", idealPara: "Comida", nota: "Cadena con varias sucursales — recomendamos la de Mariano Otero o la de Garibaldi, en Santa Tere.", x: 58, y: 43 },
      { nombre: "Birriería El Chololo", emoji: "🐐", foto: "/images/chololo.jpeg", favorito: true, direccion: "Birriería El Chololo, Carretera Guadalajara-Chapala Km 17, Guadalajara, Jalisco", tipo: "Birria tapatía", precio: "$$$", porQue: "Lugar emblemático de Guadalajara — han comido ahí celebridades e incluso un Papa. Imperdible.", idealPara: "Desayuno o comida", x: 35, y: 33 },
      { nombre: "Birriería Las 9 Esquinas", emoji: "🍽️", foto: "/images/9esquinas.jpg", favorito: true, direccion: "Birriería Las 9 Esquinas, Plaza de las Nueve Esquinas, Guadalajara, Jalisco", tipo: "Birria tradicional del Centro", precio: "$$", porQue: "Ubicada en un barrio con mucho carácter histórico, buena relación calidad-ambiente.", idealPara: "Desayuno o comida", x: 60, y: 48 },
      { nombre: "La Chata", emoji: "🍜", foto: "/images/lachata.jpeg", favorito: true, direccion: "La Chata de Guadalajara, Av. Terranova 405, Providencia, Guadalajara, Jalisco", tipo: "Cocina tapatía", precio: "$$", porQue: "Pozole blanco imperdible; recomendamos la sucursal Terranova para evitar las filas del Centro.", idealPara: "Comida", x: 56, y: 44 },
      { nombre: "Santo Coyote", emoji: "🌵", foto: "/images/santocoyote.jpg", tipo: "Restaurante mexicano — buffet de desayuno, carta de comida y cena", precio: "$$$", porQue: "Excelente calidad, aunque es de los más caros; agregamos ambas sucursales en la búsqueda.", idealPara: "Cena especial", x: 44, y: 37 },
      { nombre: "Casa Luna", emoji: "🌙", favorito: true, direccion: "Restaurante Casa Luna, San Pedro Tlaquepaque, Jalisco", tipo: "Cocina mexicana contemporánea, en Tlaquepaque Centro", precio: "$$$", porQue: "Ambiente artesanal y romántico, con una decoración imperdible.", idealPara: "Comida o cena", x: 42, y: 36 },
    ],
  },
  {
    categoria: "Tortas ahogadas",
    color: "dorado",
    icon: Sandwich,
    lugares: [
      { nombre: "Tortas Toño", emoji: "🥪", foto: "/images/tortastono.jpeg", favorito: true, tipo: "Tortas ahogadas", precio: "$", porQue: "Nació en Providencia en 1990 y es la marca líder de torta ahogada en la ciudad.", idealPara: "Antojo o comida rápida", nota: "Tiene muchas sucursales por toda la ciudad — este link busca todas las opciones cercanas.", x: 47, y: 32 },
      { nombre: "Tortas Alex Co", emoji: "🥪", tipo: "Tortas", foto: "/images/tortaahogada.jpg", precio: "$", porQue: "Otra opción muy recomendada por locales para una torta contundente.", idealPara: "Antojo o comida rápida", x: 48, y: 34 },
      { nombre: "Lonches", emoji: "🥪", foto: "/images/lonches.jpeg", tipo: "Lonches (versión más pequeña y sencilla de la torta, típica de puestos y loncherías tapatías)", precio: "$", porQue: "Un antojo rápido y muy tapatío, más ligero que una torta completa.", idealPara: "Antojo o desayuno rápido", nota: "Algunos ejemplos populares: Karlos, El Pesebre y Gemma.", x: 46, y: 35 },
    ],
  },
  {
    categoria: "Tacos",
    color: "rosa",
    icon: Soup,
    lugares: [
      { nombre: "Tacos El Ranchero", emoji: "🌮", foto: "/images/tacosranchero.jpg", tipo: "Barbacoa tradicional", precio: "$", porQue: "Cadena con muchas sucursales por la ciudad, especializada en barbacoa tradicional.", idealPara: "Antojo / desayuno", x: 44, y: 42 },
      { nombre: "Tacos Juan", emoji: "🌮", foto: "/images/tacosjuan.jpeg", favorito: true, direccion: "Tacos Juan, Santa Teresita, Guadalajara, Jalisco", tipo: "Barbacoa tradicional", precio: "$", porQue: "Favorito local de barrio, en Santa Tere.", idealPara: "Desayuno", x: 45, y: 40 },
      { nombre: "Tacos Don Miguelón", emoji: "🌮", foto: "/images/donmiguelon.jpeg", tipo: "Tacos de carne asada", precio: "$", porQue: "Recomendado para cena, pero solo si ya están por la zona.", idealPara: "Cena (si están por la zona)", x: 46, y: 38 },
      { nombre: "Los Alteños", emoji: "🌮", foto: "/images/losaltenos.jpg", favorito: true, direccion: "Los Alteños, Av. Cubilete, Chapalita Sur, Zapopan, Jalisco", tipo: "Taquería tradicional nocturna", precio: "$", porQue: "Muy recomendada; también tienen agua de frutas. Está en zona caminable y hay mucha gente por las noches — buena señal.", idealPara: "Antojo / cena", x: 50, y: 42 },
      { nombre: "Super Taco Tomás", emoji: "🌮", foto: "/images/supertacotomas.jpg", tipo: "Tacos de lengua", precio: "$", porQue: "Un poco caros pero imperdibles; están cerca de la zona de Minerva/Americana.", idealPara: "Antojo", x: 44, y: 44 },
      { nombre: "Tacos Guadalupe (Tacos Sinaloa)", emoji: "🍤", foto: "/images/tacos guadalupe.webp", direccion: "Tacos Guadalupe estilo Sinaloa, Av. Guadalupe, Arcos de Guadalupe, Zapopan, Jalisco", tipo: "Tacos estilo Sinaloa", precio: "$", porQue: "Estilo norteño de taco, buena variante dentro de la escena tapatía. Link a la sucursal mejor calificada.", idealPara: "Antojo / cena", x: 48, y: 45 },
    ],
  },
  {
    categoria: "Mariscos",
    color: "anil",
    icon: Fish,
    lugares: [
      { nombre: "El Dorado (San Agustín)", emoji: "🦐", foto: "/images/eldorado.jpeg", favorito: true, direccion: "Mariscos El Dorado, Av. López Mateos Sur, San Agustín, Tlajomulco de Zúñiga, Jalisco", tipo: "Mariscos", precio: "$$", porQue: "Recomendado el camarón zarandeado y los tacos de frijol; está cerca de Punto Sur.", idealPara: "Comida", x: 78, y: 68 },
      { nombre: "Taco Fish La Paz", emoji: "🐟", foto: "/images/tacofishlapaz.jpeg", tipo: "Tacos de mariscos estilo Baja", precio: "$", porQue: "Muy popular por sus tacos de pescado y camarón estilo Baja California.", idealPara: "Comida / antojo", x: 44, y: 39 },
      { nombre: "Campomar", emoji: "🦞", foto: "/images/campomar.jpg", favorito: true, tipo: "Mariscos — ambiente de restaurante", precio: "$$", porQue: "Muy popular; tienen sucursal en Punto Sur.", idealPara: "Comida", x: 40, y: 42 },
      { nombre: "Ponte Trucha Negro", emoji: "🍤", foto: "/images/pontetruchanegro.jpg", tipo: "Mariscos / tacos de mariscos", precio: "$$", porQue: "Otra opción popular de mariscos con buen sazón.", idealPara: "Comida / antojo", x: 41, y: 44 },
      { nombre: "La Paceña", emoji: "🐟", foto: "/images/lapacena.jpg", direccion: "La Paceña, Ajijic, Jalisco", tipo: "Mariscos", precio: "$$", porQue: "Muy recomendado en Ajijic, buena parada si están explorando la zona de Chapala.", idealPara: "Comida", x: 18, y: 96 },
    ],
  },
  {
    categoria: "Cafés y desayunos",
    color: "verde",
    icon: Coffee,
    lugares: [
      { nombre: "Terrible Juan Café", emoji: "☕", foto: "/images/terriblejuan.jpg", tipo: "Café de especialidad", precio: "$$", porQue: "Buen café en ambiente relajado de Colonia Americana.", idealPara: "Desayuno", x: 43, y: 36 },
      { nombre: "Café Don Rogelio", emoji: "☕", foto: "/images/donrogelio.jpeg", tipo: "Café", precio: "$", porQue: "Opción clásica y accesible para un café rápido.", idealPara: "Desayuno / café", x: 45, y: 37 },
      { nombre: "Coco Café", emoji: "☕", foto: "/images/cococafe.jpeg", favorito: true, direccion: "Coco Café, Ramal de La Tijera 701, La Tijera, Tlajomulco de Zúñiga, Jalisco", tipo: "Café de especialidad", precio: "$$", porQue: "Excelente desayuno; no es el mejor lugar para trabajar, pero está cerca de Punto Sur.", idealPara: "Desayuno / café", x: 42, y: 38 },
      { nombre: "PalReal", emoji: "☕", foto: "/images/palreal.jpg", favorito: true, tipo: "Café de especialidad", precio: "$$", porQue: "Muy popular entre locales en Colonia Americana; no se pierdan el Toast de Pancita.", idealPara: "Desayuno / café", x: 43, y: 39 },
      { nombre: "Karmele", emoji: "🥐", foto: "/images/karmele.jpeg", tipo: "Panadería y café", precio: "$$", porQue: "Buena repostería europea con café de calidad.", idealPara: "Desayuno / merienda", x: 46, y: 36 },
      { nombre: "Cristina", emoji: "☕", foto: "/images/cristina.jpeg", direccion: "Restaurante Cristina, Av. Empresarios, Puerta de Hierro, Zapopan, Jalisco", tipo: "Café de especialidad", precio: "$$", porQue: "Ambiente agradable, buena opción de paso por la mañana.", idealPara: "Desayuno / café", x: 44, y: 34 },
      { nombre: "Alba Cocina Diversa", emoji: "🍽️", foto: "/images/alba.jpg", favorito: true, tipo: "Cocina de autor", precio: "$$$", porQue: "Propuesta contemporánea con producto local, muy bien valorada — no se pierdan sus conchas.", idealPara: "Desayuno / cena especial", x: 44, y: 34 },
    ],
  },
  {
    categoria: "Experiencias gastronómicas",
    color: "rosa",
    icon: PartyPopper,
    lugares: [
      { nombre: "Casa Bariachi", emoji: "🎉", foto: "/images/casabariachi.jpeg", favorito: true, direccion: "Casa Bariachi, Av. Ignacio L. Vallarta 2221, Guadalajara, Jalisco", tipo: "Mariachi en vivo + cocina mexicana", precio: "$$", porQue: "Ambiente festivo con mariachi en vivo, ideal para grupos grandes.", idealPara: "Cena en grupo", x: 42, y: 37 },
      { nombre: "La Estancia (Cenaduría Tradicional)", emoji: "🌃", foto: "/images/laestancia.jpeg", direccion: "Menudería Cenaduría La Estancia, Av. Terranova, Prados Providencia, Guadalajara, Jalisco", tipo: "Antojitos nocturnos", precio: "$", porQue: "Vivir la tradición tapatía de la 'cenaduría': pozole, enchiladas, sopes por la noche. Sucursales en Providencia y Guadalupe.", idealPara: "Cena informal", x: 58, y: 46 },
      { nombre: "Los Sencillitos", emoji: "🥩", foto: "/images/sencillitos.jpg", tipo: "Cortes argentinos", precio: "$$", porQue: "Ambiente relajado; bueno, bonito y barato, con excelente comida.", idealPara: "Comida o cena", x: 52, y: 40 },
      { nombre: "La Casa de los Platos", emoji: "🍽️", foto: "/images/casaplatos.jpeg", tipo: "Restaurante mexicano", precio: "$$$", porQue: "Ambiente casero para una comida completa.", idealPara: "Comida", x: 44, y: 35 },
    ],
  },
];
const PLATILLOS_TIPICOS = [
  { nombre: "Torta ahogada", emoji: "🥪", desc: "Torta de carnitas bañada en salsa de jitomate picante; el platillo más icónico de Guadalajara." },
  { nombre: "Carne en su jugo", emoji: "🍲", desc: "Caldo de carne de res picada con frijoles, tocino y cebolla, típico tapatío." },
  { nombre: "Birria", emoji: "🐐", desc: "Guiso de chivo o res en consomé de chiles y especias, se sirve en caldo o en tacos." },
  { nombre: "Jericalla", emoji: "🍮", desc: "Postre similar al flan pero con la superficie quemada, receta tradicional de conventos tapatíos." },
  { nombre: "Tejuino", emoji: "🥤", desc: "Bebida fría fermentada de maíz, servida con limón, sal y a veces nieve de limón." },
];

const INFO_UTIL = [
  { icon: Plane, color: "anil", titulo: "Aeropuerto Internacional de Guadalajara (GDL)", texto: "Ubicado al sur de la ciudad, a 20-30 min de Punto Sur y 35-45 min de Minerva/Americana según tráfico. Recomendamos Uber o taxi autorizado de la terminal." },
  { icon: TrafficCone, color: "terracota", titulo: "Tráfico", texto: "Las horas pico son de 7:30-9:30 am y 6:00-8:30 pm. Los trayectos pueden tardar hasta el doble en esos horarios. Planeen salidas con margen extra." },
  { icon: Car, color: "dorado", titulo: "Transporte", texto: "Uber es la opción más práctica para moverse por la ciudad. Si prefieren libertad para las excursiones, rentar un coche es buena opción. Para grupos grandes, una van con chofer es muy cómoda — si quieren contratar una para 15-20 personas, podemos conseguirles el contacto. El transporte público también funciona bien, solo eviten las horas pico." },
  { icon: CloudSun, color: "verde", titulo: "Clima", texto: "Guadalajara tiene clima templado todo el año. Sin embargo, Enero es el mes más frío, consideren abrigos y chamarras; los días son soleados y las noches frescas. Lleven ropa en capas." },
  { icon: ShieldCheck, color: "rosa", titulo: "Seguridad", texto: "Las zonas turísticas y de hospedaje recomendadas son seguras siguiendo precauciones normales de ciudad grande: usen Uber/taxi autorizado de noche, eviten mostrar objetos de valor y estén atentos en zonas concurridas." },
  { icon: Navigation, color: "anil", titulo: "Tiempos de trayecto", texto: "Guadalajara es una ciudad extensa. Como referencia, casi todo dentro de la ciudad toma entre 10 y 45 minutos; las excursiones de un día (Tequila, Chapala) toman de 1 a 1.5 horas por trayecto." },
];

const TABS = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "eventos", label: "Eventos", icon: Heart },
  { id: "hospedaje", label: "Hospedaje", icon: Hotel },
  { id: "quehacer", label: "Qué hacer", icon: Compass },
  { id: "gastronomia", label: "Gastronomía", icon: UtensilsCrossed },
  { id: "mapa", label: "Mapa", icon: MapIcon },
  { id: "infoutil", label: "Info útil", icon: Info },
];

const COLOR_HEX = {
  rosa: "#D6006D", terracota: "#C1502E", anil: "#1D3E6E", dorado: "#C98A1F", verde: "#3F7A4F",
};

/* ============================================================
   PRIMITIVE COMPONENTS
   ============================================================ */

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="section-header">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

function CategoryBlock({ categoria, color, icon: Icon, children }) {
  return (
    <div className="category-block">
      <div className={`category-title cat-${color}`}>
        <Icon size={20} strokeWidth={2.25} />
        <h3>{categoria}</h3>
      </div>
      <div className="card-grid">{children}</div>
    </div>
  );
}

function CardPhoto({ emoji, color, foto }) {
  const [failed, setFailed] = useState(false);
  if (foto && !failed) {
    return (
      <div className={`loteria-visual loteria-visual-photo cat-${color}`}>
        <img src={foto} alt="" loading="lazy" onError={() => setFailed(true)} />
        <span className="loteria-visual-badge loteria-visual-badge-small">
          <span className="emoji-big emoji-small" role="img" aria-hidden="true">{emoji || "✦"}</span>
        </span>
      </div>
    );
  }
  return (
    <div className={`loteria-visual cat-${color}`}>
      <span className="loteria-visual-badge">
        <span className="emoji-big" role="img" aria-hidden="true">{emoji || "✦"}</span>
      </span>
    </div>
  );
}

function PlaceCard({ p, color, icon: Icon }) {
  return (
    <div className={`loteria-card cat-${color}`}>
      {p.favorito && <span className="favorito-badge" title="Favorito">★</span>}
      <div className="loteria-top-banner">{p.nombre}</div>
      <div className="loteria-scallop" aria-hidden="true" />
      <CardPhoto emoji={p.emoji} color={color} foto={p.foto} />
      <div className="loteria-frame">
        <p className="loteria-desc">{p.descripcion}</p>
        <p className="loteria-porque"><Lightbulb size={14} strokeWidth={2.25} /> {p.porQue}</p>
        <div className="loteria-meta">
          <span><Clock size={13} /> {p.tiempo}</span>
          <span><DollarSign size={13} /> {p.costo}</span>
        </div>
        <div className="loteria-tiempos">
          <span>Desde Punto Sur: <b>{p.psur}</b></span>
          <span>Desde Minerva/Americana: <b>{p.min}</b></span>
        </div>
        <p className="loteria-tip">{p.tip}</p>
        {p.nota && <p className="loteria-nota">{p.nota}</p>}
        {p.dondeComer && (
          <div className="loteria-comer">
            <span className="loteria-comer-label">¿Dónde comer?</span>
            <ul>{p.dondeComer.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
        )}
        <a className="loteria-maps" href={mapsLink(p.nombre, p.direccion)} target="_blank" rel="noopener noreferrer">
          <MapPin size={14} /> Ver en Google Maps
        </a>
      </div>
    </div>
  );
}

function RestaurantCard({ r, color, icon: Icon }) {
  return (
    <div className={`loteria-card compact cat-${color}`}>
      {r.favorito && <span className="favorito-badge" title="Favorito">★</span>}
      <div className="loteria-top-banner">{r.nombre}</div>
      <div className="loteria-scallop" aria-hidden="true" />
      <CardPhoto emoji={r.emoji} color={color} foto={r.foto} />
      <div className="loteria-frame">
        {r.sucursal && <p className="loteria-sucursal"><MapPin size={12} /> {r.sucursal}</p>}
        <p className="loteria-desc">{r.tipo}</p>
        <p className="loteria-porque"><Lightbulb size={14} strokeWidth={2.25} /> {r.porQue}</p>
        {r.nota && <p className="loteria-nota">{r.nota}</p>}
        <div className="loteria-meta">
          <span className="precio">{r.precio}</span>
          <span>{r.idealPara}</span>
        </div>
        <a className="loteria-maps" href={mapsLink(r.nombre, r.direccion)} target="_blank" rel="noopener noreferrer">
          <MapPin size={14} /> Ver en Google Maps
        </a>
      </div>
    </div>
  );
}

/* ============================================================
   SECTIONS
   ============================================================ */

function InicioSection({ go }) {
  return (
    <div className="inicio">
      <div className="hero">
        <span className="hero-eyebrow"><PartyPopper size={16} /> Con motivo de nuestra boda</span>
        <h1>Guía de Experiencias en Guadalajara</h1>
        <p className="hero-sub">

  Nuestros lugares favoritos.

  <br />

  María José y Joaquín Roberto

</p>
      </div>

      <div className="hero-perfora" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => <span key={i} />)}
      </div>

      <div className="inicio-grid">
        {TABS.filter((t) => t.id !== "inicio").map((t) => (
          <button key={t.id} className="inicio-card" onClick={() => go(t.id)}>
            <t.icon size={28} strokeWidth={2} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function HospedajeSection() {
  return (
    <div>
      <SectionHeader eyebrow="Dónde quedarse" title="Zonas de hospedaje" subtitle="Dos zonas recomendadas, cada una con ventajas distintas." />

      <div className="aviso-card">
        <Info size={16} strokeWidth={2.25} />
        <p>{HOSPEDAJE_AVISO}</p>
      </div>

      <div className="zonas-grid">
        {ZONAS_HOSPEDAJE.map((z) => (
          <div key={z.nombre} className="zona-card">
            <h3>{z.nombre}</h3>
            <p className="zona-resumen">{z.resumen}</p>
            {z.hotelFoto && <img className="zona-hotel-foto" src={z.hotelFoto} alt="" loading="lazy" />}
            <div className="zona-hotel">
              <Hotel size={14} strokeWidth={2.25} />
              <div className="zona-hotel-info">
                <span className="zona-hotel-label">Hotel sugerido</span>
                <a className="zona-hotel-nombre" href={mapsLink(z.hotelSugerido, z.hotelDireccion)} target="_blank" rel="noopener noreferrer">{z.hotelSugerido}</a>
              </div>
            </div>
            <div className="zona-cols">
              <div><span className="zona-label pros">A favor</span><ul>{z.pros.map((p) => <li key={p}>{p}</li>)}</ul></div>
              <div><span className="zona-label contras">Considerar</span><ul>{z.contras.map((p) => <li key={p}>{p}</li>)}</ul></div>
            </div>
            <p className="zona-ideal"><Star size={14} /> {z.idealPara}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventosSection() {
  return (
    <div>
      <SectionHeader eyebrow="Con motivo de nuestra boda" title="Eventos de la boda" subtitle="Fechas y sedes de nuestra celebración — los iremos actualizando conforme se confirmen los detalles." />
      <div className="card-grid">
        {EVENTOS_BODA.map((e) => {
          const Icon = e.icon;
          return (
            <div key={e.nombre} className={`loteria-card cat-${e.color}`}>
              <div className="loteria-top-banner">{e.nombre}</div>
              <div className="loteria-scallop" aria-hidden="true" />
              <CardPhoto emoji={e.emoji} color={e.color} foto={e.foto} />
              <div className="loteria-frame">
                <span className="evento-detalle">{e.categoria}</span>
                <p className="loteria-desc">{e.detalle}</p>
                <div className="loteria-meta">
                  <span><Clock size={13} /> {e.fecha}</span>
                </div>
                <p className="loteria-tip"><MapPin size={13} style={{ display: "inline", marginRight: 4 }} />{e.zona}</p>
                {e.nota && <p className="loteria-nota">{e.nota}</p>}
                {e.direccion && (
                  <a className="loteria-maps" href={mapsLink(e.nombre, e.direccion)} target="_blank" rel="noopener noreferrer">
                    <MapPin size={14} /> Ver en Google Maps
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QueHacerSection() {
  return (
    <div>
      <SectionHeader eyebrow="Actividades y experiencias" title="Qué hacer en Guadalajara" subtitle="Organizado por tipo de experiencia, de cultura a escapadas de fin de semana." />
      {QUE_HACER.map((cat) => (
        <CategoryBlock key={cat.categoria} categoria={cat.categoria} color={cat.color} icon={cat.icon}>
          {cat.lugares.map((p) => <PlaceCard key={p.nombre} p={p} color={cat.color} icon={cat.icon} />)}
        </CategoryBlock>
      ))}
      <p className="favoritos-nota">★ <b>Marcados con estrella:</b> nuestros lugares favoritos, los que más recomendamos.</p>
    </div>
  );
}

function GastronomiaSection() {
  return (
    <div>
      <SectionHeader eyebrow="Para comer y beber" title="Gastronomía" subtitle="De tacos de banqueta a cocina de autor: lo mejor de la mesa tapatía." />
      {GASTRONOMIA.map((cat) => (
        <CategoryBlock key={cat.categoria} categoria={cat.categoria} color={cat.color} icon={cat.icon}>
          {cat.lugares.map((r) => <RestaurantCard key={r.nombre} r={r} color={cat.color} icon={cat.icon} />)}
        </CategoryBlock>
      ))}
      <p className="favoritos-nota">★ <b>Marcados con estrella:</b> nuestros lugares favoritos, los que más recomendamos.</p>
      <div className="platillos-block">
        <div className="category-title cat-dorado"><ChefHat size={20} strokeWidth={2.25} /><h3>Platillos típicos que deben probar</h3></div>
        <div className="platillos-grid">
          {PLATILLOS_TIPICOS.map((pl) => (
            <div key={pl.nombre} className="platillo-card"><h4>{pl.nombre}</h4><p>{pl.desc}</p></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoUtilSection() {
  return (
    <div>
      <SectionHeader eyebrow="Antes de llegar" title="Información útil" subtitle="Lo esencial para moverse por la ciudad sin sorpresas." />
      <div className="info-grid">
        {INFO_UTIL.map((it) => (
          <div key={it.titulo} className={`info-card cat-${it.color}`}>
            <div className="info-icon"><it.icon size={22} strokeWidth={2} /></div>
            <h3>{it.titulo}</h3>
            <p>{it.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- MAPA ---------- */

function buildMapItems(mode) {
  const items = [];
  if (mode === "actividades") {
    QUE_HACER.forEach((cat) => {
      cat.lugares.forEach((l) => {
        items.push({ ...l, color: cat.color, icon: cat.icon, categoria: cat.categoria, tipo: "actividad" });
      });
    });
  } else {
    GASTRONOMIA.forEach((cat) => {
      cat.lugares.forEach((l) => {
        items.push({ ...l, color: cat.color, icon: cat.icon, categoria: cat.categoria, tipo: "restaurante" });
      });
    });
  }
  return items;
}

function MapaSection() {
  const [mode, setMode] = useState("actividades");
  const [selected, setSelected] = useState(null);
  const items = buildMapItems(mode);
  const centerItems = items.filter((i) => !i.edgeSide);
  const edgeItems = items.filter((i) => i.edgeSide);

  return (
    <div>
      <SectionHeader eyebrow="Referencia visual" title="Mapa de la ciudad" subtitle="Un mapa real de Guadalajara para orientarse, y un mapa ilustrado por categoría para explorar cada lugar." />

      <div className="map-real-wrap">
        <iframe
          className="map-real-frame"
          title="Mapa de Guadalajara"
          src="https://www.google.com/maps?q=Guadalajara,Jalisco&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a className="map-real-fallback" href="https://www.google.com/maps/search/?api=1&query=Guadalajara+Jalisco" target="_blank" rel="noopener noreferrer">
        <MapPin size={14} /> Si el mapa de arriba no se ve, ábrelo directo en Google Maps
      </a>

      <p className="map-legend" style={{ marginTop: 22 }}>Explora por categoría — toca un pin y luego "Ver en Google Maps" para abrir la ubicación exacta:</p>

      <div className="map-toggle">
        <button className={mode === "actividades" ? "active" : ""} onClick={() => { setMode("actividades"); setSelected(null); }}>
          <Compass size={15} /> Actividades
        </button>
        <button className={mode === "restaurantes" ? "active" : ""} onClick={() => { setMode("restaurantes"); setSelected(null); }}>
          <UtensilsCrossed size={15} /> Restaurantes
        </button>
      </div>

      <div className="map-wrap">
        <svg className="map-bg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <rect x="0" y="0" width="100" height="100" fill="var(--crema)" />

          {/* Anillo Periférico + avenidas principales (esquemático) */}
          <circle cx="50" cy="42" r="34" fill="none" stroke="#E7D7BE" strokeWidth="0.4" strokeDasharray="1.2 1.2" />
          <path d="M 10 42 H 90 M 50 5 V 85" stroke="#E7D7BE" strokeWidth="0.3" />
          <text x="66" y="75.5" textAnchor="middle" className="map-road-label">ANILLO PERIFÉRICO</text>
          <text x="30" y="41" textAnchor="middle" className="map-road-label">AV. VALLARTA</text>
          <text x="51.6" y="61" className="map-road-label">AV. LÓPEZ MATEOS</text>

          {/* Zonas / colonias */}
          <ellipse cx="24" cy="19" rx="13" ry="10" fill="#EFE0C4" opacity="0.7" />
          <ellipse cx="44" cy="37" rx="13" ry="10" fill="#F3D9DE" opacity="0.6" />
          <ellipse cx="58" cy="45" rx="11" ry="9" fill="#D9E1EC" opacity="0.7" />
          <ellipse cx="63" cy="41" rx="6.5" ry="5" fill="#F6E6C8" opacity="0.6" />
          <ellipse cx="74" cy="63" rx="12" ry="9" fill="#E9D9C8" opacity="0.7" />
          <ellipse cx="86" cy="58" rx="9" ry="7" fill="#DCE8DC" opacity="0.6" />
          <ellipse cx="50" cy="77" rx="12" ry="8" fill="#F0D8E4" opacity="0.55" />
          <ellipse cx="66" cy="19" rx="9" ry="7" fill="#DCE8DC" opacity="0.5" />
          <ellipse cx="27" cy="50" rx="8" ry="6.5" fill="#F3D9DE" opacity="0.45" />

          <text x="24" y="10" className="map-zone-label">ZAPOPAN / ANDARES</text>
          <text x="44" y="27" className="map-zone-label">MINERVA / AMERICANA</text>
          <text x="58" y="35" className="map-zone-label">CENTRO HISTÓRICO</text>
          <text x="63" y="37.5" className="map-zone-label">SANTA TERE</text>
          <text x="74" y="53" className="map-zone-label">TLAQUEPAQUE</text>
          <text x="86" y="49" className="map-zone-label">TONALÁ</text>
          <text x="50" y="90" className="map-zone-label">PUNTO SUR</text>
          <text x="66" y="10" className="map-zone-label">ZOOLÓGICO / MICHIN</text>
          <text x="27" y="42" className="map-zone-label">ESTADIO AKRON</text>

          {/* Catedral + Hospicio Cabañas (Centro Histórico) */}
          <g transform="translate(59,44)" opacity="0.4">
            <rect x="-2.4" y="-3.4" width="1.1" height="3.4" fill="var(--anil)" />
            <rect x="1.3" y="-3.4" width="1.1" height="3.4" fill="var(--anil)" />
            <polygon points="-2.4,-3.4 -1.85,-5.2 -1.3,-3.4" fill="var(--anil)" />
            <polygon points="1.3,-3.4 1.85,-5.2 2.4,-3.4" fill="var(--anil)" />
            <rect x="-1.3" y="-2" width="2.6" height="2" fill="var(--anil)" />
          </g>

          {/* Máscara de luchador — Teatro Degollado / Arena Coliseo (Lucha Libre) */}
          <g transform="translate(55.5,47.5)" opacity="0.4">
            <path d="M -1.6,-1.6 Q 0,-2.6 1.6,-1.6 L 1.6,0.6 Q 0,1.8 -1.6,0.6 Z" fill="var(--rosa)" />
            <polygon points="-0.9,-1 -0.3,-1 -0.6,-0.2" fill="var(--crema)" />
            <polygon points="0.3,-1 0.9,-1 0.6,-0.2" fill="var(--crema)" />
          </g>

          {/* Mercado San Juan de Dios */}
          <g transform="translate(62,46.5)" opacity="0.4">
            <path d="M -1.8,0 L -1.2,-1.4 L 1.2,-1.4 L 1.8,0 Z" fill="var(--terracota)" />
            <line x1="-1.8" y1="0" x2="1.8" y2="0" stroke="var(--terracota)" strokeWidth="0.3" />
            <line x1="-1.2" y1="-1.4" x2="-0.6" y2="0" stroke="var(--crema)" strokeWidth="0.2" />
            <line x1="0" y1="-1.4" x2="0" y2="0" stroke="var(--crema)" strokeWidth="0.2" />
            <line x1="1.2" y1="-1.4" x2="0.6" y2="0" stroke="var(--crema)" strokeWidth="0.2" />
          </g>

          {/* Bosque Los Colomos */}
          <g transform="translate(41,23)" opacity="0.45">
            <circle cx="-1" cy="-1.2" r="1.3" fill="var(--verde)" />
            <circle cx="1" cy="-1.4" r="1.5" fill="var(--verde)" />
            <circle cx="0" cy="-2.4" r="1.2" fill="var(--verde)" />
            <line x1="0" y1="-0.2" x2="0" y2="1.4" stroke="var(--verde)" strokeWidth="0.4" />
          </g>

          {/* Zoológico Guadalajara (huella) */}
          <g transform="translate(66,18.5)" opacity="0.4">
            <ellipse cx="0" cy="0.6" rx="1.1" ry="0.9" fill="var(--verde)" />
            <circle cx="-0.9" cy="-0.7" r="0.45" fill="var(--verde)" />
            <circle cx="-0.2" cy="-1.2" r="0.45" fill="var(--verde)" />
            <circle cx="0.5" cy="-1.2" r="0.45" fill="var(--verde)" />
            <circle cx="1.1" cy="-0.7" r="0.45" fill="var(--verde)" />
          </g>

          {/* Torres — zona financiera de Zapopan (Andares) */}
          <g transform="translate(19,14)" opacity="0.4">
            <rect x="-2.6" y="-2" width="1.3" height="3.4" fill="var(--dorado)" />
            <rect x="-1.1" y="-3.2" width="1.3" height="4.6" fill="var(--dorado)" />
            <rect x="0.4" y="-1.4" width="1.3" height="2.8" fill="var(--dorado)" />
          </g>

          {/* Barranca de Huentitán */}
          <g transform="translate(60,10.5)" opacity="0.4">
            <path d="M -3,1.5 L -1.6,-1 L -0.3,1 L 1,-1.6 L 2.4,0.8 L 3.6,-1.2" fill="none" stroke="var(--verde)" strokeWidth="0.45" strokeLinejoin="round" strokeLinecap="round" />
          </g>

          {/* Aeropuerto (GDL) */}
          <g transform="translate(50,88) rotate(-25)" opacity="0.45">
            <path d="M 0,-2 L 0.5,0 L 2.6,0.9 L 2.6,1.3 L 0.5,0.8 L 0.3,2.2 L 1,2.8 L 1,3.1 L 0,2.8 L -1,3.1 L -1,2.8 L -0.3,2.2 L -0.5,0.8 L -2.6,1.3 L -2.6,0.9 L -0.5,0 Z" fill="var(--anil)" />
          </g>

          {/* Estadio Akron y Estadio Jalisco */}
          <g transform="translate(28,49)" opacity="0.4">
            <ellipse cx="0" cy="0" rx="2.6" ry="1.6" fill="none" stroke="var(--rosa)" strokeWidth="0.5" />
            <ellipse cx="0" cy="0" rx="1.5" ry="0.9" fill="var(--rosa)" opacity="0.5" />
          </g>
          <g transform="translate(52,52)" opacity="0.35">
            <ellipse cx="0" cy="0" rx="1.8" ry="1.1" fill="none" stroke="var(--rosa)" strokeWidth="0.4" />
          </g>

          {/* Campos de agave — rumbo a Tequila / Amatitán (borde izquierdo) */}
          <g stroke="var(--dorado)" strokeWidth="0.45" strokeLinecap="round" opacity="0.5">
            <path d="M4,18 L3,15.4 M4,18 L4,14.8 M4,18 L5,15.4 M4,18 L3.4,15.1 M4,18 L4.6,15.1" />
            <path d="M4,55 L3,52.4 M4,55 L4,51.8 M4,55 L5,52.4 M4,55 L3.4,52.1 M4,55 L4.6,52.1" />
          </g>

          {/* Cerros — rumbo a Tapalpa / Mazamitla (borde inferior) */}
          <g fill="var(--anil)" opacity="0.4">
            <polygon points="42,99 46,93.5 50,99" />
            <polygon points="46.5,99 50,94.5 53.5,99" />
          </g>

          {/* Olas — rumbo al Lago de Chapala / Ajijic (borde inferior) */}
          <g fill="none" stroke="var(--anil)" strokeWidth="0.45" strokeLinecap="round" opacity="0.45">
            <path d="M 68,98.5 Q 69,97.3 70,98.5 T 72,98.5 T 74,98.5" />
            <path d="M 68,99.7 Q 69,98.6 70,99.7 T 72,99.7 T 74,99.7" opacity="0.7" />
          </g>

          {/* Trigo / Los Altos — rumbo a San Miguel el Alto (borde derecho) */}
          <g stroke="var(--dorado)" strokeWidth="0.4" strokeLinecap="round" opacity="0.5">
            <line x1="97" y1="22" x2="97" y2="18" />
            <line x1="95.6" y1="21" x2="97" y2="18" />
            <line x1="98.4" y1="21" x2="97" y2="18" />
          </g>

          {/* Sol y mar — rumbo a Puerto Vallarta (borde derecho) */}
          <g opacity="0.45">
            <circle cx="97" cy="66" r="1.4" fill="var(--dorado)" />
            <path d="M 94,71 Q 95,70 96,71 T 98,71 T 100,71" fill="none" stroke="var(--anil)" strokeWidth="0.4" strokeLinecap="round" />
          </g>

          {/* Rosa de los vientos */}
          <g transform="translate(93,6)" opacity="0.55">
            <circle cx="0" cy="0" r="3" fill="none" stroke="var(--tinta-suave)" strokeWidth="0.3" />
            <line x1="0" y1="-2.6" x2="0" y2="2.6" stroke="var(--tinta-suave)" strokeWidth="0.25" />
            <line x1="-2.6" y1="0" x2="2.6" y2="0" stroke="var(--tinta-suave)" strokeWidth="0.25" />
            <polygon points="0,-2.9 -0.6,-1.5 0.6,-1.5" fill="var(--tinta)" />
            <text x="0" y="-3.7" textAnchor="middle" className="map-road-label">N</text>
          </g>
        </svg>

        {centerItems.map((it, idx) => {
          const Icon = it.icon;
          const isSel = selected && selected.nombre === it.nombre;
          return (
            <button
              key={it.nombre + idx}
              className={`map-pin cat-${it.color} ${isSel ? "selected" : ""}`}
              style={{ left: `${it.x}%`, top: `${it.y}%` }}
              onClick={() => setSelected(it)}
              aria-label={it.nombre}
            >
              <Icon size={11} strokeWidth={2.5} />
            </button>
          );
        })}

        {ZONAS_HOSPEDAJE.map((z) => (
          <div key={z.nombre} className="map-pin-hotel" style={{ left: `${z.x}%`, top: `${z.y}%` }} title={z.nombre}>
            <Hotel size={12} strokeWidth={2.5} />
          </div>
        ))}

        {edgeItems.map((it, idx) => {
          const side = it.edgeSide;
          const style = side === "left" ? { left: "1%", top: `${it.edgeY}%` }
            : side === "right" ? { right: "1%", left: "auto", top: `${it.edgeY}%` }
            : { left: `${it.edgeY}%`, bottom: "1%", top: "auto" };
          return (
            <button
              key={it.nombre + idx}
              className={`map-edge-tag side-${side} cat-${it.color} ${selected && selected.nombre === it.nombre ? "selected" : ""}`}
              style={style}
              onClick={() => setSelected(it)}
            >
              {side === "left" && "← "}{it.nombre}{side === "right" && " →"}
              <span className="map-edge-time">{it.psur} desde Punto Sur</span>
            </button>
          );
        })}
      </div>

      <p className="map-legend"><Hotel size={13} /> = zonas de hospedaje &nbsp;•&nbsp; toca un pin para ver el detalle</p>

      {selected && (
        <div className="map-detail">
          <button className="map-detail-close" onClick={() => setSelected(null)}><X size={16} /></button>
          <span className={`map-detail-tag cat-${selected.color}`}>{selected.categoria}</span>
          <h3>{selected.nombre}</h3>
          <p>{selected.descripcion || selected.tipo}</p>
          {selected.porQue && <p className="map-detail-porque"><Lightbulb size={13} /> {selected.porQue}</p>}
          <a className="loteria-maps" href={mapsLink(selected.nombre, selected.direccion)} target="_blank" rel="noopener noreferrer">
            <MapPin size={14} /> Ver en Google Maps
          </a>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */

export default function App() {
  const [tab, setTab] = useState("inicio");

  return (
    <div className="app-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

        :root {
          --rosa: #D6006D; --terracota: #C1502E; --anil: #1D3E6E; --dorado: #C98A1F; --verde: #3F7A4F;
          --crema: #FBF1E3; --crema-card: #FFFDF7; --tinta: #2A1A14; --tinta-suave: #5C4A3F; --borde: #E7D7BE;
        }
        * { box-sizing: border-box; }
        .app-root { font-family: 'Work Sans', sans-serif; background: var(--crema); color: var(--tinta); min-height: 100vh; padding-bottom: 88px; -webkit-font-smoothing: antialiased; }
        .app-root :focus-visible { outline: 3px solid var(--anil); outline-offset: 2px; }
        h1, h2, h3, h4 { font-family: 'Fraunces', serif; margin: 0; }
        .content-wrap { max-width: 1080px; margin: 0 auto; padding: 28px 20px 20px; }

        /* ---------- HERO / INICIO ---------- */
        .hero { text-align: center; padding: 20px 8px 8px; }
        .hero-eyebrow { display: inline-flex; align-items: center; gap: 6px; font-family: 'Space Mono', monospace; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--rosa); background: #FCE3EE; padding: 6px 12px; border-radius: 999px; margin-bottom: 16px; }
        .hero h1 { font-size: clamp(28px, 5vw, 44px); font-weight: 600; line-height: 1.1; color: var(--tinta); margin-bottom: 10px; }
        .hero-sub { font-size: 16px; color: var(--terracota); font-weight: 600; margin: 0 0 18px; }
        .hero-copy { max-width: 560px; margin: 0 auto; font-size: 15.5px; line-height: 1.6; color: var(--tinta-suave); }
        .hero-perfora { display: flex; justify-content: center; gap: 10px; padding: 26px 0 6px; flex-wrap: wrap; }
        .hero-perfora span { width: 8px; height: 8px; border-radius: 50%; background: linear-gradient(135deg, var(--rosa), var(--dorado)); opacity: 0.55; }
        .hero-perfora span:nth-child(3n) { background: linear-gradient(135deg, var(--anil), var(--verde)); }
        .hero-perfora span:nth-child(4n) { background: var(--terracota); }

        .eventos-block { max-width: 640px; margin: 8px auto 30px; text-align: center; }
        .eventos-block .eyebrow { display: block; margin-bottom: 10px; }
        .eventos-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
        @media (min-width: 560px) { .eventos-grid { grid-template-columns: repeat(2, 1fr); } }
        .evento-card { display: flex; align-items: flex-start; gap: 10px; text-align: left; text-decoration: none; color: var(--tinta); background: var(--crema-card); border: 1.5px solid var(--borde); border-radius: 14px; padding: 14px 16px; transition: border-color 0.15s ease, transform 0.15s ease; }
        .evento-card:hover { border-color: var(--rosa); transform: translateY(-2px); }
        .evento-card svg { color: var(--rosa); flex-shrink: 0; margin-top: 3px; }
        .evento-detalle { font-family: 'Space Mono', monospace; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--terracota); }
        .evento-card h4 { font-size: 15.5px; margin: 3px 0 4px; }
        .evento-zona { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--tinta-suave); }

        .inicio-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-top: 14px; }
        @media (min-width: 640px) { .inicio-grid { grid-template-columns: repeat(3, 1fr); } }
        .inicio-card { display: flex; flex-direction: column; align-items: center; gap: 10px; background: var(--crema-card); border: 1.5px solid var(--borde); border-radius: 16px; padding: 22px 12px; cursor: pointer; font-family: 'Work Sans', sans-serif; font-size: 14px; font-weight: 600; color: var(--tinta); transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease; }
        .inicio-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(42,26,20,0.08); border-color: var(--rosa); }
        .inicio-card svg { color: var(--rosa); }

        /* ---------- SECTION HEADER ---------- */
        .section-header { margin-bottom: 24px; }
        .eyebrow { display: inline-block; font-family: 'Space Mono', monospace; font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--tinta-suave); margin-bottom: 6px; }
        .section-header h2 { font-size: clamp(24px, 3.4vw, 32px); font-weight: 600; }
        .section-subtitle { color: var(--tinta-suave); font-size: 14.5px; margin: 6px 0 0; }

        /* ---------- CATEGORY BLOCK ---------- */
        .category-block { margin-bottom: 34px; }
        .category-title { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 2px solid var(--borde); }
        .category-title h3 { font-size: 18px; font-weight: 600; }
        .category-title.cat-rosa svg { color: var(--rosa); }
        .category-title.cat-terracota svg { color: var(--terracota); }
        .category-title.cat-anil svg { color: var(--anil); }
        .category-title.cat-dorado svg { color: var(--dorado); }
        .category-title.cat-verde svg { color: var(--verde); }
        .card-grid { display: grid; grid-template-columns: 1fr; gap: 18px; }
        @media (min-width: 620px) { .card-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 980px) { .card-grid { grid-template-columns: repeat(3, 1fr); } }

        /* ---------- LOTERIA CARD (title on top) ---------- */
        .loteria-card { position: relative; border-radius: 14px; overflow: hidden; background: var(--crema-card); border: 2px solid var(--borde); display: flex; flex-direction: column; box-shadow: 0 2px 0 rgba(42,26,20,0.04); transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .loteria-card:hover { transform: translateY(-3px); box-shadow: 0 10px 22px rgba(42,26,20,0.10); }
        .favorito-badge { position: absolute; top: 10px; right: 10px; z-index: 5; width: 26px; height: 26px; border-radius: 50%; background: var(--dorado); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 14px; box-shadow: 0 2px 6px rgba(42,26,20,0.25); border: 1.5px solid var(--crema-card); }
        .favoritos-nota { display: flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--tinta-suave); margin: 4px 2px 0; }
        .favoritos-nota b { color: var(--dorado); }
        .loteria-top-banner { font-family: 'Fraunces', serif; font-weight: 600; font-size: 15.5px; text-align: center; padding: 12px 14px 10px; line-height: 1.25; }
        .loteria-scallop { height: 7px; background-image: radial-gradient(circle at 6px 0, transparent 6px, var(--crema-card) 6.5px); background-size: 12px 7px; background-repeat: repeat-x; }
        .loteria-visual { position: relative; height: 92px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .loteria-visual::before { content: ""; position: absolute; inset: 0; background-image: radial-gradient(currentColor 1.4px, transparent 1.6px); background-size: 15px 15px; opacity: 0.16; }
        .loteria-visual-photo::before { content: none; }
        .loteria-visual-photo { justify-content: flex-start; align-items: flex-start; background: var(--crema); }
        .loteria-visual-photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .loteria-visual-badge { position: relative; z-index: 1; width: 56px; height: 56px; border-radius: 50%; background: var(--crema-card); border: 2px solid currentColor; display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 8px rgba(42,26,20,0.14); }
        .loteria-visual-badge::after { content: ""; position: absolute; inset: 4px; border-radius: 50%; border: 1px solid currentColor; opacity: 0.35; }
        .loteria-visual-badge-small { position: absolute; top: 8px; left: 8px; width: 34px; height: 34px; z-index: 2; }
        .emoji-small { font-size: 15px; }
        .emoji-big { font-size: 26px; line-height: 1; }
        .loteria-card.compact .loteria-visual { height: 76px; }
        .loteria-card.compact .loteria-visual-badge { width: 46px; height: 46px; }
        .loteria-card.compact .emoji-big { font-size: 21px; }
        .cat-rosa .loteria-top-banner, .cat-rosa .loteria-visual-badge, .loteria-visual.cat-rosa { color: var(--rosa); }
        .cat-terracota .loteria-top-banner, .cat-terracota .loteria-visual-badge, .loteria-visual.cat-terracota { color: var(--terracota); }
        .cat-anil .loteria-top-banner, .cat-anil .loteria-visual-badge, .loteria-visual.cat-anil { color: var(--anil); }
        .cat-dorado .loteria-top-banner, .cat-dorado .loteria-visual-badge, .loteria-visual.cat-dorado { color: var(--dorado); }
        .cat-verde .loteria-top-banner, .cat-verde .loteria-visual-badge, .loteria-visual.cat-verde { color: var(--verde); }
        .loteria-visual.cat-rosa { background: linear-gradient(150deg, #FCE9F1, var(--crema-card)); }
        .loteria-visual.cat-terracota { background: linear-gradient(150deg, #FBEBE1, var(--crema-card)); }
        .loteria-visual.cat-anil { background: linear-gradient(150deg, #E6EBF3, var(--crema-card)); }
        .loteria-visual.cat-dorado { background: linear-gradient(150deg, #FAF0DA, var(--crema-card)); }
        .loteria-visual.cat-verde { background: linear-gradient(150deg, #E7F0E7, var(--crema-card)); }
        .loteria-card.cat-rosa { border-color: #F0BBD4; }
        .loteria-card.cat-terracota { border-color: #E8C3AE; }
        .loteria-card.cat-anil { border-color: #BFCEE0; }
        .loteria-card.cat-dorado { border-color: #ECD6A6; }
        .loteria-card.cat-verde { border-color: #C4DBC8; }
        .loteria-card.cat-rosa .loteria-top-banner { background: #FCE9F1; }
        .loteria-card.cat-terracota .loteria-top-banner { background: #FBEBE1; }
        .loteria-card.cat-anil .loteria-top-banner { background: #E6EBF3; }
        .loteria-card.cat-dorado .loteria-top-banner { background: #FAF0DA; }
        .loteria-card.cat-verde .loteria-top-banner { background: #E7F0E7; }
        .loteria-card.cat-rosa .loteria-photo-tint { background: var(--rosa); }
        .loteria-card.cat-terracota .loteria-photo-tint { background: var(--terracota); }
        .loteria-card.cat-anil .loteria-photo-tint { background: var(--anil); }
        .loteria-card.cat-dorado .loteria-photo-tint { background: var(--dorado); }
        .loteria-card.cat-verde .loteria-photo-tint { background: var(--verde); }

        .loteria-frame { padding: 16px 16px 14px; flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .loteria-desc { font-size: 14px; line-height: 1.5; color: var(--tinta); margin: 0; }
        .loteria-porque { display: flex; gap: 6px; font-size: 13px; line-height: 1.45; color: var(--tinta-suave); margin: 0; font-style: italic; }
        .loteria-porque svg { flex-shrink: 0; margin-top: 2px; color: var(--dorado); }
        .loteria-nota { font-size: 11.5px; line-height: 1.5; color: var(--tinta-suave); background: var(--crema); border-radius: 8px; padding: 6px 9px; margin: 0; }
        .loteria-sucursal { display: flex; align-items: center; gap: 4px; font-family: 'Space Mono', monospace; font-size: 11px; color: var(--terracota); margin: 0; text-transform: uppercase; letter-spacing: 0.03em; }
        .loteria-meta { display: flex; gap: 14px; font-size: 12.5px; color: var(--tinta-suave); font-family: 'Space Mono', monospace; flex-wrap: wrap; }
        .loteria-meta span { display: flex; align-items: center; gap: 4px; }
        .loteria-meta .precio { font-weight: 700; color: var(--terracota); }
        .loteria-tiempos { display: flex; flex-direction: column; gap: 2px; font-size: 12px; background: var(--crema); border-radius: 8px; padding: 8px 10px; color: var(--tinta-suave); }
        .loteria-tip { font-size: 12.5px; line-height: 1.5; color: var(--tinta-suave); margin: 0; border-left: 2px solid var(--borde); padding-left: 8px; }
        .loteria-comer { font-size: 12.5px; line-height: 1.5; color: var(--tinta); background: var(--crema); border-radius: 8px; padding: 8px 10px; }
        .loteria-comer-label { display: block; font-family: 'Space Mono', monospace; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--terracota); font-weight: 700; margin-bottom: 3px; }
        .loteria-comer ul { margin: 0; padding-left: 16px; }
        .loteria-maps { display: inline-flex; align-items: center; gap: 5px; font-size: 12.5px; font-weight: 600; color: var(--anil); text-decoration: none; margin-top: 2px; }
        .loteria-maps:hover { text-decoration: underline; }
        .loteria-card.compact .loteria-frame { gap: 6px; }

        /* ---------- HOSPEDAJE ---------- */
        .zonas-grid { display: grid; grid-template-columns: 1fr; gap: 18px; }
        @media (min-width: 720px) { .zonas-grid { grid-template-columns: repeat(2, 1fr); } }
        .zona-card { background: var(--crema-card); border: 2px solid var(--borde); border-radius: 16px; padding: 22px; }
        .zona-card h3 { font-size: 20px; margin-bottom: 6px; }
        .zona-resumen { font-size: 14px; color: var(--tinta-suave); margin: 0 0 16px; }
        .zona-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        .zona-label { display: block; font-family: 'Space Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; font-weight: 700; }
        .zona-label.pros { color: var(--verde); }
        .zona-label.contras { color: var(--terracota); }
        .zona-cols ul { margin: 0; padding-left: 16px; font-size: 13px; line-height: 1.6; color: var(--tinta); }
        .zona-ideal { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--rosa); margin: 0; padding-top: 12px; border-top: 1px solid var(--borde); }
        .zona-hotel { display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--tinta); background: var(--crema); border-radius: 8px; padding: 8px 10px; margin-bottom: 14px; }
        .zona-hotel-foto { width: 100%; height: 130px; object-fit: cover; border-radius: 10px; margin-bottom: 12px; display: block; }
        .zona-hotel-info { display: flex; flex-direction: column; gap: 1px; }
        .zona-hotel-label { font-family: 'Space Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--tinta-suave); }
        .zona-hotel-nombre { font-family: 'Fraunces', serif; font-weight: 600; font-size: 17px; color: var(--anil); text-decoration: none; }
        .zona-hotel-nombre:hover { text-decoration: underline; }
        .zona-hotel svg { color: var(--terracota); flex-shrink: 0; }

        .aviso-card { display: flex; align-items: flex-start; gap: 10px; background: #FAF0DA; border: 1.5px solid #ECD6A6; border-radius: 12px; padding: 12px 16px; margin-bottom: 18px; }
        .aviso-card svg { color: var(--dorado); flex-shrink: 0; margin-top: 1px; }
        .aviso-card p { font-size: 13px; line-height: 1.55; color: var(--tinta); margin: 0; }
        .aviso-card.aviso-trafico { background: #FBEBE1; border-color: #E8C3AE; margin-top: 20px; margin-bottom: 0; }
        .aviso-card.aviso-trafico svg { color: var(--terracota); }

        .map-real-wrap { width: 100%; border-radius: 16px; overflow: hidden; border: 2px solid var(--borde); }
        .map-real-frame { width: 100%; height: 320px; border: none; display: block; }
        .map-real-fallback { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--anil); text-decoration: none; margin-top: 8px; font-weight: 600; }
        .map-real-fallback:hover { text-decoration: underline; }

        /* ---------- PLATILLOS ---------- */
        .platillos-block { margin-top: 8px; }
        .platillos-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 640px) { .platillos-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 980px) { .platillos-grid { grid-template-columns: repeat(3, 1fr); } }
        .platillo-card { background: var(--crema-card); border: 1.5px solid var(--borde); border-radius: 12px; padding: 14px 16px; }
        .platillo-card h4 { font-size: 15px; margin-bottom: 4px; color: var(--terracota); }
        .platillo-card p { font-size: 13px; line-height: 1.5; color: var(--tinta-suave); margin: 0; }

        /* ---------- INFO UTIL ---------- */
        .info-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 640px) { .info-grid { grid-template-columns: repeat(2, 1fr); } }
        .info-card { background: var(--crema-card); border: 2px solid var(--borde); border-radius: 14px; padding: 20px; }
        .info-icon { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; border: 2px solid currentColor; }
        .info-card.cat-anil, .info-card.cat-anil .info-icon { color: var(--anil); }
        .info-card.cat-terracota, .info-card.cat-terracota .info-icon { color: var(--terracota); }
        .info-card.cat-dorado, .info-card.cat-dorado .info-icon { color: var(--dorado); }
        .info-card.cat-verde, .info-card.cat-verde .info-icon { color: var(--verde); }
        .info-card.cat-rosa, .info-card.cat-rosa .info-icon { color: var(--rosa); }
        .info-card h3 { font-size: 16px; color: var(--tinta); margin-bottom: 6px; }
        .info-card p { font-size: 13.5px; line-height: 1.55; color: var(--tinta-suave); margin: 0; }

        /* ---------- MAPA ---------- */
        .map-toggle { display: inline-flex; gap: 4px; background: var(--crema-card); border: 1.5px solid var(--borde); border-radius: 999px; padding: 4px; margin-bottom: 18px; }
        .map-toggle button { display: flex; align-items: center; gap: 6px; border: none; background: none; padding: 8px 16px; border-radius: 999px; font-family: 'Work Sans', sans-serif; font-size: 13px; font-weight: 600; color: var(--tinta-suave); cursor: pointer; }
        .map-toggle button.active { background: var(--rosa); color: #fff; }

        .map-wrap { position: relative; width: 100%; aspect-ratio: 4 / 3.1; border-radius: 18px; overflow: hidden; border: 2px solid var(--borde); background: var(--crema); }
        .map-bg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .map-zone-label { font-family: 'Space Mono', monospace; font-size: 2px; fill: var(--tinta-suave); letter-spacing: 0.03em; opacity: 0.75; }
        .map-road-label { font-family: 'Space Mono', monospace; font-size: 1.7px; fill: var(--tinta-suave); letter-spacing: 0.04em; opacity: 0.55; }

        .map-pin { position: absolute; transform: translate(-50%, -50%); width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--crema-card); background: currentColor; display: flex; align-items: center; justify-content: center; color: #fff; cursor: pointer; padding: 0; box-shadow: 0 2px 5px rgba(42,26,20,0.25); transition: transform 0.12s ease; z-index: 3; }
        .map-pin:hover, .map-pin.selected { transform: translate(-50%, -50%) scale(1.25); z-index: 4; }
        .map-pin svg { color: #fff; }
        .map-pin.cat-rosa { background: var(--rosa); }
        .map-pin.cat-terracota { background: var(--terracota); }
        .map-pin.cat-anil { background: var(--anil); }
        .map-pin.cat-dorado { background: var(--dorado); }
        .map-pin.cat-verde { background: var(--verde); }

        .map-pin-hotel { position: absolute; transform: translate(-50%, -50%); width: 22px; height: 22px; border-radius: 6px; background: var(--tinta); border: 2px solid var(--crema-card); display: flex; align-items: center; justify-content: center; color: #fff; z-index: 3; box-shadow: 0 2px 5px rgba(42,26,20,0.25); }

        .map-edge-tag { position: absolute; transform: translateY(-50%); display: flex; flex-direction: column; align-items: flex-start; gap: 1px; background: var(--crema-card); border: 1.5px solid currentColor; border-radius: 8px; padding: 4px 8px; font-family: 'Work Sans', sans-serif; font-size: 10.5px; font-weight: 700; cursor: pointer; max-width: 108px; z-index: 3; }
        .map-edge-tag.side-bottom { transform: translateX(-50%); }
        .map-edge-tag.cat-dorado { color: var(--dorado); }
        .map-edge-tag.cat-anil { color: var(--anil); }
        .map-edge-tag .map-edge-time { font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 400; color: var(--tinta-suave); }
        .map-edge-tag.selected { background: currentColor; color-scheme: light; }
        .map-edge-tag.selected, .map-edge-tag.selected .map-edge-time { color: #fff; }

        .map-legend { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--tinta-suave); margin: 10px 2px 0; }

        .map-detail { position: relative; margin-top: 16px; background: var(--crema-card); border: 2px solid var(--borde); border-radius: 14px; padding: 18px 20px; }
        .map-detail-close { position: absolute; top: 12px; right: 12px; background: var(--crema); border: none; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--tinta-suave); }
        .map-detail-tag { display: inline-block; font-family: 'Space Mono', monospace; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.05em; padding: 3px 9px; border-radius: 999px; margin-bottom: 8px; }
        .map-detail-tag.cat-rosa { background: #FCE9F1; color: var(--rosa); }
        .map-detail-tag.cat-terracota { background: #FBEBE1; color: var(--terracota); }
        .map-detail-tag.cat-anil { background: #E6EBF3; color: var(--anil); }
        .map-detail-tag.cat-dorado { background: #FAF0DA; color: var(--dorado); }
        .map-detail-tag.cat-verde { background: #E7F0E7; color: var(--verde); }
        .map-detail h3 { font-size: 19px; margin-bottom: 6px; }
        .map-detail p { font-size: 13.5px; line-height: 1.55; color: var(--tinta-suave); margin: 0 0 8px; }
        .map-detail-porque { display: flex; gap: 6px; font-style: italic; }
        .map-detail-porque svg { flex-shrink: 0; margin-top: 2px; color: var(--dorado); }

        /* ---------- TAB BAR ---------- */
        .tabbar { position: fixed; bottom: 0; left: 0; right: 0; z-index: 50; background: var(--crema-card); border-top: 2px solid var(--borde); display: flex; justify-content: center; padding: 6px 8px; box-shadow: 0 -4px 16px rgba(42,26,20,0.06); }
        .tabbar-inner { display: flex; gap: 2px; max-width: 720px; width: 100%; justify-content: space-between; }
        .tab-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; background: none; border: none; padding: 8px 2px 6px; cursor: pointer; font-family: 'Work Sans', sans-serif; font-size: 9.5px; font-weight: 600; color: var(--tinta-suave); border-radius: 10px; transition: color 0.15s ease, background 0.15s ease; }
        .tab-btn:hover { background: var(--crema); }
        .tab-btn.active { color: var(--rosa); }
        .tab-btn.active svg { color: var(--rosa); }

        @media (min-width: 860px) {
          .tabbar { top: 0; bottom: auto; border-top: none; border-bottom: 2px solid var(--borde); }
          .app-root { padding-bottom: 20px; padding-top: 74px; }
          .tabbar-inner { max-width: 1080px; justify-content: flex-start; gap: 8px; }
          .tab-btn { flex: none; flex-direction: row; padding: 10px 16px; font-size: 13.5px; }
        }
      `}</style>

      <nav className="tabbar">
        <div className="tabbar-inner">
          {TABS.map((t) => (
            <button key={t.id} className={`tab-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              <t.icon size={19} strokeWidth={2.25} />
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="content-wrap">
        {tab === "inicio" && <InicioSection go={setTab} />}
        {tab === "eventos" && <EventosSection />}
        {tab === "hospedaje" && <HospedajeSection />}
        {tab === "quehacer" && <QueHacerSection />}
        {tab === "gastronomia" && <GastronomiaSection />}
        {tab === "mapa" && <MapaSection />}
        {tab === "infoutil" && <InfoUtilSection />}
      </div>
    </div>
  );
}
