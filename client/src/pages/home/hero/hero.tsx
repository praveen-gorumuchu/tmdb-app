import Loading from "@/components/loading/loading";
import { fetchTrendingMovies } from "@/services/movieService";
import React, { useEffect, useState } from "react";
import SwiperComponent from "@/components/swiper/swiper-component";
import { HeroSwiperConfig } from "@/utils/swiper.config";
import { NumberConstant } from "@/constants/Numbers.constant";
import { SwiperDataConfigModel } from "@/components/swiper/swiper-data.model";
import { API_ERROR, StringConstant } from "@/constants/string-constant";
import { ButtonTypeEnum } from "@/models/button.model";
import { env } from "@/config/env";
import "./hero.scss";
import { StorageConst } from "@/constants/storage-constant";
import { IconConst } from "@/utils/icons-mappers";
import { APIResponseModel } from "@/api/apiConfig.model";

export default function Hero() {
  const [heroData, setHeroData] = useState<SwiperDataConfigModel[]>([]);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isError, setError] = useState("");

  useEffect(() => {
    const getTrendingMovieData = async () => {
      const { data, loading, error }: APIResponseModel =
        await fetchTrendingMovies();
      setLoading(loading);
      setSwiperData(data);
      setError(error || API_ERROR.GENERIC_ERROR);
    };
    const storedMovies = sessionStorage.getItem(StorageConst.TRENDING_MOVIES);
    const getMoviesFromSession: SwiperDataConfigModel[] = storedMovies
      ? JSON.parse(storedMovies)
      : [];

    if (getMoviesFromSession.length > NumberConstant.ZERO) {
      setHeroData(getMoviesFromSession);
      setLoading(false);
    } else {
      getTrendingMovieData();
    }
  }, []);

  function setSwiperData(data: any) {
    const heroSwiperData: SwiperDataConfigModel[] = [];
    const movies: any[] = data?.results?.slice(
      NumberConstant.ZERO,
      NumberConstant.FIVE
    ) as Array<any>;
    movies?.forEach((movie: any) => {
      const maxLength = NumberConstant.ONE * NumberConstant.HUNDRED;
      const overviewText = movie?.overview || "";

      const swiperList: SwiperDataConfigModel = {
        title: movie?.title,
        subTitle:
          overviewText.length > maxLength
            ? overviewText.slice(0, maxLength) + "…"
            : overviewText,

        image: `${env.tmdbImgUrl}${movie?.backdrop_path}`,
        buttons: [
          {
            btnName: StringConstant.WATCH_NOW,
            btnType: ButtonTypeEnum.PRIMARY,
          },
          {
            btnName: StringConstant.WATCH_LIST,
            btnType: ButtonTypeEnum.SECONDARY_OUTLINE,
            icon: IconConst.plus,
          },
        ],
      };
      heroSwiperData.push(swiperList);
    });
    sessionStorage.setItem(
      StorageConst.TRENDING_MOVIES,
      JSON.stringify(heroSwiperData)
    );
    setHeroData(heroSwiperData as SwiperDataConfigModel[]);
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="relative h-screen hero-swiper">
      {/* Swiper Carousel */}
      <div className="header-blur" />
      <SwiperComponent
        items={heroData}
        config={HeroSwiperConfig}
        className={""}
      />
    </div>
  );
}
