import { Loader2Icon } from "lucide-react";

interface FullScreenLoaderProps {
	label: string;
}

function FullScreenLoader({ label }: FullScreenLoaderProps) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-primary">
			<Loader2Icon
				size={64}
				className="animate-spin flex items-center justify-self-center"
			/>
			{label && <p className="text-lg font-semibold">{label}</p>}
		</div>
	);
}

export default FullScreenLoader;
