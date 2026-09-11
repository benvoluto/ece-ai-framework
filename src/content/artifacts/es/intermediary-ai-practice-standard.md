---
title: Estándar de práctica de IA para intermediarios
locale: es
audience: CDFI · R&R · T&TA
summary: "El estándar que un intermediario (un CDFI, una agencia de R&R o un proveedor de T&TA) adopta para su propia IA: en el préstamo y la evaluación crediticia, en el monitoreo del portafolio y la priorización del acompañamiento, y en el análisis de las notas de acompañamiento, más lo que puede y lo que no puede cambiar cuando entrega bajo su propio nombre los documentos dirigidos a los proveedores."
lastUpdated: '2026-09-10'
order: 16
length: long
forWhom: ['intermediary']
tiers: [1, 2, 3]
governs: ['consequence', 'standing', 'custody', 'language', 'currency']
phase: 2
translationPending: true
---

**Este es un borrador de trabajo sin revisar. No lo ha revisado ningún abogado.
No constituye asesoría legal ni una opinión de cumplimiento sobre préstamos
justos (fair lending). Es texto listo para adoptarse: fírmelo, féchelo,
publíquelo y cambie lo que su abogado le diga que cambie.**

Adoptado por [NOMBRE DE LA ORGANIZACIÓN] el [FECHA]. Publicado en
[DIRECCIÓN WEB]. Se revisa cada [12 MESES].

## 1. Alcance, y por qué necesitamos nuestro propio estándar

[NOMBRE DE LA ORGANIZACIÓN] está de los dos lados de esto. Somos usuarios de IA
en nuestros propios préstamos, en la administración de nuestro portafolio y en
nuestro acompañamiento, y somos un canal por el que la orientación sobre IA
llega a los proveedores a los que servimos. Este estándar cubre lo primero. La
Sección 7 cubre lo segundo.

La diferencia que hace necesario un estándar aparte es esta: la IA de un
proveedor toma decisiones sobre niños. Nuestra IA toma decisiones sobre
proveedores. Esos son riesgos distintos y no comparten remedio. Un marco escrito
para evitar que una aplicación de observación le ponga una puntuación a un niño
de tres años no dice nada útil sobre un modelo de evaluación crediticia que le
pone una puntuación a un negocio de cuidado infantil en el hogar, y quienes
tenemos ese modelo de evaluación crediticia somos nosotros.

Este estándar aplica a todo uso de IA, de aprendizaje automático o de apoyo
automatizado a la toma de decisiones por parte de [NOMBRE DE LA ORGANIZACIÓN],
su personal y sus contratistas, en:

- préstamos, evaluación y aprobación de crédito (underwriting), calificación
  crediticia, fijación de precios y administración de la cartera;
- monitoreo del portafolio, calificación de riesgo y priorización del
  acompañamiento o de la asistencia técnica;
- análisis de notas de acompañamiento, informes de evaluación y otros registros
  narrativos;
- otorgamiento de subvenciones, decisiones de subadjudicación y revisión de
  solicitantes; y
- operaciones de negocio de rutina: redacción, traducción, horarios,
  investigación.

Usamos la misma clasificación de tres niveles que les pedimos usar a los
proveedores. El Nivel 1 es trabajo que no toca datos que identifiquen a un
proveedor ni a una familia. El Nivel 2 toca datos de negocio de un proveedor
identificado. El Nivel 3 es cualquier cosa que alimente una decisión que afecte
el dinero, la posición o la participación de un proveedor. El Nivel 3 requiere
la aprobación por escrito de [PUESTO DESIGNADO] antes de adoptarlo, y otra vez
antes de cualquier cambio en el modelo que está detrás.

## 2. Lo que no vamos a hacer

Esto vale para todos los usos, y no se puede dispensar por un piloto, por un
acuerdo con un proveedor ni por una petición de un financiador.

- **Ninguna negativa automatizada.** Ningún modelo, puntuación ni clasificación
  es la base única ni la base presunta para negar un crédito, negar una
  subvención, sacar a un proveedor de nuestro portafolio o imponer cualquier
  sanción. Vea la Sección 3.
- **Ninguna inferencia sobre niños.** No adoptamos, no financiamos ni revendemos
  ninguna herramienta que infiera emociones, afecto o nivel de participación de
  los niños, y no analizamos imágenes, video, voz ni expedientes de evaluación
  de niños en ningún sistema de IA.
- **Ninguna puntuación oculta de los proveedores.** No mantenemos una
  calificación generada por un modelo sobre un proveedor que ese proveedor no
  pueda ver. Vea la Sección 4.
- **Ningún identificador de niños o de familias en herramientas de uso
  general.** Los registros narrativos que nombran a un niño o a una familia no
  entran nunca a una cuenta de IA de consumo.
