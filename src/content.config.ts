// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2026 SubLang International <https://www.sublang.xyz>

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const ref = defineCollection({
	// Load Markdown and MDX files in the `src/content/ref/` directory.
	loader: glob({ base: './src/content/ref', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			categories: z.array(z.string()).optional(),
			author: z
				.object({
					name: z.string(),
					email: z.string().email().optional(),
				})
				.optional(),
		}),
});

export const collections = { ref };
