/**
 * CENTRAL PROFILE CONFIGURATION
 * ---------------------------------------------------------------------------
 * Almost everything personal on the site comes from this file. Only facts
 * supplied by Dr. Bristy are filled in. Anything still unknown is an empty
 * string ("") and the parts of the site that depend on it stay hidden
 * until a real value is added. Nothing here is invented.
 */

export const profile = {
  name: 'Dr. Fahmida Bristy',
  initials: 'FB',
  title: 'Registered Veterinary Doctor',
  country: 'Bangladesh',

  // Short line used under the name in the hero.
  tagline:
    'Veterinary Doctor registered with the Bangladesh Veterinary Council, completing an international internship at Prince of Songkla University, Thailand.',

  // Provisional biography supplied in the brief. Edit freely. The degree
  // title is deliberately NOT stated until `degree.verified` is true.
  biography: [
    'Dr. Fahmida Bristy is a registered Veterinary Doctor in Bangladesh. She completed her undergraduate education in Animal Science and Veterinary Medicine at Sher-e-Bangla Agricultural University in 2026.',
    'She is registered with the Bangladesh Veterinary Council (BVC), Registration No. 10592. Her professional development includes international internship experience at Prince of Songkla University in Thailand.',
  ],

  // Professional registration (confirmed).
  registration: {
    council: 'Bangladesh Veterinary Council (BVC)',
    number: '10592',
    // Add a scanned certificate to src/assets or public/ and set the path to
    // show it in the Registration section, e.g. '/documents/bvc-certificate.jpg'
    certificateImage: '',
  },

  // Degree. The brief supplied the wording "B.Sc. Vet Sci and A.H." but asked
  // for it to be checked against the certificate first. Until you set
  // `verified: true`, the public site shows only the academic subject.
  degree: {
    suppliedWording: 'B.Sc. Vet Sci and A.H.',
    officialTitle: '', // type the exact title from the certificate here
    verified: false,
    subject: 'Animal Science and Veterinary Medicine',
    institution: 'Sher-e-Bangla Agricultural University',
    country: 'Bangladesh',
    admitted: '10 December 2019',
    graduationYear: '2026',
  },

  // Contact. Leave blank until real details are supplied; blank fields are
  // never rendered. No email, phone, address, or appointments are assumed.
  contact: {
    email: 'FahmidaBristy@gmail.com',
  phone: '+880 1728-249175',
  address: '',
  note: '',
  appointmentUrl: '',
  loginUrl: '',
  },

  // Social links (only real, supplied URLs).
  social: {
    facebook: 'https://www.facebook.com/fahmida.bristy.27/',
  },

  // Path to a real CV file (put it in /public, e.g. '/Fahmida-Bristy-CV.pdf').
  // While empty, every Download CV button and section stays hidden.
  cvPath: '',

  // Portrait. Leave empty to show an elegant monogram placeholder.
  photo: '',
  photoAlt: 'Portrait of Dr. Fahmida Bristy',

  // Used for the canonical URL and Open Graph URL once the site is deployed.
  siteUrl: '',
}
