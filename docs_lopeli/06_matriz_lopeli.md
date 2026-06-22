# 06_matriz_lopeli

## Matriz de riesgo

La matriz combina probabilidad e impacto para priorizar riesgos del negocio. En PagaFacil, los tres ataques demostrados tienen impacto alto porque afectan datos financieros, sesiones y disponibilidad del servicio.

### Escala usada

- Probabilidad: 1 a 5
- Impacto: 1 a 5
- Riesgo = Probabilidad × Impacto

### Tabla de evaluación

| Riesgo | Probabilidad | Impacto | Puntaje | Nivel |
| --- | --- | --- | --- | --- |
| SQLi en portal de clientes | 5 | 5 | 25 | Crítico |
| XSS en formulario público | 4 | 4 | 16 | Alto |
| Inyección de comandos en servicio vulnerable | 4 | 5 | 20 | Crítico |
| Exposición de activos transaccionales | 4 | 5 | 20 | Crítico |

### Mapa de calor textual

| Impacto \ Probabilidad | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- |
| 5 | 5 | 10 | 15 | 20 | 25 |
| 4 | 4 | 8 | 12 | 16 | 20 |
| 3 | 3 | 6 | 9 | 12 | 15 |
| 2 | 2 | 4 | 6 | 8 | 10 |
| 1 | 1 | 2 | 3 | 4 | 5 |

### Priorización

1. SQLi y Command Injection como riesgos críticos.
2. XSS como riesgo alto, especialmente por robo de sesión.
3. Activos transaccionales como prioridad de protección transversal.

### Conclusión

La matriz muestra que los hallazgos no se tratan solo por severidad técnica, sino por su efecto sobre continuidad, fraude y confianza del negocio.
