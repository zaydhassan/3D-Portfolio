import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  next,
  polysia,
  origin,
  afame,
  bluestock,
  ecom,
  review1,
  movie,
  threejs,
  
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Frontend Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Responsive Design",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "next",
    icon: next,
  },
];

const experiences = [
  {
    title: "Frontend Developer Intern",
    company_name: "Origin Tech",
    icon: origin,
    iconBg: "#70dbd8",
    date: "March 2023 - May 2023",
    points: [
      "Developed and maintained web applications using Tailwind CSS and React to enhance website usability.",
      "Analyzed requirements to determine the best approach for developing new features.",
      "Participated in testing of developed code before deployment to production environments and provided feedback on any bugs during testing.",
      "Collaborated with other developers to improve the user experience and fix bugs in the website.",
    ],
  },
  {
    title: "Software Developer Intern",
    company_name: "Afame Technologies",
    icon: afame,
    iconBg: "#85e0dd",
    date: "May 2024 - July 2024",
    points: [
      "Developed an automation framework using Python and Java, enhancing system robustness.",
      "Analyzed project requirements to determine the best approach for feature development.",
      "Participated in testing and feedback for new code before deployment, identifying bugs.",
      "Collaborated with software development teams to enhance user experience and resolve bugs, resulting in improved functionality and customer satisfaction.",
    ],
  },
  {
    title: "Software Developer Intern",
    company_name: "Bluestock Fintech",
    icon: bluestock,
    iconBg: "#478cd1",
    date: "July 2024 - Sep 2024",
    points: [
      "Lead the development of an IPO Web Application and REST API, driving team productivity and enhancing user interfaces.",
      "Oversee real-time progress tracking and role adjustments within the development team, boosting adaptability and project efficiency.",
      "Implement robust Python and Django back-end solutions, optimizing system performance and front-end integration.",
      "Maintain high standards for code quality and security, mitigating risks and ensuring compliance with latest industry protocols.",
    ],
  },
  {
    title: "Software Developer Intern",
    company_name: "Polysia Tech",
    icon: polysia,
    iconBg: "#FFA38F",
    date: "Sep 2024 - Present",
    points: [
      "Developing and maintaining web applications using Python,Javascript,MYSQL and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const projects = [
  {
    name: "E-Commerce Web App",
    description:
      "Developed a React e-commerce site featuring dynamic image filtering, product management with quantity control and cart add/delete functions, and utilized Context API for efficient data management.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "Context-API",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: ecom,
    source_code_link: "https://github.com/zaydhassan/E-Commerce",
    live_site_link: "https://zaydstore.netlify.app/",
  },
  {
    name: "Movie-Review Website",
    description:
      "Built a fully responsive React website with Firestore database integration, implemented OTP authentication for secure user access, and developed a feature allowing users to add new movies for enhanced dynamic interaction.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "Firebase",
        color: "green-text-gradient",
      },
      {
        name: "Authentication",
        color: "pink-text-gradient",
      },
    ],
    image: review1,
    source_code_link: "https://github.com/zaydhassan/Filmyfolks",
    live_site_link: "https://filmyfolks.vercel.app/signup",
  },
  {
    name: "Movie Website",
    description:
      "Built a fully responsive movie website using React, Redux, and SCSS, fetching data through REST API with Axios and utilizing The Movie Database (TMDB) for data retrieval.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "redux",
        color: "green-text-gradient",
      },
      {
        name: "REST API",
        color: "pink-text-gradient",
      },
    ],
    image: movie,
    source_code_link: "https://github.com/zaydhassan/ZaydFlix",
    live_site_link: "https://zayd-flix.vercel.app/",
  },
];


export { services, technologies, experiences, projects };
