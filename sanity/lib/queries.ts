import { groq } from "next-sanity";

// Get all posts
export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...5]{
    _id, title, slug, publishedAt, summary, language
  }`;

// Get last 5 posts by language
export const postsByLangQuery = groq`*[_type == "post" && language == $language] | order(publishedAt desc)[0...5]{
  _id,
  title,
  slug,
  publishedAt,
  summary,
}`;

// Get last 6 posts by category slug
export const postsByCategoryQuery = groq`*[_type == "post" && $category in categories[]->slug.current] | order(publishedAt desc)[0...6]{
	_id,
	title,
	slug,
	publishedAt,
	summary,
}`;

// Get a single post by its slug
export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
		_id,
    title,
    "author": author->{name, image, bio},
    publishedAt,
    mainImage,
    summary,
    body,
    "categories": categories[]->title,
    language,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    	slug,
    	language
  	}
  }`;

// Get all categories by language
export const allCategoriesQuery = groq`*[_type == "category"][]{
	_id,
	"slug": slug.current,
	"title": title[_key == $language][0].value,
}`;

// Get all post slugs
export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`;

// Get the author
export const authorQuery = groq`*[_type == "author" && slug.current == $slug][0]{ 
    name, image
  }`;

// TODO: Remove filter by language and slug, use only slug and show a message if the page content is different from the current language
export const pageWithTranslationsQuery = groq`*[_type == "page" && slug.current == $slug && language == $locale][0]{
  _id,
  _type,
  title,
  overview,
  timelines,
  body,
  slug,
  language,
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    slug,
    language
  }
}`;

