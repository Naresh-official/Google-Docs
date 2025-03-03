import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/clerk-react";

function HomeNavbar() {
	return (
		<nav className="flex items-center px-4 justify-between">
			<Link href="/">
				<Image src="/logo.svg" alt="logo" width={50} height={50} />
			</Link>
			<UserButton
				appearance={{
					elements: {
						userButtonBox: "w-10 h-10 ",
						userButtonAvatarBox: "w-10 h-10 ",
					},
				}}
			/>
		</nav>
	);
}

export default HomeNavbar;
