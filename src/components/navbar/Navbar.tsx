import Image from "next/image";
import Link from "next/link";
import DocumentInput from "./DocumentInput";
import MenubarButtons from "./MenubarButtons";

function Navbar() {
	return (
		<div className="flex items-center px-4">
			<Link href="/">
				<Image src="/logo.svg" alt="logo" width={40} height={40} />
			</Link>
			<div className="">
				<DocumentInput />
				<MenubarButtons />
			</div>
		</div>
	);
}

export default Navbar;
