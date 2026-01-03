import {db} from "@/config/db"
import { CourseChaptersTable } from "@/config/schema"
import { NextRequest, NextResponse } from "next/server"

const DATA = [
  {
    id: 1,
    name: "Introduction to Python",
    desc: "Get started with Python and understand how it works.",
    exercises: [
      { name: "What is Python?", slug: "what-is-python", xp: 15, difficulty: "easy" },
      { name: "Install Python", slug: "install-python", xp: 20, difficulty: "easy" },
      { name: "First Python Program", slug: "first-python-program", xp: 25, difficulty: "easy" }
    ]
  }
];





export async function GET(req: NextRequest) {
    DATA.forEach(async (item) => {
        await db.insert(CourseChaptersTable).values({
            courseId: 4, //Change Course ID depends on course info,
            desc: item?.desc,
            exercises: item.exercises,
            name: item?.name,
            chapterId: item?.id
        })
    })
    return NextResponse.json('Success')
}
