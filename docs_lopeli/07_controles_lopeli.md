# 07_controles_lopeli

## Prevención y mitigación

Las medidas se organizan en controles técnicos y organizacionales. La idea es reducir probabilidad de explotación y limitar el impacto si un incidente ocurre.

### Controles técnicos

- Consultas parametrizadas para SQL.
- Escape contextual y sanitización de salida para XSS.
- Prohibición de llamadas directas a shell con entrada de usuario.
- WAF con reglas específicas para los tres ataques.
- Principio de menor privilegio en base de datos y sistema operativo.
- Cookies seguras con `HttpOnly`, `Secure` y `SameSite`.

### Políticas organizacionales

- Revisión periódica de logs y alertas.
- Gestión de vulnerabilidades con calendario de remediación.
- Capacitación en codificación segura.
- Segregación de ambientes y cuentas.
- Validación de cambios antes de pasar a producción.

### Controles de mitigación

- Segmentación de red para aislar componentes críticos.
- Backups probados y versionados.
- Monitoreo de integridad de archivos y procesos.
- Plan de respuesta ante incidentes con roles definidos.

### Conclusión

El control efectivo no depende de una sola barrera, sino de capas complementarias que detengan explotación, detecten anomalías y reduzcan el daño.
