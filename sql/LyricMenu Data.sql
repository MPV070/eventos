-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 05-06-2025 a las 08:02:36
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
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`id`, `nombre`, `url_imagen`, `descripcion`, `ubicacion`, `fecha`, `hora`, `precio`, `plazas_disponibles`, `plazas_totales`) VALUES
(1, 'Romeo y Julieta', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nytimes.com%2F2016%2F12%2F29%2Farts%2Fmusic%2Fmetropolitan-opera-bartlett-sher-gounod-romeo-et-juliette.html&psig=AOvVaw3gHB3aE_QjoF-Obbx2LwZu&ust=1748519022604000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPDliIyLxo0DFQAAAAAdAAAAABAE', 'Redescubre esta clásica historia de amor, especial para jóvenes audiencias.', 'Maestranza de Sevilla. Paseo de Cristóbal Colón, 22, 41001, Sevilla.', '2025-07-17', '20:30:00', 12.95, 200, 200),
(4, 'Tosca', 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fpantallasonora.blogspot.com%2F2023%2F06%2Funa-tosca-deslumbrante-en-lo-escenico-y.html&psig=AOvVaw1QxA410lrjWmC5moFHiL_X&ust=1748520032997000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCNjZm-6Oxo0DFQAAAAAdAAAAABAT', 'Una apasionante ópera de Puccini que mezcla intriga política, amor y traición en la Roma del siglo XIX.', 'Teatro de la Maestranza. Paseo de Cristóbal Colón, 22, 41001, Sevilla.', '2025-05-30', '21:30:00', 50.00, 200, 200),
(5, 'La del manojo de rosas', 'https://www.bing.com/images/search?view=detailV2&insightstoken=bcid_RKouwMa5nIgItEabOOr-nq285J9H.....70*ccid_qi7Axrmc&form=SBIIRP&vsimg=https%3a%2f%2fwww.bing.com%2fimages%2fblob%3fbcid%3dRKouwMa5nIgIqxcxoNWLuD9SqbotqVTdP28&iss=VSI&sbisrc=ImgDropper&idpbck=1&sbifsz=1599+x+900+%c2%b7+52.32+kB+%c2%b7+jpeg&sbifnm=La+del+manojo+de+rosas.jpg&thw=1599&thh=900&ptime=34&dlen=71436&expw=1706&exph=960&selectedindex=0&id=E4A1D8C68382428729EF769ADD1E131E1B6D1C5D&ccid=L9GWmkYS&vt=2&sim=11&simid=608015414265202186&ck=C9AC6DDF4EC187CC5E8C249995C404FD&thid=OIP.L9GWmkYSQKb5slhgUJyzHQHaEK&mediaurl=https%3A%2F%2Fs1.elespanol.com%2F2024%2F11%2F19%2Fel-cultural%2Fescenarios%2Fmusica%2F902420471_251008502_1706x960.jpg&cdnurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.2fd1969a461240a6f9b25860509cb31d%3Frik%3DXRxtGx4THt2adg%26pid%3DImgRaw%26r%3D0&pivotparams=insightsToken%3Dbcid_RKouwMa5nIgItEabOOr-nq285J9H.....70*ccid_qi7Axrmc%26%26cal%3D0%26cat%3D0%26car%3D1%26cab%3D1%26ann%3D%26hotspot%3D', 'Una zarzuela cómica que gira en torno a enredos amorosos en el Madrid de principios del siglo XX.', 'Plaza Tirso de Molina, 1, 28012, Madrid', '2025-09-10', '18:00:00', 78.50, 473, 473),
(6, 'La Traviata', 'https://www.opera-online.com/media/images/avatar/work/2/avatar.jpg', 'Ópera de Verdi sobre el amor y el sacrificio.', 'Teatro Real, Madrid', '2025-10-15', '20:00:00', 90.00, 500, 500),
(7, 'Madama Butterfly', 'https://www.themoviedb.org/t/p/original/bAS8do7OwV633npzcRZYHplLAtR.jpg', 'Ópera de Puccini sobre el amor trágico entre una geisha y un oficial estadounidense.', 'Gran Teatre del Liceu, Barcelona', '2025-09-30', '19:30:00', 85.00, 450, 450),
(8, 'Rigoletto', 'https://media04.kraichgau.news/event/2018/02/02/3/19243_XXL.jpg', 'Ópera de Verdi que narra la historia de un bufón y su hija.', 'Teatro de la Maestranza, Sevilla', '2025-11-20', '20:00:00', 88.00, 400, 400),
(9, 'Turandot', 'https://www.metopera.org/globalassets/discover/synopses/turandot_1020x600.jpg', 'Ópera de Puccini sobre una princesa que desafía a sus pretendientes con acertijos mortales.', 'Palau de les Arts, Valencia', '2025-12-05', '19:00:00', 95.00, 600, 600),
(10, 'Don Giovanni', 'https://assets.website-files.com/5c0b3d8136137d8216db57a7/5d7ba0a51e2e7d119f4730e8_Don-Giovanni-19-20-Season4.jpg', 'Ópera de Mozart sobre el legendario seductor Don Juan.', 'Teatro Campoamor, Oviedo', '2025-10-25', '20:30:00', 92.00, 350, 350),
(11, 'Carmen', 'https://dbss.org/wp-content/uploads/2016/06/Carmen-1-1.jpg', 'Ópera de Bizet sobre la pasión y el destino de una gitana sevillana.', 'Teatro Villamarta, Jerez', '2025-09-18', '19:00:00', 80.00, 300, 300),
(12, 'El Barbero de Sevilla', 'https://cartujacenter.com/wp-content/uploads/2020/01/el-barbero-de-sevilla-opera_09.jpg', 'Ópera cómica de Rossini sobre el astuto barbero Figaro.', 'Teatro de la Zarzuela, Madrid', '2025-08-22', '18:30:00', 75.00, 350, 350),
(13, 'Fausto', 'https://th.bing.com/th/id/R.c45e59972f73c768f71b2d2b331b8a13?rik=RBeiHY%2fQP6ff0A&riu=http%3a%2f%2fmetopera.org%2fglobalassets%2fdiscover%2feducation%2feducator-guides%2ffaust%2ffaust.1600x685.jpg&ehk=qjI6eKZBnxFCPmXJyHKMTl2uHm%2fK42aTsgXTm5Nvaqw%3d&risl=&pid=ImgRaw&r=0', 'Ópera de Gounod basada en la obra de Goethe.', 'Auditorio Nacional, Madrid', '2025-11-10', '20:00:00', 89.00, 500, 500);

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
(12, 'Elena Navarro Ruiz', 'elena@edu.org', 'Sch00lP4ss!', 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
