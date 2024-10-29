-- seed.sql

-- Insert default categories
INSERT INTO categories (name, type)
VALUES
('Salary', 'income'),
('Business', 'income'),
('Interest', 'income'),
('Rent', 'expense'),
('Utilities', 'expense'),
('Groceries', 'expense'),
('Entertainment', 'expense'),
('Transportation', 'expense'),
('Healthcare', 'expense');

-- You can add more default categories as needed
