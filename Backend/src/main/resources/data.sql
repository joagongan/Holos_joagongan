INSERT INTO authorities (id, authority) VALUES
(1, 'ADMIN'),
(2, 'CLIENT'),
(3, 'ARTIST');

INSERT INTO clients (id, first_name, username, password, email, phone_number, image_profile, created_user, authority) VALUES
(1,'client1', 'client1', 'client1', 'client1@gmail.com', '600619217', NULL, '2025-03-06', 2),
(2, 'Jeenii', 'jeenni', 'reinapata20@gmail.com', 'reinapata20@gmail.com', '123456789', NULL, '2025-03-06', 2),
(3, 'Emilio', 'emilio', 'emilio.esp99@gmail.com', 'emilio.esp99@gmail.com', '123456789', NULL, '2025-03-06', 2),
(4, 'Rafael', 'rafael', 'dekker.rafa@gmail.com', 'dekker.rafa@gmail.com', '123456789', NULL, '2025-03-06', 2),
(5, 'Felix', 'felix', 'felixsv26@gmail.com', 'felixsv26@gmail.com', '123456789', NULL, '2025-03-06', 2),
(6, 'Raúl', 'raul', 'raullebone@gmail.com', 'raullebone@gmail.com', '123456789', NULL, '2025-03-06', 2),
(7, 'Joker', 'joker', 'jokerin.escuchame@gmail.com', 'jokerin.escuchame@gmail.com', '123456789', NULL, '2025-03-06', 2),
(8, 'Lucas', 'lucas', 'lmherencia2003@gmail.com', 'lmherencia2003@gmail.com', '123456789', NULL, '2025-03-06', 2),
(9, 'Horacio', 'horacio', 'geko.hor@gmail.com', 'geko.hor@gmail.com', '123456789', NULL, '2025-03-06', 2),
(10, 'Simón', 'simon', 'simoncgs03@gmail.com', 'simoncgs03@gmail.com', '123456789', NULL, '2025-03-06', 2),
(11, 'Javier', 'javies_pacheco', 'pachecomarquezjavier@gmail.com', 'pachecomarquezjavier@gmail.com', '123456789', NULL, '2025-03-06', 2),
(12, 'Henrique', 'henrique', 'henrique.rebolho@gmail.com', 'henrique.rebolho@gmail.com', '123456789', NULL, '2025-03-06', 2),
(13, 'Keegan', 'kaegan', 'Kcullen3289@gmail.com', 'Kcullen3289@gmail.com', '123456789', NULL, '2025-03-06', 2),
(14, 'Carlos', 'carlos', 'carlosperezsanchez199@gmail.com', 'carlosperezsanchez199@gmail.com', '123456789', NULL, '2025-03-06', 2),
(15, 'Milagros', 'milagros', 'milagros.huerta@gm.uca.es', 'milagros.huerta@gm.uca.es', '123456789', NULL, '2025-03-06', 2),
(16, 'Patricia', 'patricia', 'kaleta1979@gmail.com', 'kaleta1979@gmail.com', '123456789', NULL, '2025-03-06', 2),
(17,'Daniel', 'daniel', 'megamagolas@gmail.com', 'megamagolas@gmail.com', '663522963', NULL, '2025-03-06', 2),
(18,'Rafael', 'rafaelduque', 'rafduqcol@alum.us.es', 'rafduqcol@alum.us.es', '722675760', NULL, '2025-03-06', 2),
(19,'Rafael', 'rafaelcastillo', 'rafaelcastillocebolla@gmail.com', 'rafaelcastillocebolla@gmail.com', '671168164', NULL, '2025-03-06', 2),
(20,'Mohamed', 'mohamed', 'mohmmedabourihhh@gmail.com', 'mohmmedabourihhh@gmail.com', '602171961', NULL, '2025-03-06', 2),
(21,'Enrique', 'enrique', 'kiquegaraba@gmail.com', 'kiquegaraba@gmail.com', '600619217', NULL, '2025-03-06', 2);



