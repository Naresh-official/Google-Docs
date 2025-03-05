import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/components/ui/menubar";

function MenubarButtons() {
	return (
		<div className="text-sm">
			<Menubar className="ring-0 border-0 ring-offset-0 shadow-none p-0 m-0">
				<MenubarMenu>
					<MenubarTrigger className="text-sm p-1">
						File
					</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>
							New Tab <MenubarShortcut>⌘T</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>New Window</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Share</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Print</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>Edit</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>
							New Tab <MenubarShortcut>T</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>New Window</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Share</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Print</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>Insert</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>
							New Tab <MenubarShortcut>T</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>New Window</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Share</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Print</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>Format</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>
							New Tab <MenubarShortcut>T</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>New Window</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Share</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Print</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	);
}

export default MenubarButtons;
