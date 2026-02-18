import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import CourseList from "./(routes)/courses/_components/CourseList";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Header / Navbar */}
      
      {/* Hero Section */}
      <Hero/>
      <div className="p-10 flex flex-col justify-items items-center">
        <h2 className="font-game text-5xl">Popular Course to Explore</h2>
        <h2 className="font-game text-xl text-gray-400 mb-2">Learn coding with interactive courses, and real life practical examples.</h2>
        <CourseList limit={3}/>
        <Link href={"/courses"}>
          <Button className="mt-4 font-game text-lg" variant={'pixel'}>
            View all courses
          </Button>
        </Link>
      </div>
    </div>
    );
}