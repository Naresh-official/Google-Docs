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
import { templates } from "@/constants/templates";

function TemplateCarousel() {
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

	return (
		<div className="bg-gray-300 p-4 flex justify-center">
			<Carousel
				opts={{ align: "start" }}
				className="lg:max-w-5xl md:max-w-2xl max-w-xl w-full"
			>
				<CarouselContent className="lg:-ml-1">
					{templates.map(({ src, title, initalContent }, index) => (
						<CarouselItem
							key={index}
							className="pl-3 basis-1/2 md:basis-1/4 lg:basis-1/5"
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
											? () =>
													onTemplateClick(
														title,
														initalContent ?? ""
													)
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

export default TemplateCarousel;
