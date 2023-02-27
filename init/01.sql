CREATE DATABASE IF NOT EXISTS fullstack_assignment;
USE fullstack_assignment;

CREATE TABLE IF NOT EXISTS `Cafe` (
  `id` CHAR(36) BINARY NOT NULL DEFAULT '3d1d6a9f-d0bc-46d3-a6aa-e3576ca3e12b', 
  `name` VARCHAR(255) NOT NULL, 
  `description` LONGTEXT NOT NULL, 
  `location` LONGTEXT NOT NULL, 
  `logo` LONGTEXT, 
  `created_at` DATETIME NOT NULL, 
  `updated_at` DATETIME NOT NULL, 
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `Employee` (
  `id` VARCHAR(255) UNIQUE, 
  `name` VARCHAR(255) NOT NULL, 
  `email_address` VARCHAR(255) NOT NULL, 
  `phone_number` VARCHAR(255) NOT NULL, 
  `gender` ENUM('Male', 'Female') NOT NULL, 
  `created_at` DATETIME NOT NULL, 
  `updated_at` DATETIME NOT NULL, 
  `cafe_id` CHAR(36) BINARY, 
  PRIMARY KEY (`id`), 
  FOREIGN KEY (`cafe_id`) REFERENCES `Cafe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

INSERT INTO `Employee` (
  `name`, `email_address`, `phone_number`, 
  `gender`, `id`, `created_at`, `updated_at`
) 
VALUES 
  (
    'Sarah Johnson', 'sarah.johnson@example.com', 
    '555-123-4567', 'Female', 'UI0000001', 
    NOW(), NOW()
  ), 
  (
    'Alex Lee', 'alex.lee@example.com', 
    '555-234-5678', 'Male', 'UI0000002', 
    NOW(), NOW()
  ), 
  (
    'Emily Davis', 'emily.davis@example.com', 
    '555-345-6789', 'Female', 'UI0000003', 
    NOW(), NOW()
  ), 
  (
    'John Smith', 'john.smith@example.com', 
    '555-456-7890', 'Male', 'UI0000004', 
    NOW(), NOW()
  ), 
  (
    'Samantha Kim', 'samantha.kim@example.com', 
    '555-567-8901', 'Female', 'UI0000005', 
    NOW(), NOW()
  ), 
  (
    'Michael Brown', 'michael.brown@example.com', 
    '555-678-9012', 'Male', 'UI0000006', 
    NOW(), NOW()
  ), 
  (
    'Jessica Lee', 'jessica.lee@example.com', 
    '555-789-0123', 'Female', 'UI0000007', 
    NOW(), NOW()
  ), 
  (
    'David Jones', 'david.jones@example.com', 
    '555-890-1234', 'Male', 'UI0000008', 
    NOW(), NOW()
  ), 
  (
    'Ava Davis', 'ava.davis@example.com', 
    '555-901-2345', 'Female', 'UI0000009', 
    NOW(), NOW()
  ), 
  (
    'William Johnson', 'william.johnson@example.com', 
    '555-012-3456', 'Male', 'UI0000010', 
    NOW(), NOW()
  );

INSERT INTO `Cafe` (
  `name`, `description`, `location`, 
  `logo`, `id`, `created_at`, `updated_at`
) 
VALUES 
  (
    'Coffee House', 'A cozy cafe with a variety of coffee options', 
    '123 Main Street', 'https://example.com/coffee-house-logo.png', 
    '6d1bba59-a376-41b3-81da-7ca21327a9bb', 
    NOW(), NOW()
  ), 
  (
    'Java Junction', 'A local favorite for espresso drinks and pastries', 
    '456 Oak Avenue', 'https://example.com/java-junction-logo.png', 
    '36af1be9-f9f1-4a77-b575-8f0ab5515f60', 
    NOW(), NOW()
  ), 
  (
    'Brewed Awakening', 'A rustic cafe with outdoor seating and homemade pastries', 
    '789 Elm Street', NULL, '138da7c8-481b-4e6f-b5aa-55e2f78bccb1', 
    NOW(), NOW()
  ), 
  (
    'The Daily Grind', 'A popular cafe with a laid-back atmosphere and free WiFi', 
    '321 Maple Road', 'https://example.com/daily-grind-logo.png', 
    'fdbcb6d8-139c-416b-9476-6ebff8a7d550', 
    NOW(), NOW()
  ), 
  (
    'Cafe Latte', 'A charming little cafe with a wide selection of lattes and teas', 
    '567 Pine Street', NULL, 'a8f5150b-062d-4037-8b3d-8e5c26f23f51', 
    NOW(), NOW()
  ), 
  (
    'Perks & Beans', 'A cozy cafe that specializes in artisanal coffee and homemade baked goods', 
    '890 Oak Lane', 'https://example.com/perks-and-beans-logo.png', 
    '7016aee7-71e6-477e-947c-fb577d59211e', 
    NOW(), NOW()
  ), 
  (
    'Cuppa Joe\'s', 'A casual coffeehouse with a funky vibe and live music', 
    '432 Elm Street', NULL, '65d89188-8f86-4d07-98f0-f82f45a71741', 
    NOW(), NOW()
  ), 
  (
    'The Roasted Bean', 'A trendy cafe that roasts their own beans and serves a mean cappuccino', 
    '765 Main Street', 'https://example.com/roasted-bean-logo.png', 
    '730f91ed-3dec-4fd0-83be-4305a5ccbb75', 
    NOW(), NOW()
  ), 
  (
    'Java Express', 'A fast-paced cafe with drive-through service and a loyalty program', 
    '234 Maple Road', NULL, '06cac43f-67ed-4a37-ad48-144005e82969', 
    NOW(), NOW()
  ), 
  (
    'Cafe Mocha', 'A cozy spot for a rich and creamy mocha, with free WiFi and board games', 
    '901 Pine Street', 'https://example.com/cafe-mocha-logo.png', 
    '76ba469f-6afa-4f8b-b70b-c37e34100c2d', 
    NOW(), NOW()
  );