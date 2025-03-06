INSERT INTO clients (id, first_name, username, password, email, phone_number, image_profile, created_user) VALUES
(1, 'Jeenii', 'jeenni', 'password123', 'reinapata20@gmail.com', '1234567890', NULL, '2025-03-06'),
(2, 'Emilio', 'emilio', 'password123', 'emilio.esp99@gmail.com', '1234567890', NULL, '2025-03-06'),
(3, 'Rafael', 'rafael', 'password123', 'dekker.rafa@gmail.com', '1234567890', NULL, '2025-03-06'),
(4, 'Felix', 'felix', 'password123', 'felixsv26@gmail.com', '1234567890', NULL, '2025-03-06'),
(5, 'Raúl', 'raul', 'password123', 'raullebone@gmail.com', '1234567890', NULL, '2025-03-06'),
(6, 'Joker', 'joker', 'password123', 'jokerin.escuchame@gmail.com', '1234567890', NULL, '2025-03-06'),
(7, 'Lucas', 'lucas', 'password123', 'lmherencia2003@gmail.com', '1234567890', NULL, '2025-03-06'),
(8, 'Horacio', 'horacio', 'password123', 'geko.hor@gmail.com', '1234567890', NULL, '2025-03-06'),
(9, 'Simón', 'simon', 'password123', 'simoncgs03@gmail.com', '1234567890', NULL, '2025-03-06'),
(10, 'Javier', 'javies_pacheco', 'password123', 'pachecomarquezjavier@gmail.com', '1234567890', NULL, '2025-03-06'),
(11, 'Henrique', 'henrique', 'password123', 'henrique.rebolho@gmail.com', '1234567890', NULL, '2025-03-06'),
(12, 'Keegan', 'kaegan', 'password123', 'Kcullen3289@gmail.com ', '1234567890', NULL, '2025-03-06'),
(13, 'Carlos', 'carlos', 'password123', 'carlosperezsanchez199@gmail.com', '1234567890', NULL, '2025-03-06'),
(14, 'Milagros', 'milagros', 'password123', 'milagros.huerta@gm.uca.es', '1234567890', NULL, '2025-03-06'),
(11, 'Patricia', 'patricia', 'password123', 'kaleta1979@gmail.com', '1234567890', NULL, '2025-03-06');

INSERT INTO artists (id, first_name, username, password, email, phone_number, image_profile, created_user, num_slots_of_work, table_commisions_price) VALUES
(1,'Braulio', 'braulio', 'password789', 'braulioolmedo116@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL),
(2,'Claudia', 'claudia', 'password789', 'xlaequis@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL),
(3,'Miriam', 'miriam', 'password789', 'urownmailblik@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL),
(4,'Paola', 'paola', 'password789', 'pao.saaval@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL),
(5,'Victor', 'victor', 'password789', 'jsjxhwjifyhyyy@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL),
(6,'Yellow', 'yellow', 'password789', 'yell0w.4rtist@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL),
(7,'Alex', 'alex', 'password789', 'vsandoval.gd@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL),
(8,'Patricia', 'peu', 'password789', 'linkaris95@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL),
(9,'Izzy', 'izzy', 'password789', 'artofiz.comms@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL),
(10,'Gabriela', 'gabriela', 'password789', 'meowm7512@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL),
(11,'Alex', 'tesla', 'password789', 'soloparainformatica23@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL),
(12,'Gurutze', 'churros', 'password789', 'gurutze.contact@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL),
(13,'Damaris', 'damaris', 'password789', 'damaris.narvaezjimenez@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL),
(14,'Sofia', 'rata', 'password789', 'already.dead.baby@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL),
(15,'Daniel', 'daniel', 'password789', 'megamagolas@gmail.com', '663522963', NULL, '2025-03-06', 0, NULL),
(16,'Rafael', 'rafaelduque', 'password789', 'rafduqcol@alum.us.es', '722675760', NULL, '2025-03-06', 0, NULL),
(17,'Rafael', 'rafaelcastillo', 'password789', 'rafaelcastillocebolla@gmail.com', '671168164', NULL, '2025-03-06', 0, NULL),
(18,'Mohamed', 'mohamed', 'password789', 'mohmmedabourihhh@gmail.com', '602171961', NULL, '2025-03-06', 0, NULL),
(19,'Enrique', 'enrique', 'password789', 'kiquegaraba@gmail.com', '600619217', NULL, '2025-03-06', 0, NULL);

INSERT INTO categories (id, name, description) VALUES
(1,'Painting', 'Artworks created using paint on a surface'),
(2,'Digital Art', 'Artworks made using digital tools'),
(3,'Sculpture', 'Three-dimensional art made by shaping materials');

INSERT INTO works (id, artist_id, name, description, price) VALUES 
(1, 1, 'Sunset Painting', 'A beautiful sunset painting', 150.0),
(2, 1, 'Ocean Waves', 'A calming ocean scene with waves', 200.0),
(3, 1, 'Starry Night Replica', 'Inspired by Van Gogh’s Starry Night', 300.0),
(4, 1, 'Abstract Art', 'A modern abstract composition', 180.0),
(5, 1, 'Forest Path', 'A peaceful forest pathway', 120.0);

INSERT INTO works_done (id, artist_id, image) VALUES 
(1, 1, NULL),
(2, 1, NULL),
(3, 1, NULL),
(4, 1, NULL);