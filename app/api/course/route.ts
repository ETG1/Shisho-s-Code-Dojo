import { db } from "@/config/db";
import { CompletedExerciseTable, CourseChaptersTable, CourseTable, EnrolledCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq, asc, desc, inArray, notInArray, sql } from "drizzle-orm"; 
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
        const enrolledParam = searchParams.get('enrolled');
        
        if (enrolledParam === 'true') {
            // Fetch enrolled courses for the user
            const userEmail = user?.primaryEmailAddress?.emailAddress;
            
            if (!userEmail) {
                return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
            }

            // 1️⃣ Fetch all enrolled courses for the user
            const enrolledCourses = await db
                .select()
                .from(EnrolledCourseTable)
                .where(eq(EnrolledCourseTable.userId, userEmail));

            if (enrolledCourses.length === 0) {
                return NextResponse.json([]);
            }

            // Extract courseIds and filter out null values
            const courseIds: number[] = enrolledCourses
                .map(c => c.courseId)
                .filter((id): id is number => id !== null);

            // 2️⃣ Fetch all course details in one go
            const courses = await db
                .select()
                .from(CourseTable)
                .where(inArray(CourseTable.courseId, courseIds));

            // 3️⃣ Fetch chapters for all courses
            const chapters = await db
                .select()
                .from(CourseChaptersTable)
                .where(inArray(CourseChaptersTable.courseId, courseIds))
                .orderBy(asc(CourseChaptersTable.chapterId));

            // 4️⃣ Fetch completed exercises for all courses
            const completed = await db
                .select()
                .from(CompletedExerciseTable)
                .where(and(
                    inArray(CompletedExerciseTable.courseId, courseIds),
                    eq(CompletedExerciseTable.userId, userEmail)
                ))
                .orderBy(
                    desc(CompletedExerciseTable.courseId),
                    desc(CompletedExerciseTable.exerciseId)
                );

            // 5️⃣ Combine and format results
            const finalResult = courses.map(course => {
                const courseEnrollInfo = enrolledCourses.find(e => e.courseId === course.courseId);
                const courseChapters = chapters.filter(ch => ch.courseId === course.courseId);
                const completedExercisesList = completed.filter(cx => cx.courseId === course.courseId);
                
                // Count total exercises by summing exercises arrays in all chapters
                const totalExercises = courseChapters.reduce((acc, chapter) => {
                    const exercisesCount = Array.isArray(chapter.exercises) ? chapter.exercises.length : 0;
                    return acc + exercisesCount;
                }, 0);

                return {
                    courseId: course.courseId,
                    title: course.title,
                    bannerImage: course.bannerImage,
                    totalExercises,
                    completedExercises: completedExercisesList.length,
                    xpEarned: courseEnrollInfo?.xpEarned || 0,
                    level: course.level
                };
            });

            return NextResponse.json(finalResult);
        }
        
        const unenrolledParam = searchParams.get('unenrolled');
        
        if (unenrolledParam === 'true') {
            // Fetch courses the user has NOT enrolled in
            const userEmail = user?.primaryEmailAddress?.emailAddress;
            
            if (!userEmail) {
                return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
            }

            // 1️⃣ Fetch all enrolled courseIds for the user
            const enrolledCourses = await db
                .select()
                .from(EnrolledCourseTable)
                .where(eq(EnrolledCourseTable.userId, userEmail));

            // 2️⃣ Fetch all courses
            const allCourses = await db.select().from(CourseTable);

            // 3️⃣ Filter out enrolled courses
            const enrolledCourseIds = new Set(
                enrolledCourses
                    .map(c => c.courseId)
                    .filter((id): id is number => id !== null)
            );

            const unenrolledCourses = allCourses.filter(
                course => !enrolledCourseIds.has(course.courseId)
            );

            return NextResponse.json(unenrolledCourses);
        }
        
        // fetch all courses (default behavior)
        const result = await db.select().from(CourseTable);
        return NextResponse.json(result);
    }
}
