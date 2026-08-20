# Modelo de Áreas para Factorización

Actividad académica de la asignatura **Cálculo 2**, desarrollada como parte de mi formación universitaria.

Este proyecto es una herramienta visual e interactiva que representa gráficamente la factorización de polinomios cuadráticos de la forma **a² + pa + q**, usando un modelo geométrico de áreas (fichas cuadradas y rectangulares) que muestra cómo se construye el rectángulo equivalente a la factorización **(a + m)(a + n)**.

## Ver en vivo

Este repositorio se usa únicamente para publicar el proyecto mediante **GitHub Pages**:

👉 [https://arb369.github.io/modelo-areas-factorizacion/](https://arb369.github.io/modelo-areas-factorizacion/)

## Sobre la actividad

El ejercicio consiste en representar polinomios cuadráticos como una suma de áreas:

- Una ficha cuadrada de área **a²**
- **p** fichas rectangulares de área **a**
- **q** fichas cuadradas unitarias de área **1**

A partir de los coeficientes **p** y **q** ingresados, el modelo busca dos enteros positivos **m** y **n** tales que:

- m · n = q
- m + n = p

Si existen, se arma el rectángulo y se muestra la factorización **(a + m)(a + n)**. Si no existen, la herramienta indica que no es posible construir esa factorización con términos enteros positivos mediante este modelo.

## Tecnologías

- HTML5
- CSS3
- JavaScript (vanilla, sin librerías ni frameworks)
- SVG generado dinámicamente para el diagrama de áreas

## Nota

Este repositorio tiene fines exclusivamente académicos y de publicación mediante GitHub Pages por eso esta escrito en un mismo archivo; no está pensado como un proyecto de software para producción ni mantenimiento continuo.
