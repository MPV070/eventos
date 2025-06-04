-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 04-06-2025 a las 08:59:51
-- Versión del servidor: 8.0.41
-- Versión de PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `LyricMenu`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE `evento` (
  `id` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `url_imagen` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ubicacion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `plazas_disponibles` int NOT NULL,
  `plazas_totales` int NOT NULL
) ;

--
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`id`, `nombre`, `url_imagen`, `descripcion`, `ubicacion`, `fecha`, `hora`, `precio`, `plazas_disponibles`, `plazas_totales`) VALUES
(1, 'Romeo y Julieta', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nytimes.com%2F2016%2F12%2F29%2Farts%2Fmusic%2Fmetropolitan-opera-bartlett-sher-gounod-romeo-et-juliette.html&psig=AOvVaw3gHB3aE_QjoF-Obbx2LwZu&ust=1748519022604000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPDliIyLxo0DFQAAAAAdAAAAABAE', 'Redescubre esta clásica historia de amor, especial para jóvenes audiencias.', 'Maestranza de Sevilla. Paseo de Cristóbal Colón, 22, 41001, Sevilla.', '2025-07-17', '20:30:00', 12.95, 200, 200),
(4, 'Tosca', 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fpantallasonora.blogspot.com%2F2023%2F06%2Funa-tosca-deslumbrante-en-lo-escenico-y.html&psig=AOvVaw1QxA410lrjWmC5moFHiL_X&ust=1748520032997000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCNjZm-6Oxo0DFQAAAAAdAAAAABAT', 'Una apasionante ópera de Puccini que mezcla intriga política, amor y traición en la Roma del siglo XIX.', 'Teatro de la Maestranza. Paseo de Cristóbal Colón, 22, 41001, Sevilla.', '2025-05-30', '21:30:00', 50.00, 200, 200);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `id` int NOT NULL,
  `tipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`id`, `tipo`) VALUES
(5, 'admin'),
(3, 'empresa'),
(4, 'estándar'),
(2, 'institución educativa'),
(1, 'organización'),
(6, 'trabajador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `tipo_usuario_id` int NOT NULL DEFAULT '4'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `contraseña`, `tipo_usuario_id`) VALUES
(1, 'Anotonio Pozas Poveda', 'pozaaah@gmail.com', 'SoyElPozas', 6);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tipo` (`tipo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tipo_usuario` (`tipo_usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_tipo_usuario` FOREIGN KEY (`tipo_usuario_id`) REFERENCES `tipo_usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
