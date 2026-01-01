School Book Inventory Management System

Here we have full-stack School Book Inventory Management System using React.js, Node.js, Express.js, MySQL, and Sequelize ORM.

It will help us to manage School's book sets efficiently based on Board, Medium, Class, and Academic Year also user can filter this and find that book set based on it's requirment.

Questions :

1.  ● Explain relational database design
    => Relational database design means organizing data into separate tables based on real-world entities and defining relationships between them using primary keys and foreign keys.

In this project:

Board,Medium,Class,Academic Year,Book,Book Set,Book Set Items
Each table stores only its own data, and relationships connect them.

For example:
A Book Set belongs to one Board, Medium, Class, and Year.
A Book Set can contain many Books.

You can also test in my dashboard also!

This Design :
Makes updates and queries reliable
Matches real school structure

Relational database design organizes data into multiple related tables instead of one large table.
Each table represents a real-world entity, and relationships are created using primary and foreign keys.

In this project, entities like Board, Medium, Class, Year, Book, and Book Set are stored separately.
This improves consistency, and makes the system scalable and easy to maintain.

2.  ● Explain why separate Book Set and Book Set Items tables

A Book Set and its Books represent a one-to-many relationship.

Book Set table
Stores information about the set itself:

Board
Medium
Class
Year
Set name

Book Set Items table
Stores the individual books inside a set:
Which book is included Quantity of each book Which book set it belongs to This separation is required because:
One Book Set can contain many books
The same Book can appear in multiple book sets
Each book can have a different quantity per set
If everything was stored in one table, data would be repeated and hard to manage.
So this structure keeps data flexible, normalized, and scalable also after that we can change the structure it will be easy for us .

A Book Set can contain multiple books, and each book can appear in multiple book sets with different quantities.
Book Set table stores overall set details (board, class, year, set name).

Book Set Items table stores individual books and their quantities for each set.

This separation supports a one-to-many relationship and allows flexible book management.

3. ● Discuss CRUD operations
   CRUD stands for Create, Read, Update, Delete, and all four operations are implemented in this project.

// here in documentation our requirment only for Bookset CRUD right ?
but i have created CRUD for all Route so after that if there will be any requirment for change or adit any single kind of thing like book name or class name or edit delete or update so also it will be easy for us if there will be need in future !

here i am talking about this point from the DOC!
4.3 Update Book Set
PUT /book-set/:id
4.4 Delete Book Set
DELETE /book-set/:id

===>>> Below i have mentioned overall funtionality that i have built!

Create
Add Boards, Mediums, Classes, Years

Add Books
Create Book Sets with selected books and quantities

Read
View lists of Boards, Mediums, Classes, Years

View all Books
View Book Sets with filters (Board, Medium, Class, Year)

View books inside each Book Set

Update

Edit Book Set details

Change books or quantities inside a Book Set

Delete
Remove Boards, Mediums, Classes, Years

Delete Books
Delete Book Sets

These operations ensure full data lifecycle management for the school inventory.

4. ● Show understanding of school workflow
   This project follows the real-world school textbook workflow:

===>> Here after understanding the project's flow i have described some points about the workflow !

Academic structure setup
School defines Boards (CBSE, State Board)
Mediums (English, Gujarati)
Classes (1st, 2nd, etc.)
Academic Years
Book management
School adds books with subject and publisher
Books are stored once and reused
Book Set creation
For each class and year, the school creates a Book Set
Selects required books and quantities
Ensures the correct combination for students
Inventory & planning
Admin can view, update, or delete book sets
Helps in ordering, issuing, and tracking books
Avoids manual errors and duplication

So finally this workflow matches how schools actually manage textbooks and academic planning.
