const categories = [
  {
    name: "Switches & Sockets",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80",
    description: "Reliable switches, sockets, plates, and accessories for home and office use.",
  },
  {
    name: "Lighting",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
    description: "LED bulbs, panel lights, batten lights, and decorative fixtures.",
  },
  {
    name: "Fans",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    description: "Ceiling fans, exhaust fans, and energy-efficient air circulation products.",
  },
  {
    name: "Wires & Cables",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    description: "Durable electrical wires and cables suitable for household and commercial installations.",
  },
];

const products = [
  {
    name: "Anchor Roma Modular Switch 6A",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
    categoryName: "Switches & Sockets",
    brand: "Anchor",
    price: 120,
    stock: 48,
    shortDescription: "Elegant modular switch for daily home use.",
    description: "Anchor Roma modular switch offers smooth operation, long life, and a clean finish suitable for modern homes and office interiors.",
    rating: 4.4,
    featured: true,
  },
  {
    name: "Havells LED Bulb 12W Cool Day Light",
    image: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?auto=format&fit=crop&w=900&q=80",
    categoryName: "Lighting",
    brand: "Havells",
    price: 180,
    stock: 80,
    shortDescription: "Bright, energy-saving LED bulb for indoor spaces.",
    description: "This 12W LED bulb delivers cool white illumination with low power consumption, making it ideal for bedrooms, kitchens, and commercial counters.",
    rating: 4.7,
    featured: true,
  },
  {
    name: "Crompton Ceiling Fan 1200mm",
    image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=900&q=80",
    categoryName: "Fans",
    brand: "Crompton",
    price: 2499,
    stock: 14,
    shortDescription: "High-air-delivery ceiling fan with durable motor.",
    description: "Built for strong airflow and low noise, this Crompton ceiling fan is a dependable option for bedrooms, halls, and office cabins.",
    rating: 4.6,
    featured: true,
  },
  {
    name: "Finolex FR House Wire 1.5 sq mm",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
    categoryName: "Wires & Cables",
    brand: "Finolex",
    price: 1490,
    stock: 28,
    shortDescription: "Safe and durable copper house wire roll.",
    description: "Finolex FR house wire is designed for dependable current flow, heat resistance, and long-term safety for residential electrical installations.",
    rating: 4.8,
    featured: false,
  },
  {
    name: "Syska LED Panel Light 15W",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=900&q=80",
    categoryName: "Lighting",
    brand: "Syska",
    price: 699,
    stock: 24,
    shortDescription: "Slim recessed LED panel light for false ceilings.",
    description: "A clean and modern panel light that spreads light evenly while using less power, making it ideal for offices and contemporary living rooms.",
    rating: 4.3,
    featured: false,
  },
  {
    name: "GM 5 Pin Universal Socket",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80",
    categoryName: "Switches & Sockets",
    brand: "GM",
    price: 210,
    stock: 60,
    shortDescription: "Heavy-duty universal socket with safe grip design.",
    description: "A durable 5-pin socket for home and commercial usage, built to support a wide range of plug types with a secure fit.",
    rating: 4.5,
    featured: false,
  },
];

const services = [
  {
    name: "Home Electrical Repair",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Quick diagnosis and repair for common electrical faults at home.",
    description: "Get expert help for short circuits, loose connections, tripping issues, socket faults, and other household electrical problems.",
  },
  {
    name: "Fan Installation",
    image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Safe installation of ceiling, exhaust, and wall fans.",
    description: "Professional installation service for new and replacement fans with proper mounting, balancing, and wiring checks.",
  },
  {
    name: "Switch Board Repair",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Fix damaged boards, loose switches, and burnt sockets.",
    description: "We repair and replace faulty switch boards with clean wiring, safe fittings, and quality-tested accessories.",
  },
  {
    name: "Wiring Work",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    shortDescription: "New wiring and rewiring work for homes and small businesses.",
    description: "Complete wiring solutions for renovation projects, new rooms, office setups, and load expansion requirements.",
  },
  {
    name: "Inverter Installation",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Install inverter systems with battery and backup setup.",
    description: "Professional inverter setup with load planning, battery connection, safety checks, and testing for uninterrupted power backup.",
  },
  {
    name: "Light Fitting",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Decorative and utility light fitting for all room types.",
    description: "Installation of bulbs, tube lights, panel lights, wall lights, and hanging fixtures with a neat finishing touch.",
  },
  {
    name: "Appliance Checking",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Basic electrical inspection for non-working appliances.",
    description: "Initial fault diagnosis for electrical appliances, helping you understand whether the issue is with wiring, power supply, or the device itself.",
  },
  {
    name: "Electrician Booking",
    image: "https://images.unsplash.com/photo-1581091215367-59ab6dcef10d?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Book a local electrician visit for electrical jobs at your place.",
    description: "Flexible electrician booking for urgent fixes, maintenance visits, electrical upgrades, and routine household repair work.",
  },
];

const users = [
  {
    name: "Admin User",
    email: "admin@pawanelectricals.com",
    password: "admin123",
    phone: "9876543210",
    address: "Main Road, Patna",
    role: "admin",
  },
  {
    name: "Demo Customer",
    email: "user@pawanelectricals.com",
    password: "user123",
    phone: "9123456780",
    address: "Kankarbagh, Patna",
    role: "user",
  },
];

module.exports = {
  categories,
  products,
  services,
  users,
};
