INSERT INTO base_user (id, first_name, username, password, email, phone_number, image_profile, created_user) VALUES
(1, 'John', 'john_doe', 'password123', 'john.doe@example.com', '1234567890', 'profile1.jpg', '2025-02-28'),
(2, 'Jane', 'jane_doe', 'password456', 'jane.doe@example.com', '0987654321', 'profile2.jpg', '2025-02-28');

INSERT INTO client (id, base_user_id) VALUES
(1, 1),
(2, 2);