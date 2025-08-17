import { authOptions } from "@/app/lib/auth";
import { connectToDatabase } from "@/app/lib/db";
import Video, { IVideo } from "@/app/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    if (!videos || videos.length === 0) {
      return NextResponse.json(
        {
          data: [],
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: videos,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to fetch videos", error);
    return NextResponse.json(
      {
        error: "failed to fetch videos",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const body: IVideo = await request.json();

    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        {
          error: "Missing required field",
        },
        { status: 400 }
      );
    }

    const videoData = {
      ...body,
      controls: body?.controls ?? true,
      transformation: {
        heigjt: 1920,
        width: 1080,
        quality: body?.transformation?.quality ?? 100,
      }
    }

    const newVideo = await Video.create(videoData);

    return NextResponse.json(newVideo)

  } catch (error) {
    return NextResponse.json({
      error: "failed to create video"
    }, {status: 500})
  }
}
