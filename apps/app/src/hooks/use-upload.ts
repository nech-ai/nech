import { createClient } from "@nech/supabase/client";
import { upload } from "@nech/supabase/storage";
import { useState } from "react";

export function useUpload() {
	const supabase = createClient();
	const [isLoading, setLoading] = useState(false);

	const uploadFile = async ({
		file,
		path,
		bucket,
	}: { file: File; path: string[]; bucket: string }) => {
		setLoading(true);

		const url = await upload(supabase, {
			path,
			file,
			bucket,
		});

		setLoading(false);

		return {
			url,
			path,
		};
	};

	return {
		uploadFile,
		isLoading,
	};
}
