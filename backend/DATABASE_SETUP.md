# Aarohi Backend - Database Setup

Currently, you are experiencing an **Access Denied** error because the system is trying to connect to a local database.

## To Connect to your Hostinger Database:

1. **Get the Database Host**:
   - Log in to Hostinger.
   - Go to **MySQL Databases**.
   - Copy the IP address or hostname from the "Host" section.

2. **Update Environment**:
   - Open `backend/.env`.
   - Change `DB_HOST=localhost` to `DB_HOST=your_hostinger_ip`.

3. **Enable Remote MySQL**:
   - In Hostinger, go to **Remote MySQL**.
   - In the "IP (Host)" field, enter your current computer's IP (or use `%` to allow all).
   - Select your database (`u745362362_aarohi`) and click **Create**.

## To Use a Local Database (Alternative):
If you want to work entirely on your computer:
1. Install XAMPP or MySQL Workbench locally.
2. Create a database named `u745362362_aarohi`.
3. Create a user `u745362362_aarohi` with password `Aarohimarble@123#`.
4. The server will automatically create the tables for you on the next run!