INSERT INTO artists (id, first_name, username, password, email, phone_number, image_profile, created_user, num_slots_of_work, table_commisions_price, authority) VALUES
(1,'artist1', 'artist1', 'artist1@gmail.com', 'artist1@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL, 3),
(2,'Braulio', 'braulio', 'braulioolmedo116@gmail.com', 'braulioolmedo116@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL, 3),
(3,'Claudia', 'claudia', 'xlaequis@gmail.com', 'xlaequis@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL, 3),
(4,'Miriam', 'miriam', 'urownmailblik@gmail.com', 'urownmailblik@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL, 3),
(5,'Paola', 'paola', 'pao.saaval@gmail.com', 'pao.saaval@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL, 3),
(6,'Victor', 'victor', 'jsjxhwjifyhyyy@gmail.com', 'jsjxhwjifyhyyy@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL, 3),
(7,'Yellow', 'yellow', 'yell0w.4rtist@gmail.com', 'yell0w.4rtist@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL, 3),
(8,'Alex', 'alex', 'vsandoval.gd@gmail.com', 'vsandoval.gd@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL, 3),
(9,'Patricia', 'peu', 'linkaris95@gmail.com', 'linkaris95@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL, 3),
(10,'Izzy', 'izzy', 'artofiz.comms@gmail.com', 'artofiz.comms@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL, 3),
(11,'Gabriela', 'gabriela', 'meowm7512@gmail.com', 'meowm7512@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL, 3),
(12,'Alex', 'tesla', 'soloparainformatica23@gmail.com', 'soloparainformatica23@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL, 3),
(13,'Gurutze', 'churros', 'gurutze.contact@gmail.com', 'gurutze.contact@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL, 3),
(14,'Damaris', 'damaris', 'damaris.narvaezjimenez@gmail.com', 'damaris.narvaezjimenez@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL, 3),
(15,'Sofia', 'rata', 'already.dead.baby@gmail.com', 'already.dead.baby@gmail.com', '1234567890', NULL, '2025-03-06', 0, NULL, 3),
(16,'Daniel', 'daniel', 'megamagolas@gmail.com', 'megamagolas@gmail.com', '663522963', NULL, '2025-03-06', 0, NULL, 3),
(17,'Rafael', 'rafaelduque', 'rafduqcol@alum.us.es', 'rafduqcol@alum.us.es', '722675760', NULL, '2025-03-06', 0, NULL, 3),
(18,'Rafael', 'rafaelcastillo', 'rafaelcastillocebolla@gmail.com', 'rafaelcastillocebolla@gmail.com', '671168164', NULL, '2025-03-06', 0, NULL, 3),
(19,'Mohamed', 'mohamed', 'mohmmedabourihhh@gmail.com', 'mohmmedabourihhh@gmail.com', '602171961', NULL, '2025-03-06', 0, NULL, 3),
(20,'Enrique', 'enrique', 'kiquegaraba@gmail.com', 'kiquegaraba@gmail.com', '600619217', NULL, '2025-03-06', 0, NULL, 3);

INSERT INTO categories (id, name, description) VALUES
(1, 'Painting', 'Artworks created using paint on a surface'),
(2, 'Digital Art', 'Artworks made using digital tools'),
(3, 'Sculpture', 'Three-dimensional art made by shaping materials'),
(4, 'Photography', 'Artworks captured using a camera'),
(5, 'Printmaking', 'Artworks created by printing techniques like etching or lithography'),
(6, 'Drawing', 'Artworks created using pencils, charcoal, or ink on paper'),
(7, 'Textile Art', 'Artworks made using fabric, thread, or weaving techniques'),
(8, 'Ceramics', 'Artworks made from clay and hardened by heat');


INSERT INTO works (id, artist_id, name, description, price) VALUES 
(1, 1, 'Sunset Painting', 'A beautiful sunset painting', 150.0),
(2, 1, 'Ocean Waves', 'A calming ocean scene with waves', 200.0),
(3, 1, 'Starry Night Replica', 'Inspired by Van Gogh’s Starry Night', 300.0),
(4, 1, 'Abstract Art', 'A modern abstract composition', 180.0),
(5, 1, 'Forest Path', 'A peaceful forest pathway', 120.0);


INSERT INTO status_kanban_order (id, artist_id, name, order_in_kanban, description, color) VALUES 
(1, 1, 'To Do', 1, 'Tasks that need to be started', '#FF5733'),
(2, 2, 'In Progress', 2, 'Tasks that are currently being worked on', '#33FF57'),
(3, 3, 'Review', 3, 'Tasks that need to be reviewed before completion', '#3357FF'),
(4, 4, 'Completed', 4, 'Tasks that have been finished', '#F1C40F'),
(5, 5, 'Archived', 5, 'Tasks that are no longer active but stored for reference', '#8E44AD'),
(6, 6, 'Idea', 6, 'New concept or idea being explored', '#FFAA33'),
(7, 7, 'Sketching', 7, 'Initial sketches and drafts', '#33A8FF'),
(8, 8, 'Coloring', 8, 'Adding colors to the artwork', '#A833FF'),
(9, 9, 'Final Touches', 9, 'Adding final adjustments before completion', '#33FFA8'),
(10, 10, 'Published', 10, 'The artwork is completed and shared', '#FF338A');


INSERT INTO commisions (id, artist_id, name, description, price, client_id, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES 
(1, 1,'Sunset Painting', 'A beautiful sunset painting', 150.0, 1, 'REQUESTED', 3, '2025-03-01', 'INITIAL', 1),
(2, 2, 'Ocean Waves', 'A calming ocean scene with waves', 200.0, 2, 'ACCEPTED', 4, '2025-03-02', 'FINAL', 2),
(3, 3, 'Starry Night Replica', 'Inspired by Van Gogh’s Starry Night', 300.0, 3, 'REQUESTED', 5, '2025-03-03', 'FIFTYFIFTY', 3),
(4, 4, 'Abstract Art', 'A modern abstract composition', 180.0, 4, 'IN_WAIT_LIST', 2, '2025-03-04', 'MODERATOR', 4),
(5, 5, 'Forest Path', 'A peaceful forest pathway', 120.0, 5, 'ENDED', 6, '2025-03-05', 'INITIAL', 5),
(6, 6, 'Sunset Horizon', 'A stunning view of the horizon at sunset', 250.0, 6, 'REJECTED', 1, '2025-03-06', 'FIFTYFIFTY', 6),
(7, 7, 'Mountain Landscape', 'A beautiful mountain landscape painting', 350.0, 7, 'CANCELED', 4, '2025-03-07', 'FINAL', 7),
(8, 8, 'Spring Flowers', 'A vibrant painting of spring flowers', 160.0, 8, 'ENDED', 3, '2025-03-08', 'INITIAL', 8),
(9, 9, 'Cityscape', 'A modern cityscape in digital format', 400.0, 9, 'ACCEPTED', 5, '2025-03-09', 'FINAL', 9),
(10, 10, 'Autumn Leaves', 'A peaceful autumn scene with falling leaves', 220.0, 10, 'REQUESTED', 2, '2025-03-10', 'MODERATOR', 10);



INSERT INTO milestones (id, name, accepted, milestone_date, commision_id) VALUES 
(1, 'Initial Sketch', TRUE, '2025-03-02', 1),
(2, 'Line Art', FALSE, '2025-03-05', 1),
(3, 'Coloring Phase 1', TRUE, '2025-03-10', 2),
(4, 'Final Touches', FALSE, '2025-03-15', 2),
(5, '3D Model Base', TRUE, '2025-03-01', 3),
(6, 'Texture Painting', FALSE, '2025-03-08', 3),
(7, 'Concept Art Approval', TRUE, '2025-02-28', 4),
(8, 'First Revision', FALSE, '2025-03-07', 4),
(9, 'Final Rendering', TRUE, '2025-03-12', 5),
(10, 'Lighting Adjustments', FALSE, '2025-03-18', 5),
(11, 'Sketch Approval', TRUE, '2025-03-04', 6),
(12, 'Base Colors', FALSE, '2025-03-09', 6),
(13, 'Initial Composition', TRUE, '2025-02-27', 7),
(14, 'Details Refinement', FALSE, '2025-03-06', 7),
(15, 'Pose Approval', TRUE, '2025-03-03', 8),
(16, 'Shading Process', FALSE, '2025-03-11', 8),
(17, 'Sculpt Base Form', TRUE, '2025-03-02', 9),
(18, 'Final Texture Mapping', FALSE, '2025-03-10', 9),
(19, 'Animation Draft', TRUE, '2025-03-05', 10),
(20, 'Final Review', FALSE, '2025-03-14', 10);


INSERT INTO works_done (id, artist_id, image) VALUES 
(1, 1, NULL),
(2, 1, NULL),
(3, 1, NULL),
(4, 1, NULL);

INSERT INTO artist_category(id,artist_id,category_id) VALUES
(1, 1, 1),
(2,1,2),
(3,1,3),
(4, 2, 2),
(5, 3, 3),
(6, 4, 4),
(7, 5, 5),
(8, 6, 6),
(9, 7, 7),
(10, 8, 8);

INSERT INTO work_category(id,category_id,work_id) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 3, 4),
(5, 4, 5);