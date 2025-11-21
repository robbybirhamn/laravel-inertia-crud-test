# Laravel Inertia.js React Starter Kit

A modern full-stack application built with Laravel 12, Inertia.js, React 19, and TypeScript. This application features event and venue management with authentication powered by Laravel Fortify.

## Tech Stack

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: Laravel Fortify
- **Database**: SQLite (default, configurable)
- **Build Tool**: Vite
- **Testing**: Pest PHP

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **PHP** 8.2 or higher
- **Composer** (PHP dependency manager)
- **Node.js** 18.x or higher and **npm**
- **SQLite** (usually pre-installed on macOS/Linux)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd laravel-inertia-test
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Install Node Dependencies

```bash
npm install
```

### 4. Environment Configuration

Create a `.env` file from the example (if it doesn't exist):

```bash
cp .env.example .env
```

Or if `.env.example` doesn't exist, Laravel will create a default `.env` file automatically.

Generate the application key:

```bash
php artisan key:generate
```

### 5. Database Setup

The application uses SQLite by default. The database file should be created automatically at `database/database.sqlite`. If it doesn't exist, create it:

```bash
touch database/database.sqlite
```

Run the migrations:

```bash
php artisan migrate
```

(Optional) Seed the database with sample data:

```bash
php artisan db:seed
```

### 6. Build Frontend Assets

For production:

```bash
npm run build
```

For development, you can skip this step as the dev server will handle it automatically.

## Quick Setup (All-in-One)

You can also use the setup script that automates most of the installation:

```bash
composer run setup
```

This command will:
- Install Composer dependencies
- Create `.env` file if it doesn't exist
- Generate application key
- Run database migrations
- Install npm dependencies
- Build frontend assets

## Development

### Start the Development Server

The project includes a convenient development script that runs all necessary services concurrently:

```bash
composer run dev
```

This will start:
- Laravel development server (http://localhost:8000)
- Queue worker
- Laravel Pail (log viewer)
- Vite development server (for hot module replacement)

### Alternative: Manual Development Setup

If you prefer to run services separately:

**Terminal 1 - Laravel Server:**
```bash
php artisan serve
```

**Terminal 2 - Vite Dev Server:**
```bash
npm run dev
```

**Terminal 3 - Queue Worker (if using queues):**
```bash
php artisan queue:listen
```

### Server-Side Rendering (SSR)

To run the application with SSR enabled:

```bash
composer run dev:ssr
```

This will build the SSR assets and start the SSR server along with other development services.

## Available Commands

### PHP/Laravel Commands

- `php artisan migrate` - Run database migrations
- `php artisan migrate:fresh` - Drop all tables and re-run migrations
- `php artisan db:seed` - Seed the database
- `php artisan test` - Run tests (Pest)
- `php artisan tinker` - Open Laravel Tinker REPL

### NPM Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build assets for production
- `npm run build:ssr` - Build assets including SSR
- `npm run lint` - Run ESLint and fix issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run types` - Run TypeScript type checking

### Composer Scripts

- `composer run setup` - Complete setup process
- `composer run dev` - Start all development services
- `composer run dev:ssr` - Start development with SSR
- `composer run test` - Run tests

## Project Structure

```
laravel-inertia-test/
├── app/                    # Laravel application code
│   ├── Actions/           # Action classes
│   ├── Http/              # Controllers, Middleware, Requests
│   ├── Models/            # Eloquent models
│   └── Policies/          # Authorization policies
├── config/                # Configuration files
├── database/              # Migrations, seeders, factories
│   ├── migrations/        # Database migrations
│   ├── seeders/           # Database seeders
│   └── factories/         # Model factories
├── public/                # Public assets
├── resources/
│   ├── css/               # CSS files
│   ├── js/                # React/TypeScript source files
│   │   ├── components/    # React components
│   │   ├── pages/         # Inertia page components
│   │   ├── layouts/       # Layout components
│   │   └── routes/        # Route definitions
│   └── views/             # Blade templates
├── routes/                # Route definitions
├── storage/               # Storage directory
├── tests/                 # Test files
└── vendor/                # Composer dependencies
```

## Features

- **Authentication**: User registration, login, and two-factor authentication via Laravel Fortify
- **Event Management**: Create, read, update, and delete events
- **Venue Management**: Manage venues with search functionality
- **Modern UI**: Built with Radix UI components and Tailwind CSS
- **Type Safety**: Full TypeScript support
- **Testing**: Pest PHP test suite included

## Configuration

### Database

By default, the application uses SQLite. To use MySQL or PostgreSQL:

1. Update your `.env` file:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

2. Run migrations:
   ```bash
   php artisan migrate
   ```

### Application Settings

Key environment variables in `.env`:

- `APP_NAME` - Application name
- `APP_ENV` - Environment (local, production, etc.)
- `APP_DEBUG` - Debug mode (true/false)
- `APP_URL` - Application URL

## Testing

Run the test suite:

```bash
php artisan test
```

Or using Pest directly:

```bash
./vendor/bin/pest
```

## Production Deployment

1. **Optimize Composer autoloader:**
   ```bash
   composer install --optimize-autoloader --no-dev
   ```

2. **Set environment to production:**
   ```env
   APP_ENV=production
   APP_DEBUG=false
   ```

3. **Build frontend assets:**
   ```bash
   npm run build
   ```

4. **Cache configuration:**
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

5. **Run migrations:**
   ```bash
   php artisan migrate --force
   ```

## Troubleshooting

### Permission Issues

If you encounter permission issues with storage or cache:

```bash
chmod -R 775 storage bootstrap/cache
```

### Database Issues

If migrations fail, try:

```bash
php artisan migrate:fresh
```

### Frontend Build Issues

Clear node modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Clear All Caches

```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Support

For Laravel documentation, visit [laravel.com/docs](https://laravel.com/docs).

For Inertia.js documentation, visit [inertiajs.com](https://inertiajs.com).

# laravel-inertia-crud-test
# laravel-inertia-crud-test