- **Nada de traducción automática en conversaciones de alto riesgo.** Los cierres
  de préstamo, las explicaciones de acción adversa, las conversaciones de
  reestructuración y de incumplimiento, y cualquier conversación sobre la
  continuidad de un proveedor con nosotros, se hacen con un intérprete
  calificado. La traducción automática es para la comunicación operativa de
  rutina —boletines, recordatorios de fechas límite, avisos de oportunidades— y
  en esas comunicaciones decimos de frente que se tradujeron a máquina y damos
  el nombre de una persona a quien llamar.

## 3. Préstamos y evaluación crediticia

**El riesgo, dicho sin rodeos.** Nuestras prestatarias son de manera
desproporcionada mujeres de color que llevan micronegocios. Los datos
disponibles para calificarlas llevan dentro las desigualdades que el sector ya
tiene: las proveedoras que trabajan en su casa, las proveedoras nuevas y las
proveedoras que están en desiertos de cuidado infantil tienen historiales
crediticios escasos, documentación irregular e historias que a un modelo le
parecen riesgo y que a cualquiera que conozca el sector le parecen el sector. Un
modelo entrenado con a quién le hemos prestado antes va a reproducir a quién le
hemos prestado antes. Esta es la decisión de IA de mayor consecuencia dentro de
nuestro edificio y la tratamos como tal.

**A qué nos comprometemos.**

1. **Revisión de préstamos justos antes de cualquier piloto.** Antes de que un
   modelo de IA o de aprendizaje automático toque una decisión de crédito real
   —incluso en modo sombra, corriendo en paralelo a la evaluación humana—
   completamos por escrito una revisión de préstamos justos que cubre las
   variables de entrada, cuáles de ellas funcionan como sustitutos indirectos,
   la población con la que se entrenó y el efecto esperado sobre las clases
   protegidas. La revisión lleva fecha, la firma [PUESTO DESIGNADO] y se
   conserva. Ningún piloto empieza sin ella.

2. **Una decisión humana en cada negativa.** Cada rechazo lo toma una persona
   evaluadora con nombre que ha revisado el expediente de fondo, no un modelo y
   tampoco una evaluadora que confirma lo que dijo un modelo. Las razones de la
   evaluadora quedan anotadas con sus propias palabras. El resultado de un modelo
   puede alimentar esa decisión; nunca puede ser la decisión, y "el sistema lo
   rechazó" no es una respuesta aceptable para nadie: ni para una prestataria, ni
   para un financiador, ni para un examinador, ni para nosotros.

3. **La acción adversa se tiene que poder explicar.** No usamos un modelo cuya
   contribución a una decisión no podamos explicar. Cada aviso de acción adversa
   declara las razones principales y específicas de la decisión, en lenguaje
   sencillo con el que la prestataria pueda hacer algo, y esas razones son las
   razones reales, no una lista genérica. Si no podemos decir por qué un modelo
   trató a una solicitante como la trató, no usamos ese modelo en decisiones de
   crédito.

4. **Pruebas de impacto dispar sobre nuestro portafolio real.** Antes de ponerlo
   en marcha, y por lo menos cada [12 MESES] después, probamos los resultados
   —tasa de aprobación, precio, monto aprobado frente al monto solicitado y
   tiempo hasta la decisión— desglosados por raza y etnia, por género y por
   idioma donde la ley nos permita tenerlos, y por características del proveedor
   que en este sector cargan impacto dispar: en el hogar frente a en un centro,
   años de operación y ubicación en un desierto de cuidado infantil. Las pruebas
   se hacen sobre nuestro propio portafolio y nuestros propios solicitantes, no
   sobre el punto de comparación del proveedor de la herramienta. La auditoría
   de equidad de un proveedor no sustituye esto y no la aceptamos como
   sustituto.

5. **Una condición de alto, escrita antes de empezar.** Cada piloto de un modelo
   declara por adelantado el umbral de disparidad, la tasa de error o el patrón
   de resultados inexplicables con el que paramos. [PUESTO DESIGNADO] lo puede
   parar sin convocar a nadie. La condición de alto la escribimos antes de que
   empiece el piloto, porque nadie en la historia la ha escrito durante.

6. **La solicitante lo sabe.** Nuestros materiales de solicitud dicen, en
   lenguaje sencillo, si se usan herramientas automatizadas para evaluar una
   solicitud, qué miran, y que una persona decide. Una solicitante puede pedir
   las razones detrás de una decisión y las recibe.

## 4. Monitoreo del portafolio y priorización del acompañamiento

