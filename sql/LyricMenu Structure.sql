-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 08-06-2025 a las 11:30:45
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
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
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
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `nombre`, `url_imagen`, `descripcion`, `ubicacion`, `fecha`, `hora`, `precio`, `plazas_disponibles`, `plazas_totales`) VALUES
(1, 'Romeo y Julieta', 'https://static01.nyt.com/images/2016/12/30/arts/30gounod-balcony/30gounod-balcony-superJumbo-v2.jpg?quality=75&auto=webp', 'Redescubre esta clásica historia de amor, especial para jóvenes audiencias.', 'Maestranza de Sevilla. Paseo de Cristóbal Colón, 22, 41001, Sevilla.', '2025-07-17', '20:30:00', 12.95, 200, 200),
(4, 'Tosca', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.operaworld.es%2Fwp-content%2Fuploads%2F2023%2F06%2F4473-1243.jpg&f=1&nofb=1&ipt=6ae60690103c004d94ff232101ff0f8c99e78b1ab22723a83c527683ee0a9d92', 'Una apasionante ópera de Puccini que mezcla intriga política, amor y traición en la Roma del siglo XIX.', 'Teatro de la Maestranza. Paseo de Cristóbal Colón, 22, 41001, Sevilla.', '2025-05-30', '21:30:00', 50.00, 200, 200),
(5, 'La del manojo de rosas', 'https://th.bing.com/th/id/OIP.L9GWmkYSQKb5slhgUJyzHQHaEK?r=0&o=7rm=3&rs=1&pid=ImgDetMain', 'Una zarzuela cómica que gira en torno a enredos amorosos en el Madrid de principios del siglo XX.', 'Plaza Tirso de Molina, 1, 28012, Madrid', '2025-09-10', '18:00:00', 78.50, 473, 473),
(6, 'La Traviata', 'https://www.opera-online.com/media/images/avatar/work/2/avatar.jpg', 'Ópera de Verdi sobre el amor y el sacrificio.', 'Teatro Real, Madrid', '2025-10-15', '20:00:00', 90.00, 500, 500),
(7, 'Madama Butterfly', 'https://www.themoviedb.org/t/p/original/bAS8do7OwV633npzcRZYHplLAtR.jpg', 'Ópera de Puccini sobre el amor trágico entre una geisha y un oficial estadounidense.', 'Gran Teatre del Liceu, Barcelona', '2025-09-30', '19:30:00', 85.00, 450, 450),
(8, 'Rigoletto', 'https://media04.kraichgau.news/event/2018/02/02/3/19243_XXL.jpg', 'Ópera de Verdi que narra la historia de un bufón y su hija.', 'Teatro de la Maestranza, Sevilla', '2025-11-20', '20:00:00', 88.00, 400, 400),
(9, 'Turandot', 'https://www.metopera.org/globalassets/discover/synopses/turandot_1020x600.jpg', 'Ópera de Puccini sobre una princesa que desafía a sus pretendientes con acertijos mortales.', 'Palau de les Arts, Valencia', '2025-12-05', '19:00:00', 95.00, 600, 600),
(10, 'Don Giovanni', 'https://assets.website-files.com/5c0b3d8136137d8216db57a7/5d7ba0a51e2e7d119f4730e8_Don-Giovanni-19-20-Season4.jpg', 'Ópera de Mozart sobre el legendario seductor Don Juan.', 'Teatro Campoamor, Oviedo', '2025-10-25', '20:30:00', 92.00, 350, 350),
(11, 'Carmen', 'https://dbss.org/wp-content/uploads/2016/06/Carmen-1-1.jpg', 'Ópera de Bizet sobre la pasión y el destino de una gitana sevillana.', 'Teatro Villamarta, Jerez', '2025-09-18', '19:00:00', 80.00, 300, 300),
(12, 'El Barbero de Sevilla', 'https://cartujacenter.com/wp-content/uploads/2020/01/el-barbero-de-sevilla-opera_09.jpg', 'Ópera cómica de Rossini sobre el astuto barbero Figaro.', 'Teatro de la Zarzuela, Madrid', '2025-08-22', '18:30:00', 75.00, 350, 350),
(13, 'Fausto', 'https://th.bing.com/th/id/R.c45e59972f73c768f71b2d2b331b8a13?rik=RBeiHY%2fQP6ff0A&riu=http%3a%2f%2fmetopera.org%2fglobalassets%2fdiscover%2feducation%2feducator-guides%2ffaust%2ffaust.1600x685.jpg&ehk=qjI6eKZBnxFCPmXJyHKMTl2uHm%2fK42aTsgXTm5Nvaqw%3d&risl=&pid=ImgRaw&r=0', 'Ópera de Gounod basada en la obra de Goethe.', 'Auditorio Nacional, Madrid', '2025-11-10', '20:00:00', 89.00, 500, 500);

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
(1, 'Anotonio Pozas Poveda', 'pozaaah@gmail.com', 'SoyElPozas', 6),
(2, 'María Pérez Vaca', 'mpv@lyricMenu.com', 'ShoyUmDinhoçaur10', 5),
(3, 'Javier García López', 'javier@gmail.com', 'javierOpera', 4),
(4, 'Marta López Fernández', 'marta@business.com', 'Emp4rsT34m!', 3),
(5, 'Alejandro Torres Ramírez', 'alejandro@standard.com', 'St4ndAcc3ss!', 4),
(6, 'Clara Fernández Pérez', 'clara@edu.org', 'EduL34rn1ng!', 2),
(7, 'Diego Ramírez Sánchez', 'diego@org.net', 'Org4n1zC0de!', 1),
(8, 'Raquel Martín Herrera', 'raquel@lyricMenu.com', 'W0rkFl0w!', 6),
(9, 'José Pérez Vázquez', 'jose@gmail.com', 'Adm1n2025!', 4),
(10, 'Laura Gómez Navarro', 'laura@business.com', 'Bus1n3ssTr4ck!', 3),
(11, 'Sergio Álvarez Torres', 'sergio@gmail.com', 'St4ndUs3r!', 4),
(12, 'Elena Navarro Ruiz', 'elena@edu.org', 'Sch00lP4ss!', 2),
(23, 'María Pérez Vaca', 'ferffw@gmail.xom', 'ef2ef', 4),
(24, 'Juan Carlos Muñoz Soto', 'juanco@standar.com', '1234', 4),
(25, 'sflekwpoe', 'fweokfw@fkwjfewi.com', 'ewfCF', 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
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
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

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
