import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const defaultItems: BreadcrumbItem[] = [
    { label: "Dashboard", href: "/" },
    ...items,
  ];

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {defaultItems[defaultItems.length - 1]?.label}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          {defaultItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {item.href ? (
                <Link
                  className="font-medium text-gray-600 hover:text-black"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-primary">{item.label}</span>
              )}
              {index < defaultItems.length - 1 && (
                <span className="mx-2">/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
