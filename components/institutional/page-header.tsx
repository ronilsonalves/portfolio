import { CustomPortableText } from "@/components/shared/custom-portable-text";

interface HeaderProps {
  centered?: boolean;
  description?: any[];
  title?: string;
}
export function PageHeader(props: HeaderProps) {
  const { title, description, centered = false } = props;
  if (!description && !title) {
    return null;
  }
  return (
    <header className={`${centered ? "text-center" : "w-5/6 lg:w-3/5"}`}>
      {/* Title */}
      {title && (
        <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
          {title}
        </h1>
      )}
      {/* Description */}
      {description && (
        <div className="mt-4 text-xl md:text-2xl">
          <CustomPortableText value={description} />
        </div>
      )}
    </header>
  );
}