Decidir en qué orden mandar ocho asesores entre cuatrocientos proveedores es un
uso defendible de los datos que ya tenemos: tendencias de inscripción, patrones
de facturación de subsidios, historial de licencias, tiempo desde el último
contacto. También es lo más parecido en toda nuestra operación a una decisión
sobre quién merece ayuda, así que lleva nuestra protección más fuerte.

1. **Puede dirigir apoyo. Nunca puede dirigir consecuencias.** El resultado de un
   modelo de priorización se puede usar para darle prioridad a un contacto,
   ofrecer acompañamiento o dirigir un recurso. No se puede usar, ni directa ni
   indirectamente, como base para una sanción, una negativa de financiamiento,
   un cambio de tasa, la exigencia de un convenio del contrato de préstamo, una
   salida del portafolio, una referencia a una agencia de licencias o a un
   financiador, ni ningún reporte desfavorable sobre un proveedor. El lugar que
   una proveedora ocupa en una lista de priorización no entra a su expediente
   crediticio, y la lista no es visible para quienes evalúan el crédito.

2. **Cada proveedora puede ver lo que el sistema dice sobre ella y refutarlo.**
   Cuando lo pida, le decimos a una proveedora cuál es su calificación de riesgo
   o su lugar de priorización en ese momento, los factores principales que lo
   producen, y cuándo se actualizó por última vez. Ella puede mandar una
   corrección o una explicación; una persona la revisa dentro de
   [15 DÍAS HÁBILES], anota el resultado y le dice qué cambió. Las correcciones
   se aplican a los datos de fondo, no solo al relato que se hace sobre ellos.

3. **Probamos el modelo buscando el sesgo que es más probable que tenga.** Por
   lo menos cada [12 MESES] probamos si el modelo coloca de manera sistemática a
   las proveedoras que trabajan en su casa, a las proveedoras nuevas o a las
   proveedoras en desiertos de cuidado infantil como menos dignas de ayuda, y
   publicamos el resultado de esa prueba en nuestro informe anual bajo la
   Sección 6. El problema del historial crediticio escaso es real aquí y apunta
   al lado equivocado: las proveedoras con menos documentación con frecuencia
   son las que más necesitan una asesora. Donde encontremos ese patrón,
   corregimos el modelo o dejamos de usarlo; no le ponemos una nota al margen
   para rodearlo.

4. **A los asesores se les dice qué es la lista y qué no es.** El resultado de la
   priorización le llega a un asesor con la etiqueta de sugerencia, con sus
   factores principales anexos y con la fecha de los datos que hay detrás. Un
   asesor puede ignorarlo y no tiene que justificar por qué. Llevamos la cuenta
   de qué tan seguido los asesores contradicen al modelo, porque un modelo que
   nadie contradice es un modelo que nadie está revisando.

## 5. Análisis de las notas de acompañamiento y de asistencia técnica

Años de notas de acompañamiento sobre cientos de proveedores son el insumo más
rico que tenemos para diseñar programas, y leerlas como conjunto es un trabajo
que antes nunca fue costeable. También son texto libre que contiene identidades
de proveedores, dificultades de negocio y, a veces, información de familias y de
niños dicha en confianza.

1. **Desidentifique antes de analizar, o trabaje dentro de un acuerdo.** O se
   quitan los nombres de las proveedoras, los nombres de los negocios, las
   direcciones y cualquier identificador de niños o de familias antes de que el
   texto llegue a una herramienta de IA, o el análisis se hace en un entorno
   aprobado, cubierto por un acuerdo por escrito que prohíbe entrenar con
   nuestros datos —incluido el entrenamiento interno del propio proveedor de la
   herramienta— y que da un borrado que alcanza a los embeddings, a los cachés y
   a los respaldos. No hay una tercera opción, y una cuenta gratuita de consumo
   no es ninguna de las dos.

2. **Los hallazgos describen patrones, nunca personas.** Lo que sale de este
   trabajo describe lo que se repite a lo largo de un portafolio: qué temas se
   agrupan, dónde nuestro modelo de acompañamiento se repite a sí mismo, qué
   siguen pidiendo las proveedoras que nosotros no ofrecemos. Un hallazgo nunca
   se convierte calladamente en una puntuación pegada a una proveedora en
   particular, nunca se vuelve a unir a su expediente, y nunca se usa en una
   decisión de crédito o de portafolio sobre nadie cuyas notas estuvieran en el
   conjunto de textos.

3. **A quienes escribieron las notas se les dice.** Los asesores saben que sus
   notas se analizan, para qué, y cuáles fueron los hallazgos. A las proveedoras
   se les dice, en los materiales del acuerdo de trabajo que ya reciben, que las
   notas de nuestro trabajo conjunto se usan de manera agregada para mejorar
   nuestros programas.

