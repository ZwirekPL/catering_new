# Catering Manager
Catering Manager is an application for managing inventory and shopping lists in many branches.
The application was created for a client who has 15 branches.
Each branch has its own account that has access to its warehouse. Each warehouse is divided into groceries and chemicals. The user can add, edit, delete products that are saved in MongoDB. Each product is assigned product details such as: name, capacity, quantity in bulk packaging, quantity in stock, unit.
The user can carry out an inventory by saving the inventory in the inventory history, which is stored for 30 days.
Shopping lists are divided into groceries and chemicals. Each user can add, edit and delete items from the list. When you click the "confirm shopping list" button, the list is sent to the shopping list history and all items from the list are added to the shopping list for drivers.
Each shopping list remains in the history of shopping lists for 30 days.
There is a separate account in the application for the admin who has access to each warehouse and shopping lists. He can edit them. The admin can only register users.
Drivers who only have access to shopping lists have a separate account. They also have access to a total shopping list that counts all products to be purchased. By selecting a specific branch from the list, drivers can see the shopping list from a specific branch so that they can pack and deliver the ordered products.


## Pictures
![Catering-Manager-1](https://user-images.githubusercontent.com/99488939/236166754-74420519-2d3b-4df0-930a-3fd12f642825.png)
![Catering-Manager-2](https://user-images.githubusercontent.com/99488939/236166806-a1849bf7-296c-4972-b906-9db0b17fcea1.png)
![Catering-Manager-3](https://user-images.githubusercontent.com/99488939/236166817-fbd44139-98ba-445a-89d9-2cdc3fa9de57.png)
![Catering-Manager-4](https://user-images.githubusercontent.com/99488939/236166882-0d03fb05-5e7e-4568-8671-a76e940f5d0c.png)
![Catering-Manager-5](https://user-images.githubusercontent.com/99488939/236166901-6f10b927-f9e4-4b5a-8a95-22138b0aaae2.png)

## Videos
[Catering-Manager-User.webm](https://user-images.githubusercontent.com/99488939/236165118-072ea2bb-8a84-4f8c-93e6-75d8232ab7ac.webm)

[Catering-Manager-Driver.webm](https://user-images.githubusercontent.com/99488939/236162711-418cb6c4-1e64-4f00-9d7c-11c88814939c.webm)

[Catering-Manager-Admin.webm](https://user-images.githubusercontent.com/99488939/236162741-44644fec-ec4f-4493-a0b9-c24b05d96418.webm)

## Issues

- Does not log out after leaving the site.
- Sometimes cors doesn't work.
- Sometimes it does not add the product to the warehouse and you have to add it a second time.
- Sometimes it fails to edit or delete a product in stock.
- Sometimes it does not send the shopping list or inventory to the server.
- When adding products to the shopping list, click on the selected category to see the added product.
- When we have an empty warehouse or shopping list, it sometimes adds null instead of a product.

## Accounts to Log in:
users:
user1@test.com,
user2@test.com,
user3@test.com,
user4@test.com,
user5@test.com,
user6@test.com,
user7@test.com,
user8@test.com,
user9@test.com,
user10@test.com,
user11@test.com,
user12@test.com,
user13@test.com,
user14@test.com,
user15@test.com,
password:
User123!

driver@test.com,
driver2@test.com,
driver3@test.com,
password:
Driver123!

admin@test.com
password:
Admin123!

## License

[MIT](https://choosealicense.com/licenses/mit/)
