import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ToolbarButtonProps {
	onClick?: () => void;
	isActive?: boolean;
	icon: LucideIcon;
	label: string;
}

function ToolbarButton({
	onClick,
	isActive,
	icon: Icon,
	label,
}: ToolbarButtonProps) {
	return (
		<Button
			onClick={onClick}
			className={cn(
				"p-1.5 bg-gray-100 text-black min-w-10",
				isActive
					? "bg-primary text-white"
					: " hover:bg-primary/20 hover:border-gray-500 hover:border"
			)}
			title={label}
		>
			<Icon className="size-4" />
		</Button>
	);
}

export default ToolbarButton;
