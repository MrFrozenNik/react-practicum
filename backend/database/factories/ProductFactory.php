<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    private const array CATEGORIES = [
        'Деликатесы' => [
            'modifiers' => ['Пищевое золото 24K (сусальное)', 'Пищевое золото (хлопья)', 'Черная икра', 'Трюфель свежий'],
            'price' => [15000, 350000],
        ],
        'Сыр' => [
            'modifiers' => ['Пармезан', 'Камамбер', 'Бри', 'Горгонзола', 'Выдержанный'],
            'price' => [300, 4500],
        ],
        'Мясная гастрономия' => [
            'modifiers' => ['Хамон Иберико', 'Прошутто', 'Стейк Рибай', 'Мраморная говядина'],
            'price' => [800, 15000],
        ],
        'Кофе' => [
            'modifiers' => ['Арабика', 'Зерновой', 'Спешелти', 'Эспрессо обжарка'],
            'price' => [400, 3500],
        ],
        'Шоколад' => [
            'modifiers' => ['Темный 85%', 'Ремесленный', 'С трюфелем', 'Бельгийский'],
            'price' => [150, 2000],
        ],
        'Напитки' => [
            'modifiers' => ['Органический', 'Крафтовый', 'Холодного отжима', 'Премиум'],
            'price' => [100, 1200],
        ],
        'Морепродукты' => [
            'modifiers' => ['Дикий лосось', 'Камчатский краб', 'Гребешки', 'Тигровые креветки'],
            'price' => [900, 18000],
        ],
        'Оливковое масло' => [
            'modifiers' => ['Extra Virgin', 'Нерафинированное', 'С ароматом трюфеля', 'Первый холодный отжим'],
            'price' => [500, 6000],
        ],
    ];

    private const array BRANDS = [
        'Gourmet Select',
        'Artisan Delights',
        'Royal Taste',
        'GoldLeaf Luxe',
        'Pure Nature',
        'Grand Reserve',
        'Elegance Food',
    ];

    public function definition(): array
    {
        $category = fake()->randomElement(array_keys(self::CATEGORIES));
        $config = self::CATEGORIES[$category];

        $brand = fake()->randomElement(self::BRANDS);
        $modifier = fake()->randomElement($config['modifiers']);
        [$min, $max] = $config['price'];

        return [
            'title' => "{$brand} {$category} {$modifier}",
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, $min, $max),
        ];
    }

    public function gold(): static
    {
        return $this->state(fn(array $attributes) => [
            'title' => 'GoldLeaf Luxe Пищевое золото 24K (сусальное)',
            'price' => fake()->randomFloat(2, 100000, 500000),
        ]);
    }
}
