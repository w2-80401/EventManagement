create DATABASE event_management;

USE event_management;


-- User event
CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(100),
    phone VARCHAR(50), 
    role VARCHAR(50), 
    createdTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- event
CREATE TABLE event (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    details VARCHAR(1024),
    image VARCHAR(100),
    createdTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO event (name, details, image) VALUES
    ('Wedding', 'A hugely popular margherita, with a deliciously tangy single cheese topping', 'pizza1.webp');
   
-- venue
CREATE TABLE venue (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(10000),
    capacity INTEGER,
    price DECIMAL(10, 2),
    location VARCHAR(200),
    image VARCHAR(255)
);


-- order
CREATE TABLE booking (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    userId INTEGER,
    totalAmount FLOAT,
    createdTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES user(id)
);

-- order details
CREATE TABLE bookingDetails (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    event_id INTEGER,
    venue_id INTEGER,
    user_id INTEGER,
    attendees INTEGER,
    total_price DECIMAL(10, 2),
    booking_date DATE,
    booking_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status ENUM('paid', 'unpaid') DEFAULT 'unpaid', 
    FOREIGN KEY (event_id) REFERENCES event(id),
    FOREIGN KEY (venue_id) REFERENCES venue(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);


--payment
CREATE TABLE payment (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    booking_id INTEGER,
    amount DECIMAL(10, 2),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookingDetails(id)
);
