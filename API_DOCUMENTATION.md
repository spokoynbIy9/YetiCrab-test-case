# Документация REST API для проекта "Достопримечательности"

## Базовый URL

http://localhost:3000/attractions

---

## Эндпоинты

### 1. Получение списка достопримечательностей

**Метод:** `GET`  
**URL:** `/attractions`  
**Теги:** `Attractions`

#### Параметры запроса:

| Параметр      | Тип       | Описание                                                      |
| ------------- | --------- | ------------------------------------------------------------- |
| `title_like`  | `string`  | Фильтр по частичному совпадению названия                      |
| `hideVisited` | `boolean` | Скрыть посещенные места (`true` — скрыть, `false` — показать) |

### 2. Создание достопримечательности

**Метод:** `POST`  
**URL:** `/attractions`  
**Теги:** `Attractions`

### 3. Обновление достопримечательности

**Метод:** `PATCH`  
**URL:** `/attractions/${id}`

#### Параметры запроса:

| Параметр | Тип      | Описание              |
| -------- | -------- | --------------------- |
| `id`     | `string` | Уникальный ID объекта |

### 4. Удаление достопримечательности

**Метод:** `DELETE`  
**URL:** `/attractions/${id}`

## Модели данных

### Объект AttractionDto

```ts
interface AttractionDto {
  id: string;
  title: string;
  dateAdded: string; // Формат: "YYYY-MM-DD"
  timeAdded: string; // Формат: "HH:mm"
  rating: number;
  photo: string;
  location: string;
  coordinates: Coordinates;
  mapLink: string;
  status: Status;
}
```
