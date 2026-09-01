export interface Project {
  id: number;
  title: string;
  location: string;
  constructionType: string;
  sector: string;
  description: string;
  fullDescription: string;
  image: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'Kolkata Project',
    location: 'Shyan Nagar',
    constructionType: 'Commercial construction',
    sector: 'Health',
    description: 'A modern high-rise commercial project engineered with sustainable architectural practices.',
    fullDescription: 'The Kolkata Project stands as a benchmark of modern architectural planning and engineering execution in Shyan Nagar. Designed specifically for the healthcare sector, this facility integrates advanced sustainable materials, energy-efficient climate control systems, and long-lasting structural design.',
    image: '/civil.jpg',
  },
  {
    id: 2,
    title: 'New Delhi Project',
    location: 'Connaught Place',
    constructionType: 'Civil Infrastructure',
    sector: 'Transportation',
    description: 'State-of-the-art infrastructure development showcasing complex engineering.',
    fullDescription: 'An extensive urban infrastructure project executed in central New Delhi. This site involved complex earthworks, structural concrete piling, and precision transit line integration.',
    image: '/civil.jpg',
  },
  {
    id: 3,
    title: 'Kanpur Project',
    location: 'Civil Lines',
    constructionType: 'Residential Construction',
    sector: 'Real Estate',
    description: 'Comprehensive residential complex construction crafted for maximum durability.',
    fullDescription: 'A multi-story residential enclave built with high-grade seismic-resistant concrete, eco-friendly green rooftops, and premium interior space optimization.',
    image: '/civil.jpg',
  },
  {
    id: 4,
    title: 'Lucknow Project',
    location: 'Gomti Nagar',
    constructionType: 'Corporate Construction',
    sector: 'Technology',
    description: 'A premium corporate headquarter development featuring state-of-the-art layout.',
    fullDescription: 'Constructed for a modern tech firm, this corporate campus incorporates smart glass facades, high-capacity structural load distribution, and open-plan workplace design.',
    image: '/civil.jpg',
  },
];