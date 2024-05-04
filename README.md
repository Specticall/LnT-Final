
# Final Lnt Project

Product management application made with Laravel + Inertia.

## Installation
> Important : Make sure configure the enviroment variables with MySQL (not SQLite)

#1.  Clone this github repository
```
git init
git pull https://github.com/Specticall/LnT-Final
```

#2. Setup Laravel
```
composer i
php artisan key:generate
php artisan migrate:fresh --seed
php artisan storage:link
php artisan serve
```

#3. Setup Inertia
```
npm i
npm run dev
```

## Usage
> (Make sure XAMPP is running Apache & MySQL server)

On two seperate terminal instances, run:

```
npm run dev
```
```
php artisan serve
```


## Notes

1. Admin account credential :
   Email: admin@gmail.com,
   Password: password
   
2. Dummy product data are also provided with randomized data.

## License

Developed by ©Joseph Christian Yusmita
