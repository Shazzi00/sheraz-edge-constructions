export interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  image: string;
}

export const servicesData: Service[] = [
  {
    id: 1,
    title: 'Specialty Construction',
    subtitle: 'Specialty Construction: Crafting Unique and Complex Structures',
    description: 'Custom architectural solutions tailored for specialized engineering, heavy industrial demands, and unique structural requirements.',
    fullDescription: 'Specialty construction is a niche sector within the construction industry that focuses on projects requiring specialized skills, materials, and techniques. Unlike general construction, high-rise buildings, historical restorations, and complex engineering works demand tailored methodologies, strict safety protocols, and advanced structural solutions to stand the test of time.',
    image: '/civil.jpg',
  },
  {
    id: 2,
    title: 'Civil Construction',
    subtitle: 'Civil Construction: Building Vital Public & Urban Infrastructure',
    description: 'Comprehensive civil engineering services covering public infrastructure, road networks, bridge development, and site preparation.',
    fullDescription: 'Civil construction forms the backbone of modern society. From bridges and highways to water treatment plants and urban transportation networks, our civil construction team delivers large-scale infrastructure projects with exceptional durability, precision planning, and environmental responsibility.',
    image: '/civil.jpg',
  },
  {
    id: 3,
    title: 'Residential Construction',
    subtitle: 'Residential Construction: Creating Custom Living Spaces',
    description: 'Residential construction is a fundamental sector within the construction industry, dedicated to creating living spaces that meet the diverse needs of individuals and families.',
    fullDescription: 'Residential construction is a fundamental sector within the construction industry, dedicated to creating living spaces that meet the diverse needs of individuals and families. From multi-family luxury apartments to standalone modern villas, we prioritize energy efficiency, aesthetic appeal, and structural integrity.',
    image: '/civil.jpg',
  },
  {
    id: 4,
    title: 'Corporate Construction',
    subtitle: 'Corporate Construction: Designing High-Performance Workplaces',
    description: 'State-of-the-art office complexes, commercial headquarters, and retail structures engineered to optimize functionality and aesthetics.',
    fullDescription: 'Corporate construction demands a blend of sleek modern architecture, smart technology integration, and flexible floor layouts. We construct office headquarters and commercial complexes designed to boost productivity while presenting a prestigious image for modern businesses.',
    image: '/civil.jpg',
  },
  {
    id: 5,
    title: 'Building Constructions',
    subtitle: 'Building Constructions: High-Rise & Structural Excellence',
    description: 'Multi-story structural frameworks and modern commercial buildings engineered for optimal durability and compliance.',
    fullDescription: 'Our building construction services encompass end-to-end management of complex multi-story structures. We execute everything from deep foundation piling to interior finishing with rigorous quality benchmarks and strict deadline compliance.',
    image: '/civil.jpg',
  },
  {
    id: 6,
    title: 'Industrial Construction',
    subtitle: 'Industrial Construction: Heavy Manufacturing Facilities',
    description: 'Robust factory layouts, processing units, and logistics warehouses built to withstand heavy machinery and continuous operational demand.',
    fullDescription: 'Industrial construction requires specialized structural frameworks capable of supporting heavy machinery, thermal variations, and rigorous safety standards. We build processing plants, warehouses, and manufacturing hubs engineered for long-term operational performance.',
    image: '/civil.jpg',
  },
];