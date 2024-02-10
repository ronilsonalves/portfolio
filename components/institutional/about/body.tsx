import Avatar from "@/components/institutional/about/image";
import { CustomPortableText } from "@/components/shared/custom-portable-text";
import Socials from "@/components/institutional/about/social";

export default function AboutBody(body: any) {
  return (
    <div className="mx-auto max-w-3xl lg:max-w-5xl">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <Avatar />
        <article className="lg:order-first lg:row-span-2">
          <CustomPortableText
            value={body.body}
            paragraphClasses="mt-6 space-y-7 text-xl"
          />
        </article>
        <div className="lg:pl-20">
          <Socials />
        </div>
      </div>
    </div>
  );
}
