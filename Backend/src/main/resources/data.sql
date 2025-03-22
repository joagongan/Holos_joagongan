INSERT INTO authorities (id, authority) VALUES
(1, 'ADMIN'),
(2, 'CLIENT'),
(3, 'ARTIST');

INSERT INTO clients (id, first_name, username, password, email, phone_number, image_profile, created_user, authority) VALUES
(4, 'client1', 'client1', '$2a$10$bQCIA7E2i4469olxpfn9keJqj22QmiDRZHQ2JbAKWUgYLK7ZgAnae', 'client1@gmail.com', '600619217', NULL, '2025-03-06', 2),
(5, 'Jeenii', 'jeenni', '$2a$10$Kpe6DPMrQ3cVvUX7InB/C.l556UiudzbjVt/u/fhejE5l.hBW6FZi', 'reinapata20@gmail.com', '123456789', NULL, '2025-03-06', 2),
(6, 'Emilio', 'emilio', '$2a$10$14GTyUA2jImRAIvh9p9yNe.2DC818K1/y7CX9VP3hWp4L5gnr9oeS', 'emilio.esp99@gmail.com', '123456789', NULL, '2025-03-06', 2),
(7, 'Rafael', 'rafael', '$2a$10$VnAjVwBaTBSA7pQdjKh5TO4yZOntRUHZHnk8CQg4ecsjsPnSj4U4m', 'dekker.rafa@gmail.com', '123456789', NULL, '2025-03-06', 2),
(8, 'Felix', 'felix', '$2a$10$9.MybxxeKNeN/EpqKZ72OOuGnMqjoDZAz3/GNysTK/yNplP6TuGNW', 'felixsv26@gmail.com', '123456789', NULL, '2025-03-06', 2),
(9, 'Raúl', 'raul', '$2a$10$UTlOxphWadZOLw7WyuRMZegeadUMTxkrImo0M3jEcP8rXCfgKHSAu', 'raullebone@gmail.com', '123456789', NULL, '2025-03-06', 2),
(10,'Joker', 'joker', '$2a$10$ZPprl2mnySEypC2uXfI2ZOr4Erfex0eZnV9rz9I.6aWLKGqCzn5Gy', 'jokerin.escuchame@gmail.com', '123456789', NULL, '2025-03-06', 2),
(11,'Lucas', 'lucas', '$2a$10$R7RUXA5hFWoiQBv86OMum.XIwT8yAoStHGm4Nq8IKDPPdZhyIUjlG', 'lmherencia2003@gmail.com', '123456789', NULL, '2025-03-06', 2),
(12,'Horacio', 'horacio', '$2a$10$27jxOLz1ZiW5JenEP9mAHuUIqqC4ikcpKivs7RctrL./oa6744XBG', 'geko.hor@gmail.com', '123456789', NULL, '2025-03-06', 2),
(13,'Simón', 'simon', '$2a$10$EGnjDiPAHjWq4gqGuHCELu.7dTZC8QfWDomw2U1zqaU2W0zTLWo8y', 'simoncgs03@gmail.com', '123456789', NULL, '2025-03-06', 2),
(14,'Javier', 'javies_pacheco', '$2a$10$jUmsF51W4XktY/h5f8No7OK7N9k4/hEjLq./Fu5WaU64cCqa5UoTW', 'pachecomarquezjavier@gmail.com', '123456789', NULL, '2025-03-06', 2),
(15,'Henrique', 'henrique', '$2a$10$l7lEAGJeP9XKgnG4tR.eFu5urKYqlorQ473Xw7cMP28VCZSgxWvR6', 'henrique.rebolho@gmail.com', '123456789', NULL, '2025-03-06', 2),
(16,'Keegan', 'kaegan', '$2a$10$JMGNjw7FCRg93OpzaNcyoOU487HNsWGA.60t7.tHJR3NjP7YbZinC', 'Kcullen3289@gmail.com', '123456789', NULL, '2025-03-06', 2),
(17,'Carlos', 'carlos', '$2a$10$oLfqIC4SCGAyEbQCzotpE..g/Yl97IXk0bJZfIrdIR7NQPavaL9ci', 'carlosperezsanchez199@gmail.com', '123456789', NULL, '2025-03-06', 2),
(18,'Milagros', 'milagros', '$2a$10$2Dhx/WnQ35ZOC09L7771h.HoEcxCHS/ZXdxN1IWWWAqxKWzDV1Auy', 'milagros.huerta@gm.uca.es', '123456789', NULL, '2025-03-06', 2),
(19,'Patricia', 'patricia', '$2a$10$QGdv6Hh.wwbjZYGnKE0KmudCtbJY14UdUWeRRgIgFlVtSncAQ1ATC', 'kaleta1979@gmail.com', '123456789', NULL, '2025-03-06', 2),
(20,'Daniel', 'daniel', '$2a$10$cVAYXIe9J0UqKLI167aQbei83EPxPG8gunT3LiV8PM5ANzBYws2jm', 'megamagolas@gmail.com', '663522963', NULL, '2025-03-06', 2),
(21,'Rafael', 'rafaelduque', '$2a$10$rJ3r.6r0SxZSSDCCyBS7Oeqz.7sklbP2s7B7fzRor0.4l.RjCQvZm', 'rafduqcol@alum.us.es', '722675760', NULL, '2025-03-06', 2),
(22,'Rafael', 'rafaelcastillo', '$2a$10$9zB4idpob/xWZc6YybjG5OqCtB3C.Pp/EOFUdPzCzHqkNPezKlRqK', 'rafaelcastillocebolla@gmail.com', '671168164', NULL, '2025-03-06', 2),
(23,'Mohamed', 'mohamed', '$2a$10$RoYUv2ZWK/kYWrr59P92AuUlo5Dali9oT7anSHOxjTx0Gj1bbvcqa', 'mohmmedabourihhh@gmail.com', '602171961', NULL, '2025-03-06', 2),
(24,'Enrique', 'enrique', '$2a$10$8D6HccaHzR8D4.nsE6RKCOTXD7TwDmsU0tnoL7I1MpeQUwqM.Iqh2', 'kiquegaraba@gmail.com', '600619217', NULL, '2025-03-06', 2);


