export const FeatureShimmer = () => (
    <div className="relative mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-gray-950 animate-pulse" />
      <div className="relative z-10 flex p-8">
        <div className="flex flex-col lg:flex-row items-center w-full max-w-5xl lg:gap-9">
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
            <div className="w-full max-w-[400px] lg:max-w-none lg:h-[590px] bg-gray-900 rounded-[27px] animate-pulse h-[600px] sm:h-[400px]" />
            <div className="bg-gray-900 w-full py-3 px-4 rounded-md mt-4 animate-pulse h-[50px] block md:hidden" />
          </div>
          <div className=" hidden lg:block lg:w-1/2 text-left pl-8 mt-4 lg:mt-0">
            <div className="h-12 bg-gray-900 rounded-md mb-4 animate-pulse w-[200px] sm:w-[300px]" />
            <div className="flex">
              <div className="h-8 w-8 bg-gray-900 rounded-full animate-pulse" />
              <div className="h-8 bg-gray-900 rounded-md ml-2 animate-pulse w-[50px] sm:w-[100px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
