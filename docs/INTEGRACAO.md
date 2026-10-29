# Integração e restrições de homologação

Os endpoints foram identificados na branch `gurpo_permissoes_acesso_usuario` do frontend Vitalis.

- Login real: POST `/api/autenticacao/login`.
- Agenda real: GET `/api/agenda`.
- Sem dados fictícios em ambiente de produção.
- É obrigatório validar o nome real do cabeçalho de contexto de clínica na API.
- Implementar o desafio de segundo fator antes da homologação.
- Implementar autorização específica da flag "App de coleta de dados".
- O SQLite deste primeiro commit não está criptografado. Não testar com dados clínicos sensíveis.
- Não habilitar envio automático até fechar contratos idempotentes e resolução de conflitos na API.
- A fila de sincronização está preparada, mas ainda não possui operações clínicas enfileiradas nem worker ativo.