INSERT INTO artists (id, first_name, username, password, email, phone_number, image_profile, created_user, num_slots_of_work, table_commisions_price, authority) VALUES
(25,'artist1', 'artist1','$2a$10$.MO2C8rJV3d1pUitY0VV2.Oq7Sb5fquMZdHtFzBreBhc6DQkhpeXG', 'artist1@gmail.com', '1234567890', "/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(26,'Braulio', 'braulio','$2a$10$ssldt91myREpm9HybH8Fjel0lBkM7kUrN4f4Mq7rIcR850lTT5FOG', 'braulioolmedo116@gmail.com', '1234567890', "/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(27,'Claudia', 'claudia','$2a$10$./BmsEgDLEnmNHvE2IzVw.R0OHV9Mx/C472kYE2m.UXS3tvJ.ucLK', 'xlaequis@gmail.com', '1234567890', "/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(28,'Miriam', 'miriam','$2a$10$NNCTIIupNB4bwGoopiJIyeuQEfTs83e5OMwVyhK2pfgA1QmUsZ88C', 'urownmailblik@gmail.com', '1234567890',"/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(29,'Paola', 'paola','$2a$10$U1f34nC6FMdpRR2MARmuSe2z2HtzDCGw2O2gAVlbk21SJCGGikowG', 'pao.saaval@gmail.com', '1234567890',"/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(30,'Victor', 'victor','$2a$10$sYswSMxvEOywMhyWaC0bt.O.uPTnSyzxAT92rz/qvTmNOlG4N8nEe', 'jsjxhwjifyhyyy@gmail.com', '1234567890',"/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(31,'Yellow', 'yellow','$2a$10$KN.AZMXZq9LuaTbwJDn3JuH64f7VdY2yV0EAn.YX2sI3Sa5I5pZXK', 'yell0w.4rtist@gmail.com', '1234567890',"/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(32,'Alex', 'alex','$2a$10$XX3Txv49mAAxtWbcqhjQyu5Ha9PeilkSoNkCkfvDMYSxZsm2t0uxS', 'vsandoval.gd@gmail.com', '1234567890',"/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(33,'Patricia', 'peu','$2a$10$iYEVysKxOQ8mQRfO5Mbh9eykOtZawl4XdiVyUBzD08RxCdEsyFzTW', 'linkaris95@gmail.com', '1234567890',"/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(34,'Izzy', 'izzy','$2a$10$aSFqJY0l/WP5eIveiCytD..v9EoxIWpKGovaIbrupkq1DjWQlbacG', 'artofiz.comms@gmail.com', '1234567890',"/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(35,'Gabriela', 'gabriela','$2a$10$0JsCTov5IDQR2nJvQARKneL1KB6SCdjr1PvGQ88tP5qJvhsT.Z6fa', 'meowm7512@gmail.com', '1234567890',"/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(36,'Alex', 'tesla','$2a$10$Te1gPC9ZOBrsDJ71XphYr.5TbBMgqqea2hRV33u4yE2OB9JfovC96', 'soloparainformatica23@gmail.com', '1234567890',"/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(37,'Gurutze', 'churros','$2a$10$tk9XOUj.3AiCREPRF70xUOp4ExXn4AGpF5yad5ewzCuuug7IGJuqO', 'gurutze.contact@gmail.com', '1234567890',"/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(38,'Damaris', 'damaris','$2a$10$rhUAtnuv7WqW4ufo/a.wkeOzHco2GFWXsvx6WBC.fZdi0swbCERf6', 'damaris.narvaezjimenez@gmail.com', '1234567890',"/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(39,'Sofia', 'rata','$2a$10$4sJMWhxkUDrI4M.uAQ228OM8vYf/wBcJCctAqA.nZXRMgygH02mAy', 'already.dead.baby@gmail.com', '1234567890',"/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(40,'Daniel', 'daniel','$2a$10$x5PArdGNz86t6sqYpM.URevvy/.wE4OYgnGcmcKdmclTf3myUXnGu', 'megamagolas@gmail.com', '663522963', "/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(41,'Rafael', 'rafaelduque','$2a$10$QP6LWLpPFKowv.s67KpaM.w2w0g.hiz3UfW2QcQyqlI7ovWxDr1XK', 'rafduqcol@alum.us.es', '722675760',"/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(42,'Rafael', 'rafaelcastillo','$2a$10$KHEzZb0ioIjGoAYqvUX6G.5q6apcUxxMCY.dLXpnTgZnuFjkMLfdG', 'rafaelcastillocebolla@gmail.com', '671168164',"/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(43,'Mohamed', 'mohamed','$2a$10$/xzsXNtwVMPX4eIu1coLYeBWvN7DDMiuzAE39B3M3fCt1SvVPo73u', 'mohmmedabourihhh@gmail.com', '602171961',"/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3),
(44,'Enrique', 'enrique','$2a$10$tbDdopmXHspY4l2iTHMJl.wFf/btZGataJBHRRdenrDHRSsHh/GlC', 'kiquegaraba@gmail.com', '600619217',"/images/nobita.jpg", '2025-03-06',7, "/images/tableCommisionsPrice.png", 3);

INSERT INTO categories (id, name, description, image) VALUES
(45, 'Painting', 'Artworks created using paint on a surface', "/images/painting_category.jpg"),
(46, 'Digital Art', 'Artworks made using digital tools', "/images/digital_art_category.jpg"),
(47, 'Sculpture', 'Three-dimensional art made by shaping materials', "/images/sculture_art_category.jpg"),
(48, 'Photography', 'Artworks captured using a camera', "/images/abstract_art.jpg"),
(49, 'Printmaking', 'Artworks created by printing techniques like etching or lithography', "/images/ocean_waves.jpg"),
(50, 'Drawing', 'Artworks created using pencils, charcoal, or ink on paper', "/images/starry_night_replica.jpg"),
(51, 'Textile Art', 'Artworks made using fabric, thread, or weaving techniques', "/images/sunset_painting.jpg"),
(52, 'Ceramics', 'Artworks made from clay and hardened by heat', "/images/sunset_painting.jpg"),
(117, 'Abstract Art', 'Artworks that use shapes, colors, and forms to create compositions that don’t represent reality', "/images/abstract_art_category.jpg"),
(118, 'Conceptual Art', 'Art where the idea behind the artwork is more important than the physical object itself', "/images/conceptual_art_category.jpg"),
(119, 'Installation Art', 'Three-dimensional works that are often site-specific and designed to transform a space', "/images/installation_art_category.jpg"),
(120, 'Performance Art', 'Artworks involving live performance, often including visual elements, sound, and movement', "/images/performance_art_category.jpg"),
(121, 'Street Art', 'Visual art created in public locations, typically unsanctioned and often political or social in nature', "/images/street_art_category.jpg"),
(122, 'Video Art', 'Art that uses video technology as its medium, often creating immersive or experimental experiences', "/images/video_art_category.jpg"),
(123, 'Glass Art', 'Artworks made with glass, including sculptures, windows, and other decorative pieces', "/images/glass_art_category.jpg"),
(124, 'Mixed Media', 'Artworks that combine different materials and methods to create a single work of art', "/images/mixed_media_category.jpg");


INSERT INTO works_done(id, artist_id, name, description, price, image) VALUES 
  (53, 25, 'Sunset Painting', 'A beautiful sunset painting', 150.0, "/images/sunset_painting.jpg"), 
  (54, 25, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, "/images/ocean_waves.jpg"), 
  (55, 25, 'Starry Night Replica', 'Inspired by Van Gogh’s Starry Night', 300.0, "/images/starry_night_replica.jpg"), 
  (56, 25, 'Abstract Art', 'A modern abstract composition', 180.0, "/images/abstract_art.jpg"),
  (57, 25, 'Forest Path', 'A peaceful forest pathway', 120.0, "/images/abstract_art.jpg");


INSERT INTO status_kanban_order (id, artist_id, name, order_in_kanban, description, color) VALUES
(8000, 29, 'To Do', 1, 'Tasks that need to be started', '#FF5733'),
(8001, 29, 'In Progress', 2, 'Tasks that are currently being worked on', '#33FF57'),
(8002, 29, 'Completed', 3, 'Tasks that have been finished', '#F1C40F'),
(8003, 29, 'On Hold', 4, 'Tasks that are paused or waiting for approval', '#FFC300'),
(8004, 30, 'To Do', 1, 'Tasks that need to be started', '#FF5733'),
(8005, 30, 'In Progress', 2, 'Tasks that are currently being worked on', '#33FF57'),
(8006, 30, 'Completed', 3, 'Tasks that have been finished', '#F1C40F'),
(8007, 30, 'On Hold', 4, 'Tasks that are paused or waiting for approval', '#FFC300'),
(8008, 31, 'To Do', 1, 'Tasks that need to be started', '#FF5733'),
(8009, 31, 'In Progress', 2, 'Tasks that are currently being worked on', '#33FF57'),
(8010, 31, 'Completed', 3, 'Tasks that have been finished', '#F1C40F'),
(8011, 31, 'On Hold', 4, 'Tasks that are paused or waiting for approval', '#FFC300'),
(8012, 32, 'To Do', 1, 'Tasks that need to be started', '#FF5733'),
(8013, 32, 'In Progress', 2, 'Tasks that are currently being worked on', '#33FF57'),
(8014, 32, 'Completed', 3, 'Tasks that have been finished', '#F1C40F'),
(8015, 32, 'On Hold', 4, 'Tasks that are paused or waiting for approval', '#FFC300'),
(8016, 33, 'To Do', 1, 'Tasks that need to be started', '#FF5733'),
(8017, 33, 'In Progress', 2, 'Tasks that are currently being worked on', '#33FF57'),
(8018, 33, 'Completed', 3, 'Tasks that have been finished', '#F1C40F'),
(8019, 33, 'On Hold', 4, 'Tasks that are paused or waiting for approval', '#FFC300'),
(8020, 34, 'To Do', 1, 'Tasks that need to be started', '#FF5733'),
(8021, 34, 'In Progress', 2, 'Tasks that are currently being worked on', '#33FF57'),
(8022, 34, 'Completed', 3, 'Tasks that have been finished', '#F1C40F'),
(8023, 34, 'On Hold', 4, 'Tasks that are paused or waiting for approval', '#FFC300'),
(8024, 35, 'To Do', 1, 'Tasks that need to be started', '#FF5733'),
(8025, 35, 'In Progress', 2, 'Tasks that are currently being worked on', '#33FF57'),
(8026, 35, 'Completed', 3, 'Tasks that have been finished', '#F1C40F'),
(8027, 35, 'On Hold', 4, 'Tasks that are paused or waiting for approval', '#FFC300'),
(8028, 36, 'To Do', 1, 'Tasks that need to be started', '#FF5733'),
(8029, 36, 'In Progress', 2, 'Tasks that are currently being worked on', '#33FF57'),
(8030, 36, 'Completed', 3, 'Tasks that have been finished', '#F1C40F'),
(8031, 36, 'On Hold', 4, 'Tasks that are paused or waiting for approval', '#FFC300'),
(8032, 37, 'To Do', 1, 'Tasks that need to be started', '#FF5733'),
(8033, 37, 'In Progress', 2, 'Tasks that are currently being worked on', '#33FF57'),
(8034, 37, 'Completed', 3, 'Tasks that have been finished', '#F1C40F'),
(8035, 37, 'On Hold', 4, 'Tasks that are paused or waiting for approval', '#FFC300'),
(8036, 38, 'To Do', 1, 'Tasks that need to be started', '#FF5733'),
(8037, 38, 'In Progress', 2, 'Tasks that are currently being worked on', '#33FF57'),
(8038, 38, 'Completed', 3, 'Tasks that have been finished', '#F1C40F'),
(8039, 38, 'On Hold', 4, 'Tasks that are paused or waiting for approval', '#FFC300'),
(8040, 39, 'To Do', 1, 'Tasks that need to be started', '#FF5733'),
(8041, 39, 'In Progress', 2, 'Tasks that are currently being worked on', '#33FF57'),
(8042, 39, 'Completed', 3, 'Tasks that have been finished', '#F1C40F'),
(8043, 39, 'On Hold', 4, 'Tasks that are paused or waiting for approval', '#FFC300'),
(8044, 40, 'To Do', 1, 'Tasks that need to be started', '#FF5733'),
(8045, 40, 'In Progress', 2, 'Tasks that are currently being worked on', '#33FF57'),
(8046, 40, 'Completed', 3, 'Tasks that have been finished', '#F1C40F'),
(8047, 40, 'On Hold', 4, 'Tasks that are paused or waiting for approval', '#FFC300'),
(8048, 41, 'To Do', 1, 'Tasks that need to be started', '#FF5733'),
(8049, 41, 'In Progress', 2, 'Tasks that are currently being worked on', '#33FF57'),
(8050, 41, 'Completed', 3, 'Tasks that have been finished', '#F1C40F'),
(8051, 41, 'On Hold', 4, 'Tasks that are paused or waiting for approval', '#FFC300'),
(8052, 42, 'To Do', 1, 'Tasks that need to be started', '#FF5733'),
(8053, 42, 'In Progress', 2, 'Tasks that are currently being worked on', '#33FF57'),
(8054, 42, 'Completed', 3, 'Tasks that have been finished', '#F1C40F'),
(8055, 42, 'On Hold', 4, 'Tasks that are paused or waiting for approval', '#FFC300'),
(8056, 43, 'To Do', 1, 'Tasks that need to be started', '#FF5733'),
(8057, 43, 'In Progress', 2, 'Tasks that are currently being worked on', '#33FF57'),
(8058, 43, 'Completed', 3, 'Tasks that have been finished', '#F1C40F'),
(8059, 43, 'On Hold', 4, 'Tasks that are paused or waiting for approval', '#FFC300'),
(8060, 44, 'To Do', 1, 'Tasks that need to be started', '#FF5733'),
(8061, 44, 'In Progress', 2, 'Tasks that are currently being worked on', '#33FF57'),
(8062, 44, 'Completed', 3, 'Tasks that have been finished', '#F1C40F'),
(8063, 44, 'On Hold', 4, 'Tasks that are paused or waiting for approval', '#FFC300');


INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(68, 25, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'REQUESTED', 3, '2025-03-01', 'INITIAL', NULL),
(69, 25, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'REQUESTED', 3, '2025-03-02', 'FINAL', NULL),
(608, 25, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(609, 25, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),
(70, 25, 'Starry Night Replica', 'Inspired by Van Gogh’s Starry Night', 300.0, 6, 'CANCELED', 4, '2025-03-03', 'FIFTYFIFTY', NULL),
(71, 25, 'Abstract Art', 'A modern abstract composition', 180.0, 7, 'IN_WAIT_LIST', 2, '2025-03-04', 'MODERATOR', NULL),
(72, 25, 'Forest Path', 'A peaceful forest pathway', 120.0, 8, 'IN_WAIT_LIST', 6, '2025-03-05', 'INITIAL', NULL),
(73, 25, 'Sunset Horizon', 'A stunning view of the horizon at sunset', 250.0, 9, 'ENDED', 1, '2025-03-06', 'FIFTYFIFTY', NULL),
(74, 25, 'Mountain Landscape', 'A beautiful mountain landscape painting', 350.0, 10, 'ENDED', 4, '2025-03-07', 'FINAL', NULL),
(75, 25, 'Spring Flowers', 'A vibrant painting of spring flowers', 160.0, 11, 'REJECTED', 3, '2025-03-08', 'INITIAL', NULL);

INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(76, 26, 'Sunset Horizon', 'A stunning view of the horizon at sunset', 250.0, 9, 'REQUESTED', 1, '2025-03-06', 'FIFTYFIFTY', NULL),
(77, 26, 'Mountain Landscape', 'A beautiful mountain landscape painting', 350.0, 10, 'REQUESTED', 4, '2025-03-07', 'FINAL', NULL),
(804, 26, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 62),
(805, 26, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 63),
(78, 26, 'Spring Flowers', 'A vibrant painting of spring flowers', 160.0, 11, 'CANCELED', 3, '2025-03-08', 'INITIAL', NULL),
(79, 26, 'Sunset Landscape', 'A beautiful sunset over a beach', 220.0, 12, 'IN_WAIT_LIST', 2, '2025-03-09', 'FIFTYFIFTY', NULL),
(80, 26, 'Autumn Forest', 'A beautiful autumn forest scene', 200.0, 13, 'IN_WAIT_LIST', 3, '2025-03-10', 'MODERATOR', NULL),
(81, 26, 'Night Sky', 'A starry night sky over the mountains', 300.0, 14, 'ENDED', 5, '2025-03-11', 'FINAL', NULL),
(82, 26, 'Tropical Paradise', 'A tropical paradise scene with blue skies', 270.0, 15, 'ENDED', 4, '2025-03-12', 'FIFTYFIFTY', NULL),
(83, 26, 'Desert Sunrise', 'A breathtaking desert sunrise', 240.0, 16, 'REJECTED', 6, '2025-03-13', 'INITIAL', NULL);

-- Comisiones para el Artista 27 (ID 27)
INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(84, 27, 'Golden Sunrise', 'A beautiful golden sunrise landscape', 220.0, 12, 'REQUESTED', 3, '2025-03-14', 'FIFTYFIFTY', NULL),
(85, 27, 'Tropical Beach', 'A relaxing tropical beach scene', 270.0, 13, 'REQUESTED', 2, '2025-03-15', 'INITIAL', NULL),
(618, 27, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(619, 27, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),
(86, 27, 'City Skyline', 'A modern city skyline at night', 320.0, 14, 'CANCELED', 4, '2025-03-16', 'FIFTYFIFTY', NULL),
(87, 27, 'Vintage Car', 'A classic vintage car painting', 180.0, 15, 'IN_WAIT_LIST', 5, '2025-03-17', 'FINAL', NULL),
(88, 27, 'River Bend', 'A calm river meandering through the countryside', 250.0, 16, 'IN_WAIT_LIST', 3, '2025-03-18', 'INITIAL', NULL),
(89, 27, 'Starry Night', 'A beautiful rendition of the night sky', 200.0, 17, 'ENDED', 6, '2025-03-19', 'FIFTYFIFTY', NULL),
(90, 27, 'Mountain View', 'A scenic mountain landscape', 270.0, 18, 'ENDED', 4, '2025-03-20', 'FINAL', NULL),
(91, 27, 'Peaceful Waters', 'A peaceful lake surrounded by mountains', 230.0, 19, 'REJECTED', 7, '2025-03-21', 'INITIAL', NULL);

-- Comisiones para el Artista 28 (ID 28)
INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(628, 28, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(639, 28, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),
(92, 28, 'Forest at Dusk', 'A mysterious forest at dusk', 210.0, 17, 'REQUESTED', 3, '2025-03-22', 'FINAL', NULL),
(93, 28, 'Abstract Faces', 'A contemporary painting of abstract faces', 250.0, 18, 'REQUESTED', 2, '2025-03-23', 'INITIAL', NULL),
(608, 25, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(609, 25, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),
(94, 28, 'Ocean Breeze', 'A breezy ocean view painting', 300.0, 19, 'CANCELED', 4, '2025-03-24', 'FIFTYFIFTY', NULL),
(95, 28, 'Mountain River', 'A flowing river through a mountain range', 270.0, 20, 'IN_WAIT_LIST', 5, '2025-03-25', 'MODERATOR', NULL),
(96, 28, 'Sunset Over Desert', 'A vibrant sunset over a desert landscape', 190.0, 21, 'IN_WAIT_LIST', 6, '2025-03-26', 'FINAL', NULL),
(97, 28, 'Tropical Forest', 'A lush tropical forest', 220.0, 22, 'ENDED', 7, '2025-03-27', 'FIFTYFIFTY', NULL),
(98, 28, 'City at Dusk', 'A city skyline at dusk', 240.0, 23, 'ENDED', 3, '2025-03-28', 'MODERATOR', NULL),
(99, 28, 'Desert Oasis', 'A tranquil desert oasis', 260.0, 24, 'REJECTED', 4, '2025-03-29', 'INITIAL', NULL);

-- Comisiones para el Artista 29 (ID 29)
INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(100, 29, 'Autumn Forest', 'A serene autumn forest landscape', 230.0, 25, 'REQUESTED', 4, '2025-03-30', 'FIFTYFIFTY', NULL),
(101, 29, 'Winter Wonderland', 'A snowy winter scene with trees', 270.0, 26, 'REQUESTED', 3, '2025-03-31', 'INITIAL', NULL),
(638, 29, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(639, 29, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),

(102, 29, 'Desert Oasis', 'A peaceful desert oasis', 320.0, 27, 'CANCELED', 5, '2025-04-01', 'FINAL', NULL),
(103, 29, 'Night Sky', 'A starry night sky over the ocean', 200.0, 28, 'IN_WAIT_LIST', 6, '2025-04-02', 'FIFTYFIFTY', NULL),
(104, 29, 'Blooming Garden', 'A beautiful garden in full bloom', 180.0, 29, 'IN_WAIT_LIST', 4, '2025-04-03', 'MODERATOR', NULL),
(105, 29, 'Rolling Hills', 'A peaceful rolling hill landscape', 210.0, 30, 'ENDED', 7, '2025-04-04', 'FIFTYFIFTY', NULL),
(106, 29, 'City Streets', 'A bustling city street scene', 250.0, 31, 'ENDED', 4, '2025-04-05', 'FINAL', NULL),
(107, 29, 'Eagle in Flight', 'A majestic eagle soaring through the sky', 270.0, 32, 'REJECTED', 5, '2025-04-06', 'INITIAL', NULL);

-- Comisiones para el Artista 30 (ID 30)
INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(108, 30, 'Rolling Hills', 'A peaceful rolling hill landscape', 210.0, 33, 'REQUESTED', 2, '2025-04-07', 'FINAL', NULL),
(109, 30, 'City Streets', 'A bustling city street scene', 250.0, 34, 'REQUESTED', 3, '2025-04-08', 'INITIAL', NULL),
(648, 30, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(649, 30, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),

(110, 30, 'Mountain View', 'A breathtaking view of the mountains', 300.0, 35, 'CANCELED', 4, '2025-04-09', 'FIFTYFIFTY', NULL),
(111, 30, 'Eagle in Flight', 'A majestic eagle soaring through the sky', 270.0, 36, 'IN_WAIT_LIST', 5, '2025-04-10', 'MODERATOR', NULL),
(112, 30, 'River Rocks', 'A rocky river landscape with flowing water', 230.0, 37, 'IN_WAIT_LIST', 6, '2025-04-11', 'FINAL', NULL),
(113, 30, 'Sunset Over Ocean', 'A beautiful sunset over the ocean', 220.0, 38, 'ENDED', 7, '2025-04-12', 'FIFTYFIFTY', NULL),
(114, 30, 'Beach Sunset', 'A peaceful beach sunset', 240.0, 39, 'ENDED', 2, '2025-04-13', 'MODERATOR', NULL),
(115, 30, 'River Bend', 'A scenic river bend surrounded by trees', 250.0, 40, 'REJECTED', 4, '2025-04-14', 'INITIAL', NULL);

-- Comisiones para el Artista 31 (ID 31)
INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(116, 31, 'Golden Beach', 'A serene golden beach landscape', 240.0, 41, 'REQUESTED', 3, '2025-04-15', 'FINAL', NULL),
(117, 31, 'Tropical Sunset', 'A vibrant tropical sunset', 280.0, 42, 'REQUESTED', 4, '2025-04-16', 'INITIAL', NULL),
(658, 31, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(659, 31, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),
(118, 31, 'City at Dusk', 'A city skyline at dusk', 260.0, 43, 'CANCELED', 5, '2025-04-17', 'FIFTYFIFTY', NULL),
(119, 31, 'Snowy Mountain', 'A peaceful snowy mountain scene', 320.0, 44, 'IN_WAIT_LIST', 2, '2025-04-18', 'FIFTYFIFTY', NULL),
(120, 31, 'Lakeside View', 'A tranquil lakeside scene with mountains', 300.0, 45, 'IN_WAIT_LIST', 4, '2025-04-19', 'MODERATOR', NULL),
(121, 31, 'Desert Night', 'A calm desert scene under a starry night sky', 240.0, 46, 'ENDED', 5, '2025-04-20', 'FINAL', NULL),
(122, 31, 'Canyon Vista', 'A beautiful canyon view with the sun setting', 250.0, 47, 'ENDED', 6, '2025-04-21', 'FIFTYFIFTY', NULL),
(123, 31, 'Rocky Coast', 'A rocky coast with waves crashing against the rocks', 230.0, 48, 'REJECTED', 7, '2025-04-22', 'INITIAL', NULL);

-- Comisiones para el Artista 32 (ID 32)
INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(124, 32, 'Desert Oasis', 'A tranquil desert oasis', 260.0, 49, 'REQUESTED', 4, '2025-04-23', 'FINAL', NULL),
(125, 32, 'Sunset Beach', 'A sunset over a calm beach', 230.0, 50, 'REQUESTED', 3, '2025-04-24', 'INITIAL', NULL),
(668, 32, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(669, 32, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),
(126, 32, 'Mountain Range', 'A panoramic view of a mountain range', 320.0, 51, 'CANCELED', 5, '2025-04-25', 'FIFTYFIFTY', NULL),
(127, 32, 'Tropical Lagoon', 'A peaceful tropical lagoon', 280.0, 52, 'IN_WAIT_LIST', 2, '2025-04-26', 'FIFTYFIFTY', NULL),
(128, 32, 'Autumn Park', 'A beautiful park in autumn', 300.0, 53, 'IN_WAIT_LIST', 6, '2025-04-27', 'MODERATOR', NULL),
(129, 32, 'Evening Sky', 'A sky filled with evening stars', 220.0, 54, 'ENDED', 7, '2025-04-28', 'FINAL', NULL),
(130, 32, 'River Falls', 'A beautiful waterfall in a river', 250.0, 55, 'ENDED', 4, '2025-04-29', 'FIFTYFIFTY', NULL),
(131, 32, 'Rocky Shore', 'A rocky shore with crashing waves', 240.0, 56, 'REJECTED', 5, '2025-04-30', 'INITIAL', NULL);

-- Comisiones para el Artista 33 (ID 33)
INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(132, 33, 'Golden Beach', 'A serene golden beach landscape', 240.0, 57, 'REQUESTED', 3, '2025-05-01', 'FIFTYFIFTY', NULL),
(133, 33, 'Tropical Sunset', 'A vibrant tropical sunset', 280.0, 58, 'REQUESTED', 4, '2025-05-02', 'INITIAL', NULL),
(678, 33, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(679, 33, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),
(134, 33, 'City at Dusk', 'A city skyline at dusk', 260.0, 59, 'CANCELED', 5, '2025-05-03', 'FIFTYFIFTY',NULL),
(135, 33, 'Snowy Mountain', 'A peaceful snowy mountain scene', 320.0, 60, 'IN_WAIT_LIST', 2, '2025-05-04', 'FIFTYFIFTY', NULL),
(136, 33, 'Lakeside View', 'A tranquil lakeside scene with mountains', 300.0, 61, 'IN_WAIT_LIST', 4, '2025-05-05', 'MODERATOR', NULL),
(137, 33, 'Desert Night', 'A calm desert scene under a starry night sky', 240.0, 62, 'ENDED', 5, '2025-05-06', 'FINAL', NULL),
(138, 33, 'Canyon Vista', 'A beautiful canyon view with the sun setting', 250.0, 63, 'ENDED', 6, '2025-05-07', 'FIFTYFIFTY', NULL),
(139, 33, 'Rocky Coast', 'A rocky coast with waves crashing against the rocks', 230.0, 64, 'REJECTED', 7, '2025-05-08', 'INITIAL', NULL);

-- Comisiones para el Artista 34 (ID 34)
INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(140, 34, 'Desert Winds', 'A landscape of desert winds', 270.0, 65, 'REQUESTED', 3, '2025-05-09', 'FINAL', NULL),
(688, 34, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(689, 34, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),
(141, 34, 'Forest at Dawn', 'A mystical forest scene at dawn', 240.0, 66, 'REQUESTED', 2, '2025-05-10', 'INITIAL', NULL),
(142, 34, 'Mountain View', 'A breathtaking mountain view at sunrise', 320.0, 67, 'CANCELED', 4, '2025-05-11', 'FIFTYFIFTY', NULL),
(143, 34, 'River in Autumn', 'A river flowing through autumn-colored trees', 300.0, 68, 'IN_WAIT_LIST', 5, '2025-05-12', 'FINAL', NULL),
(144, 34, 'Ocean Breeze', 'A calming ocean breeze scene', 280.0, 69, 'IN_WAIT_LIST', 6, '2025-05-13', 'FIFTYFIFTY', NULL),
(145, 34, 'Sunset Reflection', 'A sunset reflecting off the ocean', 250.0, 70, 'ENDED', 7, '2025-05-14', 'FINAL', NULL),
(146, 34, 'Nightfall', 'The transition from dusk to night', 220.0, 71, 'ENDED', 3, '2025-05-15', 'FIFTYFIFTY', NULL),
(147, 34, 'Desert Oasis', 'A peaceful desert oasis scene', 230.0, 72, 'REJECTED', 4, '2025-05-16', 'INITIAL', NULL);

-- Comisiones para el Artista 35 (ID 35)
INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(148, 35, 'Mountain Peaks', 'Majestic snow-capped mountain peaks', 320.0, 73, 'REQUESTED', 4, '2025-05-17', 'FINAL', NULL),
(698, 35, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(699, 35, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),
(149, 35, 'Forest Walk', 'A serene walk through a forest', 260.0, 74, 'REQUESTED', 3, '2025-05-18', 'INITIAL', NULL),
(150, 35, 'Ocean Waves', 'Waves crashing on a rocky coast', 230.0, 75, 'CANCELED', 5, '2025-05-19', 'FIFTYFIFTY', NULL),
(151, 35, 'Starry Night', 'A starry sky over a calm ocean', 300.0, 76, 'IN_WAIT_LIST', 2, '2025-05-20', 'FIFTYFIFTY', NULL),
(152, 35, 'Sunset Hills', 'A vibrant sunset over rolling hills', 270.0, 77, 'IN_WAIT_LIST', 6, '2025-05-21', 'MODERATOR', NULL),
(153, 35, 'City Lights', 'A city skyline lit up at night', 250.0, 78, 'ENDED', 7, '2025-05-22', 'FINAL', NULL),
(154, 35, 'Forest Path', 'A winding path through a lush forest', 220.0, 79, 'ENDED', 4, '2025-05-23', 'FIFTYFIFTY', NULL),
(155, 35, 'Desert Bloom', 'A rare desert flower in bloom', 240.0, 80, 'REJECTED', 5, '2025-05-24', 'INITIAL', NULL);

-- Comisiones para el Artista 36 (ID 36)
INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(156, 36, 'Tropical Paradise', 'A peaceful tropical beach paradise', 280.0, 81, 'REQUESTED', 4, '2025-05-25', 'FINAL', NULL),
(700, 36, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(701, 36, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),
(157, 36, 'Frozen Lake', 'A serene frozen lake surrounded by trees', 240.0, 82, 'REQUESTED', 2, '2025-05-26', 'INITIAL', NULL),
(158, 36, 'Canyon Sunrise', 'A sunrise over a beautiful canyon', 300.0, 83, 'CANCELED', 5, '2025-05-27', 'FIFTYFIFTY', NULL),
(159, 36, 'Mountain River', 'A peaceful river flowing through the mountains', 260.0, 84, 'IN_WAIT_LIST', 6, '2025-05-28', 'FIFTYFIFTY', NULL),
(160, 36, 'Autumn Harvest', 'A beautiful autumn harvest scene', 220.0, 85, 'IN_WAIT_LIST', 7, '2025-05-29', 'MODERATOR', NULL),
(161, 36, 'Sunset Bay', 'A calming sunset over a bay', 240.0, 86, 'ENDED', 5, '2025-05-30', 'FINAL', NULL),
(162, 36, 'Golden Valley', 'A golden valley lit by the setting sun', 230.0, 87, 'ENDED', 4, '2025-06-01', 'FIFTYFIFTY', NULL),
(163, 36, 'Desert Mirage', 'A mirage in the desert heat', 210.0, 88, 'REJECTED', 6, '2025-06-02', 'INITIAL', NULL);

-- Comisiones para el Artista 37 (ID 37)
INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(164, 37, 'Golden Forest', 'A forest with golden autumn leaves', 240.0, 89, 'REQUESTED', 3, '2025-06-03', 'FIFTYFIFTY', NULL),
(710, 37, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(711, 37, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),
(165, 37, 'Ocean Breeze', 'A relaxing beach with ocean breeze', 220.0, 90, 'REQUESTED', 2, '2025-06-04', 'INITIAL', NULL),
(166, 37, 'Mountain View', 'A majestic view of the mountains', 300.0, 91, 'CANCELED', 5, '2025-06-05', 'FIFTYFIFTY', NULL),
(167, 37, 'Desert Path', 'A winding path through the desert', 270.0, 92, 'IN_WAIT_LIST', 4, '2025-06-06', 'FIFTYFIFTY', NULL),
(168, 37, 'Starry Night', 'A peaceful starry sky over the lake', 250.0, 93, 'IN_WAIT_LIST', 6, '2025-06-07', 'MODERATOR', NULL),
(169, 37, 'Autumn Meadow', 'A meadow with autumn colors', 230.0, 94, 'ENDED', 7, '2025-06-08', 'FINAL', NULL),
(170, 37, 'Sunset Ridge', 'A sunset over a ridge with trees', 240.0, 95, 'ENDED', 4, '2025-06-09', 'FIFTYFIFTY', NULL),
(171, 37, 'Desert Mirage', 'A mirage shimmering in the desert', 210.0, 96, 'REJECTED', 5, '2025-06-10', 'INITIAL', NULL);

-- Comisiones para el Artista 38 (ID 38)
INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(172, 38, 'Winter Wonderland', 'A snowy scene with pine trees', 280.0, 97, 'REQUESTED', 4, '2025-06-11', 'FINAL', NULL),
(173, 38, 'Tropical Sunset', 'A vibrant tropical sunset over the ocean', 230.0, 98, 'REQUESTED', 3, '2025-06-12', 'INITIAL', NULL),
(720, 38, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(721, 38, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),
(174, 38, 'Mountain Peaks', 'Snow-capped mountain peaks in winter', 300.0, 99, 'CANCELED', 5, '2025-06-13', 'FIFTYFIFTY', NULL),
(175, 38, 'Desert Sunrise', 'A beautiful sunrise over the desert', 270.0, 100, 'IN_WAIT_LIST', 6, '2025-06-14', 'MODERATOR', NULL),
(176, 38, 'Autumn Path', 'A path surrounded by autumn trees', 250.0, 101, 'IN_WAIT_LIST', 4, '2025-06-15', 'FINAL', NULL),
(177, 38, 'Canyon View', 'A breathtaking view of the canyon', 220.0, 102, 'ENDED', 7, '2025-06-16', 'FINAL', NULL),
(178, 38, 'Rainy City', 'A city scene under the rain', 240.0, 103, 'ENDED', 5, '2025-06-17', 'FIFTYFIFTY', NULL),
(179, 38, 'Sunset Over the Sea', 'A tranquil sunset by the ocean', 250.0, 104, 'REJECTED', 6, '2025-06-18', 'INITIAL', NULL);

-- Comisiones para el Artista 39 (ID 39)
INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(180, 39, 'Rainy Day', 'A calm day during a light rain', 240.0, 105, 'REQUESTED', 2, '2025-06-19', 'FINAL', NULL),
(181, 39, 'Golden Horizon', 'A horizon painted with golden light', 220.0, 106, 'REQUESTED', 3, '2025-06-20', 'INITIAL', NULL),
(730, 39, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(731, 39, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),
(182, 39, 'Snowy Forest', 'A serene forest with snow covering the trees', 280.0, 107, 'CANCELED', 5, '2025-06-21', 'FIFTYFIFTY', NULL),
(183, 39, 'Ocean View', 'A calm ocean view with a clear sky', 250.0, 108, 'IN_WAIT_LIST', 4, '2025-06-22', 'FIFTYFIFTY', NULL),
(184, 39, 'Desert Sunset', 'A colorful sunset over the desert', 270.0, 109, 'IN_WAIT_LIST', 6, '2025-06-23', 'MODERATOR', NULL),
(185, 39, 'Autumn Vibes', 'An autumn scene with colorful leaves', 230.0, 110, 'ENDED', 7, '2025-06-24', 'FINAL', NULL),
(186, 39, 'Mountain Serenity', 'A peaceful mountain scene with a river', 240.0, 111, 'ENDED', 4, '2025-06-25', 'FIFTYFIFTY', NULL),
(187, 39, 'Starry Night', 'A star-filled sky over a quiet landscape', 210.0, 112, 'REJECTED', 5, '2025-06-26', 'INITIAL', NULL);

-- Comisiones para el Artista 40 (ID 40)
INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(188, 40, 'Sunset Beach', 'A sunset view over the beach', 250.0, 113, 'REQUESTED', 3, '2025-06-27', 'FIFTYFIFTY', NULL),
(189, 40, 'Autumn Colors', 'A scenic view of autumn leaves', 240.0, 114, 'REQUESTED', 4, '2025-06-28', 'INITIAL', NULL),
(190, 40, 'Desert Dawn', 'A tranquil desert scene at dawn', 270.0, 115, 'CANCELED', 5, '2025-06-29', 'FIFTYFIFTY', NULL),
(740, 40, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(741, 40, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),
(191, 40, 'Snowy Hills', 'Snow-covered hills under the soft light', 230.0, 116, 'IN_WAIT_LIST', 6, '2025-06-30', 'FIFTYFIFTY', NULL),
(192, 40, 'Night Sky', 'A clear night sky filled with stars', 250.0, 117, 'IN_WAIT_LIST', 4, '2025-07-01', 'MODERATOR', NULL),
(193, 40, 'Spring Meadow', 'A fresh spring meadow with flowers', 220.0, 118, 'ENDED', 7, '2025-07-02', 'FINAL', NULL),
(194, 40, 'Tropical Escape', 'A tropical beach escape under the sun', 230.0, 119, 'ENDED', 5, '2025-07-03', 'FIFTYFIFTY', NULL),
(195, 40, 'Golden Valley', 'A golden valley with rays of sunlight', 210.0, 120, 'REJECTED', 6, '2025-07-04', 'INITIAL', NULL);

-- Comisiones para el Artista 41 (ID 41)
INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(196, 41, 'Autumn Forest', 'A forest with autumn leaves falling', 230.0, 121, 'REQUESTED', 3, '2025-07-05', 'FINAL', NULL),
(750, 41, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(751, 41, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),
(197, 41, 'Mountain Ridge', 'A view of a mountain ridge at sunset', 240.0, 122, 'REQUESTED', 4, '2025-07-06', 'INITIAL', NULL),
(198, 41, 'Ocean Waves', 'Waves crashing on the shore', 250.0, 123, 'CANCELED', 5, '2025-07-07', 'FIFTYFIFTY', NULL),
(199, 41, 'River Reflection', 'A river reflecting the surrounding trees', 220.0, 124, 'IN_WAIT_LIST', 6, '2025-07-08', 'FIFTYFIFTY', NULL),
(200, 41, 'Desert Moon', 'A desert under the moonlight', 270.0, 125, 'IN_WAIT_LIST', 4, '2025-07-09', 'MODERATOR', NULL),
(201, 41, 'Golden Meadow', 'A meadow filled with golden light', 230.0, 126, 'ENDED', 7, '2025-07-10', 'FINAL', NULL),
(202, 41, 'Tropical Oasis', 'A peaceful oasis in the tropics', 240.0, 127, 'ENDED', 5, '2025-07-11', 'FIFTYFIFTY', NULL),
(203, 41, 'City Sunset', 'A city skyline at sunset', 210.0, 128, 'REJECTED', 6, '2025-07-12', 'INITIAL', NULL);

-- Comisiones para el Artista 42 (ID 42)
INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(204, 42, 'Desert Oasis', 'A peaceful oasis in the desert', 250.0, 129, 'REQUESTED', 4, '2025-07-13', 'FINAL', NULL),
(760, 42, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(761, 42, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),
(205, 42, 'Tropical Rainforest', 'A lush tropical rainforest', 220.0, 130, 'REQUESTED', 3, '2025-07-14', 'INITIAL', NULL),
(206, 42, 'City at Dusk', 'A city skyline at dusk', 230.0, 131, 'CANCELED', 5, '2025-07-15', 'FIFTYFIFTY',NULL),
(207, 42, 'Mountain Summit', 'The summit of a tall mountain', 300.0, 132, 'IN_WAIT_LIST', 6, '2025-07-16', 'FIFTYFIFTY', NULL),
(208, 42, 'Autumn Leaves', 'Leaves falling in autumn', 260.0, 133, 'IN_WAIT_LIST', 4, '2025-07-17', 'MODERATOR', NULL),
(209, 42, 'Starry Night', 'A starry night sky over the sea', 240.0, 134, 'ENDED', 7, '2025-07-18', 'FINAL', NULL),
(210, 42, 'Beach Horizon', 'A beautiful beach at the horizon', 230.0, 135, 'ENDED', 5, '2025-07-19', 'FIFTYFIFTY', NULL),
(211, 42, 'Desert View', 'A view of the vast desert', 220.0, 136, 'REJECTED', 6, '2025-07-20', 'INITIAL', NULL);

-- Comisiones para el Artista 43 (ID 43)
INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(212, 43, 'Golden Horizon', 'A beautiful golden horizon over the ocean', 260.0, 137, 'REQUESTED', 4, '2025-07-21', 'FINAL', NULL),
(213, 43, 'Snowy Mountain', 'A majestic snow-covered mountain', 240.0, 138, 'REQUESTED', 3, '2025-07-22', 'INITIAL', NULL),
(214, 43, 'City at Night', 'A city skyline illuminated at night', 250.0, 139, 'CANCELED', 5, '2025-07-23', 'FIFTYFIFTY', NULL),
(770, 43, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(771, 43, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),
(215, 43, 'River Valley', 'A river winding through a green valley', 220.0, 140, 'IN_WAIT_LIST', 6, '2025-07-24', 'FIFTYFIFTY', NULL),
(216, 43, 'Desert Dawn', 'The first light hitting the desert landscape', 270.0, 141, 'IN_WAIT_LIST', 4, '2025-07-25', 'MODERATOR', NULL),
(217, 43, 'Autumn Walk', 'A peaceful walk through an autumn forest', 230.0, 142, 'ENDED', 7, '2025-07-26', 'FINAL', NULL),
(218, 43, 'Beach Sunset', 'A stunning sunset over the beach', 240.0, 143, 'ENDED', 5, '2025-07-27', 'FIFTYFIFTY', NULL),
(219, 43, 'Starry Sky', 'A brilliant starry sky over the mountains', 210.0, 144, 'REJECTED', 6, '2025-07-28', 'INITIAL', NULL);

-- Comisiones para el Artista 44 (ID 44)
INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(220, 44, 'Sunset Over Ocean', 'A vibrant sunset over the ocean waves', 250.0, 145, 'REQUESTED', 4, '2025-07-29', 'FINAL', NULL),
(221, 44, 'Autumn Forest', 'A forest with colorful autumn leaves', 230.0, 146, 'REQUESTED', 3, '2025-07-30', 'INITIAL', NULL),
(780, 44, 'Sunset Painting', 'A beautiful sunset painting', 150.0, 4, 'ACCEPTED', 3, '2025-03-01', 'INITIAL', 58),
(781, 44, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 5, 'ACCEPTED', 3, '2025-03-02', 'FINAL', 59),
(222, 44, 'Mountain Peak', 'A snow-covered mountain peak under the sun', 300.0, 147, 'CANCELED', 5, '2025-07-31', 'FIFTYFIFTY', NULL),
(223, 44, 'Desert Night', 'A starry night in the desert', 270.0, 148, 'IN_WAIT_LIST', 6, '2025-08-01', 'FIFTYFIFTY', NULL),
(224, 44, 'Tropical Paradise', 'A tropical beach with turquoise waters', 220.0, 149, 'IN_WAIT_LIST', 4, '2025-08-02', 'MODERATOR', NULL),
(225, 44, 'River Sunset', 'A beautiful sunset over a calm river', 230.0, 150, 'ENDED', 7, '2025-08-03', 'FINAL', NULL),
(226, 44, 'Golden Wheat', 'A field of golden wheat under the setting sun', 240.0, 151, 'ENDED', 5, '2025-08-04', 'FIFTYFIFTY', NULL),
(227, 44, 'Ocean Breeze', 'A peaceful ocean breeze with gentle waves', 210.0, 152, 'REJECTED', 6, '2025-08-05', 'INITIAL', NULL);


-- Insertar los milestones de acuerdo con las comisiones
INSERT INTO milestones (id, name, accepted, milestone_date, commision_id) VALUES
(78, 'Initial Sketch', TRUE, '2025-03-02', 68),
(79, 'Line Art', FALSE, '2025-03-05', 68),
(80, 'Coloring Phase 1', TRUE, '2025-03-10', 69),
(81, 'Final Touches', FALSE, '2025-03-15', 69),
(82, '3D Model Base', TRUE, '2025-03-01', 70),
(83, 'Texture Painting', FALSE, '2025-03-08', 70),
(84, 'Concept Art Approval', TRUE, '2025-02-28', 71),
(85, 'First Revision', FALSE, '2025-03-07', 71),
(86, 'Final Rendering', TRUE, '2025-03-12', 72),
(87, 'Lighting Adjustments', FALSE, '2025-03-18', 72),
(88, 'Sketch Approval', TRUE, '2025-03-04', 73),
(89, 'Base Colors', FALSE, '2025-03-09', 73),
(90, 'Initial Composition', TRUE, '2025-02-27', 74),
(91, 'Details Refinement', FALSE, '2025-03-06', 74),
(92, 'Pose Approval', TRUE, '2025-03-03', 75),
(93, 'Shading Process', FALSE, '2025-03-11', 75);



INSERT INTO artist_category(id,artist_id,category_id) VALUES
(102, 25, 45),
(1003, 25, 46),
(1040, 25, 47),
(1005, 26, 48),
(1006, 27, 49),
(1007, 28, 50),
(1008, 29, 51),
(1009, 30, 52),
(1100, 31, 48),
(1101, 32, 49),
(1205, 25, 124),  -- Asociación del artista 25 con la categoría 124 (Mixed Media)
(1206, 25, 117),  -- Asociación del artista 25 con la categoría 117 (Abstract Art)
(1207, 26, 118),  -- Asociación del artista 26 con la categoría 118 (Conceptual Art)
(1208, 26, 119),  -- Asociación del artista 26 con la categoría 119 (Installation Art)
(1209, 25, 120),  -- Asociación del artista 25 con la categoría 120 (Performance Art)
(1300, 25, 121),  -- Asociación del artista 25 con la categoría 121 (Street Art)
(1301, 26, 122),  -- Asociación del artista 26 con la categoría 122 (Video Art)
(1302, 25, 123);  -- Asociación del artista 25 con la categoría 123 (Glass Art)

INSERT INTO work_category(id,category_id,work_id) VALUES
(1102, 45, 68),
(1103, 46, 69),
(1104, 47, 70),
(1105, 48, 98),
(1106, 49, 99),
(1400, 124, 68),  -- Asociación de la comisión 68 ('Sunset Painting') con la categoría 124 (Mixed Media)
(1303, 117, 69),  -- Asociación de la comisión 69 ('Ocean Waves') con la categoría 117 (Abstract Art)
(1304, 118, 70),  -- Asociación de la comisión 70 ('Starry Night Replica') con la categoría 118 (Conceptual Art)
(1305, 119, 71),  -- Asociación de la comisión 71 ('Abstract Art') con la categoría 119 (Installation Art)
(1306, 120, 72),  -- Asociación de la comisión 72 ('Forest Path') con la categoría 120 (Performance Art)
(1307, 121, 73),  -- Asociación de la comisión 73 ('Sunset Horizon') con la categoría 121 (Street Art)
(1308, 122, 74),  -- Asociación de la comisión 74 ('Mountain Landscape') con la categoría 122 (Video Art)
(1390, 123, 75);  -- Asociación de la comisión 75 ('Spring Flowers') con la categoría 123 (Glass Art)