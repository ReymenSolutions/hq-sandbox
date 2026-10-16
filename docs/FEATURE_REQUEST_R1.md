# Solicitud de ejemplo para el flujo R1 (MVP-0)

**Funcionalidad:** cupones de descuento en el carrito.
- Cupón por porcentaje (0–100 %) o monto fijo, nunca deja el total por debajo de 0.
- Un cupón por carrito; el IVA incluido se recalcula sobre el total ya descontado.
- Montos siempre en centavos enteros; redondeo documentado.

**Criterios de aceptación:** pruebas para porcentaje, monto fijo, cupón mayor que el total, cupón inválido y carrito vacío; `pnpm`/`npm test` y `typecheck` verdes.
