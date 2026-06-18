# Floscas Markdown Translation Preprocess Prompt

You are preparing Markdown content for the Floscas translation island.

Parse each Markdown file as an AST. Preserve node order and exact formatting whenever possible.

Translate only natural language in:
- headings
- paragraphs
- blockquotes
- list item prose
- table prose
- image alt text

Do not translate or modify:
- fenced code blocks
- inline code
- math blocks
- inline math
- HTML blocks
- front matter keys
- URLs
- shortcode names
- file paths
- the brand name Floscas

For every translated natural-language node, output an MDX-like paired node:

```mdx
<Translate
  original={<Original>original node content here</Original>}
  target={<Target>translated node content here</Target>}
/>
```

Rules:
- Keep nested emphasis, links, footnotes, and inline formatting stable.
- Do not merge paragraphs.
- Do not split paragraphs unless the original already contains separate nodes.
- Keep code and math nodes exactly as they were.
- If a sentence is ambiguous, prefer a literary but restrained translation.
- Add a build note only in metadata, never inside the article body.
