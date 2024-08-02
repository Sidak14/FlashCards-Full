export default function Home() {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center max-h-[1000px]">
        <div class="relative overflow-hidden min-w-[1500px] min-h-[700px]">
          <div class="mx-auto max-w-screen-md py-12 px-4 sm:px-6 md:max-w-screen-xl md:py-20 lg:py-32 md:px-8">
            <div class="md:pe-8 md:w-1/2 xl:pe-0 xl:w-5/12">
              <h1 class="text-3xl text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight dark:text-neutral-200">
                Solving problems for every <span class="text-blue-600 dark:text-blue-500">team</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 dark:text-neutral-500">
                Built on standard web technology, teams use Preline to build beautiful cross-platform hybrid apps in a fraction of the time.
              </p>

              <form className="mt-8">
                <div class="mb-4">
                  <label for="hs-hero-name-2" class="block text-sm font-medium dark:text-white"><span class="sr-only">Full name</span></label>
                  <input type="text" id="hs-hero-name-2" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Full name" />
                </div>

                <div class="mb-4">
                  <label for="hs-hero-email-2" class="block text-sm font-medium dark:text-white"><span class="sr-only">Email address</span></label>
                  <input type="email" id="hs-hero-email-2" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Email address" />
                </div>

                <div class="mb-4">
                  <label for="hs-hero-password-2" class="block text-sm font-medium dark:text-white"><span class="sr-only">Password</span></label>
                  <input type="email" id="hs-hero-password-2" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Password" />
                </div>

                <div class="grid">
                  <button type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Sign up</button>
                </div>
              </form>
            </div>
          </div>

          <div class="hidden md:block md:absolute md:top-0 md:start-1/2 md:end-0 h-full bg-[url('https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')] bg-no-repeat bg-center bg-cover"></div>
        </div>
      </div>
    )
  }
  