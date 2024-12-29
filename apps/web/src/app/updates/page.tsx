import { Article } from "@/components/article";
import { UpdatesToolbar } from "@/components/updates-toolbar";
import { getBlogPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Updates & Announcements | Nech",
	description:
		"Follow our journey building the future of AI tooling. Product updates, engineering insights, and announcements.",
};

export default async function Page() {
	const data = getBlogPosts();

	const posts = data
		.sort((a, b) => {
			if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
				return -1;
			}
			return 1;
		})
		.map((post, index) => (
			<Article data={post} firstPost={index === 0} key={post.slug} />
		));

	return (
		<div className="flex justify-center py-24 md:py-32">
			<div className="max-w-[980px] w-full">
				<div className="space-y-16">{posts}</div>
			</div>

			<UpdatesToolbar
				posts={data.map((post) => ({
					slug: post.slug,
					title: post.metadata.title,
				}))}
			/>
		</div>
	);
}
