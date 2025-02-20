import { ChevronRight } from '@untitled-ui/icons-react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  title?: string;
}

const Breadcrumb = ({ items, title }: BreadcrumbProps) => {
  const defaultItems: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '/' },
    ...items,
  ];

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <span>
        {title && (
          <h3 className="text-title-sm2 font-semibold text-black dark:text-white">
            {title}
          </h3>
        )}
      </span>

      <nav>
        <ol className="flex items-center gap-1">
          {defaultItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {item.href ? (
                <Link
                  className="font-normal text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-300"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-normal text-primary">{item.label}</span>
              )}
              {index < defaultItems.length - 1 && (
                <span className="mx-1">
                  <ChevronRight className="text-xs text-gray-300" />
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
