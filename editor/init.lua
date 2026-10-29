-- Starts TypeScript 7's language server for TypeScript and JavaScript files:
-- the project's own tsc, run with --lsp --stdio.
vim.lsp.config("tsc", {
  cmd = { "node_modules/.bin/tsc", "--lsp", "--stdio" },
  filetypes = { "javascript", "javascriptreact", "typescript", "typescriptreact" },
  root_markers = { "package-lock.json", ".git" },
})
vim.lsp.enable("tsc")
