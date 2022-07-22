interface MarkdownFrontMatter {
  [prop: string]: string;
}

interface MarkdownDocument {
  frontMatter: MarkdownFrontMatter;
  content: string;
}

interface MarkdownRenderingResult {
  frontMatter: MarkdownFrontMatter;
  html: string;
}