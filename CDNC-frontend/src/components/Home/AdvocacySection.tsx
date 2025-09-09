import { Link } from "react-router-dom";

export const AdvocacySection = () => {
  return (
    <section className="bg-white px-20 py-16 max-sm:px-5 max-sm:py-10">
      <div className="max-w-screen-xl flex gap-12 items-center mx-auto my-0 max-md:flex-col max-md:px-5 max-md:py-0">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-purple-900">Make Your Voice Heard</h2>
          <p className="text-base text-gray-600 mb-8">
            Connect with your local representatives and advocate for better
            support for caregivers.
          </p>
          <div className="flex flex-col gap-4 max-md:w-full">
            <Link
              to="/find-mp"
              className="text-base w-[600px] flex items-center justify-center gap-2 cursor-pointer bg-purple-light text-purple-900 px-0 py-3 font-bold rounded-lg hover:bg-purple/10 transition-colors max-md:w-full"
            >
              <i className="ti ti-search" />
              <span>Find Your MP</span>
            </Link>
            <Link to="/send-letter" className="text-base w-[600px] flex items-center justify-center gap-2 cursor-pointer bg-gray-100 text-purple-900 font-bold px-0 py-3 rounded-lg hover:bg-gray-200 transition-colors max-md:w-full">
              <i className="ti ti-mail" />
              <span>Send Advocacy Letter</span>
            </Link>
          </div>
        </div>
        <div>
          <img
            src="public/images/advocacySection.png"
            alt="Advocacy illustration"
            className="w-[600px] h-[400px] shadow-[0_4px_6px_rgba(0,0,0,0.05),0_10px_15px_rgba(0,0,0,0.05)] rounded-lg max-md:w-full max-md:h-auto"
          />
        </div>
      </div>
    </section>
  );
};
