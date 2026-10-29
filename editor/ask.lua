-- Opens editor/app.ts, waits for the tsc language server, then prints what it
-- says: the type of `message` on line 2 (a hover) and the errors in the file.
vim.cmd.edit("editor/app.ts")
vim.wait(10000, function()
  return #vim.lsp.get_clients({ bufnr = 0 }) > 0
end)
local client = vim.lsp.get_clients({ bufnr = 0 })[1]
if not client then
  print("no language server attached")
  os.exit(1)
end
print("attached: " .. client.name .. " (" .. table.concat(client.config.cmd, " ") .. ")")
local params = { textDocument = vim.lsp.util.make_text_document_params(0), position = { line = 1, character = 7 } }
local answers = vim.lsp.buf_request_sync(0, "textDocument/hover", params, 10000) or {}
for _, answer in pairs(answers) do
  local text = answer.result.contents.value:gsub("```%w*", ""):gsub("\n", " ")
  print("hover: " .. vim.trim(text))
end
vim.wait(10000, function()
  return #vim.diagnostic.get(0) > 0
end)
for _, d in ipairs(vim.diagnostic.get(0)) do
  print(string.format("error: line %d: TS%s %s", d.lnum + 1, d.code, d.message))
end
