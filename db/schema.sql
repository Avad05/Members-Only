-- 1. Create the Users table
CREATE TABLE IF NOT EXISTS userinfo (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    ismember BOOLEAN DEFAULT FALSE,
    isadmin BOOLEAN DEFAULT FALSE
);

-- 2. Create the Messages table
CREATE TABLE IF NOT EXISTS messageinfo (
    mess_id INTEGER,
    message CHARACTER VARYING(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT "messid" FOREIGN KEY (mess_id) REFERENCES userinfo(id)
);