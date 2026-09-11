---
title: Eliminación, incluidos los datos derivados
locale: es
number: 4
order: 4
lastUpdated: '2026-09-10'
question: "Si una familia nos pide borrar los registros de su hijo, ¿qué se borra exactamente, y eso incluye todo lo que se haya derivado de esos registros?"
whyItMatters: "IDEA (la ley federal de educación para personas con discapacidades) les da a los padres el derecho a que se destruyan los registros que ya no se necesitan; FERPA (la ley federal de privacidad de expedientes educativos) por sí sola no da ese derecho, y la mayoría de las arquitecturas de modelos no lo puede cumplir. Un proveedor que ya metió el texto de un IFSP (el plan individualizado de servicios para la familia) en un almacén de embeddings que conserva no puede devolverle a una familia lo que ya aprendió del expediente del niño. Para un concesionario de Head Start (el programa federal de educación temprana), 45 CFR 1303.21(b) reemplaza la subparte de privacidad de Head Start con la confidencialidad de IDEA Part B o Part C para cualquier niño referido o declarado elegible bajo IDEA, en cualquier concesionario. Así que este derecho puede alcanzar a un programa que creía estar del todo fuera de IDEA."
authorities:
  - "IDEA confidentiality — parental right to destruction of records no longer needed"
  - "45 CFR 1303.21(b) — IDEA Part B/C confidentiality displaces Head Start Subpart C for any child referred to or eligible under IDEA"
  - "45 CFR 1303 Subpart C — parent inspection, amendment and destruction"
governs: ['custody', 'standing']
translationPending: true
---

Una respuesta real recorre los datos: el registro en la base de datos, las copias en los
respaldos y en qué calendario vencen, las exportaciones que ya se enviaron a otros
sistemas, y todo lo que se construyó con ese registro: embeddings, índices, pesos de
modelos, resúmenes guardados en caché. Termina con un plazo y una confirmación por
escrito que usted le pueda entregar a la familia.

Una evasiva se detiene en la pantalla. «Los registros borrados se quitan de su cuenta»
describe lo que usted puede ver, no lo que la empresa todavía guarda. «Anonimizado» y
«agregado» son las dos palabras sobre las que hay que insistir: pregunte si lo que se
derivó del registro se puede rastrear de vuelta hasta el niño, y si le dicen que no,
pregunte cómo lo comprobaron.

Anote la fecha en que el proveedor le dio esta respuesta. La forma de borrar cambia con
la arquitectura, y la respuesta que le dieron en 2026 no se renueva sola.
