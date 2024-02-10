import Image from "next/image";
import avatar from "@/media/images/avatar.jpg";

export default function Avatar() {
  return (
    <div className="mt-12 lg:pl-20">
      <div className="max-w-xs px-2.5 lg:max-w-none">
        <Image
          alt="Ronilson Alves profile photo"
          src={avatar}
          sizes="(min-width: 1024px) 32rem, 20rem"
          className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
          priority={true}
        />
      </div>
    </div>
  );
}
