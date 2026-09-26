import Image from "next/image";
import Link from "next/link";
import style from './SidebarItem.module.css';

type SidebarItemProps = {
  route: string;
  id: number;
  src: string;
  alt: string;
}


export default function SidebarItem({ route, id, src, alt }: SidebarItemProps) {
  return (
    <div className={style.sidebar__item}>
      <Link className={style.sidebar__link} href={`${route}/${id}`}>
        <Image
          className={style.sidebar__img}
          src={src}
          alt={alt}
          width={250}
          height={170}
        />
      </Link>
    </div>
  );
}
