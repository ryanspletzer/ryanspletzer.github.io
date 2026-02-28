Jekyll::Hooks.register :documents, :post_render do |doc|
  next unless doc.output_ext == ".html"
  doc.output = doc.output.gsub(
    '<pre class="highlight">',
    '<pre class="highlight" tabindex="0" role="region" aria-label="Code block">'
  )
end

Jekyll::Hooks.register :pages, :post_render do |page|
  next unless page.output_ext == ".html"
  page.output = page.output.gsub(
    '<pre class="highlight">',
    '<pre class="highlight" tabindex="0" role="region" aria-label="Code block">'
  )
end
