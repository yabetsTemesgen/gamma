"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import VideoPlayer from "@/components/common/VideoPlayer";
import error_video from "@/assets/images/error_video.jpg";
import BackIcon from "@/components/icons/BackIcon";

const VideoPlayerPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const videoUrl = searchParams.get("videoUrl") || "";
  const coverImgUrl = searchParams.get("coverImgUrl") || "";
  const title = searchParams.get("title") || "";

  const isValidVideoUrl = (url: string) => {
    if (!url) return false;
    if (url.includes("example.com")) return false;
    return true;
  };

  return (
    <div className="w-full min-h-screen bg-black lg:p-4">
      <div className="relative w-full h-[95vh] lg:h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${coverImgUrl})`,
            filter: "blur(20px)",
          }}
        />
        {isValidVideoUrl(videoUrl) ? (
          <VideoPlayer
            videoUrl={videoUrl}
            onBack={() => router.back()}
            title={title}
          />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Handle invalid video URL case */}
            <div className="absolute top-0 left-0 lg:left-14 z-20">
              <button
                onClick={() => router.back()}
                className="text-white hover:text-gray-300 lg:ml-52"
              >
                <BackIcon />
              </button>
            </div>
            //{" "}
            <Image
              src={error_video.src}
              alt="Error video"
              width={900}
              height={500}
              className="rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayerPage;
