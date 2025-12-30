import { db } from '../config/db';
import { CourseTable } from '../config/schema';

const coursesData = [
  {
    courseId: 1,
    title: 'React Beginner',
    desc: 'Learn the fundamentals of React, including components, props, state, and building your first UI.',
    bannerImage: 'https://ik.imagekit.io/tubeguruji/Codebox/588a44195922117.66168b374ece8.gif',
    level: 'Beginner',
    tags: 'React'
  },
  {
    courseId: 2,
    title: 'HTML Beginner',
    desc: 'Understand the basics of web structure using HTML tags, elements, and semantic layouts.',
    bannerImage: 'https://ik.imagekit.io/tubeguruji/Codebox/original-ba977c3d86642765b44fd9d1579d78d4.gif?updatedAt=1763406224974',
    level: 'Beginner',
    tags: 'HTML'
  },
  {
    courseId: 3,
    title: 'CSS Beginner',
    desc: 'Master styling essentials like selectors, colors, layout, flexbox, and responsive design.',
    bannerImage: 'https://ik.imagekit.io/tubeguruji/Codebox/fd40a4b8b151c4e432106576187d03c9.gif?updatedAt=1763406225765',
    level: 'Beginner',
    tags: 'CSS'
  },
  {
    courseId: 4,
    title: 'Python Beginner',
    desc: 'Start coding with Python by learning variables, conditions, loops, functions, and basic projects.',
    bannerImage: 'https://ik.imagekit.io/tubeguruji/Codebox/tumblr_3ebef054c877d03c507aa8c40149908b_515b1f92_1280.webp?updatedAt=1763406230994',
    level: 'Beginner',
    tags: 'Python'
  },
];

async function seedCourses() {
  try {
    await db.insert(CourseTable).values(coursesData);
    console.log('Courses seeded successfully!');
  } catch (error) {
    console.error('Error seeding courses:', error);
  }
}

seedCourses();
