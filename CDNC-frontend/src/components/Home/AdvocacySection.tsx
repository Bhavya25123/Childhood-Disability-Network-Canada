import { Link } from "react-router-dom";

export const AdvocacySection = () => {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-indigo-50 px-6 py-20 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                <i className="ti ti-megaphone mr-2" />
                Advocacy
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Make Your Voice 
                <span className="text-purple-600 block">Heard</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Connect with your local representatives and advocate for better
                support for caregivers. Your voice matters in creating meaningful change.
              </p>
            </div>
            
            <div className="space-y-4">
              <Link
                to="/find-mp"
                className="group flex items-center justify-center gap-3 w-full
                 bg-purple-600 hover:bg-purple-700 hover:text-white
                  text-white px-8 py-4 rounded-xl font-semibold transition-all
                   duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <i className="ti ti-search text-xl" />
                <span>Find Your MP</span>
                <i className="ti ti-arrow-right ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/send-letter"
                className="group flex items-center justify-center gap-3 w-full bg-white hover:bg-gray-50 text-purple-600 border-2 border-purple-200 hover:border-purple-300 px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <i className="ti ti-mail text-xl" />
                <span>Send Advocacy Letter</span>
                <i className="ti ti-arrow-right ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Stats or trust indicators */}
            <div className="flex items-center gap-8 pt-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
              <i className="ti ti-users text-purple-500" />
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-purple-500 mr-2" />
                Join 1000+ advocates
              </span>
              </div>
              <div className="flex items-center gap-2">
              <i className="ti ti-shield-check text-green-500" />
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-purple-500 mr-2" />
                Secure & Private
              </span>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-2xl transform rotate-3 scale-105 opacity-20"></div>
            <img
              src="/images/advocacySection.png"
              alt="Advocacy illustration showing people coming together to make their voices heard"
              className="relative w-full h-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
            />
            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white shadow-lg">
              <i className="ti ti-megaphone text-2xl" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg">
              <i className="ti ti-heart text-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
