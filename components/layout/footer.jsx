import Link from 'next/link';

function Footer() {
  return (
    <footer className="container mt-10">
      <div className="w-full px-4 sm:px-6">
        <div className="w-full flex py-8 md:py-12 border-t border-gray-200">
          {/* 1st block */}
          <div className="flex items-center justify-start flex-1">
            <div>
              {/* Logo */}
              <Link href="/" className="inline-block" aria-label="Dority">
                <img
                  src="/assets/images/logo.png"
                  alt="Dority"
                  className="w-auto h-14 cursor-pointer"
                />
              </Link>
            </div>
          </div>

          {/* 2th block */}
          <div className="flex-1 text-center">
            <h6 className="text-gray-800 font-medium mb-2">Subscribe</h6>
            <p className="text-sm text-gray-600 mb-4">
              Stay in touch with Dority
            </p>
            <form className="flex justify-center">
              <div className="flex flex-wrap mb-4">
                <div className="">
                  <label className="block text-sm sr-only" htmlFor="newsletter">
                    Email
                  </label>
                  <div className="relative flex items-center max-w-xs">
                    <input
                      id="newsletter"
                      type="email"
                      className="form-input w-full text-gray-800 px-3 py-2 pr-12 text-sm border outline-none"
                      placeholder="Your email"
                      required
                    />
                    <button
                      type="submit"
                      className="absolute inset-0 left-auto"
                      aria-label="Subscribe"
                    >
                      <span
                        className="absolute inset-0 right-auto w-px -ml-px my-2 bg-gray-300"
                        aria-hidden="true"
                      ></span>
                      <svg
                        className="w-3 h-3 fill-current text-blue-600 mx-3 flex-shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* 3rd block */}
          <div className="flex-1 text-right">
            <h6 className="text-gray-800 font-medium mb-2">Find Us</h6>
            <Link
              href="#"
              className="text-sm mb-4"
              onClick={(e) => {
                window.location.href = 'mailto:rbbansal558@gmail.com';
                e.preventDefault();
              }}
            >
              @rbbansal558
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
