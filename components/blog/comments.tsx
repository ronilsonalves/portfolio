import { useEffect, useState } from "react";
import Giscus from "@giscus/react";

interface CommentsProps {
  theme?: string;
  lang?: string;
}

export default function Comments({ theme, lang }: CommentsProps) {
  const [definedTheme, setDefinedTheme] = useState<string>(
    theme ?? "preferred_color_scheme"
  );
  useEffect(() => {
    setDefinedTheme(theme ?? "preferred_color_scheme");
  }, [theme]);
  return (
    <div className="mb-16 mt-8">
      <h3 className="text-2xl font-bold mb-4 dark:text-white">{lang === 'en' ? "💬 Comments": "💬 Comentários"}</h3>
      <Giscus
        id="comments"
        repo="ronilsonalves/portfolio"
        repoId="R_kgDOK0OHGQ"
        category="Comments"
        categoryId="DIC_kwDOK0OHGc4CblAK"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={definedTheme}
        term="Welcome to @giscus/react component!"
        lang={lang ?? "en"}
        loading="lazy"
      />
    </div>
  );
}