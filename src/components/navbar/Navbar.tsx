"use client";
import Image from "next/image";
import Link from "next/link";
import DocumentInput from "./DocumentInput";
import MenubarButtons from "./MenubarButtons";
import { UserButton, OrganizationSwitcher } from "@clerk/clerk-react";

function Navbar() {
	return (
		<div className="flex items-center justify-between px-4">
			<div className="flex items-center gap-4">
				<Link href="/">
					<Image src="/logo.svg" alt="logo" width={40} height={40} />
				</Link>
				<div className="flex flex-col gap-0">
					<DocumentInput />
					<MenubarButtons />
				</div>
			</div>
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
		</div>
	);
}

export default Navbar;