4. **Una persona verifica antes de que algo se publique o se financie.** Un
   hallazgo cualitativo producido por un modelo es una hipótesis. Antes de que
   aparezca en un informe, en una propuesta de financiamiento o en el rediseño
   de un programa, una persona del personal lee suficiente del texto de fondo
   para confirmar que el hallazgo ahí está.

## 6. Publicamos este estándar

Publicamos este estándar completo, en una dirección web estable, en inglés y en
español, y les decimos a las proveedoras dónde encontrarlo en nuestros
materiales de solicitud de préstamo, en nuestras cartas de acuerdo y en nuestros
acuerdos de acompañamiento.

Publicamos cada año: las herramientas de IA que usamos, por nivel; los
resultados de las pruebas de impacto dispar que exige la Sección 3.4; los
resultados de las pruebas de sesgo en la priorización que exige la Sección 4.3;
cuántas refutaciones de proveedores recibimos bajo la Sección 4.2 y cómo se
resolvieron; y cualquier incidente en el que una herramienta produjo algo
materialmente equivocado sobre un proveedor.

La razón es sencilla y la decimos de frente: les pedimos a las proveedoras que
sean transparentes con las familias sobre la IA que afecta a sus niños. No
podemos pedir eso mientras somos opacos sobre la IA que afecta a sus negocios.
Una proveedora a la que estamos evaluando para un crédito tiene derecho a leer
el estándar con el que se la está evaluando.

Las preguntas sobre este estándar van a [NOMBRE], [PUESTO], al
[CORREO ELECTRÓNICO] o al [TELÉFONO]. Una proveedora que crea que una
herramienta nuestra produjo un resultado equivocado sobre ella se lo puede decir
a ese contacto y va a recibir una respuesta por escrito dentro de
[15 DÍAS HÁBILES].

## 7. Poner nuestra marca en los documentos para proveedores

Cuando entregamos bajo nuestro propio nombre los documentos de este marco
dirigidos a proveedores —en una capacitación, en un paquete de herramientas, en
un paquete de acompañamiento o en nuestro sitio web— vale lo siguiente.

**Lo que sí podemos cambiar.**

- Agregar nuestro logo, el nombre de nuestra organización y nuestros datos de
  contacto.
- Agregar una portada o una introducción corta que explique por qué lo estamos
  distribuyendo.
- Insertar datos locales: el contacto de licencias de nuestro estado, la línea
  de intérpretes de nuestro estado, los números de la agencia de recursos y
  referencias de cuidado infantil (R&R) de nuestro estado, y las leyes estatales
  de privacidad que aplican en nuestra zona.
- Ajustar el formato, la tipografía y el tipo de archivo a nuestro estilo de
  casa, y juntar varios documentos en un solo paquete.
- Traducir a los idiomas que hablan nuestras proveedoras, siempre que una
  persona calificada revise la traducción y el documento diga quién la revisó.
- Borrar un documento completo que no le aplique a nuestras proveedoras.

**Lo que no podemos cambiar.**

- Los siete principios y las ocho líneas rojas. No cambian según el tamaño del
  proveedor, ni según el nivel, ni según el intermediario. Son la parte que hace
  que todo lo demás tenga coherencia, y un intermediario que suaviza una de
  ellas ha producido un documento distinto que no debería llevar el nombre de
  este marco.
- La base legal que se declara para cada prohibición. Si no podemos verificar
  una cita, quitamos el pasaje en lugar de decirlo con nuestras propias
  palabras.
- El aviso de que es un borrador de trabajo y de que no lo ha revisado ningún
  abogado. Poner nuestra marca no convierte un borrador en orientación revisada,
  y ponerle nuestro logo tampoco.
- La fecha y la versión propias de cada documento. Se quedan en el documento que
  distribuimos, sin cambios, junto a nuestra propia marca. Una proveedora
  necesita saber qué versión adoptó, y nosotros necesitamos poder avisarle
  cuando esa versión cambie.

**Lo que agregamos en lugar de quitar.** Cuando no estemos de acuerdo con algo
de un documento, lo decimos con nuestra propia voz, en nuestra propia
introducción, firmado, en lugar de editar el documento hasta que esté de acuerdo
con nosotros. Las proveedoras notan la diferencia, y al campo le sirve más un
desacuerdo visible que una edición invisible.

**No nombramos productos.** No le agregamos una herramienta recomendada, un
proveedor preferido ni el producto de un socio a ningún documento que
distribuimos. Nuestras proveedoras toman una recomendación nuestra como un
respaldo, porque lo es, y no tenemos la evidencia para dar uno.

---

Adoptado por: [NOMBRE], [CARGO], [NOMBRE DE LA ORGANIZACIÓN]

Fecha: [FECHA]

Aprobado por la junta directiva el [FECHA]. Próxima revisión: [FECHA].
