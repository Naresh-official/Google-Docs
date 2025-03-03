"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useMutation } from "convex/react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FullScreenLoader from "./FullScreenLoader";

function DocumentCarousel() {
	const router = useRouter();
	const create = useMutation(api.documents.create);
	const [isCreating, setIsCreating] = useState(false);

	const onTemplateClick = (title: string, initialContent: string) => {
		setIsCreating(true);
		create({ title, initialContent })
			.then((documentId) => {
				router.push(`/documents/${documentId}`);
				setIsCreating(false);
			})
			.catch(() => {
				setIsCreating(false);
			});
	};

	const images = [
		{ src: "/templates/blank-document.svg", title: "Blank Document" },
		{ src: "/templates/business-letter.svg", title: "Business Letter" },
		{ src: "/templates/cover-letter.svg", title: "Cover Letter" },
		{ src: "/templates/letter.svg", title: "Letter" },
		{ src: "/templates/project-proposal.svg", title: "Project Proposal" },
		{ src: "/templates/resume.svg", title: "Resume" },
		{ src: "/templates/software-proposal.svg", title: "Software Proposal" },
	];

	return (
		<div className="bg-gray-300 p-4 flex justify-center">
			<Carousel opts={{ align: "start" }} className="max-w-5xl w-full">
				<CarouselContent className="-ml-1">
					{images.map(({ src, title }, index) => (
						<CarouselItem
							key={index}
							className="pl-3 md:basis-1/2 lg:basis-1/5"
						>
							<div className="rounded-xl overflow-hidden border-2 border-transparent hover:border-primary transition-colors hover:shadow-lg">
								<Image
									src={src}
									alt={title}
									title={title}
									width={400}
									height={400}
									className={`w-full h-auto hover:scale-105 transition-transform ${
										isCreating ? "blur-md" : ""
									}`}
									onClick={
										!isCreating
											? () => onTemplateClick(title, "")
											: undefined
									}
								/>
							</div>
							<p className="p-3 text-primary font-semibold mt-2 capitalize">
								{title}
							</p>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
}

export default DocumentCarousel;
