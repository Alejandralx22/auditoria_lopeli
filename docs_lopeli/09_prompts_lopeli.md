# 09_prompts_lopeli

## Bitácora de uso de IA

Esta bitácora registra el uso de IA como apoyo para redactar, estructurar y validar el informe. La responsabilidad final del contenido sigue siendo del autor.

### Prompt 1

- Herramienta: GitHub Copilot
- Sección: Resumen y arquitectura general
- Prompt usado: “Redacta un resumen ejecutivo para una auditoría web de una fintech ficticia llamada PagaFacil, destacando portal de clientes, activos críticos y contexto de negocio.”
- Qué se aceptó: la estructura general y el tono técnico.
- Qué se corrigió: se ajustó el lenguaje para que no fuera genérico y se alineó al contexto financiero.

### Prompt 2

- Herramienta: GitHub Copilot
- Sección: SQL Injection
- Prompt usado: “Explica por qué funciona una SQLi con payload `' OR '1'='1` en DVWA, incluye CVSS 3.1 y defensas como consultas parametrizadas.”
- Qué se aceptó: explicación técnica y sugerencia de severidad.
- Qué se corrigió: se reforzó el impacto para PagaFacil y se evitó lenguaje ambiguo.

### Prompt 3

- Herramienta: GitHub Copilot
- Sección: XSS e Inyección de comandos
- Prompt usado: “Describe XSS reflejado y command injection en una aplicación web vulnerable, con recomendaciones de prevención y mitigación.”
- Qué se aceptó: el enfoque por capas de defensa.
- Qué se corrigió: se reemplazaron ejemplos genéricos por payloads concretos del laboratorio.

### Reflexión final

La IA ayudó a ordenar y sintetizar, pero la calidad final dependió de verificar cada hallazgo contra la pauta, el laboratorio DVWA y el contexto de negocio de la empresa ficticia.
