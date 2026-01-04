import EnrolledCourses from "@/app/(routes)/dashboard/_components/EnrolledCourses";
import { db } from "@/config/db";
import { CompletedExerciseTable, CourseChaptersTable, CourseTable, EnrolledCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq, asc, SQL, desc } from "drizzle-orm"; 
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const courseIdParam = searchParams.get('courseid');
    const user = await currentUser();

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
            .where(eq(CourseChaptersTable.courseId, courseId))
            .orderBy(asc(CourseChaptersTable.chapterId));

        const enrolledCourse = await db.select().from(EnrolledCourseTable)
            .where(and(
                eq(EnrolledCourseTable?.courseId, courseId),
                //@ts-ignore
                eq(EnrolledCourseTable.userId, user?.primaryEmailAddress?.emailAddress)
            ))

        const isEnrolledCourse = enrolledCourse?.length>0?true:false

        const completedExercises = await db.select().from(CompletedExerciseTable)
            .where(and(
                eq(CompletedExerciseTable?.courseId, courseId),
                //@ts-ignore
                eq(CompletedExerciseTable.userId, user?.primaryEmailAddress?.emailAddress)
            ))
            .orderBy(desc(CompletedExerciseTable?.courseId),
                    desc(CompletedExerciseTable?.exerciseId))

        return NextResponse.json(
            {
                ...result[0],
                chapters: chapterResult,
                userEnrolled: isEnrolledCourse,
                courseEnrolledInfo: enrolledCourse[0],
                completedExercises: completedExercises
            }
        );
    }
    else {
        // fetch all courses
        const result = await db.select().from(CourseTable);
        return NextResponse.json(result);
    }
}
