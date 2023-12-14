"use client";

import { useForm } from "react-hook-form";
import { SanityDocument } from "next-sanity";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "@/components/shared/icons";

interface SidebarProps {
  categories?: SanityDocument[];
}
export default function Sidebar({ categories }: SidebarProps) {
  const form = useForm({
    defaultValues: {
      search: "",
    },
  });
  const categoriesList = categories?.map((category) => (
    <Button key={category.title}>{category.title}</Button>
  ));
  return (
    <aside className="hidden md:block col-span-1 xl:col-span-[10%]">
      <div className="mb-8 sticky top-24">
        {/* Search box */}
        <Form {...form}>
          <form className="space-y-2 mb-1.5">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="grid grid-cols-5 gap-0.5">
                  <FormLabel className="text-xl font-bold col-span-5">
                    Searching...
                  </FormLabel>
                  <FormControl className="col-span-4">
                    <Input placeholder="Search" {...field} />
                  </FormControl>
                  <Button
                    type={"submit"}
                    variant={"default"}
                    size={"icon"}
                    className="col-span-1"
                  >
                    <SearchIcon className="w-6 h-6" />
                  </Button>
                </FormItem>
              )}
            />
          </form>
        </Form>
        {/* Categories */}
        <span className="text-xl font-bold mb-1.5">Categories</span>
        <div className={"flex flex-grow justify-center flex-wrap gap-1.5"}>
          {categoriesList}
        </div>
      </div>
    </aside>
  );
}
