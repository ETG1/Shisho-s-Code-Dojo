import { db } from "@/config/db";
import { CourseChaptersTable, CourseTable } from "@/config/schema";
import { eq } from "drizzle-orm"; 
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const courseIdParam = searchParams.get('courseid');

    if (courseIdParam) {
        const courseId = parseInt(courseIdParam, 10);
        
        if (isNaN(courseId)) {
            return NextResponse.json({ error: 'Invalid course ID' }, { status: 400 });
        }

        const result = await db.select().from(CourseTable)
            .where(eq(CourseTable.courseId, courseId)); 
        
        if (result.length === 0) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        const chapterResult = await db.select().from(CourseChaptersTable)
            .where(eq(CourseChaptersTable.courseId, courseId));

        return NextResponse.json(
            {
                ...result[0],
                chapters: chapterResult
            }
        );
    }
    else {
        // fetch all courses
        const result = await db.select().from(CourseTable);
        return NextResponse.json(result);
    }
}
