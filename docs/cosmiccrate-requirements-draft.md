# CosmicCrate Requirements Draft

## 1. Confirmed Decisions

### Business model
CosmicCrate will sell curated gift boxes based on zodiac signs and gifting occasions.

### Product types for phase 1

- 12 fixed zodiac boxes
- Occasion-based gift boxes

### Occasion categories for phase 1

- Birthday gifts
- Anniversary gifts
- Marriage gifts

### Box customization for phase 1

- No build-your-own box in the initial backend scope
- Boxes will be pre-designed by the business
- Item-level customer selection is not a priority right now

### Versions per product

- Each product will have only 2 versions
- Suggested naming: `Classic` and `Luxury`

### Pricing model

- Price will be fixed for each box
- No dynamic pricing based on item selection in phase 1

## 2. Interpreting These Decisions Technically

Because you are starting with fixed boxes and fixed prices, the backend becomes much simpler and safer.

That means phase 1 does **not** need:

- Custom box builder logic
- Complex product configurators
- Per-selection pricing rules
- Advanced compatibility rules between box items

That means phase 1 **does** need:

- Product catalog
- Product versions
- Occasion tags/categories
- Fixed pricing
- Inventory tracking
- Cart
- Orders
- Payments
- Admin management

## 3. Recommended Product Structure

For now, each product should look like this conceptually:

- Product family: `Aries Gift Box`
- Versions: `Classic`, `Luxury`
- Occasions: `Birthday`, `Anniversary`, `Marriage`
- Fixed price per version
- Predefined included items

Examples:

- `Cancer Gift Box - Classic`
- `Cancer Gift Box - Luxury`
- `Anniversary Cosmic Box - Classic`
- `Marriage Celebration Box - Luxury`

## 4. What This Means For Prisma Design

Your first schema will likely need:

- `products`
- `product_variants`
- `categories`
- `product_categories`
- `orders`
- `order_items`
- `users`
- `addresses`
- `payments`
- `inventory`

### Suggested simplified approach

- `products` = base product like Aries Box or Anniversary Box
- `product_variants` = Classic and Luxury
- `categories` = Zodiac, Birthday, Anniversary, Marriage

This is better than making separate hardcoded tables for each idea.

## 5. What Is Finalized

These requirements now look stable enough to move forward:

- Fixed curated boxes
- No customer item-by-item box building in phase 1
- Occasion-based gifting included
- Two versions per box
- Fixed prices per box
- React frontend
- PostgreSQL database
- Prisma ORM

## 6. What Still Needs To Be Finalized Before Schema

We still need a few important decisions:

### Product scope

- Will every zodiac sign have both `Classic` and `Luxury` versions?
- Will occasion boxes also have both `Classic` and `Luxury` versions?

### Customer checkout

- Guest checkout or login required?
- India only shipping or international?
- Online payment only, or COD too?

### Inventory logic

- Do you want to track stock per box variant only?
- Or also track stock of internal items later?

My recommendation for phase 1:

- Track stock per box variant only
- Allow guest checkout
- India-only shipping
- Online payment only

## 7. Best Next Step

The next best step is to convert these requirements into:

1. A final product requirement summary
2. A Prisma data model
3. A backend folder structure

That is the cleanest path before writing APIs.
