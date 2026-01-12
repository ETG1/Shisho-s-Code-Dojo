import {db} from "@/config/db"
import { ExerciseTable } from "@/config/schema"
import { NextRequest, NextResponse } from "next/server"


const DATA = [
  {
    "courseId": 2,
    "exerciseId": "explore-the-web-skeleton",
    "exerciseName": "Explore the Web Skeleton",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body><p>Welcome, brave explorer! Your journey begins by discovering the <strong>web skeleton</strong>. Every web page is built on the foundation of HTML.</p><p>The <code>&lt;!DOCTYPE html&gt;</code> declaration tells the browser what type of document it is and prepares the page for modern rendering.</p><p>The outer wrapper <code>&lt;html&gt;</code> contains everything on the page — think of it as the walls of your fortress.</p><p>Inside the fortress, the <code>&lt;head&gt;</code> stores your tools: the <code>&lt;title&gt;</code>, meta tags, and other hidden helpers.</p><p>The <code>&lt;body&gt;</code> is the open field where your story unfolds — headings, paragraphs, images, and links all appear here.</p><p>Headings act like banners guiding visitors; paragraphs are your story logs; lists are treasure maps organizing loot.</p><p>If the skeleton is wrong, your page may look broken or confusing. Correct structure means a reliable page across browsers and devices.</p><p>This exercise trains you to recognize the essential tags that every HTML page needs. It is the first step to mastering web crafting.</p><p>Observe, build, and defend your web skeleton — then move on to more advanced quests with confidence.</p><p>Ready your quill: identify the DOCTYPE, the <code>&lt;html&gt;</code> wrapper, a proper <code>&lt;head&gt;</code> and the <code>&lt;body&gt;</code> to claim your victory.</p><p>Completing this will unlock basic HTML understanding and set you up for the rest of the course.</p><p>Good luck — the web world awaits!</p></body>",
      "task": "<body><p>Create a complete HTML skeleton including <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html lang=\"en\"&gt;</code>, <code>&lt;head&gt;</code>, and <code>&lt;body&gt;</code>. Inside <code>&lt;head&gt;</code> add a <code>&lt;title&gt;</code> with the text <strong>Web Skeleton Adventure</strong>. Leave the body empty for now.</p></body>",
      "hint": "<body><p>Start with <code>&lt;!DOCTYPE html&gt;</code>. Then create <code>&lt;html lang=\"en\"&gt;</code>. Inside head add <code>&lt;title&gt;Web Skeleton Adventure&lt;/title&gt;</code>. Finally add an empty <code>&lt;body&gt;</code>.</p></body>",
      "starterCode": {
        "/index.html": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title></title>\n</head>\n<body>\n\n</body>\n</html>"
      },
      "regex": "(?i)<title>\\s*Web Skeleton Adventure\\s*</title>",
      "output": "<title>Web Skeleton Adventure</title>",
      "hintXp": 30
    }
  },
  {
    "courseId": 2,
    "exerciseId": "build-your-base-camp",
    "exerciseName": "Build Your Base Camp",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body><p>Every adventurer needs a base camp — a safe place to plan and rest. In HTML, your base camp is built with headings, paragraphs, and sections.</p><p>A main heading (<code>&lt;h1&gt;</code>) acts like a flag planted at the camp's center, marking its purpose.</p><p>Paragraphs (<code>&lt;p&gt;</code>) are the camp logs where you record instructions, stories, and NPC dialogues.</p><p>Sections (<code>&lt;section&gt;</code>) divide your camp into zones—training grounds, supply tents, and the map room.</p><p>Using the correct tags keeps your camp organized, accessible, and friendly to both players and browsers.</p><p>Headings provide hierarchy; paragraphs provide content; semantic tags give meaning to your base layouts.</p><p>Master the base camp structure and future quests will be easier to implement and navigate.</p><p>This exercise focuses on placing a strong heading and a descriptive paragraph in the body.</p><p>Think of HTML elements as camp equipment—each has a specific role and must be used correctly.</p><p>When your base camp is solid, you can explore the rest of the web world without worry.</p><p>Complete this and your in-game reputation will rise among fellow learners.</p><p>Set up your flag and write your first log to start the adventure!</p></body>",
      "task": "<body><p>Inside the <code>&lt;body&gt;</code>, add a heading <code>&lt;h1&gt;</code> with the text <strong>Welcome to Base Camp</strong> and a paragraph <code>&lt;p&gt;</code> with the text <strong>Prepare yourself for the HTML adventure!</strong>.</p></body>",
      "hint": "<body><p>Use <code>&lt;h1&gt;Welcome to Base Camp&lt;/h1&gt;</code> and <code>&lt;p&gt;Prepare yourself for the HTML adventure!&lt;/p&gt;</code> inside the body.</p></body>",
      "starterCode": {
        "/index.html": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Base Camp</title>\n</head>\n<body>\n\n</body>\n</html>"
      },
      "regex": "<h1>\\s*Welcome to Base Camp\\s*</h1>[\\s\\S]*<p>\\s*Prepare yourself for the HTML adventure!\\s*</p>",
      "output": "<h1>Welcome to Base Camp</h1><p>Prepare yourself for the HTML adventure!</p>",
      "hintXp": 35
    }
  }
]








export async function GET(req: NextRequest) {
    DATA.forEach(async (item) => {
        await db.insert(ExerciseTable).values({
            courseId: item?.courseId, //Change Course ID depends on course info,
            chapterId: item?.chapterId,
            exerciseId: item?.exerciseId,
            exerciseName: item?.exerciseName,
            exercisesContent: item?.exercisesContent
        })
    })
    return NextResponse.json('Success')
}
