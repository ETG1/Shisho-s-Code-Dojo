import { db } from "@/config/db";
import { CompletedExerciseTable, EnrolledCourseTable, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const { courseId, chapterId, exerciseId, xpEarned } = await req.json();
    const user = await currentUser();
    const courseIdInt = parseInt(courseId, 10);

    const result = await db.insert(CompletedExerciseTable).values({
        chapterId: chapterId,
        courseId: courseIdInt,
        exerciseId: exerciseId,
        userId: user?.primaryEmailAddress?.emailAddress
    }).returning()

    // Update Course Xp Earned
    await db.update(EnrolledCourseTable).set({
        xpEarned: sql`${EnrolledCourseTable.xpEarned}+ ${xpEarned}`
    })//@ts-ignore
    .where(and(eq(EnrolledCourseTable.courseId, courseIdInt), eq(EnrolledCourseTable.userId, user?.primaryEmailAddress?.emailAddress)));
    // Update User Xp Earned(points)
    await db.update(usersTable).set({
        points: sql`${usersTable.points}+ ${xpEarned}`
    })//@ts-ignore
    .where(eq(usersTable.email,user?.primaryEmailAddress?.emailAddress))

    return NextResponse.json(result);
}