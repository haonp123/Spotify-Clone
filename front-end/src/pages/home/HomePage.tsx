import React, { useEffect } from "react";

import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedSection from "./components/FeaturedSection";
import SectionGrid from "./components/SectionGrid";
import { ScrollArea } from "@/components/ui/scroll-area";

const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    madeForYouSongs,
    trendingSongs,
  } = useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  return (
    <div className="h-full rounded-md overflow-hidden">
      <Topbar />
      <div className="bg-zinc-900 h-full">
        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good afternoon</h1>
            <FeaturedSection />

            <div className="space-y-8">
              <SectionGrid isLoading={isLoading} title="Made For You" songs={madeForYouSongs} />
              <SectionGrid isLoading={isLoading} title="Trending" songs={trendingSongs} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default HomePage;
