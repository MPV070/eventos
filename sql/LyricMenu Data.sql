-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 10-06-2025 a las 10:21:57
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

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `nombre`, `url_imagen`, `descripcion`, `ubicacion`, `precio`) VALUES
(1, 'Romeo y Julieta', 'https://static01.nyt.com/images/2016/12/30/arts/30gounod-balcony/30gounod-balcony-superJumbo-v2.jpg?quality=75&auto=webp', 'Redescubre esta clásica historia de amor, especial para jóvenes audiencias.', 'Maestranza de Sevilla. Paseo de Cristóbal Colón, 22, 41001, Sevilla.', 12.95),
(4, 'Tosca', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.operaworld.es%2Fwp-content%2Fuploads%2F2023%2F06%2F4473-1243.jpg&f=1&nofb=1&ipt=6ae60690103c004d94ff232101ff0f8c99e78b1ab22723a83c527683ee0a9d92', 'Una apasionante ópera de Puccini que mezcla intriga política, amor y traición en la Roma del siglo XIX.', 'Teatro de la Maestranza. Paseo de Cristóbal Colón, 22, 41001, Sevilla.', 50.00),
(5, 'La del manojo de rosas', 'https://th.bing.com/th/id/OIP.L9GWmkYSQKb5slhgUJyzHQHaEK?r=0&o=7rm=3&rs=1&pid=ImgDetMain', 'Una zarzuela cómica que gira en torno a enredos amorosos en el Madrid de principios del siglo XX.', 'Plaza Tirso de Molina, 1, 28012, Madrid', 78.50),
(6, 'La Traviata', 'https://www.opera-online.com/media/images/avatar/work/2/avatar.jpg', 'Ópera de Verdi sobre el amor y el sacrificio.', 'Teatro Real, Madrid', 90.00),
(7, 'Madama Butterfly', 'https://www.themoviedb.org/t/p/original/bAS8do7OwV633npzcRZYHplLAtR.jpg', 'Ópera de Puccini sobre el amor trágico entre una geisha y un oficial estadounidense.', 'Gran Teatre del Liceu, Barcelona', 85.00),
(8, 'Rigoletto', 'https://media04.kraichgau.news/event/2018/02/02/3/19243_XXL.jpg', 'Ópera de Verdi que narra la historia de un bufón y su hija.', 'Teatro de la Maestranza, Sevilla', 88.00),
(9, 'Turandot', 'https://www.metopera.org/globalassets/discover/synopses/turandot_1020x600.jpg', 'Ópera de Puccini sobre una princesa que desafía a sus pretendientes con acertijos mortales.', 'Palau de les Arts, Valencia', 95.00),
(10, 'Don Giovanni', 'https://assets.website-files.com/5c0b3d8136137d8216db57a7/5d7ba0a51e2e7d119f4730e8_Don-Giovanni-19-20-Season4.jpg', 'Ópera de Mozart sobre el legendario seductor Don Juan.', 'Teatro Campoamor, Oviedo', 92.00),
(11, 'Carmen', 'https://dbss.org/wp-content/uploads/2016/06/Carmen-1-1.jpg', 'Ópera de Bizet sobre la pasión y el destino de una gitana sevillana.', 'Teatro Villamarta, Jerez', 80.00),
(12, 'El Barbero de Sevilla', 'https://cartujacenter.com/wp-content/uploads/2020/01/el-barbero-de-sevilla-opera_09.jpg', 'Ópera cómica de Rossini sobre el astuto barbero Figaro.', 'Teatro de la Zarzuela, Madrid', 75.00);

--
-- Volcado de datos para la tabla `pases`
--

INSERT INTO `pases` (`id`, `evento_id`, `fecha`, `hora`, `plazas_disponibles`, `plazas_totales`) VALUES
(1, 1, '2025-07-17', '20:30:00', 100, 100),
(2, 1, '2025-07-18', '20:30:00', 100, 100),
(5, 1, '2025-07-17', '20:30:00', 100, 100),
(6, 1, '2025-07-18', '20:30:00', 100, 100),
(7, 9, '2025-08-01', '19:00:00', 80, 80),
(8, 9, '2025-08-02', '19:00:00', 80, 80),
(9, 6, '2025-09-10', '18:00:00', 120, 120),
(10, 6, '2025-09-11', '18:00:00', 120, 120),
(11, 4, '2025-05-30', '21:30:00', 200, 200),
(12, 4, '2025-05-31', '21:30:00', 200, 200),
(13, 5, '2025-09-10', '18:00:00', 150, 150),
(14, 5, '2025-09-11', '18:00:00', 150, 150),
(15, 7, '2025-06-10', '00:00:00', 0, 0),
(16, 8, '2025-06-10', '00:00:00', 0, 0),
(17, 10, '2025-06-10', '00:00:00', 0, 0),
(18, 11, '2025-06-10', '00:00:00', 0, 0),
(19, 12, '2025-06-10', '00:00:00', 0, 0);

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

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `contraseña`, `tipo_usuario_id`) VALUES
(1, 'Anotonio Pozos Povodo', 'pozaaah@gmail.com', 'SoyElPozas', 6),
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
(23, 'ferffwa ferffwz ferffwa', 'ferffw@gmail.xom', 'ef2ef', 3),
(24, 'Juan Carlos Muñoz Soto', 'jua0co@standar.com', '1234', 4);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
