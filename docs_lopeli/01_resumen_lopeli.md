# 01_resumen_lopeli

## Resumen Ejecutivo: PagaFacil

PagaFacil es una fintech ficticia de billetera digital y pagos que procesa saldos, transferencias y datos bancarios de clientes. Para esta auditoría, el objetivo es identificar cómo fallas web típicas se convierten en riesgos de negocio cuando afectan confidencialidad, integridad y disponibilidad.

La revisión se realiza sobre DVWA en un entorno controlado, con tres ataques demostrados: SQL Injection, XSS reflejado e Inyección de comandos. Cada hallazgo se interpreta en función del impacto que tendría sobre una empresa de servicios financieros.

### Alcance

- Portal de clientes expuesto en la aplicación vulnerable.
- Evidencia de explotación con payload visible y resultado observable.
- Evaluación de severidad con CVSS v3.1.
- Medidas de prevención, mitigación y recuperación.

### Activos principales del negocio

- Base de datos de billeteras y usuarios.
- Historial de transacciones.
- Tokens y referencias bancarias.
- Disponibilidad del portal y del servidor web.

### Conclusión

El riesgo crítico no proviene solo de la vulnerabilidad técnica, sino del contexto: en una fintech, una fuga de datos o una ejecución remota puede traducirse en fraude, pérdida de confianza y detención operativa.
