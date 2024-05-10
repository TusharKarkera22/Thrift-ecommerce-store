import Link from "next/link";

const Footer = () => {
  return (
    <footer className="px-[20px] md:px-[60px] bg-black text-white">
      <div className="xmd:flex justify-between items-center border-b-[1px] border-white pt-[30px] pb-[20px]">
        <h1 className="font-braahOne text-[2rem] font-bold">
          <Link href="/">THRIFT~</Link>
        </h1>
        <ul className="flex flex-col xmd:flex-row gap-[10px] xmd:gap-[20px] xmd:items-center">
          <li>
            <Link href="/">Terms of Service</Link>
          </li>
          <li>
            <Link href="/">Policy Service</Link>
          </li>
          <li>
            <Link href="/">Cookie Policy</Link>
          </li>
          <li>
            <Link href="/">Partners</Link>
          </li>
        </ul>
      </div>
      
    </footer>
  );
};

export default Footer;
