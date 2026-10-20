export interface Business {
  id: string;
  name: string;
  category: 'Legal' | 'Cosmetics' | 'Education' | 'Fashion & Jewelry' | 'Engineering' | 'Marketing & Branding' | string;
  email?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  description: string;
  image?: string;
  location?: string;
  phone?: string;
  createdAt?: string;
  featured?: boolean;
}

export const CATEGORIES = [
  'All',
  'Legal',
  'Cosmetics',
  'Education',
  'Fashion & Jewelry',
  'Engineering',
  'Marketing & Branding'
] as const;

export const INITIAL_BUSINESSES: Business[] = [
  {
    id: 'ke-phakati-attorneys',
    name: 'K E Phakati Attorneys Inc',
    category: 'Legal',
    email: 'admin@kephakatiattorneys.com',
    instagram: 'kgothatso_ep',
    facebook: 'Kgothatso Phakati',
    linkedin: 'Kgothatso Phakati',
    description: 'A law firm providing legal services in family law, labour law, civil litigation and now criminal litigation as well.',
    image: '',
    featured: true
  },
  {
    id: 'edgars-highveld',
    name: 'Edgars Highveld',
    category: 'Cosmetics',
    email: 'v015admin@retailability.co.za',
    description: 'Cosmetics.',
    image: '',
    featured: false
  },
  {
    id: 'tehillah-autism-academy',
    name: 'Tehillah Autism Academy',
    category: 'Education',
    description: 'A school designed to cater for children with ASD, ADHD, OCD and Dyslexia.',
    image: '',
    featured: true
  },
  {
    id: 'sibsam-pty-ltd',
    name: 'SibSam (PTY) Ltd',
    category: 'Fashion & Jewelry',
    website: 'https://sibsambj.kyte.site',
    facebook: 'https://www.facebook.com/SibSamBJ',
    description: 'We design and make modern and traditional beaded jewelry and clothing.',
    image: '',
    featured: true
  },
  {
    id: 'lizwile-engineering',
    name: 'Lizwile Engineering (Pty) Ltd',
    category: 'Engineering',
    website: 'https://www.lizwile.co.za',
    location: 'Highveld Industrial Park in Witbank',
    description: 'Lizwile Engineering (Pty) Ltd, established in October 2019, is a promising engineering services company located in Highveld Industrial Park in Witbank. It is 100% Black woman owned, led by the dynamic entrepreneur Nomagugu Mvelase. At Lizwile Engineering and Maintenance we believe in the power of innovation and precision. Our journey began with a vision to redefine engineering services through a blend of traditional craftsmanship and modern technology. Over the years we have grown into a company renowned for our expertise, reliability and dedication to quality.',
    image: '',
    featured: true
  },
  {
    id: 'aneropen-enterprise',
    name: 'Aneropen Enterprise',
    category: 'Marketing & Branding',
    email: 'lovert@aneropen.za',
    website: 'https://aneropen.co.za/',
    phone: '0695745915',
    description: `Aneropen Marketing & Promotional Solutions is a dynamic marketing and branding company dedicated to helping businesses build strong brand identities, increase visibility, attract customers, and achieve sustainable growth. We provide creative, professional, and reliable marketing solutions tailored to meet the unique needs of businesses across different industries.

Our services include branding and graphic design, printing, corporate clothing, personal protective equipment (PPE), promotional products, corporate gifts, signage, social media management, content creation, professional videography, and promotional campaigns. We also assist businesses with branded workwear, customised apparel, and marketing materials that help them present a professional and consistent image.

At Aneropen, we understand that every business deserves to be seen, recognised, and remembered. That is why we work closely with our clients to develop effective marketing strategies and quality promotional products that communicate their brand message, connect them with their target audience, and create lasting impressions.

Whether you are a small business looking to establish your brand or an established company seeking to strengthen your market presence, Aneropen is your trusted partner for innovative marketing and promotional solutions.

Our mission is to help businesses look professional, stand out from the competition, and get their brands noticed.
Aneropen Marketing & Promotional Solutions — Your brand deserves to be seen.`,
    image: '',
    featured: true
  },
  {
    id: 'mcc-engineering',
    name: 'MCC Engineering Pty Ltd',
    category: 'Engineering',
    email: 'Info.mccengineering@gmail.com',
    website: 'https://www.mccengineering.co.za',
    phone: '0637956946',
    description: 'MCC Engineering (Pty) Ltd is a 100% Black-owned, women-owned and youth-owned company providing mechanical and general maintenance services to the mining and industrial sectors. Our services include equipment repairs, fabrication, industrial painting, labour support, and the supply of mining and industrial consumables. We are committed to delivering reliable, quality-driven and cost-effective solutions to our clients.',
    image: '',
    featured: true
  },
  {
    id: 'japino-enterprise',
    name: 'Japino Enterprise',
    category: 'Engineering',
    email: 'Pinky@japinoenterprise.co.za',
    website: 'https://www.japinoenterprise.co.za',
    phone: '0726645829',
    description: 'Japino Enterprise is a dedicated South African business providing comprehensive commercial, industrial, and supply services. Committed to excellence, reliability, and empowering client partnerships across industries.',
    image: '',
    featured: false
  },
  {
    id: 'tsholo-m-naturals',
    name: 'TSHOLO.M Naturals & Essentials',
    category: 'Cosmetics',
    email: 'tsholohlangu1@gmail.com',
    website: 'https://wa.me/message/JQV6EQVLDPIIJ1',
    phone: '0842084635',
    description: 'TSHOLO.M Naturals & Essentials is a woman owned company that is just over a year old. We offer Natural and Organic products that contain No Preservatives, No Colourants, and No additives. Our aim is to offer products that do not cause damage to the human body but to boost immune health and assist the human body to self-heal.',
    image: '',
    featured: false
  },
  {
    id: 'umande-beauty',
    name: 'Umande Beauty',
    category: 'Cosmetics',
    email: 'wdu1series@yahoo.com',
    website: 'https://www.facebook.com/share/1Coxwnqr8p/',
    facebook: 'https://www.facebook.com/share/1Coxwnqr8p/',
    phone: '0792262813',
    description: 'Makeup services and premium makeup products tailored to highlight every woman’s natural beauty and confidence.',
    image: '',
    featured: false
  },
  {
    id: 'i-boutiq',
    name: 'i-BoutiQ',
    category: 'Fashion & Jewelry',
    email: 'nkambulethabisile@gmail.com',
    website: 'https://facebook.com/search/top?q=IBoutiq',
    phone: '0722156292',
    location: 'Emalahleni, Mpumalanga',
    description: 'i-BoutiQ is a fashion boutique based in Emalahleni, Mpumalanga, specialising in stylish handbags, shoes and fashion accessories. The brand combines elegance, quality and affordability, offering carefully curated products that enable customers to express their individuality and confidence. Guided by the philosophy “Luxury Meets Affordability,” i-BoutiQ is committed to making sophisticated fashion accessible while delivering a convenient and enjoyable shopping experience, with nationwide delivery.',
    image: '',
    featured: true
  },
  {
    id: 'cem-mining',
    name: 'CEM Mining',
    category: 'Engineering',
    email: 'Luyanda.Tshangela@cemmining.com',
    website: 'https://www.cemmining.com/',
    phone: '0812974344',
    description: 'CEM Mining is a mining consultancy delivering geological, technical, planning and digital solutions that optimise operations and drive sustainable mining performance.',
    image: '',
    featured: true
  },
  {
    id: 'refresh-medical-aesthetics',
    name: 'Refresh Medical Aesthetics',
    category: 'Cosmetics',
    website: 'https://drzamarefreshmedical.com',
    description: 'We are a medical practice that focuses on restoring beauty through specialized clinical aesthetics, skin rejuvenation, and restorative beauty treatments.',
    image: '',
    featured: false
  }
];

export const STORAGE_KEY = 'shero_directory_businesses_v3';

export function getStoredBusinesses(): Business[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_BUSINESSES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // fallback to initial
  }
  return INITIAL_BUSINESSES;
}

export function saveStoredBusinesses(businesses: Business[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(businesses));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }
}
