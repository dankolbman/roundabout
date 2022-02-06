import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  SearchCircleIcon,
  SpeakerphoneIcon,
  UserGroupIcon,
  XIcon,
} from "@heroicons/react/outline";
import { AutoIcon, BicycleIcon, MotorcycleIcon, ScooterIcon } from "./icons";
import MenuItem from "./menu-item";

const navigation = [
  {
    year: 2015,
    name: "The Vietnamese Frontier",
    href: "/trips/VHJpcE5vZGU6MQ==",
    icon: ScooterIcon,
    current: true,
  },
  {
    year: 2017,
    name: "Zuma and The Guptas",
    href: "/trips/VHJpcE5vZGU6Mg==",
    icon: MotorcycleIcon,
    current: false,
  },
  {
    year: 2019,
    name: "Rickshaw Run",
    href: "/trips/VHJpcE5vZGU6Mw==",
    icon: AutoIcon,
    current: false,
  },
  {
    year: 2021,
    name: "Monument Valley",
    href: "#",
    icon: BicycleIcon,
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type LayoutProps = {
  children: JSX.Element;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isCurrent = (item) => {
    return router.asPath === item.href;
  };

  return (
    <>
      <div className="h-full flex">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-stone-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-stone-900-text.svg"
                      alt="Workflow"
                    />
                  </div>
                  <nav aria-label="Sidebar" className="mt-5">
                    <div className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            isCurrent(item)
                              ? "bg-stone-100 text-stone-900"
                              : "text-stone-600 hover:bg-stone-50 hover:text-stone-900",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              isCurrent(item)
                                ? "text-stone-500"
                                : "text-stone-400 group-hover:text-stone-500",
                              "mr-4 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-72">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex-1 flex flex-col min-h-0 border-r border-stone-900 bg-stone-800">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex flex-col items-center flex-shrink-0 px-4 pb-4 text-stone-50">
                  <span className="text-xl font-mono italic">
                    dankolbman(x, y, z)
                  </span>
                  <span className="text-stone-300 text-md font-light">
                    Ben and Dan Biannual Adventures
                  </span>
                </div>
                <div className="relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-stone-700" />
                  </div>
                </div>
                <nav className="mt-5 flex-1" aria-label="Sidebar">
                  <div className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <MenuItem key={item.name} item={item} />
                    ))}
                  </div>
                </nav>
              </div>
              <div className="px-2 py-2">
                <a
                  href="https://kolbman.com"
                  className="bg-stone-100 text-stone-800 border-2 border-outside border-double border-blue-500 flex items-center p-2 rounded-md hover:bg-stone-300"
                >
                  <img
                    className="h-16 w-16 ring-4 ring-blue-500 rounded-full object-cover"
                    src="https://kolbman.com/theme/images/profile.jpg"
                  />
                  <div className="ml-4 flex flex-col">
                    <span>Dan Kolbman</span>
                    <span className="font-light underline">kolbman.com</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between bg-stone-50 border-b border-stone-200 px-4 py-1.5">
              <div>dankolbman(x, y, z)</div>
              <div>
                <button
                  type="button"
                  className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-stone-500 hover:text-stone-900"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last max-w-4xl">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
