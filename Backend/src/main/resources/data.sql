INSERT INTO base_user (id, first_name, username, password, email, phone_number, image_profile, created_user) VALUES
(1, 'John', 'john_doe', 'password123', 'john.doe@example.com', '1234567890', 'profile1.jpg', '2025-02-28'),
(2, 'Jane', 'jane_doe', 'password456', 'jane.doe@example.com', '0987654321', 'profile2.jpg', '2025-02-28'),
(3, 'Yellow', 'yellow', 'password', 'yellow.artist@gmail.com', '0987654321', 'profile3.jpg', '2025-02-28');

INSERT INTO clients (id, base_user_id) VALUES
(1, 1),
(2, 2);

INSERT INTO artists (id, base_user_id, num_slots_of_work, table_commisions_price) VALUES
(1, 3, 3,'tabla.jpg');

INSERT INTO works (id, artist_id, name, description, price) VALUES 
(1, 1, 'Sunset Painting', 'A beautiful sunset painting', 150.0),
(2, 1, 'Ocean Waves', 'A calming ocean scene with waves', 200.0),
(3, 1, 'Starry Night Replica', 'Inspired by Van Gogh’s Starry Night', 300.0),
(4, 1, 'Abstract Art', 'A modern abstract composition', 180.0),
(5, 1, 'Forest Path', 'A peaceful forest pathway', 120.0);

INSERT INTO works_done (id, image) VALUES 
(1, NULL),
(3, NULL),
(4, NULL);
