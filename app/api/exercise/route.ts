import { db } from "@/config/db";
import { CompletedExerciseTable, CourseChaptersTable, ExerciseTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {courseId,chapterId,exerciseId} = await req.json();
    const user = await currentUser();
    const courseIdInt = parseInt(courseId, 10);

    if (!user?.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const courseResult = await db.select().from(CourseChaptersTable)
    .where(and(eq(CourseChaptersTable.courseId,courseIdInt), eq(CourseChaptersTable.chapterId,chapterId)))

    const exerciseResult = await db.select().from(ExerciseTable)
    .where(and(eq(ExerciseTable.courseId, courseIdInt),
    eq(ExerciseTable.exerciseId, exerciseId)))

    const completedExercise = await db.select().from(CompletedExerciseTable)
    .where(and(
        eq(CompletedExerciseTable.courseId,courseIdInt),
        eq(CompletedExerciseTable.chapterId,chapterId),
        eq(CompletedExerciseTable.userId, user.primaryEmailAddress.emailAddress)
    ))

    return NextResponse.json({
        ...courseResult[0],
        exerciseData:exerciseResult[0],
        completedExercise: completedExercise
    })
}