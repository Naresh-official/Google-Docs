import Image from "next/image";
import Link from "next/link";
import { UserButton, OrganizationSwitcher } from "@clerk/clerk-react";

function HomeNavbar() {
	return (
		<nav className="flex items-center px-4 justify-between">
			<Link href="/">
				<Image src="/logo.svg" alt="logo" width={50} height={50} />
			</Link>
			<div>
				<OrganizationSwitcher
					afterCreateOrganizationUrl="/"
					afterLeaveOrganizationUrl="/"
					afterSelectOrganizationUrl="/"
					afterSelectPersonalUrl="/"
					appearance={{
						elements: {
							organizationSwitcherTrigger: "h-10",
							avatarBox: "w-8 h-8",
						},
					}}
				/>
				<UserButton
					appearance={{
						elements: {
							userButtonBox: "w-10 h-10 ",
							userButtonAvatarBox: "w-10 h-10 ",
						},
					}}
				/>
			</div>
		</nav>
	);
}

export default HomeNavbar;
