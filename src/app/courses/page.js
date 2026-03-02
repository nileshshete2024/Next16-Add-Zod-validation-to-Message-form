import CourseList from './CourseList';
import db from '@/lib/dbSetup'; // ✅ import your SQLite connection

export const metadata = {
  title: "CodePion Courses | Learn to Code",
  description: "Explore our courses",
  keywords: ["CodePion", "courses", "programming", "coding", "learn to code", "development"],
  openGraph: {
    title: "CodePion Courses | Learn to Code",
    description: "Discover CodePion's programming courses and enhance your coding skills with practical, hands-on lessons.",
    url: "https://codepion.com/og-images/courses.jpg",
    siteName: "CodePion",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://codepion.com/og-images/courses.jpg",
        width: 1200,
        height: 854,
        alt: "CodePion Courses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodePion Courses | Learn to Code",
    description: "Explore programming courses at CodePion and start mastering coding skills today!",
    images: ["https://codepion.com/og-images/courses.png"],
  },
};

// Server component: fetch data from local DB
async function getCourses() {
  const sql = 'SELECT * FROM courses ORDER BY id ASC';

  try {
    return db.prepare(sql).all();
  } catch (err) {
    console.error('Failed to fetch courses from DB', err);
    return [];
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <section className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">📚 Available Courses</h1>

      {/* Pass data to Client Component */}
      <CourseList courses={courses} />
    </section>
  );
}
