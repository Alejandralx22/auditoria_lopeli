# 05_activos_lopeli

## Activos de información

Los activos se priorizan según su valor para una fintech como PagaFacil. El criterio principal es el impacto operacional, legal y reputacional de su exposición o alteración.

| Activo | Tipo de dato | Criticidad | Riesgo asociado |
| --- | --- | --- | --- |
| Base de datos de billeteras | Financiero y personal | Crítica | Fuga masiva de datos, fraude y suplantación |
| Historial de transacciones | Auditoría / financiero | Crítica | Manipulación de operaciones o disputas de pagos |
| Tokens y sesiones | Identificadores de sesión | Alta | Secuestro de cuentas y acciones no autorizadas |
| Servidor web | Infraestructura | Crítica | Caída del servicio o ejecución remota de comandos |
| Portal de clientes | Aplicación pública | Alta | XSS, robo de credenciales y deterioro de confianza |

### Riesgos principales por industria

- En una fintech, la confidencialidad protege datos financieros y personales.
- La integridad evita manipulación de saldos y transacciones.
- La disponibilidad sostiene la operación de pagos y transferencias.

### Priorización

1. Base de datos de clientes y billeteras.
2. Historial transaccional.
3. Sesiones y tokens.
4. Servidor web y portal público.

### Conclusión

Los activos más sensibles no son solo los datos, sino la capacidad de operar sin interrupciones ni fraude. Eso define la matriz de riesgo y las prioridades de mitigación.
