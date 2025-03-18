import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-100 !py-12 !px-4 md:!px-8">
      <div className="!mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 !gap-8">
          {/* Contact Column */}
          <div className="!space-y-4">
            <h3 className="text-xl font-medium text-gray-800">Contact</h3>

            <div className="!space-y-1">
              <p className="text-gray-700">Email</p>
              <p className="text-gray-900">info@farmer.asia</p>
            </div>

            <div className="!space-y-1">
              <p className="text-gray-700">Farmer Helpline (Free Call)</p>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700 !mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <p className="text-gray-900">8808008500800</p>
              </div>
            </div>

            <div className="!space-y-1">
              <p className="text-gray-700">Calling Hours</p>
              <p className="text-gray-900">Sat-Thu, 10AM-06PM</p>
            </div>

            <div className="!space-y-1">
              <p className="text-gray-700">Business Team</p>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <p className="text-gray-900">01302536026</p>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700 !mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <p className="text-gray-900">01784167973</p>
              </div>
            </div>
          </div>

          {/* Location Column */}
          <div className="!space-y-4">
            <h3 className="text-xl font-medium text-gray-800">Location</h3>

            <div className="!space-y-1">
              <p className="text-gray-700 font-medium">Singapore</p>
              <p className="text-gray-900">
                3 Fraser Street #05-24, Duo Tower, 3 Temasek Avenue, Centennial
                Tower, #17-01, Singapore 039190
              </p>
            </div>

            <div className="!space-y-1">
              <p className="text-gray-700 font-medium">Bangladesh</p>
              <p className="text-gray-900">
                8E, Road - 81, Gulshan-2, Dhaka-1212
              </p>
            </div>

            <div className="!space-y-1 !mt-4">
              <p className="text-gray-700">Visiting Hours</p>
              <p className="text-gray-900">Sun-Thu, (Appointment Basis)</p>
            </div>
          </div>

          {/* Business Information Column */}
          <div className="!space-y-4">
            <h3 className="text-xl font-medium text-gray-800">
              Business Information
            </h3>

            <div className="!space-y-1">
              <p className="text-gray-700">Trade License Number</p>
              <p className="text-gray-900">TRAD/DNCC/020837/2022</p>
            </div>

            <div className="!space-y-1">
              <p className="text-gray-700">BIN Number</p>
              <p className="text-gray-900">001730233-0402</p>
            </div>

            <div className="!space-y-1">
              <p className="text-gray-700">DCCI Serial Number</p>
              <p className="text-gray-900">09284</p>
            </div>
          </div>

          {/* Legal Column */}
          <div className="!space-y-4">
            <h3 className="text-xl font-medium text-gray-800">Legal</h3>

            <div className="!space-y-3">
              <Link
                href="#"
                className="flex items-center text-gray-900 hover:text-gray-600 transition-colors"
              >
                <span>Privacy Policy</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              <Link
                href="#"
                className="flex items-center text-gray-900 hover:text-gray-600 transition-colors"
              >
                <span>Terms & Services</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              <Link
                href="#"
                className="flex items-center text-gray-900 hover:text-gray-600 transition-colors"
              >
                <span>Risk Management</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Company Column */}
          <div className="!space-y-4">
            <h3 className="text-xl font-medium text-gray-800">Company</h3>

            <div className="!space-y-3">
              <Link
                href="#"
                className="flex items-center text-gray-900 hover:text-gray-600 transition-colors"
              >
                <span>About Us</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 !ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              <Link
                href="#"
                className="flex items-center text-gray-900 hover:text-gray-600 transition-colors"
              >
                <span>Career</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 !ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              <Link
                href="#"
                className="flex items-center text-gray-900 hover:text-gray-600 transition-colors"
              >
                <span>Gallery</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 !ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              <Link
                href="#"
                className="flex items-center text-gray-900 hover:text-gray-600 transition-colors"
              >
                <span>FAQ</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section with Copyright and Social Icons */}
        <div className="!mt-12 !pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 !mb-4 md:!mb-0">
            Copyright ©2025 <span className="font-medium">Farmer Limited</span>
          </p>

          <div className="flex !space-x-6">
            <Link
              href="#"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>

            <Link
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </Link>

            <Link
              href="#"
              className="text-gray-600 hover:text-blue-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </Link>

            <Link
              href="#"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </Link>

            <Link
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>

            <Link
              href="#"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 20.5c7.5 0 7.5-15 0-15s-7.5 15 0 15z"></path>
                <path d="M5 12h14"></path>
                <path d="M12 4.5v15"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
