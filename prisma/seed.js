import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding About section...");

  // Clear old data
  await prisma.about.deleteMany();

  // Sample About data
  const abouts = [
    {
      title: "Introduction",
      content: "I’m a software developer passionate about building scalable, high-performance systems and modern web applications. My experience spans from system-level development in C/C++ to full-stack web apps with MERN, and I’ve delivered solutions used in aerospace and enterprise software.",
      avatar: null,
      order: 1,
    },
    {
      title: "Professional Experience",
      content: "At Tata Technologies, I migrated 75+ legacy libraries to modern platforms, automated CI/CD pipelines, and collaborated on-site with Airbus teams in France. I also designed financial dashboards managing $2M+ in data, with secure authentication and interactive visualizations.",
      avatar: null,
      order: 2,
    },
    {
      title: "Hobbies & Interests",
      content: "When I’m not coding, I enjoy mentoring peers, participating in tech events, and exploring new tools that make development faster and more reliable.",
      avatar: null,
      order: 3,
    },
    {
      title: "Avatar",
      content: "",
      avatar: "/profile.png", // matches your current profile image
      order: 4,
    },
  ];

  await prisma.about.createMany({ data: abouts });

  console.log("✅ About section seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
