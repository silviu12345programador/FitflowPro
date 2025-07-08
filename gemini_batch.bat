$prompts = @(
  "Explica qué es la energía oscura en tres líneas.",
  "Dame una metáfora divertida sobre ella.",
  "Despídete en japonés."
)

foreach ($p in $prompts) {
  gemini -y -p $p          # <── aquí va tu CLI real
  Write-Host ('-'*60)
}
