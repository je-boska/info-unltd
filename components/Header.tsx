import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='flex justify-between items-center'>
      <Link href='/'>
        <Image
          className='m-2 w-28 md:w-32'
          src='/info-cursive-logo.png'
          alt=''
          width={172}
          height={91}
        />
      </Link>
      <nav className='z-10'>
        <ul className='fixed top-4 right-4 flex text-base md:text-xl border border-black bg-infoGray'>
          <NavLink title='RELEASES' link='/' />
          <NavLink title='EVENTS' link='/events' />
          <NavLink title='INFO' link='/info' />
        </ul>
      </nav>
    </header>
  );
}

function NavLink({ title, link }: { title: string; link: string }) {
  return (
    <Link href={link}>
      <li className='hover:text-white hover:bg-black p-2'>{title}</li>
    </Link>
  );
}
