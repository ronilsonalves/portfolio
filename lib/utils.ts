import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {SanityDocument} from "next-sanity";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPostCategories(post: SanityDocument): string[] {
  const {language} = post;
  return post?.categories?.map((category: any) => {
    return category[0]._key === language ? category[0].value : category[1].value;
  });
}