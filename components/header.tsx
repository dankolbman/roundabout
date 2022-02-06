import { Fragment } from "react";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  LocationMarkerIcon,
  PencilIcon,
} from "@heroicons/react/solid";

type HeaderProps = {
  title: string;
  year: string;
  location: string;
};

export default function Header({ title, year, location }: HeaderProps) {
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="flex-1 min-w-0">
        <h1 className="text-4xl font-bold leading-7 text-gray-900 sm:text-4xl sm:truncate">
          {title}
        </h1>
        <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-stone-600">
            <CalendarIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-stone-500"
              aria-hidden="true"
            />
            {year}
          </div>
          <div className="mt-2 flex items-center text-sm text-stone-600">
            <LocationMarkerIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-stone-500"
              aria-hidden="true"
            />
            {location}
          </div>
        </div>
      </div>
    </div>
  );
}
