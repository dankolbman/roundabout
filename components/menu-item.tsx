import { useRouter } from "next/router";
import Link from "next/link";

type MenuItemProps = {
  item: any;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const MenuItem = ({ item }: MenuItemProps) => {
  const router = useRouter();
  const isCurrent = (item) => {
    return router.asPath === item.href;
  };

  return (
    <Link href={item.href}>
      <a
        key={item.name}
        className={classNames(
          isCurrent(item)
            ? "bg-stone-600 text-stone-50"
            : "text-stone-200 hover:bg-stone-200 hover:text-stone-900",
          "group flex items-center px-2 py-2 rounded-md"
        )}
      >
        <item.icon
          className={classNames(
            isCurrent(item)
              ? "text-stone-300"
              : "text-stone-400 group-hover:text-stone-700",
            "mr-3 h-12 w-12"
          )}
          aria-hidden="true"
        />

        <div className="flex flex-col">
          <span className="text-sm text-stone-400">{item.year}</span>
          <span className="font-medium">{item.name}</span>
        </div>
      </a>
    </Link>
  );
};

export default MenuItem;
