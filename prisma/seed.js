import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // --- Site Config ---
  await prisma.siteConfig.create({
    data: {
      ownerName: "Aman Verma",
      title: "Portfolio of Aman Verma",
      tagline: "Software Developer | Full Stack Engineer",
      socials: {
        github: "https://github.com/Vaman971",
        linkedin: "https://www.linkedin.com/in/aman-verma-7055bb210/",
        leetcode: "https://leetcode.com/u/Aman_762/",
      },
      theme: {
        primaryColor: "#2563eb", // blue-600
        secondaryColor: "#f97316", // orange-500
        backgroundColor: "#f3f4f6", // gray-100
        textColor: "#111827", // gray-900
      },
      cvUrl: "https://be9y0zeofiyz6gpo.public.blob.vercel-storage.com/uploads/1755530503241-Aman_Resume-plTaiPO6tlnLkBMWPd7jvxCRYOlJqz.pdf", // replace with actual CV URL
    },
  });

  // --- About Section ---
  await prisma.about.create({
    data: {
      title: "About Me",
      content:
        "I’m a Software Developer currently working at Tata Technologies. Passionate about full-stack development, modern C++ systems, and building scalable web applications. Experienced in delivering production-ready solutions, mentoring teams, and collaborating on international projects.",
      avatar: "", // upload to blob later
      order: 0,
    },
  });

  // --- Education ---
  // await prisma.education.createMany({
  //   data: [
  //     {
  //       title: "Bachelor of Technology - Manipal Institute of Technology",
  //       content: "CGPA: 8.23/10",
  //       avatar: "",
  //       order: 0,
  //     },
  //     {
  //       title: "Class XII - Saint Edmund’s Sr. Sec. School, Jaipur",
  //       content: "Percentage: 90%",
  //       avatar: "",
  //       order: 1,
  //     },
  //     {
  //       title: "Class X - Kendriya Vidyalaya, Suratgarh",
  //       content: "Percentage: 86%",
  //       avatar: "",
  //       order: 2,
  //     },
  //   ],
  // });

  // --- Skills ---
await prisma.skill.createMany({
  data: [
    // --- Languages ---
    { name: "C", category: "Languages", level: 85, icon: "https://cdn.simpleicons.org/c/a8b9cc" },
    { name: "C++", category: "Languages", level: 90, icon: "https://cdn.simpleicons.org/cplusplus/00599C" },
    { name: "Java", category: "Languages", level: 75, icon: "https://cdn.simpleicons.org/java/007396" },
    { name: "Python", category: "Languages", level: 70, icon: "https://cdn.simpleicons.org/python/3776AB" },
    { name: "SQL", category: "Languages", level: 80, icon: "https://cdn.simpleicons.org/mysql/4479A1" },

    // --- Tools ---
    { name: "Git", category: "Tools", level: 80, icon: "https://cdn.simpleicons.org/git/F05032" },
    { name: "Redux", category: "Tools", level: 85, icon: "https://cdn.simpleicons.org/redux/764ABC" },
    { name: "CMake", category: "Tools", level: 75, icon: "https://cdn.simpleicons.org/cmake/064F8C" },
    { name: "Jenkins", category: "Tools", level: 70, icon: "https://cdn.simpleicons.org/jenkins/D24939" },
    { name: "AWS", category: "Tools", level: 60, icon: "https://cdn.simpleicons.org/amazonaws/232F3E" },

    // --- Web Development ---
    { name: "HTML", category: "Web Development", level: 85, icon: "https://cdn.simpleicons.org/html5/E34F26" },
    { name: "CSS", category: "Web Development", level: 80, icon: "https://cdn.simpleicons.org/css3/1572B6" },
    { name: "JavaScript", category: "Web Development", level: 85, icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
    { name: "Bootstrap", category: "Web Development", level: 75, icon: "https://cdn.simpleicons.org/bootstrap/7952B3" },
    { name: "Tailwind CSS", category: "Web Development", level: 80, icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    { name: "React.js", category: "Web Development", level: 85, icon: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "Express.js", category: "Web Development", level: 80, icon: "https://cdn.simpleicons.org/express/000000" },

    // --- Operating Systems ---
    { name: "Windows", category: "Operating System", level: 80, icon: "https://cdn.simpleicons.org/windows/0078D6" },
    { name: "Linux", category: "Operating System", level: 85, icon: "https://cdn.simpleicons.org/linux/FCC624" },
  ],
});


  // --- Experience ---
  await prisma.experience.createMany({
    data: [
      {
        role: "Software Developer",
        company: "Tata Technologies",
        startDate: "Aug 2024",
        endDate: "Present",
        bullets: [
          "Migrated 75+ libraries and executables from RHEL 5 to RHEL 9 improving performance, security, and compatibility.",
          "Implemented new build strategy using CMake with Conan reducing setup time by 40%.",
          "Automated builds and tests using Jenkins with JFrog Artifactory integration.",
          "Presented testing strategies at Airbus, Toulouse for 150+ executables.",
        ],
        order: 0,
      },
      {
        role: "Apprenticeship",
        company: "Tata Technologies",
        startDate: "Feb 2024",
        endDate: "Jul 2024",
        bullets: [
          "Developed full-stack dashboard using React, Express, MySQL (via Sequelize).",
          "Designed schema with 15+ tables for financial/team data.",
          "Built visualization of $2M+ financial data with React ApexCharts.",
          "Implemented JWT-based auth and role-based access.",
        ],
        order: 1,
      },
    ],
  });

  // --- Projects ---
  await prisma.project.createMany({
    data: [
      {
        title: "Blog Website (MERN Stack)",
        description:
          "Responsive blog platform with JWT authentication, Redux state management, full CRUD, story search, likes, comments, and image uploads.",
        techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux.js"],
        liveUrl: "",
        githubUrl: "https://github.com/Vaman971/Blog",
        order: 0,
      },
      {
        title: "E-commerce Cart Page (MERN Stack)",
        description:
          "Dynamic cart page with Redux Toolkit for state management, automated billing, and deployed on AWS (S3 + EC2) with GitHub Actions CI/CD.",
        techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux Toolkit", "AWS"],
        liveUrl: "",
        githubUrl: "https://github.com/Vaman971/Digital_invoice",
        order: 1,
      },
    ],
  });

  // --- Volunteer ---
  await prisma.experience.createMany({
    data: [
      {
        role: "President",
        company: "SAE-IM, Manipal",
        startDate: "",
        endDate: "",
        bullets: ["Organized 5+ speaker events", "Conducted 3 technical workshops for student members."],
        order: 2,
      },
      {
        role: "Organizer",
        company: "Kraftwagen, TechTatva - Manipal",
        startDate: "",
        endDate: "",
        bullets: [
          "Orchestrated flagship Kraftwagen event with participants from 50+ universities.",
          "Increased event attendance by 40% and sponsorships by 25%.",
        ],
        order: 3,
      },
    ],
  });
}

main()
  .then(() => console.log("🌱 Database seeded"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
