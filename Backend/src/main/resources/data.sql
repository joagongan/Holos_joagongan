INSERT INTO authorities (id, authority) VALUES
(1, 'ADMIN'),
(2, 'CLIENT'),
(3, 'ARTIST');

INSERT INTO clients (id, first_name, username, password, email, phone_number, image_profile, created_user, authority) 
VALUES 
(1, 'John', 'john_doe', '$2a$10$Pa0sqxNtcHNYzE2BeEYLZODN47h0CwUk.C3.DNWbVNE.HK4t.w8Pm', 'john.doe@example.com', '1234567890', NULL, '2025-02-28', 2), 
(2, 'Jane', 'jane_doe', '$2a$10$/qX3iXMXVNqGwxL0T7aAtO8uZitcy/BS0veWxSLqSsmEBmkokWCb2', 'jane.doe@example.com', '1234567890', NULL, '2025-02-28', 2);

INSERT INTO artists (id, first_name, username, password, email, phone_number, image_profile, created_user, num_slots_of_work, table_commisions_price, authority) VALUES
(1,'Yellow', 'yellow_doe', '$2a$10$EpGdCKwySrqJfMzPR2dizO1BCZiQwmaum2G0AyYl0EgMgf80OCypK', 'yellow.doe@example.com', '1234567890', NULL, '2025-02-28', 3, NULL, 3);

INSERT INTO categories (id, name, description, image) VALUES
(1,'Painting', 'Artworks created using paint on a surface', "/images/painting_category.jpg"),
(2,'Digital Art', 'Artworks made using digital tools', "/images/digital_art_category.jpg"),
(3,'Sculpture', 'Three-dimensional art made by shaping materials', "/images/sculture_art_category.jpg");

INSERT INTO works (id, artist_id, name, description, price) VALUES 
(1, 1, 'Sunset Painting', 'A beautiful sunset painting', 150.0),
(2, 1, 'Ocean Waves', 'A calming ocean scene with waves', 200.0),
(3, 1, 'Starry Night Replica', 'Inspired by Van Gogh`s Starry Night', 300.0),
(4, 1, 'Abstract Art', 'A modern abstract composition', 180.0),
(5, 1, 'Forest Path', 'A peaceful forest pathway', 120.0);

INSERT INTO works_done (id, artist_id, image) VALUES 
(1, 1, "/images/sunset_painting.jpg"),
(2, 1, "/images/ocean_waves.jpg"),
(3, 1, "/images/starry_night_replica.jpg"),
(4, 1, "/images/abstract_art.jpg");

INSERT INTO status_kanban_order (id, artist_id, name, kanban_order, description, color) VALUES 
(1, 1, 'ToDo', 1, 'Tarea en progreso', 'blue'),
(2, 1, 'InProgress  ', 2, 'Tarea finalizada', 'green');


INSERT INTO commisions (id, artist_id, client_id, name, description, price, status, num_milestones, accepted_date_by_artist, payment_arrangement, status_kanban_order_id) VALUES
(1, 1, 2, 'Portrait Commission', 'Custom portrait painting', 250.0, 'REQUESTED', 3, NULL, 'FIFTYFIFTY', 1),
(2, 1, 2, 'Landscape Art', 'A detailed landscape commission', 300.0, 'REQUESTED', 2, NULL, 'FINAL', 1),
(3, 1, 2, 'Abstract Expression', 'Abstract commission based on client ideas', 200.0, 'REQUESTED', 1, NULL, 'INITIAL', 2),
(4, 1, 2, 'Surreal Concept Art', 'A surreal-style artwork', 500.0, 'REQUESTED', 2, NULL, 'MODERATOR', 2),
(5, 1, 2, 'Forest Path', 'A peaceful forest pathway', 120.0, 'REQUESTED', 2, NULL, 'MODERATOR', 1);