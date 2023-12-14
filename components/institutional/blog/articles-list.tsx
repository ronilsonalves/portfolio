import {useTranslations} from "next-intl";
import {SanityDocument} from "next-sanity";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {formatDate} from "@/lib/formatDate";
import {Button} from "@/components/ui/button";
import {ChevronRightIcon} from "@/components/shared/icons";
import Link from "next/link";
import Sidebar from "@/components/institutional/blog/sidebar";

interface ArticlesListProps {
	posts: SanityDocument[];
	categories?: SanityDocument[];
	language: string;
}

export default function ArticlesList({posts, language, categories}: ArticlesListProps) {
	const t = useTranslations("Articles");
	return (
		<section className="flex flex-col">
			{/*<div className="py-10 lg:px-40 flex flex-row justify-end">*/}
			<div className="py-10 lg:px-20 grid grid-cols-6 gap-2">
				{/*<p className="mb-6 text-lg dark:text-white/70 text-black/70">*/}
				<div className="col-span-6 md:col-span-5">
					<div className="grid grid-cols-1 gap-4 ">
					{posts?.map((post) => (
						<Link
							href={localeURL(language!, post.slug.current)}
							key={post.title}
						>
							<PostCard key={post.title} post={post} locale={language}/>
						</Link>
					))}
					<Button
						variant={"ghost"}
						size={"lg"}
						className="mt-2 hover:animate-pulse self-end"
					>
						{t('Load')}
					</Button>
					</div>
				</div>
				<Sidebar categories={categories}/>
			</div>
			{/* Button load more was here */}
		</section>
	)
}

export function PostCard({post, locale}: { post: SanityDocument, locale?: string }) {
	const t = useTranslations("Articles")
	return (
		<article title={post.title}>
			<Card className="hover:bg-black/5 dark:hover:bg-white/10 dark:border-1">
				<CardHeader>
					<div
						className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">
            <span
							className="absolute inset-y-0 left-0 flex items-center"
							aria-hidden="true"
						>
              <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"/>
            </span>
						<p
							className="text-sm text-gray-500 "
							title={formatDate(new Date(post.publishedAt), locale)}
						>
							{formatDate(new Date(post.publishedAt), locale)}
						</p>
					</div>
					<CardTitle className="h2 text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
						{post.title}
					</CardTitle>
					<CardDescription className="dark:text-white/70 text-black/70">
						{post.summary}
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<Button
						variant={"ghost"}
						size={"sm"}
						className="text-sm"
						title="Read article"
						type="button"
					>
						{t("Card.Read")}
						<ChevronRightIcon />
					</Button>
				</CardFooter>
			</Card>
		</article>
	)
}

function localeURL(locale: string, slug: string) {
	return locale === 'en' || undefined ? `/articles/`+slug : 'articles/' + slug
}