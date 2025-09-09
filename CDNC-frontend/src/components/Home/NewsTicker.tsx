export const NewsTicker = () => {
  return (
    <div className="max-w-screen-xl mt-[-260px] bg-gray-100 mb-0 mx-auto p-4 rounded-lg max-md:px-5 max-md:py-0">
      <div className="flex items-center gap-4">
        <i className="ti ti-megaphone text-blue-600 text-xl" />
        <div className="flex gap-[42px] text-base text-black max-sm:flex-col max-sm:gap-4">
          <div>
            Latest Discussion: Supporting elderly parents during COVID-19
          </div>
          <div>New Resource: Financial aid guide for caregivers</div>
          <div>Community Event: Virtual support group meeting this Friday</div>
        </div>
      </div>
    </div>
  );
};
