import Search from "@/components/blog/search/search";

interface ArticleListProps {
  language: string;
}

/*
 * ArticleList component
 * This component is used to display the list of articles
 * It contains the search component and the sidebar
 * @param {string} language - The current language
 * @returns {JSX.Element} - The searchable article list component
 */
export default function ArticleList({ language }: ArticleListProps) {
  return (
    <section className="flex flex-col">
      <div className="grid grid-cols-6 gap-8 py-10 lg:px-20">
        <div className="col-span-6">
          <div className="grid grid-cols-1 gap-8">
            <Search language={language} />
          </div>
        </div>
      </div>
    </section>
  );
}
